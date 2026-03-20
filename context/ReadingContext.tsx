import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ReadingMode, ReadingResult, Gender } from '../types/reading';

interface ReadingState {
  mode: ReadingMode;
  gender: Gender | null;
  imageBase64: string | null;
  imageUri: string | null;
  result: ReadingResult | null;
  setMode: (mode: ReadingMode) => void;
  setGender: (gender: Gender) => void;
  setImage: (base64: string, uri: string) => void;
  setResult: (result: ReadingResult | null) => void;
  clear: () => void;
}

const ReadingContext = createContext<ReadingState | null>(null);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ReadingMode>('palm');
  const [gender, setGender] = useState<Gender | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<ReadingResult | null>(null);

  const setImage = (base64: string, uri: string) => {
    setImageBase64(base64);
    setImageUri(uri);
  };

  const clear = () => {
    setGender(null);
    setImageBase64(null);
    setImageUri(null);
    setResult(null);
  };

  return (
    <ReadingContext.Provider
      value={{
        mode, gender, imageBase64, imageUri, result,
        setMode, setGender, setImage, setResult, clear,
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
