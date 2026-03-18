import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { PALM_LINE_TEMPLATES } from '../constants/palmLineTemplates';

interface Props {
  imageBase64: string;
  onLinesDetected: (adjustedLines: AdjustedLine[]) => void;
  onError: () => void;
}

export interface AdjustedLine {
  name: string;
  // Adjusted cubic bezier segments in pixel coordinates
  segments: number[][];
}

const EDGE_DETECT_HTML = `
<!DOCTYPE html>
<html>
<head><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body>
<canvas id="c" style="display:none"></canvas>
<script>
function msg(obj) { window.ReactNativeWebView.postMessage(JSON.stringify(obj)); }

window.processImage = function(base64, templates) {
  try {
    var img = new Image();
    img.onload = function() {
      var scale = Math.min(1, 500 / Math.max(img.width, img.height));
      var w = Math.floor(img.width * scale);
      var h = Math.floor(img.height * scale);

      var c = document.getElementById("c");
      c.width = w;
      c.height = h;
      var ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);

      var imageData = ctx.getImageData(0, 0, w, h);
      var pixels = imageData.data;

      // Grayscale
      var gray = new Float32Array(w * h);
      for (var i = 0; i < w * h; i++) {
        var idx = i * 4;
        gray[i] = 0.299 * pixels[idx] + 0.587 * pixels[idx+1] + 0.114 * pixels[idx+2];
      }

      // Gaussian blur
      var blurred = gaussianBlur(gray, w, h);

      // Sobel edge detection - store both magnitude and gradient direction
      var sobelResult = sobelEdge(blurred, w, h);
      var edges = sobelResult.mag;
      var gradX = sobelResult.gx;
      var gradY = sobelResult.gy;

      // Process each template line
      var adjustedLines = [];
      for (var li = 0; li < templates.length; li++) {
        var tmpl = templates[li];
        var adjustedSegments = [];

        for (var si = 0; si < tmpl.segments.length; si++) {
          var seg = tmpl.segments[si];
          // seg = [x1,y1, cp1x,cp1y, cp2x,cp2y, x2,y2] in normalized coords
          var adjusted = refineSegment(seg, edges, gradX, gradY, w, h);
          adjustedSegments.push(adjusted);
        }

        adjustedLines.push({
          name: tmpl.name,
          segments: adjustedSegments
        });
      }

      msg({ type: "result", lines: adjustedLines, width: w, height: h });
    };
    img.onerror = function() {
      msg({ type: "error", message: "img load fail" });
    };
    img.src = "data:image/jpeg;base64," + base64;
  } catch(e) {
    msg({ type: "error", message: e.message });
  }
};

// Sample N points along a cubic bezier
function sampleBezier(seg, n) {
  var pts = [];
  var x1 = seg[0], y1 = seg[1];
  var cx1 = seg[2], cy1 = seg[3];
  var cx2 = seg[4], cy2 = seg[5];
  var x2 = seg[6], y2 = seg[7];

  for (var i = 0; i <= n; i++) {
    var t = i / n;
    var mt = 1 - t;
    var mt2 = mt * mt;
    var mt3 = mt2 * mt;
    var t2 = t * t;
    var t3 = t2 * t;
    pts.push({
      x: mt3*x1 + 3*mt2*t*cx1 + 3*mt*t2*cx2 + t3*x2,
      y: mt3*y1 + 3*mt2*t*cy1 + 3*mt*t2*cy2 + t3*y2
    });
  }
  return pts;
}

// Refine a bezier segment by looking for strongest edges in narrow band
function refineSegment(seg, edges, gradX, gradY, w, h) {
  // Convert normalized coords to pixel coords
  var pxSeg = [
    seg[0]*w, seg[1]*h,
    seg[2]*w, seg[3]*h,
    seg[4]*w, seg[5]*h,
    seg[6]*w, seg[7]*h
  ];

  // Sample points along the curve
  var nSamples = 20;
  var samplePts = sampleBezier(pxSeg, nSamples);

  // Band width: how far to search perpendicular to the curve
  var bandWidth = Math.min(w, h) * 0.06; // 6% of image size

  // For each sample point, find the strongest edge within the band
  var offsets = [];
  for (var i = 0; i < samplePts.length; i++) {
    var pt = samplePts[i];

    // Compute tangent direction at this point
    var prev = i > 0 ? samplePts[i-1] : samplePts[i];
    var next = i < samplePts.length-1 ? samplePts[i+1] : samplePts[i];
    var tx = next.x - prev.x;
    var ty = next.y - prev.y;
    var tlen = Math.sqrt(tx*tx + ty*ty) || 1;

    // Normal direction (perpendicular to tangent)
    var nx = -ty / tlen;
    var ny = tx / tlen;

    // Search along normal direction
    var bestMag = 0;
    var bestOffset = 0;

    for (var d = -bandWidth; d <= bandWidth; d += 1) {
      var sx = Math.round(pt.x + nx * d);
      var sy = Math.round(pt.y + ny * d);

      if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
        var idx = sy * w + sx;
        var mag = edges[idx];

        // Prefer edges that are perpendicular to the curve direction
        // (palm lines create edges perpendicular to the line direction)
        var egx = gradX[idx];
        var egy = gradY[idx];
        var elen = Math.sqrt(egx*egx + egy*egy) || 1;
        // Dot product of edge gradient with curve tangent direction
        // Should be high for lines perpendicular to the curve
        var alignment = Math.abs((egx * tx + egy * ty) / (elen * tlen));

        var score = mag * (0.5 + 0.5 * alignment);

        if (score > bestMag) {
          bestMag = score;
          bestOffset = d;
        }
      }
    }

    // Only apply offset if edge is strong enough
    var threshold = 15;
    if (bestMag < threshold) bestOffset = 0;
    // Dampen offset to prevent wild swings
    offsets.push(bestOffset * 0.7);
  }

  // Smooth offsets to avoid jagged lines
  var smoothed = smoothArray(offsets, 3);

  // Reconstruct adjusted bezier by fitting new control points
  // Simple approach: adjust start, end, and derive control points from sample offsets
  var adjustedPts = [];
  for (var i = 0; i < samplePts.length; i++) {
    var pt = samplePts[i];
    var prev = i > 0 ? samplePts[i-1] : samplePts[i];
    var next = i < samplePts.length-1 ? samplePts[i+1] : samplePts[i];
    var tx = next.x - prev.x;
    var ty = next.y - prev.y;
    var tlen = Math.sqrt(tx*tx + ty*ty) || 1;
    var nx = -ty / tlen;
    var ny = tx / tlen;

    adjustedPts.push({
      x: pt.x + nx * smoothed[i],
      y: pt.y + ny * smoothed[i]
    });
  }

  // Fit back to a cubic bezier using least-squares-like approach
  // Use points at t=0, t=0.33, t=0.67, t=1 for control point estimation
  var p0 = adjustedPts[0];
  var p3 = adjustedPts[adjustedPts.length - 1];
  var i1 = Math.round(nSamples * 0.33);
  var i2 = Math.round(nSamples * 0.67);
  var pA = adjustedPts[i1];
  var pB = adjustedPts[i2];

  // Estimate control points from interpolated positions
  // For cubic bezier: P(t) = (1-t)^3*P0 + 3*(1-t)^2*t*P1 + 3*(1-t)*t^2*P2 + t^3*P3
  var t1 = 0.33, t2 = 0.67;
  var mt1 = 1-t1, mt2 = 1-t2;
  // Solve for P1 and P2 approximately
  var cp1x = (pA.x - mt1*mt1*mt1*p0.x - t1*t1*t1*p3.x) / (3*mt1*mt1*t1 + 0.001);
  var cp1y = (pA.y - mt1*mt1*mt1*p0.y - t1*t1*t1*p3.y) / (3*mt1*mt1*t1 + 0.001);
  var cp2x = (pB.x - mt2*mt2*mt2*p0.x - t2*t2*t2*p3.x) / (3*mt2*t2*t2 + 0.001);
  var cp2y = (pB.y - mt2*mt2*mt2*p0.y - t2*t2*t2*p3.y) / (3*mt2*t2*t2 + 0.001);

  return [p0.x, p0.y, cp1x, cp1y, cp2x, cp2y, p3.x, p3.y];
}

function smoothArray(arr, passes) {
  var out = arr.slice();
  for (var p = 0; p < passes; p++) {
    var tmp = out.slice();
    for (var i = 1; i < out.length - 1; i++) {
      tmp[i] = (out[i-1] + out[i] * 2 + out[i+1]) / 4;
    }
    out = tmp;
  }
  return out;
}

function gaussianBlur(gray, w, h) {
  var kernel = [1,4,6,4,1, 4,16,24,16,4, 6,24,36,24,6, 4,16,24,16,4, 1,4,6,4,1];
  var kSum = 256;
  var out = new Float32Array(w * h);
  for (var y = 2; y < h - 2; y++) {
    for (var x = 2; x < w - 2; x++) {
      var sum = 0;
      for (var ky = -2; ky <= 2; ky++) {
        for (var kx = -2; kx <= 2; kx++) {
          sum += gray[(y+ky)*w + (x+kx)] * kernel[(ky+2)*5 + (kx+2)];
        }
      }
      out[y*w + x] = sum / kSum;
    }
  }
  return out;
}

function sobelEdge(gray, w, h) {
  var mag = new Float32Array(w * h);
  var gx = new Float32Array(w * h);
  var gy = new Float32Array(w * h);

  for (var y = 1; y < h - 1; y++) {
    for (var x = 1; x < w - 1; x++) {
      var tl = gray[(y-1)*w + (x-1)];
      var t  = gray[(y-1)*w + x];
      var tr = gray[(y-1)*w + (x+1)];
      var l  = gray[y*w + (x-1)];
      var r  = gray[y*w + (x+1)];
      var bl = gray[(y+1)*w + (x-1)];
      var b  = gray[(y+1)*w + x];
      var br = gray[(y+1)*w + (x+1)];

      var sx = -tl + tr - 2*l + 2*r - bl + br;
      var sy = -tl - 2*t - tr + bl + 2*b + br;
      var idx = y*w + x;
      gx[idx] = sx;
      gy[idx] = sy;
      mag[idx] = Math.sqrt(sx*sx + sy*sy);
    }
  }
  return { mag: mag, gx: gx, gy: gy };
}

msg({ type: "ready" });
</script>
</body>
</html>
`;

export default function PalmEdgeDetector({ imageBase64, onLinesDetected, onError }: Props) {
  const webViewRef = useRef<WebView>(null);
  const readyRef = useRef(false);
  const sentRef = useRef(false);

  const sendImage = () => {
    if (readyRef.current && !sentRef.current && webViewRef.current) {
      sentRef.current = true;
      const escaped = JSON.stringify(imageBase64.substring(0, 3000000));
      const templates = JSON.stringify(
        PALM_LINE_TEMPLATES.map((t) => ({
          name: t.name,
          segments: t.segments,
        }))
      );
      webViewRef.current.injectJavaScript(
        `window.processImage(${escaped}, ${templates}); true;`
      );
    }
  };

  const handleMessage = (event: any) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'ready') {
        readyRef.current = true;
        sendImage();
      } else if (msg.type === 'result') {
        onLinesDetected(
          msg.lines.map((l: any) => ({
            name: l.name,
            segments: l.segments,
          }))
        );
      } else if (msg.type === 'error') {
        onError();
      }
    } catch {
      onError();
    }
  };

  return (
    <View style={styles.hidden}>
      <WebView
        ref={webViewRef}
        source={{ html: EDGE_DETECT_HTML }}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        allowUniversalAccessFromFileURLs
        mixedContentMode="always"
        originWhitelist={['*']}
        onError={() => onError()}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    width: 1,
    height: 1,
    position: 'absolute',
    opacity: 0,
    overflow: 'hidden',
  },
  webview: {
    width: 100,
    height: 100,
  },
});
