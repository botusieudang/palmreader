/**
 * Template bezier curves for 5 main palm lines.
 * Coordinates are normalized (0-1) relative to the guide frame.
 * Matches the reference image: Tình Cảm, Trí Lực, Sức Khỏe, Tiền Tài, Hôn Nhân
 *
 * Each line is defined as cubic bezier: [startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY]
 */

export interface PalmLineTemplate {
  name: string;
  nameVi: string;
  color: string;
  // Array of cubic bezier segments: each is [x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2]
  segments: number[][];
}

export const PALM_LINE_TEMPLATES: PalmLineTemplate[] = [
  {
    name: 'heart',
    nameVi: 'Tình Cảm',
    color: '#FF6B8A',
    // Heart line: curves across upper palm
    // Matches guide: M 80 210 Q 110 195 145 192 Q 180 190 210 200
    // Normalized to 300x400 viewBox
    segments: [
      [0.267, 0.525, 0.367, 0.488, 0.483, 0.480, 0.700, 0.500],
    ],
  },
  {
    name: 'head',
    nameVi: 'Trí Lực',
    color: '#4A90D9',
    // Head line: curves across middle palm
    // Matches guide: M 82 235 Q 115 240 150 242 Q 180 238 200 225
    segments: [
      [0.273, 0.588, 0.383, 0.600, 0.500, 0.605, 0.667, 0.563],
    ],
  },
  {
    name: 'life',
    nameVi: 'Sức Khỏe',
    color: '#4CAF50',
    // Life/Health line: curves around thumb area downward
    // Matches guide: M 92 195 Q 85 240 88 280 Q 92 320 110 355
    segments: [
      [0.307, 0.488, 0.283, 0.600, 0.293, 0.700, 0.367, 0.888],
    ],
  },
  {
    name: 'fate',
    nameVi: 'Tiền Tài',
    color: '#DAA520',
    // Fate/Money line: vertical center line going up
    // Matches guide: M 148 370 Q 146 320 144 280 Q 142 245 140 210
    segments: [
      [0.493, 0.925, 0.487, 0.800, 0.480, 0.700, 0.467, 0.525],
    ],
  },
  {
    name: 'marriage',
    nameVi: 'Hôn Nhân',
    color: '#BA68C8',
    // Marriage lines: short lines near pinky side
    // Matches guide: M 215 155 Q 205 152 198 155
    segments: [
      [0.717, 0.388, 0.683, 0.380, 0.667, 0.383, 0.660, 0.388],
    ],
  },
];

/**
 * Convert normalized bezier segment to SVG path data string.
 * width/height are the actual pixel dimensions of the image.
 */
export function templateToSvgPath(
  segments: number[][],
  width: number,
  height: number
): string {
  return segments
    .map((seg, i) => {
      const [x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2] = seg;
      const move = i === 0 ? `M ${x1 * width} ${y1 * height}` : '';
      return `${move} C ${cp1x * width} ${cp1y * height}, ${cp2x * width} ${cp2y * height}, ${x2 * width} ${y2 * height}`;
    })
    .join(' ');
}
