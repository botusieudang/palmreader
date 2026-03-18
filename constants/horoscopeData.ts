export interface ZodiacSign {
  id: string;
  name: string;
  nameVi: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  color: string;
  rulingPlanet: string;
  traits: string[];
}

export interface DailyHoroscope {
  overall: { score: number; text: string };
  love: { score: number; text: string };
  career: { score: number; text: string };
  health: { score: number; text: string };
  finance: { score: number; text: string };
  luckyNumber: number;
  luckyColor: string;
  advice: string;
}

export const ELEMENT_COLORS: Record<string, { bg: string; accent: string }> = {
  fire: { bg: '#2d1a0a', accent: '#f97316' },
  earth: { bg: '#1a2d0a', accent: '#84cc16' },
  air: { bg: '#0a1a2d', accent: '#38bdf8' },
  water: { bg: '#0a0f2d', accent: '#818cf8' },
};

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    nameVi: 'Bạch Dương',
    symbol: '♈',
    element: 'fire',
    dateRange: '21/03 - 19/04',
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    color: '#ef4444',
    rulingPlanet: 'Sao Hỏa',
    traits: ['Dũng cảm', 'Quyết đoán', 'Năng động'],
  },
  {
    id: 'taurus',
    name: 'Taurus',
    nameVi: 'Kim Ngưu',
    symbol: '♉',
    element: 'earth',
    dateRange: '20/04 - 20/05',
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    color: '#22c55e',
    rulingPlanet: 'Sao Kim',
    traits: ['Kiên nhẫn', 'Đáng tin cậy', 'Thực tế'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    nameVi: 'Song Tử',
    symbol: '♊',
    element: 'air',
    dateRange: '21/05 - 20/06',
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    color: '#eab308',
    rulingPlanet: 'Sao Thủy',
    traits: ['Linh hoạt', 'Hoạt ngôn', 'Tò mò'],
  },
  {
    id: 'cancer',
    name: 'Cancer',
    nameVi: 'Cự Giải',
    symbol: '♋',
    element: 'water',
    dateRange: '21/06 - 22/07',
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    color: '#c4b5fd',
    rulingPlanet: 'Mặt Trăng',
    traits: ['Nhạy cảm', 'Trung thành', 'Bảo bọc'],
  },
  {
    id: 'leo',
    name: 'Leo',
    nameVi: 'Sư Tử',
    symbol: '♌',
    element: 'fire',
    dateRange: '23/07 - 22/08',
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    color: '#f59e0b',
    rulingPlanet: 'Mặt Trời',
    traits: ['Tự tin', 'Hào phóng', 'Lãnh đạo'],
  },
  {
    id: 'virgo',
    name: 'Virgo',
    nameVi: 'Xử Nữ',
    symbol: '♍',
    element: 'earth',
    dateRange: '23/08 - 22/09',
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    color: '#a3e635',
    rulingPlanet: 'Sao Thủy',
    traits: ['Cẩn thận', 'Phân tích', 'Khiêm tốn'],
  },
  {
    id: 'libra',
    name: 'Libra',
    nameVi: 'Thiên Bình',
    symbol: '♎',
    element: 'air',
    dateRange: '23/09 - 22/10',
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    color: '#ec4899',
    rulingPlanet: 'Sao Kim',
    traits: ['Công bằng', 'Hài hòa', 'Lịch thiệp'],
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    nameVi: 'Bọ Cạp',
    symbol: '♏',
    element: 'water',
    dateRange: '23/10 - 21/11',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    color: '#dc2626',
    rulingPlanet: 'Sao Diêm Vương',
    traits: ['Mãnh liệt', 'Bí ẩn', 'Quyết tâm'],
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    nameVi: 'Nhân Mã',
    symbol: '♐',
    element: 'fire',
    dateRange: '22/11 - 21/12',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    color: '#a855f7',
    rulingPlanet: 'Sao Mộc',
    traits: ['Lạc quan', 'Phiêu lưu', 'Triết lý'],
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    nameVi: 'Ma Kết',
    symbol: '♑',
    element: 'earth',
    dateRange: '22/12 - 19/01',
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    color: '#78716c',
    rulingPlanet: 'Sao Thổ',
    traits: ['Kỷ luật', 'Tham vọng', 'Thận trọng'],
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    nameVi: 'Bảo Bình',
    symbol: '♒',
    element: 'air',
    dateRange: '20/01 - 18/02',
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    color: '#06b6d4',
    rulingPlanet: 'Sao Thiên Vương',
    traits: ['Sáng tạo', 'Độc lập', 'Nhân đạo'],
  },
  {
    id: 'pisces',
    name: 'Pisces',
    nameVi: 'Song Ngư',
    symbol: '♓',
    element: 'water',
    dateRange: '19/02 - 20/03',
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    color: '#2dd4bf',
    rulingPlanet: 'Sao Hải Vương',
    traits: ['Mơ mộng', 'Đồng cảm', 'Trực giác'],
  },
];

export function getSignFromDate(month: number, day: number): ZodiacSign {
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === sign.endMonth) {
      if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) return sign;
    } else if (sign.startMonth < sign.endMonth) {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) return sign;
    } else {
      // Capricorn: Dec 22 - Jan 19
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) return sign;
    }
  }
  return ZODIAC_SIGNS[0]; // fallback
}

// Seed-based pseudo-random for consistent daily results
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function getDailyHoroscope(signId: string, date: Date): DailyHoroscope {
  const dayKey = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const signIndex = ZODIAC_SIGNS.findIndex((s) => s.id === signId);
  const seed = dayKey * 13 + signIndex * 7 + 42;
  const rand = seededRandom(seed);

  const score = () => Math.floor(rand() * 5) + 5; // 5-9
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

  const overallTexts = [
    'Hôm nay là ngày tuyệt vời để bắt đầu những dự định mới. Năng lượng tích cực bao quanh bạn, hãy tận dụng cơ hội này.',
    'Một ngày bình yên và thuận lợi đang chờ đón bạn. Hãy giữ tâm thái ổn định và tận hưởng từng khoảnh khắc.',
    'Vũ trụ đang gửi tín hiệu tốt lành đến bạn. Hãy tin vào trực giác và đừng ngần ngại thể hiện bản thân.',
    'Hôm nay bạn sẽ cảm nhận được nguồn năng lượng mạnh mẽ từ bên trong. Đây là thời điểm phù hợp để tập trung vào mục tiêu quan trọng.',
    'Các vì sao cho thấy đây là ngày phù hợp để kết nối với mọi người. Hãy mở rộng mối quan hệ và lắng nghe nhiều hơn.',
    'Năng lượng hôm nay hướng về sự sáng tạo và đổi mới. Đừng sợ thử những điều mới mẻ, kết quả có thể bất ngờ.',
    'Một ngày đòi hỏi sự kiên nhẫn và khéo léo. Hãy bình tĩnh xử lý mọi tình huống, thành quả sẽ đến vào cuối ngày.',
  ];

  const loveTexts = [
    'Tình yêu đang nở rộ xung quanh bạn. Nếu đang trong mối quan hệ, hãy dành thời gian chất lượng cho người ấy.',
    'Đây là ngày tốt để thể hiện tình cảm. Một cử chỉ nhỏ có thể tạo nên sự khác biệt lớn trong mối quan hệ.',
    'Nếu đang độc thân, hôm nay có thể xuất hiện người đặc biệt. Hãy mở lòng và để duyên số dẫn lối.',
    'Sự chân thành là chìa khóa hôm nay. Hãy lắng nghe trái tim và đừng giấu giếm cảm xúc thật của mình.',
    'Tình cảm có thể gặp chút sóng gió nhỏ, nhưng đừng lo — đó là cơ hội để hiểu nhau hơn và gắn kết sâu sắc hơn.',
  ];

  const careerTexts = [
    'Công việc hôm nay diễn ra suôn sẻ. Sự tập trung và nỗ lực của bạn sẽ được ghi nhận bởi cấp trên.',
    'Đây là thời điểm tốt để trình bày ý tưởng mới. Sự sáng tạo của bạn sẽ gây ấn tượng mạnh.',
    'Hãy cẩn thận với các quyết định tài chính trong công việc. Suy nghĩ kỹ trước khi cam kết dự án lớn.',
    'Cơ hội thăng tiến đang đến gần. Hãy thể hiện năng lực lãnh đạo và tinh thần trách nhiệm.',
    'Hợp tác nhóm là yếu tố then chốt hôm nay. Hãy lắng nghe đồng nghiệp và cùng nhau tìm giải pháp tốt nhất.',
  ];

  const healthTexts = [
    'Sức khỏe ổn định, năng lượng tốt. Hãy duy trì thói quen tập luyện và ăn uống lành mạnh.',
    'Hôm nay cần chú ý nghỉ ngơi đầy đủ. Đừng ép bản thân quá sức, cơ thể cần thời gian phục hồi.',
    'Tinh thần sảng khoái, đây là ngày tốt để bắt đầu thói quen mới về sức khỏe như yoga hoặc thiền.',
    'Hãy uống đủ nước và ăn nhiều rau xanh hôm nay. Cơ thể bạn đang cần được thanh lọc và nạp năng lượng.',
    'Năng lượng dồi dào, phù hợp cho các hoạt động thể chất cường độ cao. Hãy tận dụng để rèn luyện.',
  ];

  const financeTexts = [
    'Tài chính ổn định, có thể có khoản thu nhập bất ngờ. Hãy tiết kiệm và đầu tư thông minh.',
    'Cẩn thận với chi tiêu hôm nay. Tránh mua sắm bốc đồng và tập trung vào những thứ thật sự cần thiết.',
    'Đây là ngày tốt để lên kế hoạch tài chính dài hạn. Hãy xem xét lại ngân sách và mục tiêu tiết kiệm.',
    'Có cơ hội kiếm thêm thu nhập từ kỹ năng phụ. Hãy mở rộng tầm nhìn và tìm kiếm nguồn thu mới.',
    'Tài lộc hanh thông, nhưng đừng quên chia sẻ với người thân. Sự hào phóng sẽ mang lại may mắn.',
  ];

  const adviceTexts = [
    'Hãy tin vào bản thân và đừng so sánh với người khác. Con đường của bạn là duy nhất.',
    'Dành ít phút thiền định hoặc hít thở sâu để cân bằng năng lượng trong ngày.',
    'Đôi khi lùi một bước là tiến hai bước. Hãy kiên nhẫn với quá trình.',
    'Ghi lại những điều biết ơn hôm nay — sự biết ơn thu hút thêm điều tốt đẹp.',
    'Hãy để trực giác dẫn đường. Bạn biết nhiều hơn những gì mình nghĩ.',
    'Kết nối với thiên nhiên hôm nay — dù chỉ là nhìn bầu trời hay đi dạo ngắn.',
    'Sự kiên trì là siêu năng lực của bạn. Tiếp tục tiến bước, thành quả đang chờ phía trước.',
  ];

  const luckyColors = ['Đỏ', 'Xanh dương', 'Vàng', 'Tím', 'Hồng', 'Xanh lá', 'Cam', 'Trắng', 'Bạc', 'Xanh ngọc'];

  return {
    overall: { score: score(), text: pick(overallTexts) },
    love: { score: score(), text: pick(loveTexts) },
    career: { score: score(), text: pick(careerTexts) },
    health: { score: score(), text: pick(healthTexts) },
    finance: { score: score(), text: pick(financeTexts) },
    luckyNumber: Math.floor(rand() * 99) + 1,
    luckyColor: pick(luckyColors),
    advice: pick(adviceTexts),
  };
}
