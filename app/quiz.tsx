import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { useReading } from '../context/ReadingContext';
import { Colors } from '../constants/theme';
import { PALM_LINE_SECTIONS, QUIZ_QUESTIONS } from '../constants/palmQuizData';
import PalmLineSelector from '../components/PalmLineSelector';
import PalmQuiz from '../components/PalmQuiz';
import { getQuizReading } from '../services/api';
import type { PalmLineSectionId, QuizAnswers } from '../types/palmQuiz';

export default function QuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setQuizAnswers, setResult } = useReading();

  const [activeSectionId, setActiveSectionId] = useState<PalmLineSectionId>('heart');
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [questionIndexOverride, setQuestionIndexOverride] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Questions for active section
  const sectionQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter((q) => q.sectionId === activeSectionId),
    [activeSectionId],
  );

  // Find first unanswered in this section
  const firstUnansweredIndex = useMemo(() => {
    const idx = sectionQuestions.findIndex((q) => !answers[q.id]);
    return idx >= 0 ? idx : 0;
  }, [sectionQuestions, answers]);

  const questionIndex = questionIndexOverride ?? firstUnansweredIndex;
  const currentQuestion = sectionQuestions[questionIndex];

  // Active section metadata
  const activeSection = PALM_LINE_SECTIONS.find((s) => s.id === activeSectionId)!;

  // Answered counts per section
  const answeredCounts = useMemo(
    () => ({
      heart: QUIZ_QUESTIONS.filter((q) => q.sectionId === 'heart' && answers[q.id]).length,
      head: QUIZ_QUESTIONS.filter((q) => q.sectionId === 'head' && answers[q.id]).length,
      life: QUIZ_QUESTIONS.filter((q) => q.sectionId === 'life' && answers[q.id]).length,
      fate: QUIZ_QUESTIONS.filter((q) => q.sectionId === 'fate' && answers[q.id]).length,
    }),
    [answers],
  );

  const totalAnswered = answeredCounts.heart + answeredCounts.head + answeredCounts.life + answeredCounts.fate;
  const allAnswered = totalAnswered === 16;

  const handleSelectOption = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);
    setQuestionIndexOverride(null);

    // Auto-advance after short delay
    setTimeout(() => {
      // Next unanswered in this section
      const nextInSection = sectionQuestions.findIndex(
        (q, i) => i > questionIndex && !newAnswers[q.id],
      );
      if (nextInSection >= 0) {
        setQuestionIndexOverride(nextInSection);
        return;
      }

      // Section complete → find next incomplete section
      const sectionOrder: PalmLineSectionId[] = ['heart', 'head', 'life', 'fate'];
      const currentIdx = sectionOrder.indexOf(activeSectionId);
      for (let offset = 1; offset <= 3; offset++) {
        const nextSec = sectionOrder[(currentIdx + offset) % 4];
        const hasUnanswered = QUIZ_QUESTIONS.some(
          (q) => q.sectionId === nextSec && !newAnswers[q.id],
        );
        if (hasUnanswered) {
          setActiveSectionId(nextSec);
          setQuestionIndexOverride(null);
          return;
        }
      }
      // All done, stay
    }, 400);
  };

  const handleViewResults = async () => {
    setLoading(true);
    setQuizAnswers(answers);
    try {
      const response = await getQuizReading(answers);
      if (response.success && response.reading) {
        setResult(response.reading);
        router.push('/result');
      }
    } catch (e) {
      console.warn('Quiz result error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xem Chỉ Tay</Text>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{totalAnswered}/16</Text>
        </View>
      </Animated.View>

      {/* Section tabs */}
      <PalmLineSelector
        sections={PALM_LINE_SECTIONS}
        activeSection={activeSectionId}
        answeredCounts={answeredCounts}
        onSelectSection={(id) => {
          setActiveSectionId(id);
          setQuestionIndexOverride(null);
        }}
      />

      {/* Question dots navigation */}
      <View style={styles.dotsRow}>
        {sectionQuestions.map((q, i) => (
          <TouchableOpacity
            key={q.id}
            onPress={() => setQuestionIndexOverride(i)}
            hitSlop={8}
          >
            <View
              style={[
                styles.dot,
                i === questionIndex && { borderColor: activeSection.color, borderWidth: 2 },
                answers[q.id] && { backgroundColor: activeSection.color },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quiz content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {currentQuestion && (
          <PalmQuiz
            question={currentQuestion}
            questionIndex={questionIndex}
            totalQuestions={sectionQuestions.length}
            sectionColor={activeSection.color}
            sectionId={activeSectionId}
            selectedOptionId={answers[currentQuestion.id] || null}
            onSelectOption={handleSelectOption}
          />
        )}
      </ScrollView>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        {allAnswered ? (
          <Animated.View entering={FadeInDown.duration(500).springify().damping(18)}>
            <TouchableOpacity
              onPress={handleViewResults}
              disabled={loading}
              activeOpacity={0.85}
              style={styles.ctaBtn}
            >
              <LinearGradient
                colors={['#7c3aed', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Ionicons name="sparkles" size={20} color="#fff" />
                    <Text style={styles.ctaText}>XEM KẾT QUẢ</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Text style={styles.progressHint}>
            Trả lời {16 - totalAnswered} câu hỏi còn lại để xem kết quả
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  counterBadge: {
    backgroundColor: 'rgba(139,92,246,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: Colors.purpleLight ?? '#a78bfa',
    fontSize: 13,
    fontWeight: '700',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ctaBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  progressHint: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 13,
    paddingVertical: 8,
  },
});
