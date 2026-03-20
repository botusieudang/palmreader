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

// ============================================================
// HƯỚNG 3: Nội dung theo đặc tính nguyên tố + hành tinh chủ quản
//           Score theo chu kỳ 7 ngày (tuần) + 28 ngày (tháng âm)
// ============================================================

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Ngày thứ mấy kể từ epoch (deterministic)
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

// Chu kỳ tuần (0-6) và tháng âm (0-27) để tạo biến đổi tự nhiên
function getCycles(date: Date) {
  const totalDays = Math.floor(date.getTime() / 86400000);
  return {
    weekCycle: totalDays % 7,       // 0-6
    moonCycle: totalDays % 28,      // 0-27 (chu kỳ trăng)
    seasonCycle: totalDays % 91,    // 0-90 (mùa ~3 tháng)
  };
}

// Score tính theo: nguyên tố phù hợp với ngày trong tuần + phase trăng
// Lửa mạnh đầu tuần, Đất mạnh giữa tuần, Khí mạnh cuối tuần, Nước mạnh cuối tuần
const ELEMENT_DAY_BONUS: Record<string, number[]> = {
  fire:  [2, 1, 0, -1, 0, 1, 1],   // T2 mạnh nhất
  earth: [0, 1, 2, 1, 0, -1, 0],   // T4 mạnh nhất
  air:   [-1, 0, 0, 1, 2, 1, 0],   // T6 mạnh nhất
  water: [0, -1, 0, 0, 1, 1, 2],   // CN mạnh nhất
};

// Moon phase ảnh hưởng score: trăng tròn (14) boost water/air, trăng non (0) boost fire/earth
function moonBonus(element: string, moonCycle: number): number {
  const moonPhase = moonCycle / 28; // 0-1
  switch (element) {
    case 'fire': return moonPhase < 0.25 ? 1 : moonPhase > 0.75 ? 1 : 0;
    case 'earth': return moonPhase < 0.25 ? 1 : 0;
    case 'air': return moonPhase > 0.35 && moonPhase < 0.65 ? 1 : 0;
    case 'water': return moonPhase > 0.35 && moonPhase < 0.65 ? 2 : 0;
    default: return 0;
  }
}

function calcScore(base: number, element: string, weekCycle: number, moonCycle: number, rand: () => number): number {
  const dayB = ELEMENT_DAY_BONUS[element]?.[weekCycle] ?? 0;
  const moonB = moonBonus(element, moonCycle);
  const noise = Math.floor(rand() * 2) - 1; // -1, 0, or 1
  return Math.min(10, Math.max(3, base + dayB + moonB + noise));
}

// ---- TEXT POOLS: theo NGUYÊN TỐ, không phải chung ----

type ElementTexts = Record<string, string[]>;

const OVERALL_BY_ELEMENT: ElementTexts = {
  fire: [
    'Năng lượng của bạn bùng cháy mạnh mẽ hôm nay. Sự tự tin tỏa sáng khiến mọi người xung quanh bị cuốn hút. Hãy dẫn dắt và hành động quyết đoán.',
    'Tinh thần chiến binh trong bạn được đánh thức. Đây là ngày tuyệt vời để khởi đầu dự án mới hoặc đối mặt với thử thách đã trì hoãn.',
    'Sức nóng từ bên trong thúc đẩy bạn tiến về phía trước. Đừng ngại bước ra khỏi vùng an toàn — sự dũng cảm sẽ được đền đáp.',
    'Hôm nay bạn tràn đầy cảm hứng và động lực. Hãy biến ý tưởng thành hành động, ngọn lửa đam mê đang cháy đúng lúc.',
    'Năng lượng Hỏa mang đến sự quyết đoán. Tuy nhiên, hãy cẩn thận không để sự nóng vội dẫn đến những quyết định thiếu suy nghĩ.',
    'Bạn đang ở đỉnh cao năng lượng. Mọi thứ bạn chạm vào đều có khả năng bùng nổ tích cực. Tận dụng ngày hôm nay để tạo đà.',
    'Sự nhiệt huyết tự nhiên của bạn truyền cảm hứng cho những người xung quanh. Hãy lãnh đạo bằng gương mẫu và lòng dũng cảm.',
  ],
  earth: [
    'Hôm nay mang đến sự ổn định và vững chắc. Bạn cảm thấy kết nối sâu sắc với mặt đất, từ đó đưa ra những quyết định thực tế.',
    'Năng lượng Đất giúp bạn kiên nhẫn và bền bỉ. Đây là ngày phù hợp để hoàn thành những công việc đòi hỏi sự tỉ mỉ.',
    'Sự thực tế là sức mạnh lớn nhất của bạn hôm nay. Hãy tập trung vào những gì có thể đo đếm và chạm tay vào được.',
    'Bạn đang trong giai đoạn tích lũy — như hạt giống đang âm thầm nảy mầm. Kiên nhẫn chờ đợi, kết quả sẽ đến đúng thời điểm.',
    'Hôm nay thuận lợi cho việc xây dựng nền tảng. Dù là tài chính, sức khỏe hay mối quan hệ — hãy đầu tư cho dài hạn.',
    'Sự điềm tĩnh giúp bạn nhìn thấy cơ hội mà người khác bỏ lỡ. Tin vào phán đoán của mình và tiến bước chắc chắn.',
    'Năng lượng hôm nay thích hợp để sắp xếp lại cuộc sống. Dọn dẹp, lên kế hoạch, tổ chức lại — mọi thứ sẽ rõ ràng hơn.',
  ],
  air: [
    'Tư duy của bạn sắc bén hôm nay. Những ý tưởng sáng tạo liên tục tuôn trào — hãy ghi chép lại trước khi chúng bay đi.',
    'Giao tiếp là chìa khóa vàng. Hãy mở lòng chia sẻ suy nghĩ và lắng nghe — những cuộc trò chuyện hôm nay có thể thay đổi cuộc chơi.',
    'Năng lượng Khí mang đến sự linh hoạt. Bạn dễ dàng thích nghi với mọi tình huống và tìm ra giải pháp sáng tạo.',
    'Trí tò mò dẫn dắt bạn đến những khám phá thú vị. Đừng ngại đặt câu hỏi và tìm hiểu những điều mới mẻ.',
    'Hôm nay thuận lợi cho networking và kết nối xã hội. Những mối quan hệ mới có thể mở ra cánh cửa bất ngờ.',
    'Sự tự do trong suy nghĩ giúp bạn nhìn nhận vấn đề từ góc độ mới. Phá vỡ khuôn mẫu cũ để tìm đường đi tốt hơn.',
    'Năng lượng trí tuệ dồi dào. Đây là ngày tốt để học hỏi, đọc sách, hoặc bắt đầu một kỹ năng mới.',
  ],
  water: [
    'Trực giác của bạn đặc biệt mạnh hôm nay. Hãy lắng nghe tiếng nói bên trong — nó đang dẫn đường đến những quyết định đúng đắn.',
    'Cảm xúc sâu sắc giúp bạn kết nối chân thành với mọi người. Sự đồng cảm là món quà quý giá nhất bạn có thể trao tặng.',
    'Năng lượng Nước mang đến sự chữa lành. Nếu có vết thương lòng cần được xoa dịu, hôm nay là thời điểm thích hợp.',
    'Dòng chảy cảm xúc hôm nay êm dịu và sâu lắng. Hãy dành thời gian cho bản thân — thiền, viết nhật ký, hoặc nghe nhạc.',
    'Trí tưởng tượng phong phú mở ra những khả năng mới. Hãy tin vào giấc mơ và biến chúng thành hiện thực từng bước.',
    'Sự nhạy cảm giúp bạn cảm nhận được điều mà người khác không nói. Dùng khả năng này để giúp đỡ và hỗ trợ mọi người.',
    'Hôm nay thuận lợi cho sáng tạo nghệ thuật. Nếu bạn có đam mê viết, vẽ, hay âm nhạc — hãy để cảm xúc tuôn trào.',
  ],
};

const LOVE_BY_ELEMENT: ElementTexts = {
  fire: [
    'Đam mê bùng cháy trong tình yêu. Nếu đang trong mối quan hệ, hãy tạo bất ngờ cho đối phương — sự lãng mạn là nhiên liệu.',
    'Sức hút tự nhiên của bạn đặc biệt mạnh hôm nay. Nếu độc thân, đừng ngại chủ động tiếp cận người bạn thích.',
    'Tình yêu cần sự dũng cảm. Đừng ngại bày tỏ cảm xúc thật — sự chân thành mãnh liệt sẽ chạm đến trái tim đối phương.',
    'Ngọn lửa tình yêu cần được chăm sóc. Hãy dành thời gian riêng tư, tạo kỷ niệm mới cùng người bạn yêu.',
  ],
  earth: [
    'Tình yêu cần sự vun đắp kiên nhẫn. Hãy thể hiện tình cảm qua hành động cụ thể — nấu một bữa ăn, tặng một món quà nhỏ.',
    'Sự chung thủy và đáng tin cậy là phẩm chất quyến rũ nhất của bạn hôm nay. Đối phương cảm thấy an toàn bên bạn.',
    'Mối quan hệ cần nền tảng vững chắc. Hãy nói chuyện thẳng thắn về tương lai và kế hoạch chung.',
    'Nếu đang tìm kiếm tình yêu, hãy để mọi thứ diễn ra tự nhiên. Không cần vội vàng, người phù hợp sẽ đến đúng lúc.',
  ],
  air: [
    'Giao tiếp là nền tảng của tình yêu hôm nay. Hãy chia sẻ suy nghĩ, lắng nghe đối phương — sự kết nối trí tuệ rất quan trọng.',
    'Sự hài hước và thông minh khiến bạn hấp dẫn hơn bao giờ hết. Hãy tận hưởng những cuộc trò chuyện sâu sắc.',
    'Nếu độc thân, hôm nay có thể gặp người thú vị qua mạng xã hội hoặc sự kiện. Hãy mở rộng vòng giao tiếp.',
    'Tình yêu cần không gian để thở. Hãy tôn trọng sự tự do cá nhân của nhau — đó là cách yêu trưởng thành.',
  ],
  water: [
    'Cảm xúc sâu sắc làm tình yêu thêm ý nghĩa. Hãy để bản thân dễ bị tổn thương — đó là cách kết nối chân thật nhất.',
    'Trực giác dẫn đường trong tình yêu. Nếu cảm thấy điều gì đó không ổn, hãy tin vào linh cảm của mình.',
    'Sự lãng mạn tự nhiên tỏa ra từ bạn. Đối phương cảm nhận được chiều sâu tình cảm mà bạn dành cho họ.',
    'Nếu đang đau khổ vì tình, hôm nay là ngày chữa lành. Hãy để nước mắt rửa trôi nỗi buồn và mở lòng đón nhận.',
  ],
};

const CAREER_BY_ELEMENT: ElementTexts = {
  fire: [
    'Sự nghiệp cần sự quyết đoán. Hôm nay bạn có năng lượng để dẫn dắt dự án lớn và truyền cảm hứng cho đội nhóm.',
    'Đừng ngại đề xuất ý tưởng táo bạo. Sự mạnh dạn trong công việc sẽ được cấp trên ghi nhận.',
    'Cạnh tranh lành mạnh thúc đẩy bạn phát triển. Hãy đặt mục tiêu cao và nỗ lực hết mình.',
    'Lãnh đạo bằng hành động, không chỉ lời nói. Sự nhiệt huyết của bạn sẽ lan tỏa đến đồng nghiệp.',
  ],
  earth: [
    'Đây là ngày thuận lợi để hoàn thành báo cáo, kế hoạch, hoặc những công việc cần sự cẩn thận.',
    'Sự kiên nhẫn và tỉ mỉ là lợi thế cạnh tranh. Hãy tập trung vào chất lượng thay vì tốc độ.',
    'Quản lý tài chính trong công việc rất quan trọng hôm nay. Xem xét kỹ các con số trước khi ký kết.',
    'Xây dựng uy tín từng bước một. Sự đáng tin cậy của bạn đang tạo nền tảng cho cơ hội thăng tiến.',
  ],
  air: [
    'Hợp tác và giao tiếp là chìa khóa thành công hôm nay. Hãy tổ chức brainstorm hoặc họp nhóm.',
    'Ý tưởng sáng tạo trong công việc tuôn trào. Hãy ghi lại và trình bày — sếp sẽ ấn tượng.',
    'Networking mang đến cơ hội bất ngờ. Đừng bỏ lỡ lời mời tham gia sự kiện hay gặp gỡ.',
    'Kỹ năng thuyết trình và đàm phán của bạn ở đỉnh cao. Tận dụng để đạt thỏa thuận tốt nhất.',
  ],
  water: [
    'Dùng trực giác để đọc hiểu đồng nghiệp và đối tác. Khả năng thấu hiểu giúp bạn đàm phán hiệu quả.',
    'Sáng tạo là lợi thế lớn nhất hôm nay. Hãy đề xuất giải pháp mới cho vấn đề cũ.',
    'Đừng để cảm xúc chi phối quyết định công việc. Cân bằng giữa trái tim và lý trí.',
    'Hôm nay phù hợp cho công việc cần sự tập trung sâu. Tắt thông báo, đóng cửa và làm việc.',
  ],
};

const HEALTH_BY_ELEMENT: ElementTexts = {
  fire: [
    'Năng lượng dồi dào — hãy tập cardio, chạy bộ, hoặc bất kỳ hoạt động cường độ cao nào. Cơ thể bạn đang cần được giải phóng.',
    'Cẩn thận với stress và nóng trong người. Uống đủ nước, tránh đồ cay nóng và rượu bia.',
    'Tinh thần mạnh mẽ nhưng đừng quên nghỉ ngơi. Ngủ đủ giấc để duy trì năng lượng ngày mai.',
    'Tập thể thao đối kháng hoặc võ thuật phù hợp với năng lượng Hỏa hôm nay.',
  ],
  earth: [
    'Cơ thể cần dinh dưỡng cân bằng. Hãy ăn nhiều rau xanh, ngũ cốc nguyên hạt và protein.',
    'Yoga hoặc đi bộ trong công viên giúp cân bằng năng lượng Đất. Kết nối với thiên nhiên là liều thuốc tốt.',
    'Chú ý hệ tiêu hóa. Ăn chậm, nhai kỹ và tránh thực phẩm chế biến sẵn.',
    'Giấc ngủ sâu là ưu tiên hàng đầu. Tạo thói quen ngủ đúng giờ để cơ thể phục hồi tối ưu.',
  ],
  air: [
    'Hệ hô hấp cần được chăm sóc. Tập thở sâu, thiền hoặc ra ngoài hít thở không khí trong lành.',
    'Căng thẳng tinh thần có thể gây đau đầu. Hãy nghỉ mắt, giãn cơ cổ vai gáy thường xuyên.',
    'Hoạt động xã hội tốt cho tinh thần nhưng đừng quên dành thời gian yên tĩnh cho bản thân.',
    'Bài tập nhẹ nhàng như bơi lội, đi xe đạp phù hợp với năng lượng Khí hôm nay.',
  ],
  water: [
    'Cảm xúc ảnh hưởng trực tiếp đến sức khỏe thể chất. Hãy xử lý stress bằng thiền định hoặc viết nhật ký.',
    'Nước là yếu tố quan trọng nhất hôm nay — uống đủ nước, tắm nước ấm, hoặc đi bơi.',
    'Hệ miễn dịch cần được tăng cường. Bổ sung vitamin C, kẽm và nghỉ ngơi đầy đủ.',
    'Giấc mơ có thể phản ánh tình trạng sức khỏe. Chú ý đến những tín hiệu từ cơ thể.',
  ],
};

const FINANCE_BY_ELEMENT: ElementTexts = {
  fire: [
    'Đầu tư mạo hiểm có thể mang lại lợi nhuận, nhưng hãy tính toán kỹ rủi ro trước khi hành động.',
    'Cơ hội kiếm tiền nhanh xuất hiện. Tuy nhiên, đừng để lòng tham che mờ phán đoán.',
    'Chi tiêu cho bản thân hôm nay là đầu tư xứng đáng. Đôi khi cần thưởng cho mình để duy trì động lực.',
    'Tài chính thuận lợi cho kinh doanh và khởi nghiệp. Nếu có ý tưởng, đây là lúc bắt đầu.',
  ],
  earth: [
    'Tiết kiệm và đầu tư dài hạn là chiến lược tốt nhất hôm nay. Đừng bị cám dỗ bởi lợi nhuận ngắn hạn.',
    'Xem xét lại ngân sách tháng này. Cắt giảm chi tiêu không cần thiết để tích lũy cho mục tiêu lớn.',
    'Bất động sản hoặc tài sản hữu hình là lĩnh vực thuận lợi. Nghiên cứu thị trường nếu có kế hoạch.',
    'Sự thận trọng tài chính bảo vệ bạn khỏi rủi ro. Không vay mượn hoặc cho vay số tiền lớn hôm nay.',
  ],
  air: [
    'Thông tin là tiền bạc. Hãy cập nhật tin tức tài chính và tìm hiểu xu hướng thị trường mới.',
    'Hợp tác kinh doanh có thể mang lại cơ hội tốt. Hãy lắng nghe đề xuất từ bạn bè và đối tác.',
    'Đa dạng hóa nguồn thu nhập là chiến lược thông minh. Xem xét freelance hoặc kinh doanh online.',
    'Chi tiêu cho công nghệ, học tập, sách vở là đầu tư có giá trị lâu dài.',
  ],
  water: [
    'Trực giác tài chính nhạy bén hôm nay. Nếu có cảm giác không tốt về một thương vụ, hãy lùi lại.',
    'Tài chính cần sự cân bằng cảm xúc. Đừng mua sắm khi buồn hoặc đầu tư khi quá hưng phấn.',
    'Tiền bạc gắn liền với cảm giác an toàn. Hãy xây dựng quỹ dự phòng để an tâm hơn.',
    'Sự hào phóng với người thân mang lại phước lành tài chính. Cho đi một phần để nhận lại nhiều hơn.',
  ],
};

const ADVICE_BY_ELEMENT: ElementTexts = {
  fire: [
    'Hãy dẫn dắt bằng trái tim nóng bỏng nhưng giữ đầu lạnh. Sự cân bằng giữa đam mê và lý trí là chìa khóa.',
    'Đôi khi ngọn lửa cần được kiểm soát. Học cách kiên nhẫn sẽ giúp bạn đạt được nhiều hơn.',
    'Truyền năng lượng tích cực cho người xung quanh — ánh sáng của bạn không giảm khi thắp sáng cho người khác.',
    'Sự dũng cảm không phải là không sợ hãi, mà là hành động dù biết sợ. Tiến lên phía trước.',
  ],
  earth: [
    'Như cây cần thời gian để ra trái, thành công cũng cần sự kiên nhẫn. Tin vào quá trình.',
    'Đôi khi cần buông bỏ sự cầu toàn. Hoàn thành tốt hơn hoàn hảo — hãy bắt đầu từ bây giờ.',
    'Kết nối với đất — đi chân trần trên cỏ, chăm sóc cây cối, nấu ăn với nguyên liệu tươi.',
    'Sự ổn định là sức mạnh, nhưng đừng để nó trở thành sự cứng nhắc. Linh hoạt khi cần thiết.',
  ],
  air: [
    'Chia sẻ ý tưởng với thế giới — những suy nghĩ giữ riêng sẽ không bao giờ thay đổi được gì.',
    'Đọc một cuốn sách mới hoặc học một kỹ năng mới hôm nay. Trí tuệ là tài sản không bao giờ mất giá.',
    'Lắng nghe nhiều hơn nói. Đôi khi sự im lặng chứa đựng nhiều trí tuệ hơn ngàn lời nói.',
    'Hãy để gió đưa bạn đến những chân trời mới. Đừng sợ thay đổi — đó là bản chất của cuộc sống.',
  ],
  water: [
    'Nước mắt không phải là yếu đuối — đó là cách cơ thể thanh lọc và chữa lành. Hãy để cảm xúc tuôn trào.',
    'Trực giác là la bàn đáng tin nhất. Khi lý trí bối rối, hãy hỏi trái tim mình.',
    'Dành 10 phút thiền cạnh nước — sông, hồ, hoặc thậm chí vòi sen. Năng lượng Nước sẽ cân bằng bạn.',
    'Sự nhạy cảm là siêu năng lực, không phải điểm yếu. Dùng nó để hiểu và giúp đỡ mọi người.',
  ],
};

// Màu may mắn theo nguyên tố
const LUCKY_COLORS_BY_ELEMENT: Record<string, string[]> = {
  fire: ['Đỏ', 'Cam', 'Vàng gold', 'Hồng đào', 'Đỏ rượu'],
  earth: ['Xanh lá', 'Nâu', 'Be', 'Xám đá', 'Xanh ô liu'],
  air: ['Xanh dương', 'Trắng', 'Bạc', 'Tím lavender', 'Xanh pastel'],
  water: ['Xanh ngọc', 'Tím đậm', 'Bạc ánh trăng', 'Xanh biển', 'Xanh mint'],
};

// Số may mắn: dựa theo nguyên tố + ngày
const LUCKY_NUMBER_RANGES: Record<string, [number, number]> = {
  fire: [1, 9],
  earth: [2, 8],
  air: [3, 7],
  water: [4, 9],
};

export function getDailyHoroscope(signId: string, date: Date): DailyHoroscope {
  const sign = ZODIAC_SIGNS.find((s) => s.id === signId) ?? ZODIAC_SIGNS[0];
  const { weekCycle, moonCycle, seasonCycle } = getCycles(date);
  const dayKey = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const signIndex = ZODIAC_SIGNS.findIndex((s) => s.id === signId);
  const seed = dayKey * 13 + signIndex * 7 + 42;
  const rand = seededRandom(seed);

  const el = sign.element;

  // Pick text: dùng seed để chọn nhất quán trong ngày nhưng thay đổi qua ngày
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

  // Base scores khác nhau theo category + element
  const baseScores: Record<string, number> = {
    fire: 7, earth: 6, air: 7, water: 6,
  };
  const base = baseScores[el] ?? 6;

  // Love base: water/fire cao hơn
  const loveBase = el === 'water' ? 7 : el === 'fire' ? 7 : 6;
  // Career base: earth/air cao hơn
  const careerBase = el === 'earth' ? 7 : el === 'air' ? 7 : 6;
  // Health base: earth cao hơn
  const healthBase = el === 'earth' ? 7 : 6;
  // Finance base: earth cao hơn
  const financeBase = el === 'earth' ? 7 : el === 'fire' ? 6 : 6;

  const overallScore = calcScore(base, el, weekCycle, moonCycle, rand);
  const loveScore = calcScore(loveBase, el, (weekCycle + 2) % 7, moonCycle, rand);
  const careerScore = calcScore(careerBase, el, (weekCycle + 4) % 7, moonCycle, rand);
  const healthScore = calcScore(healthBase, el, (weekCycle + 1) % 7, moonCycle, rand);
  const financeScore = calcScore(financeBase, el, (weekCycle + 3) % 7, moonCycle, rand);

  // Lucky number: 2 số dựa vào ngày + element range
  const [lo, hi] = LUCKY_NUMBER_RANGES[el] ?? [1, 9];
  const n1 = lo + Math.floor(rand() * (hi - lo + 1));
  const n2 = (n1 * 10) + Math.floor(rand() * 10);
  const luckyNumber = n2;

  return {
    overall: { score: overallScore, text: pick(OVERALL_BY_ELEMENT[el] ?? OVERALL_BY_ELEMENT.fire) },
    love: { score: loveScore, text: pick(LOVE_BY_ELEMENT[el] ?? LOVE_BY_ELEMENT.fire) },
    career: { score: careerScore, text: pick(CAREER_BY_ELEMENT[el] ?? CAREER_BY_ELEMENT.fire) },
    health: { score: healthScore, text: pick(HEALTH_BY_ELEMENT[el] ?? HEALTH_BY_ELEMENT.fire) },
    finance: { score: financeScore, text: pick(FINANCE_BY_ELEMENT[el] ?? FINANCE_BY_ELEMENT.fire) },
    luckyNumber,
    luckyColor: pick(LUCKY_COLORS_BY_ELEMENT[el] ?? LUCKY_COLORS_BY_ELEMENT.fire),
    advice: pick(ADVICE_BY_ELEMENT[el] ?? ADVICE_BY_ELEMENT.fire),
  };
}
