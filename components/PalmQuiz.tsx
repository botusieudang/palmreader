import { View, Text, StyleSheet } from 'react-native';
import PalmQuizOption from './PalmQuizOption';
import type { QuizQuestion, PalmLineSectionId } from '../types/palmQuiz';
import { Colors } from '../constants/theme';

interface Props {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  sectionColor: string;
  sectionId: PalmLineSectionId;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
}

export default function PalmQuiz({
  question,
  questionIndex,
  totalQuestions,
  sectionColor,
  sectionId,
  selectedOptionId,
  onSelectOption,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Question number badge */}
      <View style={[styles.qBadge, { backgroundColor: `${sectionColor}30` }]}>
        <Text style={[styles.qBadgeText, { color: sectionColor }]}>
          Câu {questionIndex + 1}/{totalQuestions}
        </Text>
      </View>

      {/* Question text */}
      <Text style={styles.questionText}>{question.questionText}</Text>

      <Text style={styles.hint}>Lưu ý: Bắt buộc</Text>

      {/* Options grid 2x2 */}
      <View style={styles.grid}>
        {question.options.map((opt, i) => (
          <PalmQuizOption
            key={opt.id}
            option={opt}
            sectionColor={sectionColor}
            sectionId={sectionId}
            isSelected={selectedOptionId === opt.id}
            index={i}
            onSelect={() => onSelectOption(opt.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  qBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
  },
  qBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 24,
  },
  hint: {
    fontSize: 11,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
});
