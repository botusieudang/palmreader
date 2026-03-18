export type FaceSectionId = 'face_shape' | 'eyes_brows' | 'nose_ears' | 'mouth_chin';

export interface FaceSection {
  id: FaceSectionId;
  nameVi: string;
  subtitle: string;
  color: string;
  icon: string;
  questionCount: number;
}

export interface FaceFeaturePath {
  d: string;
  fill?: string;
  stroke?: string;
  opacity?: number;
}

export interface FaceQuizOption {
  id: string;
  label: string;
  featurePaths: FaceFeaturePath[];
}

export interface FaceQuizQuestion {
  id: string;
  sectionId: FaceSectionId;
  questionText: string;
  options: FaceQuizOption[];
}

export interface FaceAnswerInterpretation {
  trait: string;
  loveImpact?: string;
  careerImpact?: string;
  healthImpact?: string;
  personalityImpact?: string;
}

// Reuse QuizAnswers from palmQuiz.ts — it's already generic Record<string, string>
