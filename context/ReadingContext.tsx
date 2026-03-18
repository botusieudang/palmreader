import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ReadingMode, ReadingResult, Gender } from '../types/reading';
import type { QuizAnswers } from '../types/palmQuiz';

interface ReadingState {
  mode: ReadingMode;
  gender: Gender | null;
  imageBase64: string | null;
  imageUri: string | null;
  result: ReadingResult | null;
  quizAnswers: QuizAnswers | null;
  setMode: (mode: ReadingMode) => void;
  setGender: (gender: Gender) => void;
  setImage: (base64: string, uri: string) => void;
  setResult: (result: ReadingResult | null) => void;
  setQuizAnswers: (answers: QuizAnswers) => void;
  clear: () => void;
}

const ReadingContext = createContext<ReadingState | null>(null);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ReadingMode>('palm');
  const [gender, setGender] = useState<Gender | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [quizAnswers, setQuizAnswersState] = useState<QuizAnswers | null>(null);

  const setImage = (base64: string, uri: string) => {
    setImageBase64(base64);
    setImageUri(uri);
  };

  const setQuizAnswers = (answers: QuizAnswers) => {
    setQuizAnswersState(answers);
  };

  const clear = () => {
    setGender(null);
    setImageBase64(null);
    setImageUri(null);
    setResult(null);
    setQuizAnswersState(null);
  };

  return (
    <ReadingContext.Provider
      value={{
        mode, gender, imageBase64, imageUri, result, quizAnswers,
        setMode, setGender, setImage, setResult, setQuizAnswers, clear,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}

export function useReading() {
  const ctx = useContext(ReadingContext);
  if (!ctx) throw new Error('useReading must be used within ReadingProvider');
  return ctx;
}
