import type {
  FaceSection,
  FaceQuizQuestion,
  FaceAnswerInterpretation,
} from '../types/faceQuiz';

// Base face outline SVG path (viewBox 0 0 200 280)
export const BASE_FACE_PATH = `
M 100 30
Q 140 30 160 60
Q 178 90 178 130
Q 178 170 165 200
Q 155 225 140 245
Q 120 265 100 270
Q 80 265 60 245
Q 45 225 35 200
Q 22 170 22 130
Q 22 90 40 60
Q 60 30 100 30
Z`;

// Ears outline (always shown dimmed)
export const EAR_LEFT_PATH = 'M 22 115 Q 12 120 10 135 Q 9 150 14 160 Q 18 168 22 165';
export const EAR_RIGHT_PATH = 'M 178 115 Q 188 120 190 135 Q 191 150 186 160 Q 182 168 178 165';

// Reference feature paths for dimmed display per section
export const REFERENCE_FEATURE_PATHS: Record<string, { d: string; color: string }> = {
  face_shape: {
    d: 'M 55 55 Q 100 48 145 55',
    color: '#E8A838',
  },
  eyes_brows: {
    d: 'M 60 120 Q 75 115 90 120 M 110 120 Q 125 115 140 120',
    color: '#4A90D9',
  },
  nose_ears: {
    d: 'M 100 135 L 100 170 Q 92 178 88 175 M 100 170 Q 108 178 112 175',
    color: '#4CAF50',
  },
  mouth_chin: {
    d: 'M 75 210 Q 100 225 125 210',
    color: '#FF6B8A',
  },
};

// ============================================================
// 4 Sections
// ============================================================
export const FACE_SECTIONS: FaceSection[] = [
  {
    id: 'face_shape',
    nameVi: 'Khuôn Mặt',
    subtitle: 'Tam Đình Thượng',
    color: '#E8A838',
    icon: 'scan',
    questionCount: 4,
  },
  {
    id: 'eyes_brows',
    nameVi: 'Mắt & Mày',
    subtitle: 'Cửa Sổ Tâm Hồn',
    color: '#4A90D9',
    icon: 'eye',
    questionCount: 4,
  },
  {
    id: 'nose_ears',
    nameVi: 'Mũi & Tai',
    subtitle: 'Tài Lộc Phúc Đức',
    color: '#4CAF50',
    icon: 'ear',
    questionCount: 4,
  },
  {
    id: 'mouth_chin',
    nameVi: 'Miệng & Cằm',
    subtitle: 'Phúc & Hậu Vận',
    color: '#FF6B8A',
    icon: 'happy',
    questionCount: 4,
  },
];

// ============================================================
// 16 Questions (4 per section)
// ============================================================
export const FACE_QUIZ_QUESTIONS: FaceQuizQuestion[] = [
  // ==================== KHUON MAT & TRAN ====================
  {
    id: 'face_q1',
    sectionId: 'face_shape',
    questionText: 'Khuôn mặt bạn thuộc hình gì?',
    options: [
      {
        id: 'face_q1_a',
        label: 'Tròn',
        featurePaths: [
          { d: 'M 100 40 Q 155 40 170 100 Q 175 160 160 210 Q 140 255 100 262 Q 60 255 40 210 Q 25 160 30 100 Q 45 40 100 40 Z', fill: 'rgba(232,168,56,0.12)' },
        ],
      },
      {
        id: 'face_q1_b',
        label: 'Trái xoan',
        featurePaths: [
          { d: 'M 100 35 Q 150 38 165 90 Q 175 145 160 200 Q 145 245 100 265 Q 55 245 40 200 Q 25 145 35 90 Q 50 38 100 35 Z', fill: 'rgba(232,168,56,0.12)' },
        ],
      },
      {
        id: 'face_q1_c',
        label: 'Vuông',
        featurePaths: [
          { d: 'M 45 45 L 155 45 Q 172 48 175 65 L 175 200 Q 172 248 155 250 L 45 250 Q 28 248 25 200 L 25 65 Q 28 48 45 45 Z', fill: 'rgba(232,168,56,0.12)' },
        ],
      },
      {
        id: 'face_q1_d',
        label: 'Trái tim',
        featurePaths: [
          { d: 'M 100 35 Q 155 35 172 80 Q 178 130 165 180 Q 145 230 100 268 Q 55 230 35 180 Q 22 130 28 80 Q 45 35 100 35 Z', fill: 'rgba(232,168,56,0.12)' },
        ],
      },
    ],
  },
  {
    id: 'face_q2',
    sectionId: 'face_shape',
    questionText: 'Trán bạn cao hay thấp?',
    options: [
      {
        id: 'face_q2_a',
        label: 'Cao rộng',
        featurePaths: [
          { d: 'M 42 90 Q 50 42 100 35 Q 150 42 158 90', fill: 'rgba(232,168,56,0.15)' },
        ],
      },
      {
        id: 'face_q2_b',
        label: 'Trung bình',
        featurePaths: [
          { d: 'M 48 80 Q 55 52 100 48 Q 145 52 152 80', fill: 'rgba(232,168,56,0.15)' },
        ],
      },
      {
        id: 'face_q2_c',
        label: 'Thấp hẹp',
        featurePaths: [
          { d: 'M 55 72 Q 62 55 100 52 Q 138 55 145 72', fill: 'rgba(232,168,56,0.15)' },
        ],
      },
      {
        id: 'face_q2_d',
        label: 'Rộng nhưng thấp',
        featurePaths: [
          { d: 'M 38 75 Q 48 55 100 50 Q 152 55 162 75', fill: 'rgba(232,168,56,0.15)' },
        ],
      },
    ],
  },
  {
    id: 'face_q3',
    sectionId: 'face_shape',
    questionText: 'Đường chân tóc như thế nào?',
    options: [
      {
        id: 'face_q3_a',
        label: 'Thẳng đều',
        featurePaths: [
          { d: 'M 45 55 L 155 55' },
        ],
      },
      {
        id: 'face_q3_b',
        label: 'Hình chữ M',
        featurePaths: [
          { d: 'M 40 55 Q 55 48 70 58 Q 85 68 100 50 Q 115 68 130 58 Q 145 48 160 55' },
        ],
      },
      {
        id: 'face_q3_c',
        label: 'Vòng cung',
        featurePaths: [
          { d: 'M 42 62 Q 70 42 100 38 Q 130 42 158 62' },
        ],
      },
      {
        id: 'face_q3_d',
        label: 'Không đều',
        featurePaths: [
          { d: 'M 42 58 Q 60 50 75 60 Q 90 52 100 48 Q 120 55 140 50 Q 150 56 158 60' },
        ],
      },
    ],
  },
  {
    id: 'face_q4',
    sectionId: 'face_shape',
    questionText: 'Trán có đặc điểm gì?',
    options: [
      {
        id: 'face_q4_a',
        label: 'Mịn sáng',
        featurePaths: [
          { d: 'M 50 60 Q 100 50 150 60 L 150 88 Q 100 82 50 88 Z', fill: 'rgba(232,168,56,0.1)' },
        ],
      },
      {
        id: 'face_q4_b',
        label: 'Có nếp nhăn',
        featurePaths: [
          { d: 'M 60 62 Q 100 60 140 62 M 58 72 Q 100 70 142 72 M 62 82 Q 100 80 138 82' },
        ],
      },
      {
        id: 'face_q4_c',
        label: 'Hơi lõm',
        featurePaths: [
          { d: 'M 50 60 Q 100 72 150 60 L 150 88 Q 100 80 50 88 Z', fill: 'rgba(232,168,56,0.1)' },
        ],
      },
      {
        id: 'face_q4_d',
        label: 'Phẳng',
        featurePaths: [
          { d: 'M 50 60 L 150 60 L 150 88 L 50 88 Z', fill: 'rgba(232,168,56,0.1)' },
        ],
      },
    ],
  },

  // ==================== MAT & LONG MAY ====================
  {
    id: 'eyes_q1',
    sectionId: 'eyes_brows',
    questionText: 'Hình dạng mắt bạn?',
    options: [
      {
        id: 'eyes_q1_a',
        label: 'Tròn to',
        featurePaths: [
          { d: 'M 60 125 Q 75 112 90 125 Q 75 138 60 125 Z' },
          { d: 'M 110 125 Q 125 112 140 125 Q 125 138 110 125 Z' },
        ],
      },
      {
        id: 'eyes_q1_b',
        label: 'Dài hạnh nhân',
        featurePaths: [
          { d: 'M 55 125 Q 75 116 92 125 Q 75 132 55 125 Z' },
          { d: 'M 108 125 Q 125 116 145 125 Q 125 132 108 125 Z' },
        ],
      },
      {
        id: 'eyes_q1_c',
        label: 'Một mí',
        featurePaths: [
          { d: 'M 58 126 L 90 122 Q 78 132 58 126 Z' },
          { d: 'M 110 122 L 142 126 Q 122 132 110 122 Z' },
        ],
      },
      {
        id: 'eyes_q1_d',
        label: 'Hai mí',
        featurePaths: [
          { d: 'M 58 125 Q 75 115 90 125 Q 75 135 58 125 Z' },
          { d: 'M 62 120 Q 75 114 88 120', opacity: 0.5 },
          { d: 'M 110 125 Q 125 115 142 125 Q 125 135 110 125 Z' },
          { d: 'M 112 120 Q 125 114 140 120', opacity: 0.5 },
        ],
      },
    ],
  },
  {
    id: 'eyes_q2',
    sectionId: 'eyes_brows',
    questionText: 'Lông mày bạn như thế nào?',
    options: [
      {
        id: 'eyes_q2_a',
        label: 'Dày thẳng',
        featurePaths: [
          { d: 'M 52 104 L 92 100 L 92 106 L 52 108 Z', fill: 'rgba(74,144,217,0.4)' },
          { d: 'M 108 100 L 148 104 L 148 108 L 108 106 Z', fill: 'rgba(74,144,217,0.4)' },
        ],
      },
      {
        id: 'eyes_q2_b',
        label: 'Cong',
        featurePaths: [
          { d: 'M 52 108 Q 72 96 92 106' },
          { d: 'M 108 106 Q 128 96 148 108' },
        ],
      },
      {
        id: 'eyes_q2_c',
        label: 'Mỏng',
        featurePaths: [
          { d: 'M 54 106 Q 72 102 90 106', opacity: 0.5 },
          { d: 'M 110 106 Q 128 102 146 106', opacity: 0.5 },
        ],
      },
      {
        id: 'eyes_q2_d',
        label: 'Xếch lên',
        featurePaths: [
          { d: 'M 55 110 Q 72 104 90 98' },
          { d: 'M 110 98 Q 128 104 145 110' },
        ],
      },
    ],
  },
  {
    id: 'eyes_q3',
    sectionId: 'eyes_brows',
    questionText: 'Khoảng cách giữa hai mắt?',
    options: [
      {
        id: 'eyes_q3_a',
        label: 'Rộng',
        featurePaths: [
          { d: 'M 48 125 Q 65 115 80 125 Q 65 135 48 125 Z' },
          { d: 'M 120 125 Q 135 115 152 125 Q 135 135 120 125 Z' },
        ],
      },
      {
        id: 'eyes_q3_b',
        label: 'Trung bình',
        featurePaths: [
          { d: 'M 55 125 Q 72 115 88 125 Q 72 135 55 125 Z' },
          { d: 'M 112 125 Q 128 115 145 125 Q 128 135 112 125 Z' },
        ],
      },
      {
        id: 'eyes_q3_c',
        label: 'Hẹp',
        featurePaths: [
          { d: 'M 62 125 Q 76 116 92 125 Q 76 134 62 125 Z' },
          { d: 'M 108 125 Q 124 116 138 125 Q 124 134 108 125 Z' },
        ],
      },
      {
        id: 'eyes_q3_d',
        label: 'Rất rộng',
        featurePaths: [
          { d: 'M 40 125 Q 55 116 68 125 Q 55 134 40 125 Z' },
          { d: 'M 132 125 Q 145 116 160 125 Q 145 134 132 125 Z' },
        ],
      },
    ],
  },
  {
    id: 'eyes_q4',
    sectionId: 'eyes_brows',
    questionText: 'Ánh mắt bạn thuộc dạng nào?',
    options: [
      {
        id: 'eyes_q4_a',
        label: 'Sáng lanh lợi',
        featurePaths: [
          { d: 'M 58 125 Q 75 114 90 125 Q 75 136 58 125 Z' },
          { d: 'M 72 122 L 78 122 L 78 128 L 72 128 Z', fill: 'rgba(74,144,217,0.6)' },
          { d: 'M 110 125 Q 125 114 142 125 Q 125 136 110 125 Z' },
          { d: 'M 124 122 L 130 122 L 130 128 L 124 128 Z', fill: 'rgba(74,144,217,0.6)' },
        ],
      },
      {
        id: 'eyes_q4_b',
        label: 'Dịu dàng',
        featurePaths: [
          { d: 'M 58 126 Q 75 118 90 126 Q 75 134 58 126 Z' },
          { d: 'M 110 126 Q 125 118 142 126 Q 125 134 110 126 Z' },
        ],
      },
      {
        id: 'eyes_q4_c',
        label: 'Sâu thẳm',
        featurePaths: [
          { d: 'M 60 125 Q 75 117 88 125 Q 75 133 60 125 Z', fill: 'rgba(74,144,217,0.15)' },
          { d: 'M 112 125 Q 125 117 140 125 Q 125 133 112 125 Z', fill: 'rgba(74,144,217,0.15)' },
        ],
      },
      {
        id: 'eyes_q4_d',
        label: 'Nhỏ tinh anh',
        featurePaths: [
          { d: 'M 64 125 Q 75 120 86 125 Q 75 130 64 125 Z' },
          { d: 'M 114 125 Q 125 120 136 125 Q 125 130 114 125 Z' },
        ],
      },
    ],
  },

  // ==================== MUI & TAI ====================
  {
    id: 'nose_q1',
    sectionId: 'nose_ears',
    questionText: 'Sống mũi bạn như thế nào?',
    options: [
      {
        id: 'nose_q1_a',
        label: 'Thẳng cao',
        featurePaths: [
          { d: 'M 100 108 L 100 168 M 92 172 Q 100 180 108 172' },
        ],
      },
      {
        id: 'nose_q1_b',
        label: 'Hơi cong',
        featurePaths: [
          { d: 'M 100 108 Q 104 140 100 168 M 92 172 Q 100 180 108 172' },
        ],
      },
      {
        id: 'nose_q1_c',
        label: 'Thấp',
        featurePaths: [
          { d: 'M 100 115 L 100 168 M 92 172 Q 100 178 108 172', opacity: 0.5 },
        ],
      },
      {
        id: 'nose_q1_d',
        label: 'Rộng',
        featurePaths: [
          { d: 'M 98 108 L 96 168 M 86 174 Q 96 182 100 175 Q 104 182 114 174 L 104 168 L 102 108' },
        ],
      },
    ],
  },
  {
    id: 'nose_q2',
    sectionId: 'nose_ears',
    questionText: 'Đầu mũi bạn?',
    options: [
      {
        id: 'nose_q2_a',
        label: 'Tròn đầy',
        featurePaths: [
          { d: 'M 100 140 L 100 165 M 88 170 Q 94 180 100 176 Q 106 180 112 170', fill: 'rgba(76,175,80,0.15)' },
          { d: 'M 90 172 Q 100 182 110 172', fill: 'rgba(76,175,80,0.2)' },
        ],
      },
      {
        id: 'nose_q2_b',
        label: 'Nhọn',
        featurePaths: [
          { d: 'M 100 140 L 100 175 M 94 172 Q 100 178 106 172' },
        ],
      },
      {
        id: 'nose_q2_c',
        label: 'Hơi hếch',
        featurePaths: [
          { d: 'M 100 140 L 100 162 Q 96 170 92 168 M 100 162 Q 104 170 108 168' },
        ],
      },
      {
        id: 'nose_q2_d',
        label: 'Rộng bầu',
        featurePaths: [
          { d: 'M 100 140 L 100 168 M 84 174 Q 92 184 100 178 Q 108 184 116 174' },
        ],
      },
    ],
  },
  {
    id: 'nose_q3',
    sectionId: 'nose_ears',
    questionText: 'Tai bạn như thế nào?',
    options: [
      {
        id: 'nose_q3_a',
        label: 'Lớn dày',
        featurePaths: [
          { d: 'M 22 108 Q 6 118 4 140 Q 3 162 10 172 Q 18 180 22 172' },
          { d: 'M 178 108 Q 194 118 196 140 Q 197 162 190 172 Q 182 180 178 172' },
        ],
      },
      {
        id: 'nose_q3_b',
        label: 'Trung bình',
        featurePaths: [
          { d: 'M 22 115 Q 12 120 10 135 Q 9 150 14 160 Q 18 168 22 165' },
          { d: 'M 178 115 Q 188 120 190 135 Q 191 150 186 160 Q 182 168 178 165' },
        ],
      },
      {
        id: 'nose_q3_c',
        label: 'Nhỏ',
        featurePaths: [
          { d: 'M 22 120 Q 15 125 14 135 Q 13 145 17 152 Q 20 156 22 155' },
          { d: 'M 178 120 Q 185 125 186 135 Q 187 145 183 152 Q 180 156 178 155' },
        ],
      },
      {
        id: 'nose_q3_d',
        label: 'Vểnh ra ngoài',
        featurePaths: [
          { d: 'M 22 110 Q 2 118 0 140 Q 0 162 8 172 Q 16 178 22 170' },
          { d: 'M 178 110 Q 198 118 200 140 Q 200 162 192 172 Q 184 178 178 170' },
        ],
      },
    ],
  },
  {
    id: 'nose_q4',
    sectionId: 'nose_ears',
    questionText: 'Dái tai bạn?',
    options: [
      {
        id: 'nose_q4_a',
        label: 'Dày và tròn',
        featurePaths: [
          { d: 'M 22 155 Q 14 162 12 172 Q 14 182 22 178' },
          { d: 'M 178 155 Q 186 162 188 172 Q 186 182 178 178' },
        ],
      },
      {
        id: 'nose_q4_b',
        label: 'Mỏng và nhỏ',
        featurePaths: [
          { d: 'M 22 158 Q 18 162 17 168 Q 18 172 22 170' },
          { d: 'M 178 158 Q 182 162 183 168 Q 182 172 178 170' },
        ],
      },
      {
        id: 'nose_q4_c',
        label: 'Dính tai',
        featurePaths: [
          { d: 'M 22 158 L 20 164 L 22 166' },
          { d: 'M 178 158 L 180 164 L 178 166' },
        ],
      },
      {
        id: 'nose_q4_d',
        label: 'Trung bình',
        featurePaths: [
          { d: 'M 22 156 Q 16 162 15 170 Q 17 176 22 174' },
          { d: 'M 178 156 Q 184 162 185 170 Q 183 176 178 174' },
        ],
      },
    ],
  },

  // ==================== MIENG & CAM ====================
  {
    id: 'mouth_q1',
    sectionId: 'mouth_chin',
    questionText: 'Hình dạng môi bạn?',
    options: [
      {
        id: 'mouth_q1_a',
        label: 'Dày dặn',
        featurePaths: [
          { d: 'M 78 207 Q 90 200 100 202 Q 110 200 122 207' },
          { d: 'M 78 207 Q 90 218 100 220 Q 110 218 122 207' },
        ],
      },
      {
        id: 'mouth_q1_b',
        label: 'Mỏng',
        featurePaths: [
          { d: 'M 80 210 Q 90 206 100 207 Q 110 206 120 210' },
          { d: 'M 80 210 Q 90 214 100 215 Q 110 214 120 210' },
        ],
      },
      {
        id: 'mouth_q1_c',
        label: 'Trên mỏng dưới dày',
        featurePaths: [
          { d: 'M 80 208 Q 90 205 100 206 Q 110 205 120 208' },
          { d: 'M 80 208 Q 90 218 100 220 Q 110 218 120 208' },
        ],
      },
      {
        id: 'mouth_q1_d',
        label: 'Đều cân đối',
        featurePaths: [
          { d: 'M 78 210 Q 90 204 100 205 Q 110 204 122 210' },
          { d: 'M 78 210 Q 90 216 100 217 Q 110 216 122 210' },
        ],
      },
    ],
  },
  {
    id: 'mouth_q2',
    sectionId: 'mouth_chin',
    questionText: 'Kích thước miệng?',
    options: [
      {
        id: 'mouth_q2_a',
        label: 'Rộng',
        featurePaths: [
          { d: 'M 68 210 Q 85 204 100 205 Q 115 204 132 210 Q 115 216 100 217 Q 85 216 68 210 Z' },
        ],
      },
      {
        id: 'mouth_q2_b',
        label: 'Trung bình',
        featurePaths: [
          { d: 'M 78 210 Q 90 205 100 206 Q 110 205 122 210 Q 110 215 100 216 Q 90 215 78 210 Z' },
        ],
      },
      {
        id: 'mouth_q2_c',
        label: 'Nhỏ',
        featurePaths: [
          { d: 'M 85 210 Q 93 206 100 207 Q 107 206 115 210 Q 107 214 100 215 Q 93 214 85 210 Z' },
        ],
      },
      {
        id: 'mouth_q2_d',
        label: 'Rộng vừa',
        featurePaths: [
          { d: 'M 74 210 Q 88 205 100 206 Q 112 205 126 210 Q 112 215 100 216 Q 88 215 74 210 Z' },
        ],
      },
    ],
  },
  {
    id: 'mouth_q3',
    sectionId: 'mouth_chin',
    questionText: 'Cằm bạn thuộc dạng nào?',
    options: [
      {
        id: 'mouth_q3_a',
        label: 'Vuông',
        featurePaths: [
          { d: 'M 55 235 L 65 255 L 135 255 L 145 235', fill: 'rgba(255,107,138,0.1)' },
        ],
      },
      {
        id: 'mouth_q3_b',
        label: 'Tròn',
        featurePaths: [
          { d: 'M 60 235 Q 80 265 100 268 Q 120 265 140 235', fill: 'rgba(255,107,138,0.1)' },
        ],
      },
      {
        id: 'mouth_q3_c',
        label: 'Nhọn',
        featurePaths: [
          { d: 'M 55 230 Q 75 262 100 272 Q 125 262 145 230', fill: 'rgba(255,107,138,0.1)' },
        ],
      },
      {
        id: 'mouth_q3_d',
        label: 'Thò ra',
        featurePaths: [
          { d: 'M 60 235 Q 80 260 100 275 Q 120 260 140 235', fill: 'rgba(255,107,138,0.1)' },
        ],
      },
    ],
  },
  {
    id: 'mouth_q4',
    sectionId: 'mouth_chin',
    questionText: 'Đường nhân trung (rãnh trên môi)?',
    options: [
      {
        id: 'mouth_q4_a',
        label: 'Dài sâu',
        featurePaths: [
          { d: 'M 97 182 L 96 204 M 103 182 L 104 204' },
        ],
      },
      {
        id: 'mouth_q4_b',
        label: 'Trung bình',
        featurePaths: [
          { d: 'M 98 186 L 97 204 M 102 186 L 103 204' },
        ],
      },
      {
        id: 'mouth_q4_c',
        label: 'Ngắn',
        featurePaths: [
          { d: 'M 98 194 L 98 204 M 102 194 L 102 204' },
        ],
      },
      {
        id: 'mouth_q4_d',
        label: 'Rộng',
        featurePaths: [
          { d: 'M 95 186 L 94 204 M 105 186 L 106 204' },
        ],
      },
    ],
  },
];

// ============================================================
// 64 Answer Interpretations — Nhân Tướng Học Việt Nam
// ============================================================
export const FACE_ANSWER_INTERPRETATIONS: Record<
  string,
  Record<string, FaceAnswerInterpretation>
> = {
  // ==================== KHUON MAT & TRAN ====================
  face_q1: {
    face_q1_a: {
      trait: 'Khuôn mặt tròn trong nhân tướng học gọi là "thủy hình" — biểu hiện của người hiền lành, dễ gần và được lòng mọi người. Bạn có tính cách hòa đồng, thích giao lưu và luôn tạo bầu không khí vui vẻ. Người mặt tròn thường có đời sống vật chất đầy đủ, ít lo về tiền bạc.',
      loveImpact: 'warm_approachable',
      personalityImpact: 'friendly',
    },
    face_q1_b: {
      trait: 'Khuôn mặt trái xoan được coi là "chuẩn mực" trong nhân tướng học — cân đối, hài hòa, thể hiện sự thông minh và tinh tế. Bạn là người có gu thẩm mỹ, biết cách ứng xử và dễ thành công trong các mối quan hệ xã hội. Đây là tướng mặt của người có phúc đức.',
      loveImpact: 'elegant_attractive',
      personalityImpact: 'refined',
    },
    face_q1_c: {
      trait: 'Khuôn mặt vuông thuộc "thổ hình" — biểu hiện của người có ý chí kiên cường, quyết đoán và đáng tin cậy. Bạn là người thẳng thắn, giữ lời hứa và có khả năng lãnh đạo bẩm sinh. Người mặt vuông thường thành công trong sự nghiệp nhờ sự kiên định.',
      careerImpact: 'determined_leader',
      personalityImpact: 'strong_willed',
    },
    face_q1_d: {
      trait: 'Khuôn mặt trái tim (trán rộng, cằm nhọn) thể hiện sự sáng tạo và trí tuệ vượt trội. Bạn có trí tưởng tượng phong phú, nhạy bén với cái đẹp và thường có khiếu nghệ thuật. Tuy nhiên, cần rèn tính kiên nhẫn — đôi khi bạn bỏ cuộc quá sớm trước khi thấy kết quả.',
      careerImpact: 'creative_intellectual',
      personalityImpact: 'creative',
    },
  },
  face_q2: {
    face_q2_a: {
      trait: 'Trán cao rộng là dấu hiệu của trí tuệ và tầm nhìn xa. Trong nhân tướng học, trán đại diện cho "Tam Đình Thượng" — phản ánh vận mệnh giai đoạn đầu đời (trước 30 tuổi). Trán cao rộng cho thấy tuổi trẻ thuận lợi, học hành giỏi giang và được gia đình hỗ trợ tốt.',
      careerImpact: 'intelligent_supported',
    },
    face_q2_b: {
      trait: 'Trán trung bình cho thấy sự cân bằng giữa trí tuệ và thực tế. Bạn không quá mơ mộng cũng không quá thực dụng — biết cách kết hợp cả hai để đạt mục tiêu. Giai đoạn đầu đời ổn định, không quá xuất sắc nhưng cũng không gặp trở ngại lớn.',
      careerImpact: 'balanced_stable',
    },
    face_q2_c: {
      trait: 'Trán thấp hẹp trong nhân tướng học cho thấy giai đoạn tuổi trẻ có thể gặp một số khó khăn — phải tự lập sớm hoặc ít được hỗ trợ. Tuy nhiên, đây cũng là dấu hiệu của người chăm chỉ, thực tế và biết vượt khó. Bạn sẽ thành công nhờ nỗ lực bản thân.',
      careerImpact: 'self_made',
    },
    face_q2_d: {
      trait: 'Trán rộng nhưng thấp cho thấy bạn có tầm nhìn rộng nhưng thiên về hành động hơn là suy nghĩ lý thuyết. Bạn thích bắt tay làm ngay thay vì lên kế hoạch quá lâu. Trong công việc, bạn hiệu quả ở vai trò thực thi và quản lý dự án.',
      careerImpact: 'action_oriented',
    },
  },
  face_q3: {
    face_q3_a: {
      trait: 'Đường chân tóc thẳng đều cho thấy tính cách ngay thẳng, có nguyên tắc và kỷ luật. Bạn là người đáng tin cậy, luôn giữ lời và làm việc có hệ thống. Trong nhân tướng học, chân tóc đều là dấu hiệu của phúc đức cha mẹ — bạn được thừa hưởng nền tảng gia đình tốt.',
      personalityImpact: 'disciplined',
    },
    face_q3_b: {
      trait: 'Đường chân tóc hình chữ M (góc trán lõm) là dấu hiệu của người có trí tuệ sắc bén và khả năng phân tích tốt. Trong nhân tướng học phương Tây gọi là "widow peak" — thường gặp ở những người có cá tính mạnh, độc lập và tham vọng cao.',
      personalityImpact: 'analytical',
    },
    face_q3_c: {
      trait: 'Đường chân tóc vòng cung tạo vẻ mềm mại và duyên dáng. Bạn là người có tâm hồn nghệ sĩ, nhạy cảm và giàu cảm xúc. Trong giao tiếp, bạn dễ tạo thiện cảm và được người khác tin tưởng chia sẻ.',
      personalityImpact: 'gentle_artistic',
    },
    face_q3_d: {
      trait: 'Đường chân tóc không đều cho thấy cuộc sống đầu đời có biến động — có thể thay đổi môi trường sống hoặc gia đình có biến cố. Tuy nhiên, chính những trải nghiệm đa dạng giúp bạn trở nên linh hoạt và thích nghi tốt với mọi hoàn cảnh.',
      personalityImpact: 'adaptable',
    },
  },
  face_q4: {
    face_q4_a: {
      trait: 'Trán mịn sáng là dấu hiệu tốt lành nhất — trong nhân tướng học gọi là "ấn đường sáng". Thể hiện trí tuệ minh mẫn, tinh thần lạc quan và vận khí hanh thông. Người có trán sáng thường gặp nhiều may mắn, được quý nhân phù trợ và có tương lai tươi sáng.',
      healthImpact: 'excellent_vitality',
    },
    face_q4_b: {
      trait: 'Nếp nhăn trên trán không phải dấu hiệu xấu — trong nhân tướng học, nếp nhăn ngang (vân trán) cho thấy sự trải nghiệm và chín chắn. Một vân là "thiên văn" (trời giúp), hai vân là "nhân văn" (người giúp), ba vân là "địa văn" (đất giúp). Bạn là người từng trải.',
      personalityImpact: 'experienced',
    },
    face_q4_c: {
      trait: 'Trán hơi lõm cho thấy giai đoạn đầu đời có thể gặp áp lực hoặc stress. Tuy nhiên, đây cũng là dấu hiệu của người có khả năng chịu đựng tốt và biết cách vượt qua khó khăn. Sau tuổi 30, cuộc sống sẽ ổn định và tốt đẹp hơn.',
      healthImpact: 'late_bloomer',
    },
    face_q4_d: {
      trait: 'Trán phẳng cho thấy tính cách bình ổn, ít cực đoan. Bạn là người thực tế, không hay mơ mộng viển vông. Trong công việc, bạn đáng tin cậy và hiệu quả. Cuộc sống nói chung ổn định, ít biến động lớn.',
      personalityImpact: 'steady',
    },
  },

  // ==================== MAT & LONG MAY ====================
  eyes_q1: {
    eyes_q1_a: {
      trait: 'Mắt tròn to trong nhân tướng học biểu hiện người giàu tình cảm, chân thành và dễ tin người. Bạn là người cởi mở, sẵn sàng giúp đỡ mọi người và có tấm lòng nhân ái. Tuy nhiên, cần cẩn thận với những người lợi dụng lòng tốt của bạn.',
      loveImpact: 'open_trusting',
      personalityImpact: 'generous',
    },
    eyes_q1_b: {
      trait: 'Mắt dài hạnh nhân là tướng mắt đẹp nhất trong nhân tướng học — còn gọi là "mắt phượng". Người sở hữu đôi mắt này thường thông minh, sắc sảo và có sức thu hút đặc biệt. Đây là tướng mắt của người có duyên, dễ thành công trong giao tiếp và lãnh đạo.',
      loveImpact: 'charming_phoenix',
      careerImpact: 'charismatic_leader',
    },
    eyes_q1_c: {
      trait: 'Mắt một mí thể hiện sự tập trung, kiên định và không dễ bị lay chuyển. Bạn là người có lập trường vững vàng, quyết đoán và thực tế. Trong công việc, bạn hiệu quả và không bị phân tâm bởi cảm xúc. Đây là tướng của người chuyên nghiệp.',
      careerImpact: 'focused_professional',
      personalityImpact: 'determined',
    },
    eyes_q1_d: {
      trait: 'Mắt hai mí cho thấy bạn là người nhạy cảm, tinh tế và giàu cảm xúc. Bạn dễ đồng cảm với người khác và có khả năng đọc vị tâm lý tốt. Trong tình yêu, bạn là người lãng mạn và biết cách thể hiện tình cảm. Được nhiều người yêu mến.',
      loveImpact: 'romantic_sensitive',
      personalityImpact: 'empathetic',
    },
  },
  eyes_q2: {
    eyes_q2_a: {
      trait: 'Lông mày dày thẳng trong nhân tướng học gọi là "kiếm mi" — tướng mày của người có ý chí sắt đá, trung thành và can đảm. Bạn là người đáng tin cậy, bảo vệ người thân và sẵn sàng hy sinh vì người mình yêu thương. Sự nghiệp phát triển nhờ tính kiên trì.',
      careerImpact: 'loyal_persistent',
      personalityImpact: 'brave',
    },
    eyes_q2_b: {
      trait: 'Lông mày cong (tướng "nguyệt mi") là dấu hiệu của người tinh tế, nhạy bén và có khiếu thẩm mỹ. Bạn giỏi giao tiếp, biết nắm bắt tâm lý người khác và có khả năng thuyết phục tốt. Phù hợp với công việc sáng tạo, ngoại giao hoặc kinh doanh.',
      careerImpact: 'diplomatic_persuasive',
      personalityImpact: 'perceptive',
    },
    eyes_q2_c: {
      trait: 'Lông mày mỏng cho thấy bạn là người nhạy cảm, hay suy nghĩ và có tâm hồn tinh tế. Bạn cảm nhận mọi thứ sâu sắc hơn người khác — cả niềm vui lẫn nỗi buồn. Cần học cách bảo vệ năng lượng của mình và không để cảm xúc người khác ảnh hưởng quá nhiều.',
      personalityImpact: 'sensitive_thoughtful',
    },
    eyes_q2_d: {
      trait: 'Lông mày xếch lên thể hiện tham vọng cao và tinh thần tiến thủ mạnh mẽ. Bạn không chấp nhận sự tầm thường và luôn muốn vươn lên vị trí cao nhất. Đây là tướng mày của người có khí chất lãnh đạo — quyết đoán, dám nghĩ dám làm.',
      careerImpact: 'ambitious_bold',
      personalityImpact: 'ambitious',
    },
  },
  eyes_q3: {
    eyes_q3_a: {
      trait: 'Hai mắt cách xa nhau cho thấy tầm nhìn rộng, bao quát và khoan dung. Bạn dễ chấp nhận sự khác biệt, không hay phán xét và có tư duy mở. Trong công việc, bạn giỏi nhìn bức tranh tổng thể và lập chiến lược dài hạn.',
      personalityImpact: 'open_minded',
    },
    eyes_q3_b: {
      trait: 'Khoảng cách mắt trung bình cho thấy sự cân bằng giữa chi tiết và tổng thể. Bạn vừa tỉ mỉ vừa biết nhìn xa — đây là ưu thế lớn trong mọi lĩnh vực. Tính cách điềm tĩnh, không vội vàng và luôn đưa ra quyết định cân nhắc.',
      personalityImpact: 'balanced',
    },
    eyes_q3_c: {
      trait: 'Hai mắt gần nhau thể hiện sự tập trung và chú ý đến chi tiết. Bạn giỏi trong các công việc đòi hỏi sự tỉ mỉ, chính xác. Tuy nhiên, đôi khi cần bước lùi lại để nhìn bức tranh lớn hơn. Rèn luyện thiền định sẽ giúp bạn cân bằng hơn.',
      careerImpact: 'detail_focused',
    },
    eyes_q3_d: {
      trait: 'Mắt rất rộng cho thấy bạn là người bao dung, từ bi và có tâm hồn rộng mở. Bạn ít khi giận ai lâu và luôn sẵn sàng tha thứ. Trong nhân tướng học, đây là dấu hiệu của người có phúc đức, được nhiều người kính trọng.',
      personalityImpact: 'compassionate',
    },
  },
  eyes_q4: {
    eyes_q4_a: {
      trait: 'Ánh mắt sáng lanh lợi là dấu hiệu của trí tuệ sắc bén và tinh thần minh mẫn. Trong nhân tướng học, "mắt có thần" là tướng tốt nhất — cho thấy người có khả năng nắm bắt cơ hội nhanh, phản ứng linh hoạt và luôn đi trước người khác.',
      careerImpact: 'sharp_opportunist',
    },
    eyes_q4_b: {
      trait: 'Ánh mắt dịu dàng cho thấy tâm hồn nhân hậu và tính cách hòa nhã. Bạn là người mà ai cũng muốn ở gần — mang lại cảm giác an toàn và ấm áp. Trong tình yêu, bạn là người chung thủy và biết cách chăm sóc đối phương.',
      loveImpact: 'gentle_loyal',
    },
    eyes_q4_c: {
      trait: 'Ánh mắt sâu thẳm thể hiện chiều sâu nội tâm và khả năng thấu hiểu. Bạn là người trầm tĩnh, suy nghĩ chín chắn và ít khi quyết định vội vàng. Người khác có thể thấy bạn bí ẩn, nhưng khi hiểu bạn sẽ rất trân trọng.',
      personalityImpact: 'deep_thinker',
    },
    eyes_q4_d: {
      trait: 'Mắt nhỏ tinh anh trong nhân tướng học gọi là "tiểu nhãn thông minh" — người có đôi mắt nhỏ nhưng sáng thường rất tinh ý, giỏi quan sát và có khả năng phân tích xuất sắc. Bạn ít bỏ sót chi tiết và luôn nắm bắt tình huống chính xác.',
      careerImpact: 'observant_analytical',
    },
  },

  // ==================== MUI & TAI ====================
  nose_q1: {
    nose_q1_a: {
      trait: 'Sống mũi thẳng cao trong nhân tướng học là dấu hiệu của "tài khố" (kho tiền) vững chắc. Bạn có khả năng kiếm tiền giỏi, biết cách quản lý tài chính và thường đạt được sự giàu có. Mũi cao cũng thể hiện lòng tự trọng và nguyên tắc sống rõ ràng.',
      careerImpact: 'wealthy_principled',
    },
    nose_q1_b: {
      trait: 'Sống mũi hơi cong (mũi ưng) cho thấy bạn là người nhạy bén trong kinh doanh và biết cách nắm bắt cơ hội. Bạn có mắt nhìn người tốt và ít khi đầu tư sai. Tuy nhiên, cần chú ý cân bằng giữa lợi ích cá nhân và mối quan hệ.',
      careerImpact: 'business_savvy',
    },
    nose_q1_c: {
      trait: 'Sống mũi thấp cho thấy bạn là người khiêm tốn, dễ gần và không đặt mình cao hơn người khác. Bạn hòa đồng và được lòng mọi người. Về tài chính, cần chú ý tiết kiệm và đầu tư thông minh — đừng quá hào phóng mà quên lo cho bản thân.',
      personalityImpact: 'humble_social',
    },
    nose_q1_d: {
      trait: 'Mũi rộng trong nhân tướng học là dấu hiệu của người có phúc, đặc biệt về vật chất. Bạn có khả năng tích lũy tài sản và thường sống trong sung túc. Tính cách phóng khoáng, thích giúp đỡ người khác và không tính toán chi li.',
      careerImpact: 'prosperous_generous',
    },
  },
  nose_q2: {
    nose_q2_a: {
      trait: 'Đầu mũi tròn đầy là dấu hiệu tốt lành nhất cho tài vận — trong nhân tướng học gọi là "tỵ đầu viên" (đầu mũi tròn). Bạn có phúc khí dồi dào, tiền bạc đến dễ dàng và biết cách giữ tiền. Tuổi trung niên trở đi, tài chính rất ổn định.',
      careerImpact: 'financially_blessed',
    },
    nose_q2_b: {
      trait: 'Đầu mũi nhọn cho thấy tính cách sắc bén, tinh tế và có gu. Bạn giỏi phân biệt chất lượng và luôn hướng đến sự hoàn hảo. Trong công việc, bạn đặt tiêu chuẩn cao cho bản thân. Cần cẩn thận với tài chính — có xu hướng chi tiêu cho chất lượng.',
      personalityImpact: 'perfectionist',
    },
    nose_q2_c: {
      trait: 'Đầu mũi hơi hếch biểu hiện tính cách lạc quan, vui vẻ và yêu đời. Bạn dễ kết bạn và luôn mang lại tiếng cười cho mọi người. Tuy nhiên, cần rèn kỷ luật tài chính — bạn có xu hướng chi tiêu theo cảm hứng nhiều hơn theo kế hoạch.',
      personalityImpact: 'optimistic_fun',
    },
    nose_q2_d: {
      trait: 'Đầu mũi rộng bầu là dấu hiệu của người có phúc lớn về vật chất. Trong nhân tướng học, mũi bầu biểu hiện "kho vàng" đầy đặn — bạn có khả năng kiếm tiền từ nhiều nguồn và tích lũy tài sản tốt. Tuổi già sẽ sống rất thoải mái.',
      careerImpact: 'wealth_accumulator',
    },
  },
  nose_q3: {
    nose_q3_a: {
      trait: 'Tai lớn dày là dấu hiệu phúc đức số một trong nhân tướng học — "nhĩ đại hậu phúc". Bạn là người có phúc lớn, sống thọ, trí tuệ minh mẫn và được nhiều người kính trọng. Tai lớn còn cho thấy khả năng lắng nghe tốt — bạn học hỏi nhanh và tiếp thu mọi thứ.',
      healthImpact: 'great_fortune',
      personalityImpact: 'wise_respected',
    },
    nose_q3_b: {
      trait: 'Tai trung bình cho thấy cuộc sống cân bằng và ổn định. Bạn không quá giàu cũng không thiếu thốn — đủ để sống thoải mái và an nhàn. Tính cách điềm đạm, biết hài lòng với những gì mình có và luôn tìm thấy niềm vui trong cuộc sống.',
      personalityImpact: 'content_balanced',
    },
    nose_q3_c: {
      trait: 'Tai nhỏ cho thấy bạn là người tinh tế, nhanh nhẹn và có phản xạ tốt. Bạn giỏi trong các công việc đòi hỏi sự linh hoạt và sáng tạo. Cần chú ý bảo vệ sức khỏe — tai nhỏ theo đông y liên quan đến thận, nên giữ ấm và nghỉ ngơi đủ.',
      healthImpact: 'needs_care',
      personalityImpact: 'agile',
    },
    nose_q3_d: {
      trait: 'Tai vểnh ra ngoài cho thấy tính cách độc lập, dám nghĩ dám làm và không sợ đi ngược số đông. Bạn là người có cá tính riêng, không bị ảnh hưởng bởi dư luận và luôn theo đuổi con đường của mình. Nhiều doanh nhân thành đạt có tướng tai như vậy.',
      careerImpact: 'independent_entrepreneur',
    },
  },
  nose_q4: {
    nose_q4_a: {
      trait: 'Dái tai dày và tròn là dấu hiệu phúc đức và giàu sang tốt lành nhất — trong nhân tướng học gọi là "Phật nhĩ" (tai Phật). Bạn có phúc lớn, tài lộc dồi dào và sống thọ. Người có dái tai tròn thường được quý nhân phù trợ suốt đời.',
      healthImpact: 'blessed_longevity',
      careerImpact: 'wealth_luck',
    },
    nose_q4_b: {
      trait: 'Dái tai mỏng và nhỏ cho thấy bạn là người nhanh nhẹn, thực tế và hiệu quả. Bạn không thích lãng phí thời gian và luôn đi thẳng vào vấn đề. Cần chú ý tích lũy — tài chính có thể biến động, nên có kế hoạch tiết kiệm rõ ràng.',
      personalityImpact: 'efficient_practical',
    },
    nose_q4_c: {
      trait: 'Dái tai dính (gắn liền với má) cho thấy tính cách quyết đoán và không dễ thay đổi ý kiến. Bạn là người có lập trường vững chắc, trung thành và đáng tin cậy. Trong tài chính, bạn cẩn thận và có kỷ luật — ít khi chi tiêu bốc đồng.',
      personalityImpact: 'resolute',
    },
    nose_q4_d: {
      trait: 'Dái tai trung bình cho thấy sự cân đối trong mọi khía cạnh. Bạn có phúc đức vừa đủ, tài chính ổn định và cuộc sống hài hòa. Đây là tướng của người biết hài lòng, không tham lam và luôn tìm thấy hạnh phúc trong những điều giản dị.',
      personalityImpact: 'harmonious',
    },
  },

  // ==================== MIENG & CAM ====================
  mouth_q1: {
    mouth_q1_a: {
      trait: 'Môi dày dặn trong nhân tướng học biểu hiện người giàu tình cảm, hào phóng và tận hưởng cuộc sống. Bạn là người biết yêu thương, sẵn sàng cho đi và luôn quan tâm đến người xung quanh. Đời sống vật chất đầy đủ, biết hưởng thụ nhưng không phung phí.',
      loveImpact: 'passionate_generous',
    },
    mouth_q1_b: {
      trait: 'Môi mỏng cho thấy bạn là người lý trí, kỷ luật và có khả năng diễn đạt tốt. Bạn giỏi giao tiếp, nói chuyện mạch lạc và thuyết phục. Trong tình yêu, bạn thể hiện tình cảm bằng hành động cụ thể hơn là lời nói ngọt ngào.',
      loveImpact: 'articulate_practical',
      careerImpact: 'good_communicator',
    },
    mouth_q1_c: {
      trait: 'Môi trên mỏng dưới dày cho thấy sự kết hợp giữa lý trí và tình cảm. Bạn biết cách cân bằng giữa suy nghĩ và cảm xúc. Trong mối quan hệ, bạn vừa thực tế vừa ấm áp — đối phương cảm thấy an toàn khi ở bên bạn.',
      loveImpact: 'balanced_caring',
    },
    mouth_q1_d: {
      trait: 'Môi đều cân đối là tướng miệng đẹp nhất — thể hiện sự hài hòa trong tính cách và cuộc sống. Bạn có khả năng ngoại giao tốt, biết lúc nào nên nói và lúc nào nên im lặng. Đời sống tình cảm ổn định, ít tranh cãi và luôn tìm được tiếng nói chung.',
      loveImpact: 'harmonious_diplomatic',
    },
  },
  mouth_q2: {
    mouth_q2_a: {
      trait: 'Miệng rộng trong nhân tướng học là dấu hiệu của người có chí lớn và tham vọng cao. "Miệng rộng ăn bốn phương" — bạn có khả năng giao thiệp rộng, kinh doanh giỏi và thu hút nhiều cơ hội. Đây là tướng của người lãnh đạo.',
      careerImpact: 'ambitious_networker',
    },
    mouth_q2_b: {
      trait: 'Miệng trung bình cho thấy cuộc sống ổn định, đủ ăn đủ tiêu và ít biến động. Bạn biết cách sống vừa phải, không quá tham vọng cũng không quá an phận. Đây là nền tảng tốt cho hạnh phúc lâu dài.',
      personalityImpact: 'moderate',
    },
    mouth_q2_c: {
      trait: 'Miệng nhỏ cho thấy bạn là người cẩn thận, kín đáo và chọn lọc trong giao tiếp. Bạn không phải kiểu "nói nhiều" mà là "nói ít nhưng đúng lúc đúng chỗ". Trong tình yêu, bạn chung thủy và chỉ yêu khi thực sự cảm thấy đặc biệt.',
      loveImpact: 'selective_loyal',
    },
    mouth_q2_d: {
      trait: 'Miệng rộng vừa là tướng tốt — đủ để thể hiện sự cởi mở nhưng không quá phô trương. Bạn giao tiếp tốt, biết cách thể hiện bản thân và dễ kết nối với người khác. Cơ hội nghề nghiệp thường đến từ các mối quan hệ xã hội.',
      careerImpact: 'social_connector',
    },
  },
  mouth_q3: {
    mouth_q3_a: {
      trait: 'Cằm vuông trong nhân tướng học là tướng "địa các phương" — biểu hiện của người có hậu vận tốt, cuối đời sung sướng. Bạn kiên định, có ý chí mạnh mẽ và luôn hoàn thành những gì đã bắt đầu. Sau tuổi 50, cuộc sống sẽ rất an nhàn và thoải mái.',
      careerImpact: 'strong_finish',
    },
    mouth_q3_b: {
      trait: 'Cằm tròn cho thấy bạn là người hòa nhã, dễ gần và có hậu vận tốt. Trong nhân tướng học, cằm tròn đại diện cho tuổi già an vui — con cháu hiếu thảo, cuộc sống thoải mái. Bạn cũng là người biết cách hưởng thụ cuộc sống một cách lành mạnh.',
      healthImpact: 'peaceful_old_age',
    },
    mouth_q3_c: {
      trait: 'Cằm nhọn thể hiện sự sắc sảo, nhanh nhẹn và có gu thẩm mỹ cao. Bạn có óc thẩm mỹ tốt, giỏi trong lĩnh vực sáng tạo và nghệ thuật. Cần chú ý hậu vận — nên tích lũy từ sớm để đảm bảo cuộc sống thoải mái khi về già.',
      careerImpact: 'artistic_aesthetic',
    },
    mouth_q3_d: {
      trait: 'Cằm thò ra (cằm bạnh) cho thấy ý chí kiên cường và không bao giờ bỏ cuộc. Bạn là người có nghị lực phi thường, càng gặp khó khăn càng mạnh mẽ. Hậu vận tốt — nhờ sự kiên trì, bạn sẽ gặt hái thành công xứng đáng ở giai đoạn sau.',
      personalityImpact: 'tenacious',
    },
  },
  mouth_q4: {
    mouth_q4_a: {
      trait: 'Nhân trung dài sâu là dấu hiệu tốt lành nhất — trong nhân tướng học biểu hiện sống thọ, con cháu đông đúc và cuộc sống gia đình hạnh phúc. Bạn có sức khỏe tốt, sinh lực dồi dào và khả năng phục hồi nhanh. Đường con cái rất thuận lợi.',
      healthImpact: 'longevity_fertility',
      loveImpact: 'family_blessed',
    },
    mouth_q4_b: {
      trait: 'Nhân trung trung bình cho thấy sức khỏe ổn định và đời sống gia đình hài hòa. Bạn không gặp vấn đề lớn về sức khỏe nếu duy trì lối sống lành mạnh. Con cái ngoan ngoãn, gia đình êm ấm.',
      healthImpact: 'stable_health',
    },
    mouth_q4_c: {
      trait: 'Nhân trung ngắn trong nhân tướng học nhắc nhở bạn cần chú ý sức khỏe nhiều hơn — đặc biệt hệ tiêu hóa và sinh sản. Đây KHÔNG phải dấu hiệu xấu nghiêm trọng, chỉ là lời nhắc nhở nên tập thể dục, ăn uống lành mạnh và khám sức khỏe định kỳ.',
      healthImpact: 'needs_attention',
    },
    mouth_q4_d: {
      trait: 'Nhân trung rộng cho thấy bạn là người phóng khoáng, rộng lượng và có tấm lòng bao dung. Bạn dễ tha thứ, ít khi để bụng và luôn nhìn mặt tích cực của mọi người. Sức khỏe nhìn chung tốt, đặc biệt hệ hô hấp và tuần hoàn.',
      healthImpact: 'good_overall',
      personalityImpact: 'forgiving',
    },
  },
};
