export type ReadingMode = 'palm' | 'face' | 'numerology';
export type Gender = 'male' | 'female';

export interface ReadingResult {
  overall: string;
  love: string;
  career: string;
  health: string;
  personality: string;
  future: string;
}

export interface ReadingResponse {
  success: boolean;
  reading?: ReadingResult;
  error?: string;
}
