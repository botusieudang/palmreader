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
import { useReading } from '../context/ReadingContext';
import { Colors } from '../constants/theme';
import { FACE_SECTIONS, FACE_QUIZ_QUESTIONS } from '../constants/faceQuizData';
import FaceSectionSelector from '../components/FaceSectionSelector';
import FaceQuiz from '../components/FaceQuiz';
import { getFaceQuizReading } from '../services/api';
import type { FaceSectionId } from '../types/faceQuiz';
import type { QuizAnswers } from '../types/palmQuiz';

export default function FaceQuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setQuizAnswers, setResult } = useReading();

  const [activeSectionId, setActiveSectionId] = useState<FaceSectionId>('face_shape');
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [questionIndexOverride, setQuestionIndexOverride] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Questions for active section
  const sectionQuestions = useMemo(
    () => FACE_QUIZ_QUESTIONS.filter((q) => q.sectionId === activeSectionId),
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
  const activeSection = FACE_SECTIONS.find((s) => s.id === activeSectionId)!;

  // Answered counts per section
  const answeredCounts = useMemo(
    () => ({
      face_shape: FACE_QUIZ_QUESTIONS.filter((q) => q.sectionId === 'face_shape' && answers[q.id]).length,
      eyes_brows: FACE_QUIZ_QUESTIONS.filter((q) => q.sectionId === 'eyes_brows' && answers[q.id]).length,
      nose_ears: FACE_QUIZ_QUESTIONS.filter((q) => q.sectionId === 'nose_ears' && answers[q.id]).length,
      mouth_chin: FACE_QUIZ_QUESTIONS.filter((q) => q.sectionId === 'mouth_chin' && answers[q.id]).length,
    }),
    [answers],
  );

  const totalAnswered = answeredCounts.face_shape + answeredCounts.eyes_brows + answeredCounts.nose_ears + answeredCounts.mouth_chin;
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
      const sectionOrder: FaceSectionId[] = ['face_shape', 'eyes_brows', 'nose_ears', 'mouth_chin'];
      const currentIdx = sectionOrder.indexOf(activeSectionId);
      for (let offset = 1; offset <= 3; offset++) {
        const nextSec = sectionOrder[(currentIdx + offset) % 4];
        const hasUnanswered = FACE_QUIZ_QUESTIONS.some(
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
      const response = await getFaceQuizReading(answers);
      if (response.success && response.reading) {
        setResult(response.reading);
        router.push('/result');
      }
    } catch (e) {
      console.warn('Face quiz result error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xem Tướng Mặt</Text>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{totalAnswered}/16</Text>
        </View>
      </View>

      {/* Section tabs */}
      <FaceSectionSelector
        sections={FACE_SECTIONS}
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
          <FaceQuiz
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
          <TouchableOpacity
            onPress={handleViewResults}
            disabled={loading}
            style={styles.ctaBtn}
          >
            <LinearGradient
              colors={['#db2777', '#ec4899']}
              style={styles.ctaGradient}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="eye" size={20} color="#fff" />
                  <Text style={styles.ctaText}>XEM KẾT QUẢ</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(219,39,119,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: '#ec4899',
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
