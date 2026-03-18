import type { ReadingMode, ReadingResult } from '../types/reading';
import type { QuizAnswers } from '../types/palmQuiz';
import { ANSWER_INTERPRETATIONS } from '../constants/palmQuizData';
import { FACE_ANSWER_INTERPRETATIONS } from '../constants/faceQuizData';

// Simple hash function for base64 image data
function hashImage(base64: string): number {
  let hash = 0;
  const sample = base64.substring(0, 5000);
  for (let i = 0; i < sample.length; i++) {
    const chr = sample.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash);
}

// Seeded random (deterministic: same image = same result)
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

// ==================== PALM READING DATA ====================

const palmOverall = [
  'Bàn tay của bạn thể hiện một con người có nội lực mạnh mẽ và trực giác tốt. Các đường chỉ tay rõ ràng cho thấy bạn có cuộc sống phong phú và nhiều trải nghiệm. Nhìn chung, vận mệnh của bạn đang ở giai đoạn phát triển tích cực.',
  'Qua phân tích các đường chỉ tay, bạn là người có tâm hồn nhạy cảm nhưng rất kiên cường. Đường Sinh Mệnh dài và rõ nét cho thấy sức sống dồi dào. Bạn sẽ có nhiều cơ hội tốt đẹp trong thời gian tới.',
  'Bàn tay bạn mang dáng dấp của người có phúc lộc. Các đường chỉ tay giao nhau tạo thành hình thái cân đối, cho thấy cuộc sống hài hòa giữa vật chất và tinh thần. Bạn là người có duyên lành và được nhiều quý nhân phù trợ.',
  'Nhìn tổng thể, bàn tay bạn thuộc dạng hiếm gặp với nhiều dấu hiệu tốt lành. Đường Trí Tuệ sâu cho thấy tư duy sắc bén, kết hợp với Đường Tình Cảm mạnh mẽ tạo nên sự cân bằng lý tưởng. Cuộc đời bạn sẽ gặp nhiều may mắn.',
  'Bàn tay của bạn cho thấy bạn là người giàu nghị lực và có khả năng vượt qua mọi thử thách. Các gò tay nổi đều cho thấy năng lượng sống tràn đầy. Bạn đang bước vào giai đoạn thuận lợi của cuộc đời.',
  'Phân tích cho thấy bạn sở hữu bàn tay của người có tài vận hanh thông. Đường Sự Nghiệp rõ ràng kết hợp với Đường Mặt Trời sáng cho thấy con đường thành công đang rộng mở. Bạn nên tự tin theo đuổi ước mơ.',
];

const palmLove = [
  'Đường Tình Cảm của bạn dài và cong đều, cho thấy bạn là người giàu tình cảm và chung thủy. Trong tình yêu, bạn luôn hết lòng vì đối phương. Mối quan hệ của bạn sẽ ngày càng bền chặt và sâu sắc hơn.',
  'Đường Tình Cảm sâu và rõ nét cho thấy bạn sẽ có một mối tình đẹp và lâu dài. Bạn là người lãng mạn nhưng cũng rất thực tế trong tình yêu. Nửa kia của bạn sẽ là người rất phù hợp và đồng điệu.',
  'Đường Tình Cảm của bạn có nhánh nhỏ hướng lên, đây là dấu hiệu của hạnh phúc trong tình yêu. Bạn thu hút người khác bằng sự chân thành và ấm áp. Cuộc sống hôn nhân sẽ mang lại cho bạn nhiều niềm vui.',
  'Đường Tình Cảm thẳng và mạnh mẽ cho thấy bạn là người quyết đoán trong tình yêu. Khi đã yêu, bạn rất kiên định và không dễ dao động. Mối quan hệ hiện tại hoặc sắp tới sẽ đem đến nhiều hạnh phúc.',
  'Đường Tình Cảm của bạn bắt đầu từ gò Jupiter, cho thấy bạn có tiêu chuẩn cao trong tình yêu và sẽ tìm được người xứng đáng. Tình duyên của bạn thuộc dạng muộn mà bền. Khi gặp đúng người, bạn sẽ rất hạnh phúc.',
  'Các nhánh nhỏ trên Đường Tình Cảm cho thấy bạn có đời sống tình cảm phong phú và được nhiều người yêu mến. Bạn có duyên ngầm thu hút người khác. Trong thời gian tới, một mối quan hệ đặc biệt sẽ xuất hiện.',
];

const palmCareer = [
  'Đường Sự Nghiệp rõ ràng và thẳng cho thấy con đường công danh của bạn sẽ thuận lợi. Bạn có khả năng lãnh đạo tự nhiên và sẽ đạt được vị trí cao trong công việc. Tài chính sẽ ổn định và phát triển theo thời gian.',
  'Đường Sự Nghiệp bắt đầu từ giữa lòng bàn tay, cho thấy bạn sẽ tự tay gây dựng sự nghiệp thành công. Giai đoạn sau 30 tuổi, sự nghiệp sẽ bứt phá mạnh mẽ. Bạn phù hợp với vai trò quản lý hoặc kinh doanh riêng.',
  'Đường Sự Nghiệp có nhánh phụ hướng lên gò Mặt Trời, đây là dấu hiệu của thành công về tài chính. Bạn có tài năng kiếm tiền và biết cách đầu tư thông minh. Thu nhập sẽ tăng đáng kể trong thời gian tới.',
  'Đường Sự Nghiệp kết hợp với Đường Trí Tuệ mạnh cho thấy bạn thành công nhờ trí tuệ. Bạn phù hợp với các lĩnh vực sáng tạo, công nghệ hoặc tư vấn. Cơ hội thăng tiến đang đến rất gần.',
  'Gò Jupiter nổi trên bàn tay cho thấy bạn có tham vọng lớn và khả năng hiện thực hóa mục tiêu. Sự nghiệp của bạn sẽ có bước ngoặt quan trọng trong 1-2 năm tới. Hãy sẵn sàng đón nhận cơ hội lớn.',
  'Đường Sự Nghiệp sâu và không bị đứt đoạn cho thấy sự ổn định trong công việc. Bạn là người đáng tin cậy và sẽ được đồng nghiệp, cấp trên đánh giá cao. Con đường thăng tiến của bạn rất rõ ràng và chắc chắn.',
];

const palmHealth = [
  'Đường Sinh Mệnh dài và uốn cong đẹp, cho thấy bạn có sức khỏe tốt và sức đề kháng mạnh. Thể lực của bạn dồi dào, phù hợp với lối sống năng động. Hãy duy trì thói quen tập thể dục để giữ vững phong độ.',
  'Đường Sinh Mệnh rộng và sâu cho thấy sinh lực mạnh mẽ. Bạn có thể trạng tốt và khả năng hồi phục nhanh. Nên chú ý nghỉ ngơi đầy đủ và uống nhiều nước để duy trì năng lượng tích cực.',
  'Các dấu hiệu trên bàn tay cho thấy hệ tiêu hóa và tuần hoàn của bạn hoạt động tốt. Bạn có nền tảng sức khỏe vững chắc. Hãy bổ sung thêm rau xanh và trái cây để tăng cường sức đề kháng.',
  'Đường Sinh Mệnh tạo vòng cung lớn quanh gò Venus cho thấy bạn có nguồn năng lượng sống phong phú. Sức khỏe tinh thần của bạn rất tốt, luôn lạc quan và vui vẻ. Đây là nền tảng quan trọng cho sức khỏe thể chất.',
  'Bàn tay của bạn cho thấy cơ thể có khả năng tự cân bằng tốt. Hệ thống miễn dịch mạnh mẽ giúp bạn ít khi bị ốm. Hãy duy trì giấc ngủ đều đặn và tập thiền để tăng cường sức khỏe toàn diện.',
  'Đường Sinh Mệnh không bị đứt đoạn cho thấy sức khỏe ổn định qua các giai đoạn. Bạn có thể chất bền bỉ và dẻo dai. Nên kết hợp yoga hoặc thiền định để cân bằng cả thể chất lẫn tinh thần.',
];

const palmPersonality = [
  'Đường Trí Tuệ dài và sâu cho thấy bạn là người thông minh, tư duy logic và sáng tạo. Bạn có khả năng phân tích vấn đề sắc bén và đưa ra quyết định đúng đắn. Điểm mạnh lớn nhất của bạn là sự kiên nhẫn và bền bỉ.',
  'Hình dáng bàn tay cho thấy bạn thuộc tuýp người có trực giác mạnh mẽ. Bạn dễ dàng đọc được cảm xúc của người khác và có khả năng đồng cảm cao. Sự nhạy cảm này giúp bạn thành công trong giao tiếp xã hội.',
  'Các ngón tay dài và gò tay nổi đều cho thấy bạn là người đa tài, có khiếu nghệ thuật và thẩm mỹ cao. Bạn có khả năng sáng tạo vượt trội và luôn tìm ra giải pháp độc đáo cho mọi vấn đề.',
  'Đường Trí Tuệ hơi cong xuống cho thấy bạn có trí tưởng tượng phong phú và tâm hồn lãng mạn. Bạn là người có chiều sâu, thích khám phá và không ngừng học hỏi. Sự tò mò là động lực phát triển của bạn.',
  'Bàn tay vuông vức cho thấy bạn là người thực tế, đáng tin cậy và có tổ chức. Bạn luôn hoàn thành công việc đúng hạn và không bao giờ bỏ cuộc. Sự kiên định là phẩm chất nổi bật nhất của bạn.',
  'Các gò tay phát triển đều cho thấy bạn là người cân bằng giữa lý trí và cảm xúc. Bạn có khả năng lãnh đạo tự nhiên và được mọi người tin tưởng. Tính cách hòa nhã nhưng quyết đoán là điểm mạnh của bạn.',
];

const palmFuture = [
  'Các dấu hiệu trên bàn tay cho thấy giai đoạn sắp tới sẽ mang đến nhiều cơ hội phát triển. Bạn nên mạnh dạn nắm bắt các cơ hội mới, đặc biệt trong lĩnh vực công việc và tài chính. Vận may đang mỉm cười với bạn.',
  'Đường Mặt Trời sáng cho thấy danh tiếng và sự công nhận sẽ đến với bạn. Trong 6 tháng tới, bạn có thể nhận được tin vui liên quan đến sự nghiệp hoặc tài chính. Hãy tiếp tục nỗ lực vì thành quả xứng đáng đang chờ đón.',
  'Nhánh nhỏ trên Đường Sự Nghiệp cho thấy một bước ngoặt tích cực sắp xảy ra. Bạn có thể gặp được quý nhân hoặc có cơ hội đổi mới cuộc sống. Hãy mở lòng đón nhận những thay đổi vì chúng sẽ mang lại điều tốt đẹp.',
  'Xu hướng tương lai cho thấy bạn sẽ đạt được sự ổn định và thịnh vượng. Các mối quan hệ xung quanh bạn sẽ ngày càng tốt đẹp. Cuộc sống gia đình hạnh phúc và sự nghiệp phát triển song song.',
  'Các đường phụ trên bàn tay cho thấy bạn sắp bước vào giai đoạn vàng của cuộc đời. Tài lộc hanh thông, tình duyên tốt đẹp, sức khỏe dồi dào. Hãy tận dụng thời điểm này để thực hiện những dự định lớn.',
  'Dấu hiệu trên Đường Sinh Mệnh cho thấy cuộc sống của bạn sẽ ngày càng thoải mái và viên mãn. Bạn sẽ tìm được sự cân bằng giữa công việc và cuộc sống cá nhân. Những năm tháng tươi đẹp nhất vẫn đang ở phía trước.',
];

// ==================== FACE READING DATA ====================

const faceOverall = [
  'Tướng mặt của bạn thuộc dạng phúc hậu, mang nhiều nét tốt lành theo tướng số phương Đông. Khuôn mặt cân đối thể hiện sự hài hòa trong cuộc sống. Nhìn chung, bạn là người có phước đức và được trời phú cho nhiều tài năng.',
  'Khuôn mặt bạn mang nét thông minh và sắc sảo, đặc trưng của người có mệnh quý. Các đường nét trên mặt cho thấy cuộc đời nhiều may mắn và thuận lợi. Bạn có khí chất thu hút và dễ gây thiện cảm với người khác.',
  'Phân tích tướng mặt cho thấy bạn có ngũ quan hài hòa, đây là dấu hiệu của người có vận mệnh tốt. Khuôn mặt toát lên vẻ đoan trang và đáng tin cậy. Bạn sẽ có cuộc sống an nhàn và hạnh phúc.',
  'Tướng mặt bạn thuộc dạng có ấn đường sáng, cho thấy trí tuệ sắc bén và tâm hồn rộng mở. Nét mặt phúc hậu thể hiện tấm lòng nhân ái và lương thiện. Cuộc đời bạn sẽ gặp nhiều quý nhân phù trợ.',
  'Khuôn mặt của bạn có nhiều đặc điểm của người mệnh phú quý. Tỷ lệ khuôn mặt cân đối cho thấy sự hài hòa giữa các yếu tố trong cuộc sống. Bạn là người có phúc khí dồi dào và đời sống tinh thần phong phú.',
  'Tướng mặt cho thấy bạn có khí chất lãnh đạo bẩm sinh. Ánh mắt sáng kết hợp với nét mặt cương nghị tạo nên vẻ đáng tin cậy. Bạn sẽ được nhiều người kính trọng và theo phục.',
];

const faceLove = [
  'Đôi mắt to và sáng cho thấy bạn là người giàu tình cảm và lãng mạn. Trong tình yêu, bạn chung thủy và hết lòng vì người mình yêu. Đường tình duyên sáng sủa, bạn sẽ gặp được người bạn đời lý tưởng.',
  'Phần ấn đường giữa hai lông mày rộng và sáng, đây là dấu hiệu tốt cho chuyện tình cảm. Bạn là người cởi mở và dễ kết nối với người khác. Hôn nhân của bạn sẽ hạnh phúc và viên mãn.',
  'Đôi môi đầy đặn và cân đối cho thấy bạn có duyên ngầm thu hút. Bạn biết cách thể hiện tình cảm và làm người khác cảm thấy đặc biệt. Mối quan hệ tình cảm sẽ mang lại nhiều niềm vui và hạnh phúc.',
  'Gò má hồng hào và đầy đặn là dấu hiệu của người có đào hoa vượng. Bạn được nhiều người yêu mến và theo đuổi. Khi gặp đúng người, bạn sẽ xây dựng được mối quan hệ bền vững và sâu sắc.',
  'Tướng mắt phượng cho thấy bạn có duyên phận tốt trong tình yêu. Bạn là người sâu sắc và trung thành trong các mối quan hệ. Tình duyên sẽ đến vào đúng thời điểm và mang lại hạnh phúc trọn vẹn.',
  'Đường nhân trung rõ ràng và sâu cho thấy phúc đức về đường con cái và gia đình. Bạn là người yêu gia đình và biết cách xây dựng tổ ấm. Cuộc sống hôn nhân sẽ hài hòa và ấm áp.',
];

const faceCareer = [
  'Trán cao và rộng cho thấy trí tuệ vượt trội, phù hợp với công việc đòi hỏi tư duy. Bạn có khả năng phân tích và ra quyết định tốt. Sự nghiệp sẽ phát triển mạnh mẽ nhờ năng lực trí tuệ này.',
  'Mũi thẳng và đầy đặn theo tướng số là dấu hiệu của tài vận hanh thông. Bạn có khả năng kiếm tiền giỏi và biết cách quản lý tài chính. Thu nhập sẽ tăng đáng kể trong thời gian tới.',
  'Lông mày đẹp và dày cho thấy bạn có quý nhân phù trợ trong sự nghiệp. Bạn sẽ gặp được người mentor tốt hoặc có đối tác kinh doanh đáng tin cậy. Con đường sự nghiệp ngày càng rộng mở.',
  'Hàm vuông vức thể hiện ý chí kiên cường và khả năng chịu áp lực tốt. Bạn phù hợp với vị trí lãnh đạo hoặc quản lý. Sự nghiệp sẽ đạt đỉnh cao nhờ sự nỗ lực không ngừng.',
  'Tai lớn và dày theo tướng số là dấu hiệu của người có phúc lộc về tài chính. Bạn có duyên với tiền bạc và sẽ ngày càng giàu có theo thời gian. Hãy mạnh dạn đầu tư và mở rộng kinh doanh.',
  'Đôi mắt sáng và lanh lợi cho thấy bạn nhạy bén với cơ hội kinh doanh. Bạn có tầm nhìn xa và khả năng nắm bắt xu hướng thị trường. Sự nghiệp sẽ phát triển vượt bậc nhờ trí thông minh này.',
];

const faceHealth = [
  'Sắc mặt hồng hào cho thấy khí huyết lưu thông tốt và sức khỏe tổng thể ổn định. Bạn có thể trạng tốt và năng lượng dồi dào. Hãy duy trì lối sống lành mạnh để giữ vững sức khỏe này.',
  'Đôi mắt sáng và tinh anh cho thấy gan thận hoạt động tốt theo đông y. Bạn có sức đề kháng mạnh và ít khi bị bệnh vặt. Nên bổ sung thêm thực phẩm giàu vitamin để tăng cường sức khỏe.',
  'Tướng mặt cho thấy ngũ tạng hoạt động hài hòa, đây là nền tảng sức khỏe tốt. Bạn có khả năng phục hồi nhanh chóng sau ốm đau. Hãy chú ý ngủ đủ giấc và tập thể dục thường xuyên.',
  'Màu da đều và sáng sủa cho thấy hệ tuần hoàn và nội tiết hoạt động tốt. Sức khỏe tinh thần của bạn cũng rất ổn định, luôn lạc quan vui vẻ. Đây là tài sản quý giá nhất mà bạn đang sở hữu.',
  'Môi hồng và ẩm cho thấy tỳ vị khỏe mạnh, hấp thu dinh dưỡng tốt. Cơ thể bạn có khả năng tự cân bằng hiệu quả. Nên kết hợp thiền định và yoga để duy trì sức khỏe toàn diện.',
  'Lông mày dày và sắc nét cho thấy hệ miễn dịch mạnh mẽ. Bạn có thể lực bền bỉ và sức chịu đựng tốt. Hãy bổ sung trà xanh và thực phẩm giàu chất chống oxy hóa vào chế độ ăn.',
];

const facePersonality = [
  'Trán rộng kết hợp với mắt sáng cho thấy bạn là người có tư duy sáng tạo và khả năng học hỏi nhanh. Bạn luôn tìm tòi cái mới và không ngại thử thách. Tính cách cầu tiến là điểm mạnh nổi bật nhất.',
  'Khuôn mặt tròn đầy cho thấy bạn là người hiền lành, dễ gần và được lòng mọi người. Bạn có khả năng giao tiếp tốt và luôn tạo bầu không khí vui vẻ. Sự hòa đồng giúp bạn xây dựng nhiều mối quan hệ tốt.',
  'Đôi mắt sâu cho thấy bạn là người có chiều sâu nội tâm và khả năng thấu hiểu người khác. Bạn suy nghĩ chín chắn trước khi hành động và hiếm khi quyết định vội vàng. Sự trầm tĩnh là sức mạnh của bạn.',
  'Mũi cao và thẳng cho thấy bạn là người có lòng tự trọng cao và nguyên tắc rõ ràng. Bạn luôn giữ lời hứa và không bao giờ phản bội niềm tin của người khác. Đây là phẩm chất khiến bạn được kính trọng.',
  'Cằm nhọn và thanh tú cho thấy bạn là người tinh tế, có gu thẩm mỹ cao và đầy sáng tạo. Bạn có khiếu nghệ thuật bẩm sinh và khả năng cảm nhận cái đẹp. Tâm hồn nghệ sĩ là điểm đặc biệt của bạn.',
  'Lông mày ngang và đậm cho thấy bạn là người thẳng thắn, trung thực và đáng tin cậy. Bạn luôn bảo vệ người thân và sẵn sàng hy sinh vì người mình yêu thương. Sự trung thành là giá trị cốt lõi của bạn.',
];

const faceFuture = [
  'Tướng mặt cho thấy vận mệnh của bạn đang đi lên rõ rệt. Giai đoạn sắp tới sẽ mang đến nhiều tin vui về sự nghiệp và tài chính. Hãy mạnh dạn theo đuổi những mục tiêu lớn vì vận may đang ở bên bạn.',
  'Ấn đường sáng sủa báo hiệu giai đoạn phát triển tích cực. Bạn sẽ có cơ hội gặp gỡ nhiều quý nhân và mở rộng mối quan hệ. Tương lai của bạn hứa hẹn nhiều thành công và hạnh phúc.',
  'Các đặc điểm trên khuôn mặt cho thấy bạn sắp bước vào giai đoạn hoàng kim. Công việc thuận lợi, tình cảm tốt đẹp và sức khỏe dồi dào. Hãy tận dụng thời cơ này để thực hiện ước mơ lớn.',
  'Tướng mũi phát triển cho thấy tài vận sẽ vượng phát trong thời gian tới. Bạn có thể nhận được cơ hội đầu tư sinh lời hoặc tăng lương thăng chức. Cuộc sống vật chất ngày càng đầy đủ và thoải mái.',
  'Sắc diện tươi sáng báo hiệu giai đoạn vận khí hanh thông. Mọi trở ngại sẽ được hóa giải và con đường phía trước ngày càng rộng mở. Bạn nên tự tin bước tới vì thành công đang chờ đón.',
  'Tướng mặt cho thấy cuộc sống của bạn sẽ ngày càng viên mãn. Gia đình hạnh phúc, con cái ngoan ngoãn và sự nghiệp vững chắc. Những năm tháng đẹp nhất trong cuộc đời bạn vẫn còn ở phía trước.',
];

export function generateReading(
  base64Image: string,
  mode: ReadingMode,
): ReadingResult {
  const seed = hashImage(base64Image);
  const rand = seededRandom(seed);

  if (mode === 'palm') {
    return {
      overall: pick(palmOverall, rand),
      love: pick(palmLove, rand),
      career: pick(palmCareer, rand),
      health: pick(palmHealth, rand),
      personality: pick(palmPersonality, rand),
      future: pick(palmFuture, rand),
    };
  }

  return {
    overall: pick(faceOverall, rand),
    love: pick(faceLove, rand),
    career: pick(faceCareer, rand),
    health: pick(faceHealth, rand),
    personality: pick(facePersonality, rand),
    future: pick(faceFuture, rand),
  };
}

// ==================== QUIZ-BASED PALM READING ====================

// Special pattern detection from answer combinations
// Based on kabala.vn, vatphamphongthuy.com, xemchitay.com.vn references
interface SpecialPattern {
  name: string;
  emoji: string;
  description: string;
}

function detectSpecialPatterns(answers: QuizAnswers): SpecialPattern[] {
  const patterns: SpecialPattern[] = [];
  const ids = Object.values(answers);

  // Chu M: heart reaches index + head touches life + fate clear from wrist
  // => 3 duong chinh giao nhau tao chu M (khoang 10% dan so)
  if (ids.includes('heart_q1_a') && ids.includes('head_q1_a') && ids.includes('fate_q1_a')) {
    patterns.push({
      name: 'Duong chu M',
      emoji: '🔷',
      description: 'Ban tay ban co hinh chu M — ket hop 3 duong chinh tao nen dau hieu cua nguoi co tai lanh dao, truc giac sac ben va van may tot. Chi khoang 10% dan so co hinh nay. Theo nhan tuong hoc, nguoi co chu M thuong gioi giao tiep, biet nam bat co hoi va khong lo ve tai chinh khi ve gia.',
    });
  }

  // Duong chi tay ngang (Simian Line): heart straight+short + head straight
  // => Tam Dao va Tri Dao hop nhat (chi 1.5% dan so)
  if (ids.includes('heart_q2_b') && ids.includes('head_q2_a')) {
    patterns.push({
      name: 'Duong chi tay ngang',
      emoji: '⚡',
      description: 'Ban co the co duong chi tay ngang — khi duong Tam Dao va Tri Dao gan nhu hop nhat. Day la dau hieu cuc ky hiem (1.5% dan so). Nguoi so huu thuong co tinh cach quyet doan, tap trung phi thuong, co the la thien tai trong linh vuc minh theo duoi. Tuy nhien can hoc cach can bang cam xuc va ly tri.',
    });
  }

  // Duong duoi ca: life line co nhanh re + fate co nhanh
  // => Cuoi duong co hinh duoi ca — hau van tot lanh
  if (ids.includes('life_q4_d') && (ids.includes('fate_q4_a') || ids.includes('fate_q3_d'))) {
    patterns.push({
      name: 'Duong duoi ca',
      emoji: '🐟',
      description: 'Ban tay ban co dau hieu duong duoi ca — nhanh re o cuoi duong Sinh Dao ket hop voi duong Su Nghiep ro rang. Day la diem tot lanh, bao hieu hau van vung chac, tuoi gia sung suong. Du thoi tre co kho khan, cuoi doi van co cuoc song day du ve tien bac va tinh than.',
    });
  }

  // Duong song song (Thien than ho menh): life parallel lines
  if (ids.includes('life_q4_c')) {
    patterns.push({
      name: 'Duong bao ho',
      emoji: '👼',
      description: 'Duong Sinh Dao co duong song song la dau hieu "thien than ho menh". Ban luon duoc bao ho boi nguoi than, quy nhan hoac luc luong vo hinh. Khi gap kho khan, se co nguoi xuat hien giup do. Day la mot trong nhung dau hieu tot lanh nhat tren ban tay.',
    });
  }

  // Duong duoi phuong: fate late bloomer + head creative
  if (ids.includes('fate_q3_d') && ids.includes('head_q2_b')) {
    patterns.push({
      name: 'Duong duoi phuong',
      emoji: '🦚',
      description: 'Ban co dau hieu duong duoi phuong — su nghiep phat trien muon nhung ruc ro. Ket hop kha nang sang tao vuot troi, ban se toa sang sau tuoi 35-40. Nguoi co duong nay thuong trung thuc, thong minh va duoc quy nhan phu tro dac biet.',
    });
  }

  return patterns;
}

export function generateReadingFromQuiz(answers: QuizAnswers): ReadingResult {
  const heartTraits: string[] = [];
  const headTraits: string[] = [];
  const lifeTraits: string[] = [];
  const fateTraits: string[] = [];

  for (const [questionId, optionId] of Object.entries(answers)) {
    const questionInterps = ANSWER_INTERPRETATIONS[questionId];
    if (!questionInterps) continue;
    const interp = questionInterps[optionId];
    if (!interp) continue;

    if (questionId.startsWith('heart_')) {
      heartTraits.push(interp.trait);
    } else if (questionId.startsWith('head_')) {
      headTraits.push(interp.trait);
    } else if (questionId.startsWith('life_')) {
      lifeTraits.push(interp.trait);
    } else if (questionId.startsWith('fate_')) {
      fateTraits.push(interp.trait);
    }
  }

  const specialPatterns = detectSpecialPatterns(answers);

  return {
    overall: composeOverall(heartTraits, headTraits, lifeTraits, fateTraits, specialPatterns),
    love: composeLove(heartTraits, answers),
    career: composeCareer(headTraits, fateTraits, answers),
    health: composeHealth(lifeTraits, answers),
    personality: composePersonality(heartTraits, headTraits, answers),
    future: composeFuture(heartTraits, headTraits, lifeTraits, fateTraits, specialPatterns),
  };
}

function composeOverall(heart: string[], head: string[], life: string[], fate: string[], patterns: SpecialPattern[]): string {
  const intro = '📖 TONG QUAN VAN MENH\n\nQua phan tich 4 duong chi tay chinh cua ban, day la buc tranh tong the ve cuoc doi:\n\n';
  const sections = [
    heart[0] ? `💕 Tam Dao: ${heart[0]}` : '',
    head[0] ? `🧠 Tri Dao: ${head[0]}` : '',
    life[0] ? `🌿 Sinh Dao: ${life[0]}` : '',
    fate[0] ? `⭐ Su Nghiep: ${fate[0]}` : '',
  ].filter(Boolean);

  let result = intro + sections.join('\n\n');

  // Add special patterns if detected
  if (patterns.length > 0) {
    result += '\n\n━━━━━━━━━━━━━━━━━━━━\n✨ DAU HIEU DAC BIET\n\n';
    result += patterns.map(p => `${p.emoji} ${p.name}:\n${p.description}`).join('\n\n');
  }

  return result;
}

function composeLove(heart: string[], answers: QuizAnswers): string {
  const intro = '💕 TINH CAM & TINH YEU\n\nPhan tich chi tiet duong Tam Dao (Heart Line) cua ban:\n\n';
  let result = intro + heart.join('\n\n');

  // Add marriage/romance insight based on heart line characteristics
  const ids = Object.values(answers);
  if (ids.includes('heart_q1_a') && ids.includes('heart_q3_a')) {
    result += '\n\n💒 Hon Nhan: Duong Tam Dao dai va sau cho thay hon nhan ben vung, hanh phuc. Ban va nguoi ban doi se co moi quan he sau sac, tin tuong va dong hanh lau dai.';
  } else if (ids.includes('heart_q4_c')) {
    result += '\n\n⚠️ Luu y: Duong Tam Dao dut doan khong co nghia tinh duyen that bai. Theo nhan tuong hoc, day chi la giai doan chuyen tiep — sau nhung trai nghiem dau don, ban se tim duoc tinh yeu dich thuc va ben vung hon.';
  } else if (ids.includes('heart_q4_d')) {
    result += '\n\n🌸 Dao Hoa: Nhieu duong song song tren duong Tam Dao cho thay ban co duyen dao hoa vuong. Duoc nhieu nguoi yeu men va theo duoi. Hay chon loc va tran trong moi quan he that su xung dang.';
  }

  return result;
}

function composeCareer(head: string[], fate: string[], answers: QuizAnswers): string {
  const intro = '💼 SU NGHIEP & TAI CHINH\n\nPhan tich duong Tri Dao va duong Su Nghiep:\n\n';
  const headSection = head.length > 0 ? '🧠 Tu Duy & Nang Luc:\n' + head.join('\n\n') : '';
  const fateSection = fate.length > 0 ? '\n\n⭐ Con Duong Su Nghiep:\n' + fate.join('\n\n') : '';
  let result = intro + headSection + fateSection;

  // Add business/money insight
  const ids = Object.values(answers);
  if (ids.includes('fate_q2_a') && ids.includes('fate_q3_a')) {
    result += '\n\n💰 Tai Loc: Duong Su Nghiep thang va ro cho thay tai van hanh thong. Ban co kha nang kiem tien gioi va biet cach quan ly tai chinh. Nen can nhac dau tu dai han de gia tang tai san.';
  } else if (ids.includes('fate_q1_d')) {
    result += '\n\n🆓 Tu Do Nghe Nghiep: Khong co duong Su Nghiep co dinh la dau hieu cua nguoi lam nhieu nghe, tu do va linh hoat. Nhieu doanh nhan thanh cong thuoc nhom nay — ho tao ra con duong rieng thay vi di theo loi mon.';
  }

  // Add head line career recommendation
  if (ids.includes('head_q2_b')) {
    result += '\n\n🎨 Nghe Nghiep Phu Hop: Voi duong Tri Dao nghieng ve sang tao, ban rat phu hop voi nghe thuat, thiet ke, am nhac, van hoc, marketing sang tao hoac bat ky linh vuc nao doi hoi tri tuong tuong phong phu.';
  } else if (ids.includes('head_q2_a') && ids.includes('head_q3_a')) {
    result += '\n\n🔬 Nghe Nghiep Phu Hop: Voi tu duy logic va chien luoc, ban rat phu hop voi ky thuat, tai chinh, phan tich du lieu, lap trinh, y hoc hoac nghien cuu khoa hoc.';
  }

  return result;
}

function composeHealth(life: string[], answers: QuizAnswers): string {
  const intro = '🌿 SUC KHOE & SINH LUC\n\nPhan tich chi tiet duong Sinh Dao (Life Line) cua ban:\n\n';
  let result = intro + life.join('\n\n');

  // Add longevity/health advice based on combinations
  const ids = Object.values(answers);
  if (ids.includes('life_q3_a') && ids.includes('life_q2_a')) {
    result += '\n\n🏃 Song Tho: Duong Sinh Dao dai va cong rong la dau hieu tuyet voi cho suc song ben bi. Ban co nen tang the chat rat tot — hay duy tri bang tap the duc deu dan, an uong can bang va giac ngu chat luong.';
  } else if (ids.includes('life_q3_c')) {
    result += '\n\n📌 Luu y Quan Trong: Duong Sinh Dao ngan KHONG lien quan den tuoi tho — day la hieu lam pho bien nhat. No chi nhac ban can chu y cham soc suc khoe hon nguoi binh thuong. Song lanh manh, tap the duc va kham dinh ky la cach tot nhat.';
  }

  if (ids.includes('life_q4_b')) {
    result += '\n\n🔄 Bien Dong: Duong Sinh Dao dut doan cho thay co nhung thay doi lon — co the la chuyen noi o, thay doi moi truong song. Theo vatphamphongthuy.com, neu 2 doan duong chong len nhau thi day la dau hieu hoi phuc tot, vuot qua kho khan de bat dau tot dep hon.';
  }

  return result;
}

function composePersonality(heart: string[], head: string[], answers: QuizAnswers): string {
  const intro = '🔮 TINH CACH & CON NGUOI\n\nKet hop phan tich duong Tam Dao va Tri Dao:\n\n';
  const traits = [heart[1], head[1], heart[2], head[2]].filter(Boolean);
  let result = intro + traits.join('\n\n');

  // Add personality synthesis
  const ids = Object.values(answers);
  const isEmotional = ids.includes('heart_q1_d') || ids.includes('heart_q2_a') || ids.includes('heart_q3_a');
  const isLogical = ids.includes('head_q2_a') || ids.includes('head_q3_a');
  const isCreative = ids.includes('head_q2_b') || ids.includes('head_q4_b');
  const isIndependent = ids.includes('head_q1_b') || ids.includes('head_q1_d');

  const personalityTags: string[] = [];
  if (isEmotional && isLogical) personalityTags.push('Ban la nguoi hiem co: vua co trai tim nong nan vua co cai dau lanh — biet khi nao can cam xuc, khi nao can ly tri.');
  if (isCreative && isIndependent) personalityTags.push('Tinh than doc lap ket hop sang tao giup ban luon tim ra giai phap doc dao. Ban khong bao gio di theo loi mon — va do la suc manh lon nhat cua ban.');
  if (isEmotional && isCreative) personalityTags.push('Tam hon nhay cam va tri sang tao tao nen mot con nguoi day mau sac. Ban co kha nang truyen cam hung cho nguoi khac bang chinh cach song cua minh.');

  if (personalityTags.length > 0) {
    result += '\n\n━━━━━━━━━━━━━━━━━━━━\n🎯 Tong Hop Tinh Cach:\n' + personalityTags.join('\n\n');
  }

  return result;
}

function composeFuture(heart: string[], head: string[], life: string[], fate: string[], patterns: SpecialPattern[]): string {
  const intro = '🌟 TUONG LAI & LOI KHUYEN\n\nTong hop cac dau hieu ve tuong lai tu 4 duong chi tay:\n\n';
  const futureTraits = [heart[3], head[3], life[3], fate[3]].filter(Boolean);
  let result = intro + futureTraits.join('\n\n');

  // Add special pattern future implications
  if (patterns.length > 0) {
    result += '\n\n━━━━━━━━━━━━━━━━━━━━\n🔮 Dau Hieu Dac Biet Cho Tuong Lai:\n\n';
    for (const p of patterns) {
      if (p.name === 'Duong chu M') {
        result += '🔷 Voi dau hieu chu M, ban co tiem nang lanh dao lon. Tuong lai su nghiep sang, tai chinh vung — dac biet sau tuoi 35.\n\n';
      } else if (p.name === 'Duong bao ho') {
        result += '👼 Duong bao ho cho thay ban luon co quy nhan xuat hien dung luc. Hay tin tuong va mo rong moi quan he — co hoi lon thuong den tu nhung nguoi ban khong ngo toi.\n\n';
      } else if (p.name === 'Duong duoi phuong') {
        result += '🦚 Duong duoi phuong bao hieu hau van ruc ro. Kien nhan va no luc — tu tuoi 40 tro di la giai doan vang cua ban.\n\n';
      }
    }
  }

  result += '\n\n💡 Loi khuyen: Duong chi tay chi la huong dan, khong phai dinh menh bat bien. Ban tay co the thay doi theo thoi gian — phan anh noi luc va no luc cua ban. Hay song tich cuc, lam viec cham chi, yeu thuong het minh va luon tin vao ban than!';
  return result;
}

// ==================== QUIZ-BASED FACE READING ====================

interface FaceSpecialPattern {
  name: string;
  emoji: string;
  description: string;
}

function detectFaceSpecialPatterns(answers: QuizAnswers): FaceSpecialPattern[] {
  const patterns: FaceSpecialPattern[] = [];
  const ids = Object.values(answers);

  // 🙏 Phuc Tuong: mat tron + moi day + tai lon dai tron
  if (ids.includes('face_q1_a') && ids.includes('mouth_q1_a') && ids.includes('nose_q3_a') && ids.includes('nose_q4_a')) {
    patterns.push({
      name: 'Phuc Tuong',
      emoji: '🙏',
      description: 'Ban so huu "Phuc Tuong" — to hop khuon mat tron phuc hau, doi moi day dan, tai lon va dai tai tron. Trong nhan tuong hoc, day la tuong cua nguoi co phuc duc lon, duoc troi phu cho cuoc song day du, gia dinh hanh phuc va tuoi gia an nhan. Ban la nguoi duoc nhieu nguoi kinh trong va yeu men.',
    });
  }

  // 👑 Quy Tuong: tran cao + mat sang + mui thang + cam vuong
  if (ids.includes('face_q2_a') && ids.includes('eyes_q4_a') && ids.includes('nose_q1_a') && ids.includes('mouth_q3_a')) {
    patterns.push({
      name: 'Quy Tuong',
      emoji: '👑',
      description: 'Ban co "Quy Tuong" — to hop tran cao rong, anh mat sang lanh loi, mui thang cao va cam vuong vuc. Day la tuong cua nguoi co menh quy, khi chat lanh dao bam sinh va van menh hanh thong. Trong lich su, nhieu nhan vat lon deu so huu to hop tuong nay.',
    });
  }

  // 🌸 Dao Hoa Tuong: mat trai xoan + hai mi + moi deu
  if (ids.includes('face_q1_b') && ids.includes('eyes_q1_d') && ids.includes('mouth_q1_d')) {
    patterns.push({
      name: 'Dao Hoa Tuong',
      emoji: '🌸',
      description: 'Ban co "Dao Hoa Tuong" — khuon mat trai xoan, doi mat hai mi va moi deu can doi. Day la tuong cua nguoi co duyen ngam, thu hut nguoi khac mot cach tu nhien. Tinh duyen vuong — ban se duoc nhieu nguoi yeu men va theo duoi. Khi gap dung nguoi, tinh yeu se rat sau dam va ben vung.',
    });
  }

  // 💰 Phu Quy Tuong: long may day + mui rong bau + dai tai lon
  if (ids.includes('eyes_q2_a') && (ids.includes('nose_q2_d') || ids.includes('nose_q1_d')) && ids.includes('nose_q4_a')) {
    patterns.push({
      name: 'Phu Quy Tuong',
      emoji: '💰',
      description: 'Ban so huu "Phu Quy Tuong" — long may day, mui rong bau va dai tai day tron. Day la to hop cua nguoi co tai van hanh thong, giau co tu nhien. Tien bac den de dang va ban biet cach giu tien. Tu tuoi trung nien tro di, tai chinh se rat vung chac va du da.',
    });
  }

  // 🧠 Tri Tue Tuong: tran cao rong + mat sau + long may cong
  if (ids.includes('face_q2_a') && ids.includes('eyes_q4_c') && ids.includes('eyes_q2_b')) {
    patterns.push({
      name: 'Tri Tue Tuong',
      emoji: '🧠',
      description: 'Ban co "Tri Tue Tuong" — tran cao rong, anh mat sau tham va long may cong. Day la tuong cua nguoi co tri tue sieu viet, kha nang phan tich va thau hieu sau sac. Ban phu hop voi cac linh vuc tri thuc, nghien cuu hoac tu van. Tri tue la tai san lon nhat cua ban.',
    });
  }

  return patterns;
}

export function generateFaceReadingFromQuiz(answers: QuizAnswers): ReadingResult {
  const faceShapeTraits: string[] = [];
  const eyesBrowsTraits: string[] = [];
  const noseEarsTraits: string[] = [];
  const mouthChinTraits: string[] = [];

  for (const [questionId, optionId] of Object.entries(answers)) {
    const questionInterps = FACE_ANSWER_INTERPRETATIONS[questionId];
    if (!questionInterps) continue;
    const interp = questionInterps[optionId];
    if (!interp) continue;

    if (questionId.startsWith('face_')) {
      faceShapeTraits.push(interp.trait);
    } else if (questionId.startsWith('eyes_')) {
      eyesBrowsTraits.push(interp.trait);
    } else if (questionId.startsWith('nose_')) {
      noseEarsTraits.push(interp.trait);
    } else if (questionId.startsWith('mouth_')) {
      mouthChinTraits.push(interp.trait);
    }
  }

  const specialPatterns = detectFaceSpecialPatterns(answers);

  return {
    overall: composeFaceOverall(faceShapeTraits, eyesBrowsTraits, noseEarsTraits, mouthChinTraits, specialPatterns),
    love: composeFaceLove(eyesBrowsTraits, mouthChinTraits, answers),
    career: composeFaceCareer(faceShapeTraits, noseEarsTraits, answers),
    health: composeFaceHealth(noseEarsTraits, mouthChinTraits, answers),
    personality: composeFacePersonality(faceShapeTraits, eyesBrowsTraits, answers),
    future: composeFaceFuture(faceShapeTraits, eyesBrowsTraits, noseEarsTraits, mouthChinTraits, specialPatterns),
  };
}

function composeFaceOverall(face: string[], eyes: string[], nose: string[], mouth: string[], patterns: FaceSpecialPattern[]): string {
  const intro = '📖 TONG QUAN TUONG MAT\n\nQua phan tich 4 vung chinh tren khuon mat cua ban theo nhan tuong hoc Viet Nam:\n\n';
  const sections = [
    face[0] ? `👤 Khuon Mat & Tran: ${face[0]}` : '',
    eyes[0] ? `👁️ Mat & Long May: ${eyes[0]}` : '',
    nose[0] ? `👃 Mui & Tai: ${nose[0]}` : '',
    mouth[0] ? `👄 Mieng & Cam: ${mouth[0]}` : '',
  ].filter(Boolean);

  let result = intro + sections.join('\n\n');

  if (patterns.length > 0) {
    result += '\n\n━━━━━━━━━━━━━━━━━━━━\n✨ DAU HIEU DAC BIET\n\n';
    result += patterns.map(p => `${p.emoji} ${p.name}:\n${p.description}`).join('\n\n');
  }

  return result;
}

function composeFaceLove(eyes: string[], mouth: string[], answers: QuizAnswers): string {
  const intro = '💕 TINH CAM & TINH YEU\n\nPhan tich tuong mat lien quan den tinh duyen:\n\n';
  const traits = [eyes[1], mouth[0], eyes[3]].filter(Boolean);
  let result = intro + traits.join('\n\n');

  const ids = Object.values(answers);

  // Dao hoa vuong
  if (ids.includes('face_q1_b') && ids.includes('eyes_q1_d')) {
    result += '\n\n🌸 Dao Hoa: Khuon mat trai xoan ket hop mat hai mi — ban co suc hut tu nhien voi nguoi khac gioi. Tinh duyen vuong, duoc nhieu nguoi yeu men. Hay tran trong va chon loc nhung moi quan he that su xung dang.';
  } else if (ids.includes('mouth_q1_a') && ids.includes('eyes_q4_b')) {
    result += '\n\n💒 Hon Nhan: Moi day ket hop anh mat diu dang — ban la nguoi ban doi ly tuong. Gia dinh ban xay dung se am ap, hanh phuc va day tieng cuoi.';
  } else if (ids.includes('mouth_q4_a')) {
    result += '\n\n👶 Con Cai: Nhan trung dai sau la dau hieu tot lanh cho duong con cai. Ban se co con ngoan, gia dinh hanh phuc va doi song gia dinh vien man.';
  }

  return result;
}

function composeFaceCareer(face: string[], nose: string[], answers: QuizAnswers): string {
  const intro = '💼 SU NGHIEP & TAI CHINH\n\nPhan tich tuong mat lien quan den su nghiep va tai loc:\n\n';
  const headSection = face.length > 0 ? '👤 Tu Duy & Tam Nhin:\n' + face.slice(0, 2).join('\n\n') : '';
  const noseSection = nose.length > 0 ? '\n\n👃 Tai Loc & Phuc Duc:\n' + nose.slice(0, 2).join('\n\n') : '';
  let result = intro + headSection + noseSection;

  const ids = Object.values(answers);

  // Tai van hanh thong
  if (ids.includes('nose_q1_a') && ids.includes('nose_q2_a')) {
    result += '\n\n💰 Tai Loc: Mui thang cao ket hop dau mui tron day — ban co "tai kho" vung chac. Kha nang kiem tien gioi va biet giu tien. Tu tuoi trung nien, tai chinh se rat on dinh va phat trien.';
  } else if (ids.includes('nose_q4_a') && ids.includes('nose_q3_a')) {
    result += '\n\n🏦 Phuc Loc: Tai lon day ket hop dai tai tron — tuong "Phat nhi" mang lai phuc loc doi dao. Ban duoc troi phu cho van tai, tien bac den tu nhien va khong bao gio thieu thon.';
  }

  // Nghe nghiep recommendation
  if (ids.includes('face_q2_a') && ids.includes('eyes_q4_a')) {
    result += '\n\n🎯 Nghe Nghiep Phu Hop: Tran cao + mat sang = tuong cua nha lanh dao, chien luoc gia. Ban phu hop voi quan ly, tham van, tai chinh hoac bat ky linh vuc nao doi hoi tam nhin va quyet doan.';
  } else if (ids.includes('face_q1_d') && ids.includes('eyes_q2_b')) {
    result += '\n\n🎨 Nghe Nghiep Phu Hop: Mat trai tim + long may cong = tuong cua nghe si, nha sang tao. Ban rat phu hop voi thiet ke, nghe thuat, am nhac, truyen thong hoac marketing.';
  }

  return result;
}

function composeFaceHealth(nose: string[], mouth: string[], answers: QuizAnswers): string {
  const intro = '🌿 SUC KHOE & SINH LUC\n\nPhan tich tuong mat lien quan den suc khoe:\n\n';
  const traits = [nose[2], nose[3], mouth[2], mouth[3]].filter(Boolean);
  let result = intro + traits.join('\n\n');

  const ids = Object.values(answers);

  // Song tho / suc khoe tot
  if (ids.includes('nose_q3_a') && ids.includes('mouth_q4_a')) {
    result += '\n\n🏃 Song Tho: Tai lon day ket hop nhan trung dai sau — day la 2 dau hieu tot nhat cho suc khoe va tuoi tho. Ban co nen tang the chat rat tot, sinh luc doi dao va kha nang phuc hoi nhanh.';
  } else if (ids.includes('mouth_q3_b') && ids.includes('face_q4_a')) {
    result += '\n\n😊 Suc Khoe Tinh Than: Cam tron + tran min sang = tam hon lac quan va binh an. Suc khoe tinh than cua ban rat tot — day la nen tang quan trong cho suc khoe the chat.';
  }

  if (ids.includes('mouth_q4_c')) {
    result += '\n\n📌 Luu y: Nhan trung ngan nhac nho ban can chu y suc khoe hon — dac biet he tieu hoa. Hay an uong lanh manh, tap the duc deu dan va kham suc khoe dinh ky. Day KHONG phai dau hieu xau, chi la loi nhac nho de phong.';
  }

  if (ids.includes('nose_q3_c')) {
    result += '\n\n🔔 Loi Khuyen: Tai nho theo dong y lien quan den than — hay giu am co the, uong du nuoc va nghi ngoi day du. Bo sung thuc pham tot cho than nhu dau den, me den va hat oc cho.';
  }

  return result;
}

function composeFacePersonality(face: string[], eyes: string[], answers: QuizAnswers): string {
  const intro = '🔮 TINH CACH & CON NGUOI\n\nKet hop phan tich khuon mat va mat:\n\n';
  const traits = [face[1], eyes[1], face[2], eyes[2]].filter(Boolean);
  let result = intro + traits.join('\n\n');

  const ids = Object.values(answers);

  // Personality synthesis
  const isLeader = ids.includes('face_q1_c') || ids.includes('eyes_q2_d') || ids.includes('mouth_q2_a');
  const isCreative = ids.includes('face_q1_d') || ids.includes('face_q3_c') || ids.includes('mouth_q3_c');
  const isEmotional = ids.includes('eyes_q1_d') || ids.includes('mouth_q1_a') || ids.includes('eyes_q4_b');
  const isAnalytical = ids.includes('eyes_q4_a') || ids.includes('face_q3_b') || ids.includes('eyes_q3_c');

  const personalityTags: string[] = [];
  if (isLeader && isAnalytical) personalityTags.push('Ban la nguoi co khi chat lanh dao ket hop tu duy phan tich — hiem co! Ban khong chi dam quyet dinh ma con quyet dinh dung. Nguoi khac tin tuong va san sang di theo ban.');
  if (isCreative && isEmotional) personalityTags.push('Tam hon nghe si ket hop trai tim nhay cam tao nen mot con nguoi day mau sac va sau sac. Ban co kha nang truyen cam hung cho nguoi khac bang chinh cuoc song cua minh.');
  if (isLeader && isCreative) personalityTags.push('Khi chat lanh dao + oc sang tao = mot to hop tuyet voi. Ban co the tao ra nhung thay doi lon, dan dat nguoi khac theo tam nhin doc dao cua minh.');
  if (isEmotional && isAnalytical) personalityTags.push('Vua co trai tim am ap vua co cai dau lanh — ban biet khi nao can cam xuc, khi nao can ly tri. Su can bang nay la tai san quy gia nhat cua ban.');

  if (personalityTags.length > 0) {
    result += '\n\n━━━━━━━━━━━━━━━━━━━━\n🎯 Tong Hop Tinh Cach:\n' + personalityTags.join('\n\n');
  }

  return result;
}

function composeFaceFuture(face: string[], eyes: string[], nose: string[], mouth: string[], patterns: FaceSpecialPattern[]): string {
  const intro = '🌟 TUONG LAI & LOI KHUYEN\n\nTong hop cac dau hieu ve tuong lai tu nhan tuong hoc:\n\n';
  const futureTraits = [face[3], eyes[3], nose[3], mouth[3]].filter(Boolean);
  let result = intro + futureTraits.join('\n\n');

  if (patterns.length > 0) {
    result += '\n\n━━━━━━━━━━━━━━━━━━━━\n🔮 Dau Hieu Dac Biet Cho Tuong Lai:\n\n';
    for (const p of patterns) {
      if (p.name === 'Phuc Tuong') {
        result += '🙏 Voi Phuc Tuong, cuoc doi ban se tran day phuc duc. Gia dinh hanh phuc, con chau hieu thao va tuoi gia an nhan. Hay tiep tuc lam dieu tot de phuc duc nhan len.\n\n';
      } else if (p.name === 'Quy Tuong') {
        result += '👑 Quy Tuong bao hieu ban co menh lanh dao. Su nghiep se dat dinh cao, duoc nhieu nguoi kinh trong. Hay phat huy khi chat nay de tao anh huong tich cuc.\n\n';
      } else if (p.name === 'Dao Hoa Tuong') {
        result += '🌸 Dao Hoa Tuong mang den tinh duyen vuong — nhung hay chon loc. Khi gap dung nguoi, tinh yeu se la nguon suc manh lon nhat cua ban.\n\n';
      } else if (p.name === 'Phu Quy Tuong') {
        result += '💰 Phu Quy Tuong bao hieu tai van hanh thong suot doi. Tu tuoi trung nien, tai chinh se rat vung chac va du da. Hay dau tu thong minh de gia tang tai san.\n\n';
      } else if (p.name === 'Tri Tue Tuong') {
        result += '🧠 Tri Tue Tuong la to hop tuong hiem — tri tue la "vu khi" manh nhat cua ban. Hay luon hoc hoi va phat trien ban than de toa sang.\n\n';
      }
    }
  }

  result += '\n\n💡 Loi khuyen: Nhan tuong hoc la mon khoa hoc co truyen, mang tinh tham khao va dinh huong. Tuong mao co the thay doi theo thoi gian — tam tot tuong se tot, song thien tuong se dep. Hay song tot, yeu thuong va luon no luc de cuoc doi ngay cang tot dep!';
  return result;
}
