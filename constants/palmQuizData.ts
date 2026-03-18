import type {
  PalmLineSection,
  QuizQuestion,
  AnswerInterpretation,
} from '../types/palmQuiz';

// Hand outline SVG path (viewBox 0 0 300 400)
export const BASE_HAND_PATH = `
M 86 309
Q 84 306 81 285
Q 78 267 72 255
Q 60 230 42 195
Q 30 170 28 155
Q 26 140 35 135
Q 44 132 52 145
Q 62 162 70 185
Q 74 195 78 210
Q 80 205 80 185
Q 78 140 76 105
Q 74 75 76 55
Q 78 38 88 36
Q 98 34 102 52
Q 106 75 108 105
Q 110 135 110 165
Q 112 155 112 130
Q 112 90 112 60
Q 112 30 115 18
Q 118 6 128 5
Q 138 4 142 18
Q 146 35 146 60
Q 146 90 145 130
Q 145 155 146 165
Q 148 135 150 105
Q 152 75 156 55
Q 160 38 170 36
Q 180 34 183 52
Q 186 75 184 105
Q 182 140 180 175
Q 182 180 183 185
Q 186 165 192 145
Q 198 125 205 115
Q 212 105 220 110
Q 228 116 222 132
Q 218 148 210 165
Q 200 195 200 194
Q 205 242 207 244
Q 208 277 200 293
Q 193 307 186 313
Z`;

// ============================================================
// Reference paths for all 4 palm lines (used for dimmed background)
// ============================================================
export const REFERENCE_LINE_PATHS: Record<string, { d: string; color: string }> = {
  heart: {
    d: 'M 187 206 Q 170 198 130 192 Q 100 192 98 191',
    color: '#FF6B8A',
  },
  head: {
    d: 'M 90 210 Q 119 216 145 233 Q 171 254 180 268',
    color: '#4A90D9',
  },
  life: {
    d: 'M 87 215 Q 112 235 121 273 Q 131 295 134 307',
    color: '#4CAF50',
  },
  fate: {
    d: 'M 147 305 Q 139 287 137 260 Q 135 231 141 183',
    color: '#E8A838',
  },
};

// ============================================================
// 4 Sections: Tam Dao, Tri Dao, Sinh Dao, Su Nghiep
// ============================================================
export const PALM_LINE_SECTIONS: PalmLineSection[] = [
  {
    id: 'heart',
    nameVi: 'Tâm Đạo',
    subtitle: 'Đường Tình Duyên',
    color: '#FF6B8A',
    icon: 'heart',
    questionCount: 4,
  },
  {
    id: 'head',
    nameVi: 'Trí Đạo',
    subtitle: 'Đường Học Hành',
    color: '#4A90D9',
    icon: 'bulb',
    questionCount: 4,
  },
  {
    id: 'life',
    nameVi: 'Sinh Đạo',
    subtitle: 'Đường Đời',
    color: '#4CAF50',
    icon: 'leaf',
    questionCount: 4,
  },
  {
    id: 'fate',
    nameVi: 'Sự Nghiệp',
    subtitle: 'Đường Định Mệnh',
    color: '#E8A838',
    icon: 'trending-up',
    questionCount: 4,
  },
];

// ============================================================
// 16 Questions (4 per section), each with 4 illustrated options
// ============================================================
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==================== TAM DAO (Heart Line) ====================
  {
    id: 'heart_q1',
    sectionId: 'heart',
    questionText: 'Đường tâm đạo kết thúc ở đâu?',
    options: [
      {
        id: 'heart_q1_a',
        label: 'Kéo dài đến ngón trỏ',
        linePaths: [{ d: 'M 199 207 Q 170 198 130 192 Q 110 190 108 185' }],
      },
      {
        id: 'heart_q1_b',
        label: 'Dưới ngón giữa',
        linePaths: [{ d: 'M 199 207 Q 170 198 145 192 Q 135 188 132 180' }],
      },
      {
        id: 'heart_q1_c',
        label: 'Giữa ngón trỏ và giữa',
        linePaths: [{ d: 'M 201 208 Q 170 198 135 190 Q 120 186 118 182' }],
      },
      {
        id: 'heart_q1_d',
        label: 'Chạy dài qua lòng bàn tay',
        linePaths: [{ d: 'M 210 210 Q 170 198 130 195 Q 100 195 80 200' }],
      },
    ],
  },
  {
    id: 'heart_q2',
    sectionId: 'heart',
    questionText: 'Đường tâm đạo cong, thẳng hay lượn sóng?',
    options: [
      {
        id: 'heart_q2_a',
        label: 'Cong hướng lên',
        linePaths: [{ d: 'M 210 210 Q 160 185 120 182 Q 95 185 80 195' }],
      },
      {
        id: 'heart_q2_b',
        label: 'Thẳng và ngắn',
        linePaths: [{ d: 'M 210 205 L 140 203' }],
      },
      {
        id: 'heart_q2_c',
        label: 'Lượn sóng',
        linePaths: [
          { d: 'M 210 208 Q 190 198 170 210 Q 150 220 130 210 Q 110 200 80 208' },
        ],
      },
      {
        id: 'heart_q2_d',
        label: 'Cong hướng xuống',
        linePaths: [{ d: 'M 210 200 Q 160 220 120 222 Q 95 218 80 210' }],
      },
    ],
  },
  {
    id: 'heart_q3',
    sectionId: 'heart',
    questionText: 'Đường tâm đạo dày hay mỏng?',
    options: [
      {
        id: 'heart_q3_a',
        label: 'Dày và sâu',
        linePaths: [{ d: 'M 201 209 Q 170 195 130 192 Q 100 192 80 198' }],
      },
      {
        id: 'heart_q3_b',
        label: 'Trung bình',
        linePaths: [{ d: 'M 200 209 Q 170 198 145 195 Q 125 195 110 200' }],
      },
      {
        id: 'heart_q3_c',
        label: 'Nông và mờ',
        linePaths: [
          { d: 'M 197 208 Q 170 198 130 195 Q 100 195 80 200', opacity: 0.35 },
        ],
      },
      {
        id: 'heart_q3_d',
        label: 'Rất ngắn',
        linePaths: [{ d: 'M 202 210 Q 195 205 185 204 Q 178 204 172 207' }],
      },
    ],
  },
  {
    id: 'heart_q4',
    sectionId: 'heart',
    questionText: 'Đường tâm đạo có dấu hiệu đặc biệt?',
    options: [
      {
        id: 'heart_q4_a',
        label: 'Rõ ràng, liên tục',
        linePaths: [{ d: 'M 198 208 Q 170 195 130 192 Q 100 192 80 198' }],
      },
      {
        id: 'heart_q4_b',
        label: 'Có nhánh rẽ',
        linePaths: [
          { d: 'M 197 207 Q 170 195 130 192 Q 100 192 80 198' },
          { d: 'M 145 192 Q 148 180 152 172' },
          { d: 'M 120 194 Q 122 184 126 176' },
        ],
      },
      {
        id: 'heart_q4_c',
        label: 'Bị đứt đoạn',
        linePaths: [
          { d: 'M 202 210 Q 185 200 165 196' },
          { d: 'M 135 194 Q 110 195 80 200' },
        ],
      },
      {
        id: 'heart_q4_d',
        label: 'Có nhiều đường song song',
        linePaths: [
          { d: 'M 210 210 Q 170 195 130 192 Q 100 192 80 198' },
          { d: 'M 210 218 Q 170 204 130 201 Q 100 201 80 207' },
        ],
      },
    ],
  },

  // ==================== TRI DAO (Head Line) ====================
  {
    id: 'head_q1',
    sectionId: 'head',
    questionText: 'Đường trí đạo bắt đầu từ đâu?',
    options: [
      {
        id: 'head_q1_a',
        label: 'Chạm đường sinh đạo',
        linePaths: [{ d: 'M 89 218 Q 120 235 155 238 Q 185 235 205 225' }],
      },
      {
        id: 'head_q1_b',
        label: 'Tách rời đường sinh đạo',
        linePaths: [{ d: 'M 90 203 Q 117 226 155 234 Q 188 237 205 222' }],
      },
      {
        id: 'head_q1_c',
        label: 'Giao nhau với đường sinh đạo',
        linePaths: [{ d: 'M 79 225 Q 98 238 126 241 Q 164 243 205 228' }],
      },
      {
        id: 'head_q1_d',
        label: 'Bắt đầu từ mép bàn tay',
        linePaths: [{ d: 'M 78 235 Q 120 240 155 242 Q 185 238 205 225' }],
      },
    ],
  },
  {
    id: 'head_q2',
    sectionId: 'head',
    questionText: 'Đường trí đạo cong hay thẳng?',
    options: [
      {
        id: 'head_q2_a',
        label: 'Thẳng và nằm ngang',
        linePaths: [{ d: 'M 82 235 L 205 232' }],
      },
      {
        id: 'head_q2_b',
        label: 'Vòng hướng xuống dưới',
        linePaths: [{ d: 'M 92 206 Q 119 213 155 244 Q 175 262 180 299' }],
      },
      {
        id: 'head_q2_c',
        label: 'Hơi cong nhẹ',
        linePaths: [{ d: 'M 82 235 Q 120 240 155 242 Q 185 240 205 235' }],
      },
      {
        id: 'head_q2_d',
        label: 'Lượn sóng',
        linePaths: [
          {
            d: 'M 82 235 Q 108 228 130 240 Q 155 252 175 238 Q 195 228 205 235',
          },
        ],
      },
    ],
  },
  {
    id: 'head_q3',
    sectionId: 'head',
    questionText: 'Đường trí đạo dài hay ngắn?',
    options: [
      {
        id: 'head_q3_a',
        label: 'Dài',
        linePaths: [{ d: 'M 82 235 Q 120 240 155 242 Q 181 241 204 232' }],
      },
      {
        id: 'head_q3_b',
        label: 'Trung bình',
        linePaths: [{ d: 'M 82 235 Q 120 240 155 242 Q 175 240 190 235' }],
      },
      {
        id: 'head_q3_c',
        label: 'Ngắn',
        linePaths: [{ d: 'M 82 235 Q 108 240 128 242 Q 145 241 155 238' }],
      },
      {
        id: 'head_q3_d',
        label: 'Rất dài (qua mép tay)',
        linePaths: [{ d: 'M 82 235 Q 120 240 155 242 Q 190 238 220 225' }],
      },
    ],
  },
  {
    id: 'head_q4',
    sectionId: 'head',
    questionText: 'Đường trí đạo có đặc điểm gì?',
    options: [
      {
        id: 'head_q4_a',
        label: 'Rõ ràng, sâu',
        linePaths: [{ d: 'M 82 235 Q 120 240 155 242 Q 185 238 205 225' }],
      },
      {
        id: 'head_q4_b',
        label: 'Có nhánh rẽ',
        linePaths: [
          { d: 'M 82 235 Q 120 240 155 242 Q 185 238 205 225' },
          { d: 'M 155 242 Q 158 254 162 262' },
          { d: 'M 180 238 Q 183 248 188 256' },
        ],
      },
      {
        id: 'head_q4_c',
        label: 'Bị đứt đoạn',
        linePaths: [
          { d: 'M 82 235 Q 108 240 130 242' },
          { d: 'M 165 240 Q 185 236 205 225' },
        ],
      },
      {
        id: 'head_q4_d',
        label: 'Mờ, nông',
        linePaths: [
          { d: 'M 82 235 Q 120 240 155 242 Q 185 238 205 225', opacity: 0.35 },
        ],
      },
    ],
  },

  // ==================== SINH DAO (Life Line) ====================
  {
    id: 'life_q1',
    sectionId: 'life',
    questionText: 'Đường sinh đạo bắt đầu từ đâu?',
    options: [
      {
        id: 'life_q1_a',
        label: 'Gần ngón cái',
        linePaths: [{ d: 'M 85 215 Q 115 233 125 263 Q 139 288 132 307' }],
      },
      {
        id: 'life_q1_b',
        label: 'Gần ngón trỏ',
        linePaths: [{ d: 'M 96 187 Q 114 229 125 258 Q 132 286 132 305' }],
      },
      {
        id: 'life_q1_c',
        label: 'Giữa ngón cái và ngón trỏ',
        linePaths: [{ d: 'M 84 195 Q 107 233 122 264 Q 130 288 134 307' }],
      },
      {
        id: 'life_q1_d',
        label: 'Rất gần mép bàn tay',
        linePaths: [{ d: 'M 80 220 Q 100 248 112 275 Q 122 295 128 310' }],
      },
    ],
  },
  {
    id: 'life_q2',
    sectionId: 'life',
    questionText: 'Đường sinh đạo uốn cong thế nào?',
    options: [
      {
        id: 'life_q2_a',
        label: 'Cong rộng (xa ngón cái)',
        linePaths: [{ d: 'M 90 210 Q 115 240 128 268 Q 135 295 140 310' }],
      },
      {
        id: 'life_q2_b',
        label: 'Cong gần ngón cái',
        linePaths: [{ d: 'M 79 223 Q 100 235 108 260 Q 116 289 107 304' }],
      },
      {
        id: 'life_q2_c',
        label: 'Gần như thẳng',
        linePaths: [{ d: 'M 90 210 Q 95 238 100 265 Q 105 285 110 305' }],
      },
      {
        id: 'life_q2_d',
        label: 'Lượn sóng',
        linePaths: [
          {
            d: 'M 90 210 Q 117 231 109 256 Q 102 274 106 292 Q 112 302 125 310',
          },
        ],
      },
    ],
  },
  {
    id: 'life_q3',
    sectionId: 'life',
    questionText: 'Đường sinh đạo dài hay ngắn?',
    options: [
      {
        id: 'life_q3_a',
        label: 'Dài (đến cổ tay)',
        linePaths: [{ d: 'M 90 210 Q 114 240 125 271 Q 133 294 136 310' }],
      },
      {
        id: 'life_q3_b',
        label: 'Trung bình',
        linePaths: [{ d: 'M 89 214 Q 109 235 117 255 Q 124 274 125 292' }],
      },
      {
        id: 'life_q3_c',
        label: 'Ngắn',
        linePaths: [{ d: 'M 90 210 Q 100 230 108 250 Q 112 260 115 272' }],
      },
      {
        id: 'life_q3_d',
        label: 'Rất dài',
        linePaths: [{ d: 'M 90 210 Q 110 245 122 278 Q 132 300 140 313' }],
      },
    ],
  },
  {
    id: 'life_q4',
    sectionId: 'life',
    questionText: 'Đường sinh đạo có dấu hiệu gì?',
    options: [
      {
        id: 'life_q4_a',
        label: 'Rõ ràng, liên tục',
        linePaths: [{ d: 'M 90 210 Q 108 240 118 270 Q 128 295 134 307' }],
      },
      {
        id: 'life_q4_b',
        label: 'Bị đứt đoạn',
        linePaths: [
          { d: 'M 90 210 Q 100 230 108 252' },
          { d: 'M 112 272 Q 122 292 134 307' },
        ],
      },
      {
        id: 'life_q4_c',
        label: 'Có nhiều đường song song',
        linePaths: [
          { d: 'M 90 210 Q 108 240 118 270 Q 128 295 134 307' },
          { d: 'M 96 215 Q 114 242 124 270 Q 132 295 138 307' },
        ],
      },
      {
        id: 'life_q4_d',
        label: 'Có nhánh rẽ',
        linePaths: [
          { d: 'M 90 210 Q 108 240 118 270 Q 128 295 134 307' },
          { d: 'M 118 270 Q 127 269 137 268' },
          { d: 'M 128 290 Q 135 288 147 292' },
        ],
      },
    ],
  },

  // ==================== SU NGHIEP (Fate Line) ====================
  {
    id: 'fate_q1',
    sectionId: 'fate',
    questionText: 'Đường sự nghiệp bắt đầu từ đâu?',
    options: [
      {
        id: 'fate_q1_a',
        label: 'Từ cổ tay thẳng lên',
        linePaths: [{ d: 'M 144 315 Q 144 280 142 255 Q 140 225 141 183' }],
      },
      {
        id: 'fate_q1_b',
        label: 'Từ giữa lòng bàn tay',
        linePaths: [{ d: 'M 147 275 Q 144 258 142 240 Q 140 218 141 183' }],
      },
      {
        id: 'fate_q1_c',
        label: 'Từ đường sinh đạo',
        linePaths: [{ d: 'M 132 302 Q 142 268 144 248 Q 147 222 141 183' }],
      },
      {
        id: 'fate_q1_d',
        label: 'Không có đường sự nghiệp',
        linePaths: [{ d: 'M 147 280 Q 146 275 145 270', opacity: 0.2 }],
      },
    ],
  },
  {
    id: 'fate_q2',
    sectionId: 'fate',
    questionText: 'Đường sự nghiệp thẳng hay cong?',
    options: [
      {
        id: 'fate_q2_a',
        label: 'Rõ và thẳng',
        linePaths: [{ d: 'M 147 305 L 141 183' }],
      },
      {
        id: 'fate_q2_b',
        label: 'Cong về phía ngón trỏ',
        linePaths: [{ d: 'M 147 305 Q 138 265 128 235 Q 118 210 108 195' }],
      },
      {
        id: 'fate_q2_c',
        label: 'Cong về phía ngón út',
        linePaths: [{ d: 'M 147 305 Q 152 265 160 235 Q 168 215 178 200' }],
      },
      {
        id: 'fate_q2_d',
        label: 'Lượn sóng / zig zag',
        linePaths: [
          {
            d: 'M 147 305 Q 142 280 150 258 Q 156 240 144 222 Q 138 210 141 183',
          },
        ],
      },
    ],
  },
  {
    id: 'fate_q3',
    sectionId: 'fate',
    questionText: 'Đường sự nghiệp dày hay mỏng?',
    options: [
      {
        id: 'fate_q3_a',
        label: 'Dày và rõ ràng',
        linePaths: [{ d: 'M 147 305 Q 143 275 141 248 Q 139 222 141 183' }],
      },
      {
        id: 'fate_q3_b',
        label: 'Nhạt và mờ',
        linePaths: [
          {
            d: 'M 147 305 Q 143 275 141 248 Q 139 222 141 183',
            opacity: 0.3,
          },
        ],
      },
      {
        id: 'fate_q3_c',
        label: 'Đoạn đầu rõ, đoạn sau mờ',
        linePaths: [
          { d: 'M 147 305 Q 143 280 142 262' },
          { d: 'M 141 242 Q 140 218 141 183', opacity: 0.35 },
        ],
      },
      {
        id: 'fate_q3_d',
        label: 'Đoạn đầu mờ, đoạn sau rõ',
        linePaths: [
          { d: 'M 147 305 Q 143 280 142 262', opacity: 0.35 },
          { d: 'M 141 242 Q 140 218 141 183' },
        ],
      },
    ],
  },
  {
    id: 'fate_q4',
    sectionId: 'fate',
    questionText: 'Đường sự nghiệp có đặc điểm gì?',
    options: [
      {
        id: 'fate_q4_a',
        label: 'Liên tục, không đứt',
        linePaths: [{ d: 'M 147 305 Q 143 275 141 248 Q 139 222 141 183' }],
      },
      {
        id: 'fate_q4_b',
        label: 'Bị đứt đoạn',
        linePaths: [
          { d: 'M 147 305 Q 143 280 142 262' },
          { d: 'M 141 242 Q 140 218 141 183' },
        ],
      },
      {
        id: 'fate_q4_c',
        label: 'Cắt đường sinh đạo',
        linePaths: [
          { d: 'M 147 305 Q 132 270 112 248 Q 100 238 88 225' },
        ],
      },
      {
        id: 'fate_q4_d',
        label: 'Tách khỏi đường sinh đạo',
        linePaths: [
          { d: 'M 147 305 Q 143 275 141 248 Q 139 222 141 183' },
          // life line ref for context
          { d: 'M 87 215 Q 112 235 121 273 Q 131 295 134 307', opacity: 0.25, color: '#4CAF50' },
        ],
      },
    ],
  },
];

// ============================================================
// Answer interpretations - based on traditional palm reading
// ============================================================
export const ANSWER_INTERPRETATIONS: Record<
  string,
  Record<string, AnswerInterpretation>
> = {
  // ==================== TAM DAO (Heart Line) ====================
  heart_q1: {
    heart_q1_a: {
      trait:
        'Đường Tâm Đạo kéo dài đến ngón trỏ cho thấy bạn rất hài lòng với cuộc sống tình cảm của mình. Bạn là người biết yêu và được yêu, luôn tìm thấy sự cân bằng trong các mối quan hệ. Đây là dấu hiệu của tình yêu lý tưởng và đích thực — bạn đặt tình cảm lên hàng đầu và thường có mối quan hệ sâu sắc, bền vững.',
      loveImpact: 'satisfied',
      personalityImpact: 'content',
    },
    heart_q1_b: {
      trait:
        'Đường Tâm Đạo kết thúc dưới ngón giữa thể hiện bạn là người thực tế trong tình yêu, ưu tiên nhu cầu bản thân và cân nhắc kỹ trước khi đưa ra cảm xúc. Bạn không dễ bị cuốn vào cảm xúc nhất thời mà luôn dùng lý trí để đánh giá mối quan hệ. Điều này giúp bạn tránh được những sai lầm trong tình cảm.',
      loveImpact: 'practical_self',
      personalityImpact: 'practical',
    },
    heart_q1_c: {
      trait:
        'Đường Tâm Đạo kết thúc giữa ngón trỏ và ngón giữa là vị trí lý tưởng nhất, cho thấy sự cân bằng tuyệt vời giữa lý tưởng và thực tế trong đời sống tình cảm. Bạn vừa lãng mạn vừa thực tế, biết cách xây dựng mối quan hệ lâu dài dựa trên sự tôn trọng và thấu hiểu lẫn nhau.',
      loveImpact: 'balanced',
      personalityImpact: 'balanced',
    },
    heart_q1_d: {
      trait:
        'Đường Tâm Đạo chạy dài qua lòng bàn tay cho thấy bạn giàu tình cảm vô cùng, dễ rơi vào lưới tình và sống hết mình vì người mình yêu. Bạn có trái tim rộng lớn, luôn sẵn sàng cho đi nhiều hơn nhận lại. Tuy nhiên, cần học cách bảo vệ cảm xúc của mình để tránh bị tổn thương.',
      loveImpact: 'deeply_emotional',
      personalityImpact: 'emotional',
    },
  },
  heart_q2: {
    heart_q2_a: {
      trait:
        'Đường Tâm Đạo cong hướng lên thể hiện sự lạc quan và nhiệt huyết trong tình yêu. Bạn biểu lộ tình cảm một cách tự nhiên và luôn mang năng lượng tích cực cho người xung quanh. Người đối diện sẽ cảm thấy được tràn đầy năng lượng khi ở bên bạn. Đây là kiểu người "mang nắng chia sẻ".',
      loveImpact: 'optimistic',
    },
    heart_q2_b: {
      trait:
        'Đường Tâm Đạo thẳng và ngắn cho thấy bạn là người không thích những lời nói hoa mỹ hay hành động lãng mạn quá mức. Bạn thể hiện tình yêu bằng hành động cụ thể, thực tế — như lo cho đối phương trong cuộc sống hàng ngày. Đối tác của bạn sẽ cảm nhận được sự an toàn và đáng tin cậy.',
      loveImpact: 'not_romantic',
    },
    heart_q2_c: {
      trait:
        'Đường Tâm Đạo lượn sóng cho thấy bạn có sức lôi cuốn đặc biệt và khả năng thu hút người khác mạnh mẽ. Tuy nhiên, bạn có xu hướng che giấu cảm xúc thật sự, tạo ra một lớp bảo vệ quanh trái tim. Khi bạn học cách mở lòng và tin tưởng, tình yêu sẽ trở nên sâu sắc và ý nghĩa hơn rất nhiều.',
      loveImpact: 'charming_but_guarded',
    },
    heart_q2_d: {
      trait:
        'Đường Tâm Đạo cong hướng xuống cho thấy bạn là người có chiều sâu tình cảm lớn nhưng thường giấu kín cảm xúc bên trong. Bạn ít biểu lộ ra ngoài, khiến người khác khó đoán được cảm xúc của bạn. Nhưng khi đã yêu, bạn yêu rất sâu và rất bền, là kiểu người "nước chảy đá mòn".',
      loveImpact: 'introverted_deep',
    },
  },
  heart_q3: {
    heart_q3_a: {
      trait:
        'Đường Tâm Đạo dày và sâu cho thấy bạn luôn tràn đầy nhiệt huyết và có mục tiêu sống rõ ràng. Trong tình yêu, bạn là người chung thủy và đam mê, sẵn sàng hy sinh vì người mình yêu. Cảm xúc của bạn mạnh mẽ và sâu sắc — khi yêu thì yêu hết mình, khi giận thì cũng rất dữ dội.',
      loveImpact: 'passionate_loyal',
    },
    heart_q3_b: {
      trait:
        'Đường Tâm Đạo trung bình cho thấy đời sống tình cảm ổn định, không quá nóng cũng không quá lạnh. Bạn biết cân bằng giữa tình yêu và các khía cạnh khác của cuộc sống — công việc, gia đình, bạn bè. Đây là nền tảng tốt để xây dựng mối quan hệ lâu dài và bền vững.',
      loveImpact: 'stable',
    },
    heart_q3_c: {
      trait:
        'Đường Tâm Đạo nông và mờ cho thấy bạn cần phát triển thêm chiều sâu trong cảm xúc. Bạn có thể dễ bị phân tâm bởi nhiều mối quan hệ đồng thời mà không thực sự đầu tư sâu vào bất kỳ mối quan hệ nào. Hãy học cách tập trung và trân trọng người ở bên cạnh bạn.',
      loveImpact: 'low_energy',
    },
    heart_q3_d: {
      trait:
        'Đường Tâm Đạo rất ngắn cho thấy bạn có thể gặp khó khăn trong việc thể hiện tình cảm. Bạn không phải là người không có tình cảm, mà là bạn chưa học cách biểu đạt nó. Khi bạn mở lòng và để cảm xúc được tự nhiên bày tỏ, cuộc sống tình cảm sẽ cải thiện đáng kể.',
      loveImpact: 'reserved',
    },
  },
  heart_q4: {
    heart_q4_a: {
      trait:
        'Đường Tâm Đạo rõ ràng và liên tục là dấu hiệu tốt lành nhất cho đời sống tình cảm. Cuộc đời tình cảm của bạn suôn sẻ, ít sóng gió lớn. Bạn có khả năng duy trì mối quan hệ lâu dài và hạnh phúc. Người bạn đời của bạn sẽ là người rất phù hợp và đồng điệu với bạn.',
      loveImpact: 'smooth',
    },
    heart_q4_b: {
      trait:
        'Đường Tâm Đạo có nhánh rẽ cho thấy bạn có nhiều mối quan hệ xã hội và dễ thu hút người khác. Bạn có duyên ngầm và được nhiều người yêu mến. Tuy nhiên, cần chọn lọc mối quan hệ thật sự — không phải ai cũng xứng đáng với thời gian và tình cảm của bạn.',
      loveImpact: 'social_attractive',
    },
    heart_q4_c: {
      trait:
        'Đường Tâm Đạo bị đứt đoạn cho thấy bạn đã hoặc sẽ trải qua một trải nghiệm tình cảm sâu sắc, thậm chí đau đớn. Đây có thể là chia tay, mất mát hoặc sự thay đổi lớn trong tình cảm. Theo như tôi phân tích, đường Tâm Đạo đứt đoạn không phải "mệnh yếu" mà là dấu hiệu của sự trưởng thành — chính những trải nghiệm khó khăn giúp bạn hiểu rõ bản thân và tìm được tình yêu đích thực hơn.',
      loveImpact: 'heartbreak_growth',
    },
    heart_q4_d: {
      trait:
        'Đường Tâm Đạo có nhiều đường song song cho thấy bạn là người đa cảm và có khả năng yêu thương lớn. Bạn có thể có nhiều người theo đuổi hoặc nhiều mối quan hệ cùng lúc. Điều quan trọng là học cách tập trung vào một mối quan hệ chính và nuôi dưỡng nó bằng sự chân thành.',
      loveImpact: 'multiple_loves',
    },
  },

  // ==================== TRI DAO (Head Line) ====================
  head_q1: {
    head_q1_a: {
      trait:
        'Đường Trí Đạo chạm đường Sinh Đạo cho thấy bạn là người cẩn thận và có trách nhiệm, suy nghĩ kỹ lưỡng trước khi hành động. Bạn ít khi mạo hiểm và luôn có kế hoạch dự phòng. Trong công việc, bạn là người đáng tin cậy mà đồng nghiệp và cấp trên đánh giá cao.',
      careerImpact: 'cautious_responsible',
      personalityImpact: 'careful',
    },
    head_q1_b: {
      trait:
        'Đường Trí Đạo tách rời đường Sinh Đạo thể hiện tinh thần phiêu lưu và độc lập mạnh mẽ. Bạn thích khám phá cái mới, dám nghĩ dám làm và có tinh thần doanh nhân bẩm sinh. Bạn không sợ thất bại và coi mọi thất bại là bài học quý giá trên con đường thành công.',
      careerImpact: 'adventurous_entrepreneur',
      personalityImpact: 'adventurous',
    },
    head_q1_c: {
      trait:
        'Đường Trí Đạo giao nhau với đường Sinh Đạo cho thấy sự gắn bó chặt chẽ với gia đình và truyền thống. Quyết định của bạn thường bị ảnh hưởng bởi người thân và môi trường xung quanh. Điều này không phải là điểm yếu — nó cho thấy bạn biết lắng nghe và trân trọng ý kiến người khác.',
      careerImpact: 'family_influenced',
      personalityImpact: 'family_oriented',
    },
    head_q1_d: {
      trait:
        'Đường Trí Đạo bắt đầu từ mép bàn tay thể hiện tư duy độc lập từ rất sớm. Bạn có cách nhìn độc đáo và thường đi ngược lại số đông. Điều này giúp bạn tạo ra những giá trị mới, nhưng đôi khi cũng khiến bạn cảm thấy cô đơn vì ít người hiểu được suy nghĩ của bạn.',
      careerImpact: 'independent_thinker',
      personalityImpact: 'independent',
    },
  },
  head_q2: {
    head_q2_a: {
      trait:
        'Đường Trí Đạo thẳng và nằm ngang cho thấy bạn có tư duy logic và phân tích cực kỳ tốt. Bạn giải quyết vấn đề bằng lý trí và dữ liệu, rất phù hợp với công việc đòi hỏi sự chính xác như kế toán, kỹ sư, lập trình, phân tích tài chính. Bạn là người mà công ty nào cũng muốn có.',
      careerImpact: 'logical_analytical',
    },
    head_q2_b: {
      trait:
        'Đường Trí Đạo vòng hướng xuống dưới cho thấy bạn có trí tưởng tượng phong phú và khả năng sáng tạo vượt trội. Bạn nhìn thấy vẻ đẹp và ý nghĩa sâu xa trong những điều bình thường. Rất phù hợp với nghệ thuật, văn học, âm nhạc, thiết kế, hoặc bất kỳ lĩnh vực nào đòi hỏi sáng tạo.',
      careerImpact: 'creative_trusted',
    },
    head_q2_c: {
      trait:
        'Đường Trí Đạo hơi cong nhẹ cho thấy sự kết hợp hoàn hảo giữa logic và sáng tạo. Bạn vừa có thể phân tích vấn đề bằng lý trí, vừa có thể tìm ra giải pháp sáng tạo. Sự linh hoạt này là lợi thế lớn trong mọi môi trường làm việc, đặc biệt là các vị trí cần sự đa năng.',
      careerImpact: 'balanced_flexible',
    },
    head_q2_d: {
      trait:
        'Đường Trí Đạo lượn sóng cho thấy tư duy đa dạng và khả năng nhìn vấn đề từ nhiều góc độ. Tuy nhiên, đôi khi bạn thiếu tập trung vào một hướng cụ thể. Nếu rèn luyện được sự kiên nhẫn và kỷ luật, bạn sẽ đạt thành tựu lớn nhờ tầm nhìn rộng của mình.',
      careerImpact: 'diverse_scattered',
    },
  },
  head_q3: {
    head_q3_a: {
      trait:
        'Đường Trí Đạo dài thể hiện khả năng tư duy sâu rộng và tầm nhìn chiến lược. Bạn có thể nhìn xa về tương lai và lập kế hoạch dài hạn. Người có đường Trí Đạo dài thường thành công trong vai trò lãnh đạo, quản lý hoặc cố vấn chiến lược.',
      careerImpact: 'strategic_visionary',
    },
    head_q3_b: {
      trait:
        'Đường Trí Đạo trung bình cho thấy trí tuệ ổn định và đáng tin cậy. Bạn xử lý công việc hiệu quả, thực tế và không viển vông. Đây là nền tảng vững chắc để xây dựng sự nghiệp bền vững — bạn không cần phải là thiên tài để thành công, chỉ cần kiên trì và nhất quán.',
      careerImpact: 'reliable_practical',
    },
    head_q3_c: {
      trait:
        'Đường Trí Đạo ngắn cho thấy bạn là người hành động nhanh và quyết đoán. Bạn không mất thời gian suy nghĩ quá nhiều mà tập trung vào việc thực hiện ngay. Rất phù hợp với môi trường làm việc nhanh, áp lực cao như kinh doanh, bán hàng, startup.',
      careerImpact: 'action_oriented',
    },
    head_q3_d: {
      trait:
        'Đường Trí Đạo rất dài thể hiện trí tuệ vượt trội, khả năng phân tích sâu sắc và học hỏi không giới hạn. Bạn có thể trở thành chuyên gia hàng đầu trong lĩnh vực mình theo đuổi. Phù hợp với nghiên cứu khoa học, học thuật, y học, hoặc bất kỳ lĩnh vực chuyên môn cao nào.',
      careerImpact: 'intellectual_expert',
    },
  },
  head_q4: {
    head_q4_a: {
      trait:
        'Đường Trí Đạo rõ ràng và sâu cho thấy sự tập trung cao độ và khả năng học hỏi nhanh chóng. Bạn có trí nhớ tốt và khả năng xử lý thông tin mạnh mẽ. Trong sự nghiệp, bạn sẽ tiến bộ nhanh hơn người khác nhờ năng lực tư duy vượt trội này.',
      careerImpact: 'focused_learner',
    },
    head_q4_b: {
      trait:
        'Đường Trí Đạo có nhánh rẽ thể hiện bạn là người đa tài đa nghề với nhiều sở trường. Bạn có thể thành công ở nhiều lĩnh vực khác nhau và thường là người "biết nhiều thứ". Điều này cho bạn nhiều lựa chọn nghề nghiệp, nhưng nên chọn một lĩnh vực chính để tập trung phát triển sâu.',
      careerImpact: 'multi_talented',
    },
    head_q4_c: {
      trait:
        'Đường Trí Đạo bị đứt đoạn gợi ý có những thay đổi lớn trong sự nghiệp hoặc cách suy nghĩ. Bạn có thể trải qua chuyển đổi nghề, hoặc một sự kiện làm thay đổi hoàn toàn cách nhìn của bạn. Theo như tôi thấy, nếu hai đoạn đường đứt mà chồng lên nhau, đây là dấu hiệu chuyển đổi suôn sẻ. Còn nếu cách xa nhau, bạn cần chuẩn bị kỹ hơn cho bước ngoặt — nhưng kết quả cuối cùng sẽ tốt đẹp.',
      careerImpact: 'career_change',
    },
    head_q4_d: {
      trait:
        'Đường Trí Đạo mờ và nông cho thấy bạn có trực giác và nhạy cảm tốt, nhưng cần phát triển thêm kỹ năng tập trung. Bạn thường hiểu người khác qua cảm nhận hơn là logic. Nên rèn luyện thói quen đọc sách, thiền định hoặc học thêm kỹ năng mới để tăng cường khả năng tư duy.',
      careerImpact: 'intuitive',
    },
  },

  // ==================== SINH DAO (Life Line) ====================
  life_q1: {
    life_q1_a: {
      trait:
        'Đường Sinh Đạo bắt đầu gần ngón cái cho thấy bạn có thể lực tốt và năng lượng cao. Tuy nhiên, cần chú ý kiểm soát cảm xúc và stress để tránh ảnh hưởng đến sức khỏe. Tập thể dục đều đặn và có thời gian thư giãn sẽ giúp bạn duy trì phong độ tốt nhất.',
      healthImpact: 'strong_physical',
      personalityImpact: 'energetic',
    },
    life_q1_b: {
      trait:
        'Đường Sinh Đạo bắt đầu gần ngón trỏ thể hiện tham vọng lớn và ý chí mạnh mẽ. Bạn có năng lượng dồi dào để theo đuổi những mục tiêu cao cả. Đây là dấu hiệu của người lãnh đạo bẩm sinh — bạn luôn muốn vươn lên và không bao giờ hài lòng với hiện tại.',
      healthImpact: 'ambitious_energy',
      personalityImpact: 'ambitious',
    },
    life_q1_c: {
      trait:
        'Đường Sinh Đạo bắt đầu giữa ngón cái và ngón trỏ là vị trí lý tưởng nhất, cho thấy sức khỏe cân bằng và tinh thần ổn định. Bạn có nền tảng tốt để xây dựng cuộc sống hạnh phúc và lâu dài. Đây là điểm bắt đầu mà hầu hết các nhà tướng học coi là tốt lành.',
      healthImpact: 'balanced_health',
      personalityImpact: 'stable',
    },
    life_q1_d: {
      trait:
        'Đường Sinh Đạo rất gần mép bàn tay cho thấy bạn nhạy cảm với môi trường và dễ bị ảnh hưởng bởi những thay đổi xung quanh. Cần đặc biệt chú ý bảo vệ sức khỏe, tránh nơi ô nhiễm và duy trì lối sống lành mạnh. Khi được chăm sóc tốt, bạn sẽ có sức khỏe ổn định.',
      healthImpact: 'sensitive',
      personalityImpact: 'sensitive',
    },
  },
  life_q2: {
    life_q2_a: {
      trait:
        'Đường Sinh Đạo cong rộng xa ngón cái thể hiện năng lượng sống tràn đầy và thể chất cường tráng. Bạn là người năng động, thích vận động và hoạt động ngoài trời. Sức chịu đựng của bạn rất tốt — bạn có thể làm việc hoặc tập luyện cường độ cao mà không dễ mệt mỏi.',
      healthImpact: 'vigorous',
    },
    life_q2_b: {
      trait:
        'Đường Sinh Đạo cong gần ngón cái cho thấy bạn cần chú ý nghỉ ngơi và thư giãn nhiều hơn. Không nên làm việc quá sức hoặc thức khuya thường xuyên. Hãy đầu tư vào giấc ngủ chất lượng, ăn uống lành mạnh và tập thể dục nhẹ nhàng để đảm bảo sức khỏe lâu dài.',
      healthImpact: 'needs_rest',
    },
    life_q2_c: {
      trait:
        'Đường Sinh Đạo gần như thẳng cho thấy bạn có lối sống điều độ và kỷ luật, nhưng có thể thiếu sự linh hoạt và niềm vui trong cuộc sống. Hãy thêm hoạt động thể chất, giải trí và kết nối xã hội để tăng cường sức khỏe toàn diện — cả thể chất lẫn tinh thần.',
      healthImpact: 'disciplined',
    },
    life_q2_d: {
      trait:
        'Đường Sinh Đạo lượn sóng cho thấy sức khỏe có những giai đoạn thăng trầm. Có thể có những đợt ốm hoặc mệt mỏi bất ngờ. Điều quan trọng là duy trì lối sống lành mạnh, khám sức khỏe định kỳ và không chủ quan khi cảm thấy không khỏe.',
      healthImpact: 'fluctuating',
    },
  },
  life_q3: {
    life_q3_a: {
      trait:
        'Đường Sinh Đạo dài đến cổ tay là dấu hiệu của sức sống bền bỉ và tuổi thọ cao. Bạn có năng lượng dồi dào suốt cuộc đời và khả năng vượt qua bệnh tật nhanh chóng. Đây là một trong những dấu hiệu tốt nhất trên bàn tay về mặt sức khỏe.',
      healthImpact: 'longevity',
    },
    life_q3_b: {
      trait:
        'Đường Sinh Đạo trung bình cho thấy sức khỏe ổn định và đủ để bạn sống cuộc sống bình thường, khỏe mạnh. Điều quan trọng là duy trì thói quen tốt — ăn uống cân bằng, ngủ đủ giấc, tập thể dục đều đặn — để đảm bảo sức khỏe lâu dài.',
      healthImpact: 'stable_health',
    },
    life_q3_c: {
      trait:
        'Đường Sinh Đạo ngắn KHÔNG có nghĩa là tuổi thọ ngắn — đây là hiểu lầm phổ biến nhất về xem chỉ tay. Nó chỉ cho thấy bạn cần chú ý chăm sóc sức khỏe nhiều hơn người bình thường. Sống tích cực, ăn uống lành mạnh và tập thể dục là cách tốt nhất để cải thiện.',
      healthImpact: 'needs_attention',
    },
    life_q3_d: {
      trait:
        'Đường Sinh Đạo rất dài thể hiện sinh lực tràn đầy và sức chịu đựng phi thường. Bạn có cơ thể khỏe mạnh, ít bệnh tật và khả năng hồi phục nhanh. Đây là bàn tay của người có thể sống khỏe mạnh đến tuổi già — nhưng vẫn cần duy trì lối sống lành mạnh.',
      healthImpact: 'excellent_vitality',
    },
  },
  life_q4: {
    life_q4_a: {
      trait:
        'Đường Sinh Đạo rõ ràng và liên tục là dấu hiệu tốt lành nhất. Cuộc sống của bạn sẽ ổn định, ít biến động lớn và sức khỏe được duy trì tốt qua các giai đoạn. Bạn có nền tảng vững chắc để xây dựng cuộc đời thành công và hạnh phúc.',
      healthImpact: 'smooth_life',
    },
    life_q4_b: {
      trait:
        'Đường Sinh Đạo bị đứt đoạn cho thấy có những biến động hoặc thay đổi lớn trong cuộc sống. Có thể là chuyển nơi ở, thay đổi nghề nghiệp, hoặc một sự kiện lớn làm thay đổi cuộc đời. Tuy nhiên, phần lớn những thay đổi này sẽ dẫn đến kết quả tích cực về lâu dài.',
      healthImpact: 'major_changes',
    },
    life_q4_c: {
      trait:
        'Đường Sinh Đạo có nhiều đường song song là dấu hiệu rất tốt — trong nhân tướng học gọi là "thiên thần hộ mệnh" hoặc "đường bảo hộ". Bạn luôn được bảo hộ và hỗ trợ từ người thân, bạn bè hoặc quý nhân. Theo như tôi phân tích, đường sinh đạo kép (song song) còn cho thấy sức sống mạnh gấp đôi, khả năng hồi phục nhanh và bản lĩnh vượt qua mọi khó khăn.',
      healthImpact: 'protected_agile',
    },
    life_q4_d: {
      trait:
        'Đường Sinh Đạo có nhánh rẽ cho thấy cuộc đời bạn sẽ có nhiều sự kiện quan trọng và cơ hội. Mỗi nhánh rẽ là một bước ngoặt — có thể là cơ hội mới, mối quan hệ mới, hoặc sự thay đổi tích cực. Bạn sẽ có cuộc đời phong phú và đầy trải nghiệm.',
      healthImpact: 'eventful',
    },
  },

  // ==================== SU NGHIEP (Fate Line) ====================
  fate_q1: {
    fate_q1_a: {
      trait:
        'Đường Sự Nghiệp bắt đầu từ cổ tay thẳng lên cho thấy bạn có con đường sự nghiệp rõ ràng từ rất sớm. Từ nhỏ, bạn đã biết mình muốn gì và kiên định theo đuổi mục tiêu. Đây là dấu hiệu của người có sự nghiệp ổn định và phát triển theo lộ trình rõ ràng — từ nhân viên đến quản lý, lãnh đạo.',
      careerImpact: 'clear_early_path',
    },
    fate_q1_b: {
      trait:
        'Đường Sự Nghiệp bắt đầu từ giữa lòng bàn tay cho thấy bạn sẽ tự tay gây dựng sự nghiệp thành công. Giai đoạn đầu đời có thể chưa tìm được hướng đi, nhưng sau 30 tuổi sẽ là bước ngoặt lớn. Đây là bàn tay của những doanh nhân tự thân — khởi đầu từ hai bàn tay trắng nhưng đạt thành công lớn.',
      careerImpact: 'self_made_late',
    },
    fate_q1_c: {
      trait:
        'Đường Sự Nghiệp bắt đầu từ đường Sinh Đạo cho thấy bạn là người độc lập và có ý chí vươn lên rất cao. Bạn sẽ đạt thành công bằng chính năng lực của mình, không cần dựa vào ai. Tinh thần tự lực tự cường là điểm mạnh lớn nhất trong sự nghiệp của bạn.',
      careerImpact: 'independent_achiever',
    },
    fate_q1_d: {
      trait:
        'Không có đường Sự Nghiệp rõ ràng KHÔNG có nghĩa là bạn sẽ không thành công — đây là hiểu lầm phổ biến. Theo như tôi thấy, nhiều người thành đạt không có đường Sự Nghiệp vì họ tự tạo con đường riêng, không đi theo khuôn mẫu nào. Bạn là người tự do, linh hoạt, có thể làm nhiều nghề và thành công ở nhiều lĩnh vực. Điều quan trọng là hãy tin vào bản thân và không ngừng khám phá.',
      careerImpact: 'free_spirit',
    },
  },
  fate_q2: {
    fate_q2_a: {
      trait:
        'Đường Sự Nghiệp rõ và thẳng cho thấy con đường công danh thuận lợi và rõ ràng. Bạn có sự tập trung cao, biết chính xác mình muốn gì và làm thế nào để đạt được. Trong công việc, bạn là người hiệu quả và luôn đạt mục tiêu đúng hạn hoặc sớm hơn dự kiến.',
      careerImpact: 'clear_successful',
    },
    fate_q2_b: {
      trait:
        'Đường Sự Nghiệp cong về phía ngón trỏ (ngón Jupiter) cho thấy bạn có tham vọng lớn và khả năng lãnh đạo bẩm sinh. Bạn sẽ đạt vị trí cao trong công việc — quản lý, giám đốc hoặc lãnh đạo tổ chức. Người khác tự nhiên sẽ tin tưởng và đi theo sự dẫn dắt của bạn.',
      careerImpact: 'ambitious_leader',
    },
    fate_q2_c: {
      trait:
        'Đường Sự Nghiệp cong về phía ngón út (ngón Mercury) cho thấy bạn có khả năng giao tiếp, thương lượng và kinh doanh xuất sắc. Bạn phù hợp với công việc liên quan đến bán hàng, marketing, truyền thông, ngoại giao hoặc bất kỳ lĩnh vực nào đòi hỏi kỹ năng xã hội.',
      careerImpact: 'social_business',
    },
    fate_q2_d: {
      trait:
        'Đường Sự Nghiệp lượn sóng (zig zag) cho thấy sự nghiệp của bạn sẽ trải qua nhiều thay đổi và thử thách. Bạn có thể đổi việc, chuyển ngành hoặc trải qua những giai đoạn khó khăn. Nhưng chính những kinh nghiệm đa dạng này tạo nên bản lĩnh và sự thành công đặc biệt của bạn.',
      careerImpact: 'changing_growth',
    },
  },
  fate_q3: {
    fate_q3_a: {
      trait:
        'Đường Sự Nghiệp dày và rõ ràng cho thấy bạn có ý chí sắt thép và quyết tâm cao. Khi đã đặt mục tiêu, không gì có thể cản trở bạn. Con đường sự nghiệp sẽ thuận lợi, ít trở ngại lớn và bạn sẽ dần tiến đến thành công vững chắc. Đây là dấu hiệu của người có "mệnh phú quý".',
      careerImpact: 'strong_determined',
    },
    fate_q3_b: {
      trait:
        'Đường Sự Nghiệp nhạt và mờ cho thấy bạn đang chưa tìm được hướng đi phù hợp hoặc không hài lòng với công việc hiện tại. Đừng lo lắng — đây là tín hiệu để bạn suy nghĩ lại và tìm kiếm một con đường mới. Khi tìm đúng đam mê, đường Sự Nghiệp sẽ dần trở nên rõ ràng hơn.',
      careerImpact: 'unsatisfied_seeking',
    },
    fate_q3_c: {
      trait:
        'Đường Sự Nghiệp đoạn đầu rõ, đoạn sau mờ cho thấy bạn có khởi đầu tuyệt vời nhưng cần nỗ lực liên tục để duy trì thành công. Đừng chủ quan khi mọi việc đang thuận lợi — hãy tiếp tục học hỏi, phát triển và thích nghi với thay đổi để đảm bảo sự nghiệp bền vững.',
      careerImpact: 'strong_start_fading',
    },
    fate_q3_d: {
      trait:
        'Đường Sự Nghiệp đoạn đầu mờ, đoạn sau rõ là dấu hiệu của "nở muộn mà tốt lành" — giai đoạn đầu đời có thể khó khăn, lang thang tìm hướng, nhưng càng về sau sự nghiệp càng sáng rõ và thành công. Theo như tôi phân tích, người có đường "dưới phương" thường bắt đầu tỏa sáng từ trung niên (sau tuổi 35-40). Nhiều doanh nhân và lãnh đạo nổi tiếng có dạng đường Sự Nghiệp giống bạn.',
      careerImpact: 'late_bloomer',
    },
  },
  fate_q4: {
    fate_q4_a: {
      trait:
        'Đường Sự Nghiệp liên tục, không đứt cho thấy sự ổn định và bền vững trong công việc. Bạn là người đáng tin cậy, nhất quán và sẽ được đánh giá cao trong sự nghiệp. Con đường thăng tiến của bạn rõ ràng và chắc chắn — chỉ cần kiên trì, thành công sẽ đến.',
      careerImpact: 'stable_reliable',
    },
    fate_q4_b: {
      trait:
        'Đường Sự Nghiệp bị đứt đoạn cho thấy có những bước ngoặt lớn trong sự nghiệp. Bạn có thể trải qua việc mất việc, chuyển ngành hoặc bắt đầu lại từ đầu. Nhưng mỗi lần "reset" sẽ đưa bạn đến gần hơn với sự nghiệp đích thực của mình. Cuối cùng, bạn sẽ tìm được hướng đi đúng.',
      careerImpact: 'career_restart',
    },
    fate_q4_c: {
      trait:
        'Đường Sự Nghiệp cắt đường Sinh Đạo cho thấy bạn là người sẵn sàng hy sinh rất nhiều để đạt mục tiêu sự nghiệp. Bạn có chí tiến thủ rất cao và sẵn sàng làm việc không mệt mỏi. Tuy nhiên, cần cân bằng giữa sự nghiệp và sức khỏe — thành công không ý nghĩa nếu mất đi sức khỏe.',
      careerImpact: 'driven_sacrifice',
    },
    fate_q4_d: {
      trait:
        'Đường Sự Nghiệp tách khỏi đường Sinh Đạo cho thấy bạn là người thích khám phá và tìm kiếm những cơ hội mới. Bạn không ngại mạo hiểm và thường tìm thấy thành công ở những con đường ít người đi. Tư duy đột phá này giúp bạn tạo ra giá trị độc đáo trong sự nghiệp.',
      careerImpact: 'risk_taker_explorer',
    },
  },
};
