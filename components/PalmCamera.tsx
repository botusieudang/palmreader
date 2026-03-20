import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import type { ReadingMode } from '../types/reading';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const SCAN_W = SCREEN_W * 0.85;
const SCAN_H = SCREEN_H * 0.55; // Dọc hơn, cao hơn
const FACE_FRAME_SIZE = SCREEN_W;

// Frame images
const frameFace = require('../assets/images/frame_face.png');

interface CameraProps {
  onCapture: (base64: string, uri: string) => void;
  onCancel: () => void;
  mode: ReadingMode;
}

export default function PalmCamera({ onCapture, onCancel, mode }: CameraProps) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturing, setCapturing] = useState(false);
  const [facing, setFacing] = useState<'front' | 'back'>(mode === 'palm' ? 'back' : 'front');

  const isPalm = mode === 'palm';
  const accentColor = isPalm ? '#8b5cf6' : '#ec4899';

  // Scanner line animation (only for palm)
  const scanY = useSharedValue(0);
  const cornerPulse = useSharedValue(1);

  useEffect(() => {
    if (!isPalm) return;
    scanY.value = withRepeat(
      withTiming(SCAN_H - 4, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1, true
    );
    cornerPulse.value = withRepeat(
      withSequence(withTiming(0.6, { duration: 1200 }), withTiming(1, { duration: 1200 })),
      -1, false
    );
  }, []);

  const scanLineStyle = useAnimatedStyle(() => ({ transform: [{ translateY: scanY.value }] }));
  const cornerStyle = useAnimatedStyle(() => ({ opacity: cornerPulse.value }));

  const handleCapture = async () => {
    if (!cameraRef.current || capturing) return;
    setCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.7 });
      if (photo?.base64 && photo?.uri) onCapture(photo.base64, photo.uri);
    } catch (e) {
      console.warn('Camera capture error:', e);
    } finally {
      setCapturing(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.purple} size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Ionicons name="camera-outline" size={48} color={Colors.textMuted} />
        <Text style={styles.permText}>Cần quyền camera để chụp</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Cấp Quyền</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={{ marginTop: 16 }}>
          <Text style={styles.cancelText}>Quay Lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        mirror={false}
      />

      {/* Face frame overlay */}
      {!isPalm && (
        <View style={styles.faceFrameContainer} pointerEvents="none">
          <Image
            source={frameFace}
            style={styles.faceFrameImage}
            resizeMode="contain"
          />
        </View>
      )}

      {/* Scanner overlay - palm mode - NO dark background */}
      {isPalm && (
        <View style={styles.scanOverlay} pointerEvents="none">
          <View style={styles.scanArea}>
            {/* Corner brackets */}
            <Animated.View style={[StyleSheet.absoluteFill, cornerStyle]}>
              <View style={[styles.corner, styles.cornerTL, { borderColor: accentColor }]} />
              <View style={[styles.corner, styles.cornerTR, { borderColor: accentColor }]} />
              <View style={[styles.corner, styles.cornerBL, { borderColor: accentColor }]} />
              <View style={[styles.corner, styles.cornerBR, { borderColor: accentColor }]} />
            </Animated.View>
            {/* Scan line */}
            <Animated.View style={[styles.scanLine, scanLineStyle]}>
              <LinearGradient
                colors={['transparent', accentColor, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scanLineGrad}
              />
            </Animated.View>
          </View>
        </View>
      )}

      {/* Instructions */}
      <View style={styles.instructionBox} pointerEvents="none">
        <Text style={styles.instructionText}>
          {isPalm
            ? 'Đặt lòng bàn tay vào khung, ngửa tay lên'
            : 'Đưa khuôn mặt vào giữa khung'}
        </Text>
      </View>

      {/* Mode badge */}
      <View style={styles.modeBadge} pointerEvents="none">
        <Text style={[styles.modeBadgeText, { color: accentColor }]}>
          {isPalm ? 'Nam: Tay trái - Nữ: Tay phải' : 'Xem Tướng Mặt'}
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCapture}
          style={[styles.captureBtn, { borderColor: accentColor }]}
          disabled={capturing}
        >
          {capturing ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <View style={[styles.captureBtnInner, { backgroundColor: accentColor }]} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFacing(f => f === 'back' ? 'front' : 'back')}
          style={styles.flipBtn}
        >
          <Ionicons name="camera-reverse" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', gap: 16 },
  permText: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center', paddingHorizontal: 40 },
  permBtn: { backgroundColor: Colors.purple, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  permBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  cancelText: { color: Colors.textMuted, fontSize: 14 },

  // Face frame overlay
  faceFrameContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceFrameImage: {
    width: FACE_FRAME_SIZE,
    height: FACE_FRAME_SIZE,
    opacity: 0.5,
  },

  // Palm scanner overlay - no dark bg, centered
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanArea: {
    width: SCAN_W,
    height: SCAN_H,
    overflow: 'hidden',
  },

  corner: { position: 'absolute', width: 40, height: 40, borderWidth: 3 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12 },
  scanLine: { position: 'absolute', left: 0, right: 0, height: 3 },
  scanLineGrad: { flex: 1 },
  instructionBox: { position: 'absolute', top: 50, left: 0, right: 0, alignItems: 'center' },
  instructionText: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, overflow: 'hidden' },
  modeBadge: { position: 'absolute', top: 95, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16 },
  modeBadgeText: { fontSize: 12, fontWeight: '600' },
  controls: { position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 30 },
  cancelBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  captureBtn: { width: 72, height: 72, borderRadius: 36, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  captureBtnInner: { width: 58, height: 58, borderRadius: 29 },
  flipBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
});
