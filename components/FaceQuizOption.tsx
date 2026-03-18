import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BASE_FACE_PATH, EAR_LEFT_PATH, EAR_RIGHT_PATH, REFERENCE_FEATURE_PATHS } from '../constants/faceQuizData';
import type { FaceQuizOption, FaceSectionId } from '../types/faceQuiz';
import { Colors } from '../constants/theme';

const CARD_W = (Dimensions.get('window').width - 60) / 2;
const SVG_H = CARD_W * 1.1;

const ALL_SECTIONS: FaceSectionId[] = ['face_shape', 'eyes_brows', 'nose_ears', 'mouth_chin'];

interface Props {
  option: FaceQuizOption;
  sectionColor: string;
  sectionId: FaceSectionId;
  isSelected: boolean;
  index: number;
  onSelect: () => void;
}

export default function FaceQuizOptionCard({
  option,
  sectionColor,
  sectionId,
  isSelected,
  index,
  onSelect,
}: Props) {
  // Other sections to show dimmed
  const dimmedSections = ALL_SECTIONS.filter((s) => s !== sectionId);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onSelect}
      style={[
        styles.card,
        isSelected && {
          borderColor: sectionColor,
          backgroundColor: `${sectionColor}12`,
        },
      ]}
    >
      {/* Number badge */}
      <Text
        style={[
          styles.badge,
          isSelected
            ? { backgroundColor: sectionColor, color: '#fff' }
            : { backgroundColor: 'rgba(255,255,255,0.08)', color: Colors.textMuted },
        ]}
      >
        {index + 1}
      </Text>

      {/* SVG illustration */}
      <Svg
        width={CARD_W - 24}
        height={SVG_H - 20}
        viewBox="0 0 200 280"
        style={styles.svg}
      >
        {/* Face outline background */}
        <Path
          d={BASE_FACE_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1.5}
        />

        {/* Ears (always dimmed) */}
        <Path
          d={EAR_LEFT_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
        <Path
          d={EAR_RIGHT_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />

        {/* Dimmed reference features for OTHER sections */}
        {dimmedSections.map((secId) => {
          const ref = REFERENCE_FEATURE_PATHS[secId];
          if (!ref) return null;
          return (
            <Path
              key={secId}
              d={ref.d}
              fill="none"
              stroke={ref.color}
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.15}
            />
          );
        })}

        {/* Active feature paths for this option */}
        {option.featurePaths.map((fp, i) => (
          <Path
            key={i}
            d={fp.d}
            fill={fp.fill || 'none'}
            stroke={fp.stroke || sectionColor}
            strokeWidth={fp.fill ? 0 : 2.5}
            strokeLinecap="round"
            opacity={fp.opacity ?? 0.9}
          />
        ))}
      </Svg>

      {/* Label */}
      <Text
        style={[
          styles.label,
          isSelected && { color: sectionColor, fontWeight: '700' },
        ]}
        numberOfLines={2}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_W,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  svg: {
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 6,
    textTransform: 'uppercase',
  },
});
