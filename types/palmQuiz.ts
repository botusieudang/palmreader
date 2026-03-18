export type PalmLineSectionId = 'heart' | 'head' | 'life' | 'fate';

export interface PalmLineSection {
  id: PalmLineSectionId;
  nameVi: string;
  subtitle: string;
  color: string;
  icon: string;
  questionCount: number;
}

export interface QuizLinePath {
  d: string;
  strokeDasharray?: string;
  opacity?: number;
  color?: string;
}

export interface QuizOption {
  id: string;
  label: string;
  linePaths: QuizLinePath[];
}

export interface QuizQuestion {
  id: string;
  sectionId: PalmLineSectionId;
  questionText: string;
  options: QuizOption[];
}

export interface AnswerInterpretation {
  trait: string;
  loveImpact?: string;
  careerImpact?: string;
  healthImpact?: string;
  personalityImpact?: string;
}

// Key = questionId, Value = selected optionId
export type QuizAnswers = Record<string, string>;
