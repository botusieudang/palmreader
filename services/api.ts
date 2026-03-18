import type { ReadingMode, ReadingResponse } from '../types/reading';
import type { QuizAnswers } from '../types/palmQuiz';
import { generateReading, generateReadingFromQuiz, generateFaceReadingFromQuiz } from './readings';

export async function getReading(
  mode: ReadingMode,
  imageBase64: string,
): Promise<ReadingResponse> {
  // Fake processing delay (2-4s) to feel like real analysis
  const delay = 2000 + Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const reading = generateReading(imageBase64, mode);
    return { success: true, reading };
  } catch (e: any) {
    return { success: false, error: e.message || 'Không thể phân tích. Vui lòng thử lại.' };
  }
}

export async function getQuizReading(
  answers: QuizAnswers,
): Promise<ReadingResponse> {
  // Shorter delay for quiz-based analysis
  const delay = 1500 + Math.random() * 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const reading = generateReadingFromQuiz(answers);
    return { success: true, reading };
  } catch (e: any) {
    return { success: false, error: e.message || 'Khong the phan tich. Vui long thu lai.' };
  }
}

export async function getFaceQuizReading(
  answers: QuizAnswers,
): Promise<ReadingResponse> {
  const delay = 1500 + Math.random() * 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const reading = generateFaceReadingFromQuiz(answers);
    return { success: true, reading };
  } catch (e: any) {
    return { success: false, error: e.message || 'Khong the phan tich. Vui long thu lai.' };
  }
}
