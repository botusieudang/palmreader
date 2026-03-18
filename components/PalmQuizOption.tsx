import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BASE_HAND_PATH, REFERENCE_LINE_PATHS } from '../constants/palmQuizData';
import type { QuizOption, PalmLineSectionId } from '../types/palmQuiz';
import { Colors } from '../constants/theme';

const CARD_W = (Dimensions.get('window').width - 60) / 2;
const SVG_H = CARD_W * 0.95;

const ALL_SECTIONS: PalmLineSectionId[] = ['heart', 'head', 'life', 'fate'];

interface Props {
  option: QuizOption;
  sectionColor: string;
  sectionId: PalmLineSectionId;
  isSelected: boolean;
  index: number;
  onSelect: () => void;
}

export default function PalmQuizOption({
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
        viewBox="0 0 300 400"
        style={styles.svg}
      >
        {/* Hand outline background */}
        <Path
          d={BASE_HAND_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1.5}
        />

        {/* Dimmed reference lines for OTHER sections */}
        {dimmedSections.map((secId) => {
          const ref = REFERENCE_LINE_PATHS[secId];
          return (
            <Path
              key={secId}
              d={ref.d}
              fill="none"
              stroke={ref.color}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.15}
            />
          );
        })}

        {/* Active palm line(s) for this option */}
        {option.linePaths.map((lp, i) => (
          <Path
            key={i}
            d={lp.d}
            fill="none"
            stroke={lp.color ?? sectionColor}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeDasharray={lp.strokeDasharray}
            opacity={lp.opacity ?? 0.9}
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
