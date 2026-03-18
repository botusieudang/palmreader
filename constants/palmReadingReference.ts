/**
 * Palm Reading Reference Data
 * Compiled from multiple Vietnamese palm reading sources + user's reference images
 * Used to enrich ANSWER_INTERPRETATIONS in palmQuizData.ts
 *
 * Sources:
 * - xemchitay.com.vn
 * - adtimin.vn
 * - cellphones.com.vn
 * - elle.vn
 * - luperi.vn
 * - saostar.vn
 * - vatphamphongthuy.com
 * - vieclam24h.vn
 * - User's reference image "Giai Ma Van Menh Qua 4 Duong Chi Tay Co Ban"
 */

// ============================================================
// 1. DUONG SINH DAO (Life Line) - Duong bao quanh go ngon cai
// ============================================================
export const LIFE_LINE_REFERENCE = {
  general:
    'Duong Sinh Dao khong chi the hien tuoi tho ma con phan anh chat luong cuoc song, suc khoe tong the va nhung bien co lon trong doi.',

  byLength: {
    long: 'Dai va ro: suc song ben bi, nang luong doi dao, it benh tat. Co kha nang song tho va tan huong cuoc song day du.',
    medium: 'Trung binh: suc khoe on dinh, cuoc song dieu do. Can duy tri thoi quen lanh manh.',
    short:
      'Ngan: KHONG co nghia la tuoi tho ngan. Chi ra rang can chu y suc khoe hon, song tich cuc va lanh manh.',
    veryLong:
      'Rat dai (qua co tay): sinh luc phi thuong, the luc ben bi. Thuong la nguoi yeu thich van dong va co suc chiu dung tot.',
  },

  byCurvature: {
    wideCurve:
      'Cong rong (xa ngon cai): nang luong tran day, hoat bat, thich van dong. Suc chiu dung tot, it met moi.',
    closeToCurve:
      'Cong sat ngon cai: can nghi ngoi nhieu hon, khong nen lam viec qua suc. Nen tap the duc deu dan.',
    straight:
      'Thang: loi song ky luat, dieu do nhung thieu linh hoat. Can them hoat dong giai tri.',
    wavy: 'Luon song: suc khoe co luc thang tram, can duy tri loi song lanh manh va kham dinh ky.',
  },

  byStartPoint: {
    nearThumb:
      'Bat dau gan ngon cai: the luc tot, nhung can kiem soat cam xuc de tranh stress.',
    nearIndex:
      'Bat dau gan ngon tro: tham vong va y chi manh, nang luong doi dao theo duoi muc tieu.',
    between:
      'Giua ngon cai va ngon tro (ly tuong): can bang suc khoe, tinh than on dinh.',
    nearEdge:
      'Gan mep ban tay: nhay cam voi moi truong, can bao ve suc khoe va nghi ngoi dieu do.',
  },

  bySpecialSigns: {
    clear:
      'Ro rang, lien tuc: cuoc song on dinh, it bien dong, suc khoe tot.',
    broken:
      'Dut doan: bien dong lon (chuyen noi o, nghe nghiep, su kien lon). Khong nhat thiet la xau - co the la buoc ngoat tich cuc.',
    parallel:
      'Duong song song: co nguoi bao ho, luon duoc ho tro tu nguoi than. Nhanh nhen, hoat bat.',
    branches:
      'Co nhanh re: nhieu co hoi va su kien quan trong, trai nghiem phong phu.',
    island:
      'Co dao (hinh bau duc): giai doan suc khoe yeu, can chu y dac biet. Thuong lien quan den giai doan stress.',
    chain:
      'Hinh chuoi hat: suc khoe bat on, can cham soc ban than nhieu hon.',
  },
};

// ============================================================
// 2. DUONG TRI DAO (Head Line) - Duong ngang giua long ban tay
// ============================================================
export const HEAD_LINE_REFERENCE = {
  general:
    'Duong Tri Dao the hien cach suy nghi, tri thong minh, kha nang hoc hoi va phong cach ra quyet dinh cua ban.',

  byStartPoint: {
    touchesLifeLine:
      'Cham duong sinh dao: can than, suy nghi ky truoc khi hanh dong, trach nhiem cao.',
    separateFromLifeLine:
      'Tach roi duong sinh dao: tinh than phieu luu, doc lap, tinh than doanh nhan manh me.',
    crossesLifeLine:
      'Giao nhau voi duong sinh dao: gan bo gia dinh, quyet dinh bi anh huong boi moi truong.',
    fromEdge:
      'Tu mep ban tay: tu duy doc lap tu nho, co cach nhin khac biet, di theo con duong rieng.',
  },

  byCurvature: {
    straight:
      'Thang nam ngang: logic, thuc te, giai quyet van de bang ly tri. Phu hop cong viec doi hoi su chinh xac (ke toan, ky su, IT).',
    curvedDown:
      'Vong huong xuong: sang tao, tri tuong tuong phong phu, kha nang nghe thuat tot. Phu hop nghe thuat, van hoc, thiet ke.',
    slightCurve:
      'Hoi cong nhe: ket hop hai hoa logic va sang tao. Linh hoat trong giai quyet van de.',
    wavy: 'Luon song: tu duy da dang nhung thieu tap trung. Can ren luyen kien nhan.',
  },

  byLength: {
    long: 'Dai: tu duy sau rong, tam nhin xa, kha nang lap ke hoach chien luoc tot.',
    medium: 'Trung binh: tri tue on dinh, thuc te, xu ly hieu qua.',
    short:
      'Ngan: hanh dong nhanh, it suy nghi nhieu. Phu hop cong viec doi hoi nhanh nhen, quyet doan.',
    veryLong:
      'Rat dai (qua mep tay): tri tue vuot troi, phan tich sau sac. Thanh cong trong nghien cuu, chuyen mon cao.',
  },

  bySpecialSigns: {
    deep: 'Ro rang, sau: tap trung cao, hoc hoi nhanh, ghi nho tot.',
    branches:
      'Co nhanh re: da tai da nghe, thanh cong o nhieu linh vuc.',
    broken:
      'Dut doan: thay doi lon trong su nghiep, chuyen nganh, buoc ngoat bat ngo nhung cuoi cung on dinh.',
    faint:
      'Mo, nong: can phat trien ky nang tap trung, bu lai co nhay cam va truc giac tot.',
    forked:
      'Chia nhanh o cuoi: kha nang lam nhieu viec cung luc, da nang.',
    island:
      'Co dao: giai doan kho tap trung, can nghi ngoi va thu gian.',
  },
};

// ============================================================
// 3. DUONG TAM DAO (Heart Line) - Duong ngang phia tren long ban tay
// ============================================================
export const HEART_LINE_REFERENCE = {
  general:
    'Duong Tam Dao the hien doi song tinh cam, kha nang yeu thuong, moi quan he va suc khoe tim mach.',

  byEndPoint: {
    toIndexFinger:
      'Keo dai den ngon tro: hai long voi cuoc song tinh cam. Biet yeu va duoc yeu, can bang trong cac moi quan he. Tinh yeu ly tuong va dich thuc.',
    underMiddleFinger:
      'Duoi ngon giua: thuc te, uu tien ban than, can nhac ky truoc khi dua ra cam xuc. Co the thieu lang man nhung dang tin cay.',
    betweenIndexAndMiddle:
      'Giua ngon tro va giua: can bang tuyet voi giua ly tuong va thuc te. Tinh yeu bao dung va truong thanh.',
    acrossPalm:
      'Chay dai qua long ban tay: giau tinh cam, song het minh vi nguoi yeu. Trai tim rong lon, de roi vao luoi tinh.',
  },

  byCurvature: {
    curvedUp:
      'Cong huong len: lac quan, nhiet huyet trong tinh yeu. Bieu lo tinh cam tu nhien, mang nang luong tich cuc.',
    straightShort:
      'Thang va ngan: khong lang man, thuc te, thich hanh dong cu the hon loi noi hoa my.',
    wavy: 'Luon song: suc loi cuon dac biet nhung thieu tinh yeu chan thanh. Can hoc cach mo long va tin tuong.',
    curvedDown:
      'Cong huong xuong: giau cam xuc ben trong, it bieu lo ra ngoai nhung co chieu sau tinh cam lon.',
  },

  byDepth: {
    deep: 'Day va sau: nhiet huyet, muc tieu ro rang. Chung thuy, dam me, san sang hy sinh vi nguoi yeu.',
    medium: 'Trung binh: doi song tinh cam on dinh, can bang tot.',
    faint:
      'Nong va mo: khong tran day nang luong, can tap trung phat trien tinh cam sau sac.',
    veryShort:
      'Rat ngan: kho khan trong viec the hien tinh cam, can mo long don nhan tinh yeu.',
  },

  bySpecialSigns: {
    clear: 'Ro rang, lien tuc: tinh cam suon se, it song gio. Duy tri moi quan he lau dai va hanh phuc.',
    branches:
      'Co nhanh re: nhieu moi quan he xa hoi, de thu hut nguoi khac. Duoc nhieu nguoi yeu men.',
    broken:
      'Dut doan: tung trai qua cuoc tinh sau sac, kho quen. Trai nghiem giup truong thanh va hieu ro ban than.',
    parallel:
      'Nhieu duong song song: da cam, kha nang yeu nhieu nguoi. Can hoc cach tap trung vao mot moi quan he.',
    chain:
      'Hinh chuoi hat: tinh cam phuc tap, nhieu moi quan he ngan han.',
    star: 'Co hinh sao: tinh yeu dot ngot va manh liet, co the gap tinh yeu set danh.',
  },
};

// ============================================================
// 4. DUONG SU NGHIEP / DINH MENH (Fate Line) - Duong doc giua long ban tay
// ============================================================
export const FATE_LINE_REFERENCE = {
  general:
    'Duong Su Nghiep (Dinh Menh) the hien con duong nghe nghiep, muc do thanh cong va nhung thay doi lon trong cuoc doi.',

  byStartPoint: {
    fromWrist:
      'Tu co tay thang len: con duong su nghiep ro rang tu som. Biet minh muon gi va kien dinh theo duoi.',
    fromMiddle:
      'Tu giua long ban tay: tu tay gay dung su nghiep. Giai doan sau 30 tuoi la buoc ngoat lon.',
    fromLifeLine:
      'Tu duong sinh dao: doc lap, chi tien thu rat cao. Thanh cong bang chinh nang luc cua minh.',
    absent:
      'Khong co duong su nghiep: KHONG co nghia se khong thanh cong. La nguoi tu do, khong bi rang buoc boi con duong co dinh.',
  },

  byCurvature: {
    straight:
      'Ro va thang: cong viec ro rang, thuan loi. Tap trung cao, dat muc tieu de dang.',
    curvedToIndex:
      'Cong ve ngon tro: tham vong lon, kha nang lanh dao. Dat vi tri cao trong cong viec.',
    curvedToLittle:
      'Cong ve ngon ut: kha nang giao tiep va kinh doanh tot. Phu hop voi xa hoi va truyen thong.',
    zigzag:
      'Luon song / zig zag: su nghiep nhieu thay doi va thu thach. Chinh nhung trai nghiem nay giup truong thanh.',
  },

  byDepth: {
    deep: 'Day va ro rang: y chi manh, quyet tam cao. Su nghiep thuan loi, it tro ngai.',
    faint:
      'Nhat va mo: khong hai long voi cong viec hien tai. Can tim huong di moi phu hop.',
    strongStartFading:
      'Doan dau ro, doan sau mo: khoi dau tot nhung can no luc duy tri. Dung chu quan.',
    faintStartStrong:
      'Doan dau mo, doan sau ro: cang ngay cang thanh cong. Dau kho khan nhung tuong lai sang.',
  },

  bySpecialSigns: {
    continuous:
      'Lien tuc, khong dut: on dinh trong cong viec. Dang tin cay, duoc danh gia cao.',
    broken:
      'Dut doan: thay doi lon trong su nghiep, chuyen nganh hoac bat dau lai. Cuoi cung tim duoc huong di dung.',
    crossesLifeLine:
      'Cat duong sinh dao: doc lap, chi tien thu cao. San sang hy sinh suc khoe va thoi gian de dat muc tieu.',
    separateFromLifeLine:
      'Tach khoi duong sinh dao: ua mao hiem, thich kham pha. Thanh cong o con duong it nguoi di.',
  },

  byAge: {
    // Based on vatphamphongthuy.com reference
    bottom:
      'Doan duoi (gan co tay): tuong ung giai doan 0-20 tuoi',
    lowerMiddle:
      'Doan giua duoi: tuong ung giai doan 20-35 tuoi',
    upperMiddle:
      'Doan giua tren: tuong ung giai doan 35-50 tuoi',
    top: 'Doan tren (gan ngon tay): tuong ung giai doan 50+ tuoi',
  },
};

// ============================================================
// 5. DUONG THAI DUONG (Sun Line) - Duong doc huong ngon ap ut
// ============================================================
export const SUN_LINE_REFERENCE = {
  general:
    'Duong Thai Duong (Sun Line) lien quan den thanh cong, danh tieng, tai nang va su cong nhan xa hoi.',
  present:
    'Co duong Thai Duong: duoc cong nhan ve tai nang, co danh tieng va su nghiep sang choi.',
  absent:
    'Khong co: phai no luc nhieu hon de duoc cong nhan, nhung van co the thanh cong bang noi luc.',
  strong:
    'Ro va sau: thanh cong ruc ro, duoc nhieu nguoi biet den. Phu hop nghe thuat, truyen thong, lanh dao.',
  faint:
    'Mo nhat: tai nang con an giau, can phat trien va the hien ban than nhieu hon.',
};

// ============================================================
// 6. DAU HIEU XAU TREN BAN TAY (Bad signs - luperi.vn reference)
// ============================================================
export const BAD_SIGNS_REFERENCE = {
  island:
    'Dao (hinh bau duc): giai doan kho khan, suc khoe yeu, stress. Vi tri dao cho biet giai doan nao.',
  chain:
    'Chuoi hat (nhieu dao lien tiep): bat on keo dai, can kien nhan va cham soc ban than.',
  cross:
    'Dau thap (X): tro ngai bat ngo, nhung cung co the la dau hieu cua su thay doi tich cuc.',
  star: 'Hinh sao: su kien dot ngot va manh liet. Co the tot hoac xau tuy vi tri.',
  square:
    'Hinh vuong: bao ve khoi nguy hiem. Day la dau hieu tot, cho thay ban duoc bao ho.',
  grid: 'Luoi: nhieu lo lang va stress. Can hoc cach thu gian va buong bo.',
  fork: 'Chia doi: lua chon quan trong, ngã re cuoc doi. Can suy nghi ky truoc khi quyet dinh.',
};

// ============================================================
// 7. DUONG MAY MAN DAC BIET (Lucky patterns - xemchitay.com.vn)
// ============================================================
export const LUCKY_PATTERNS_REFERENCE = {
  letterM: {
    name: 'Duong chi tay chu M',
    formation: 'Ket hop duong tam dao, sinh dao va tri dao tao thanh hinh chu M.',
    traits: 'Tot bung, hay giup do, truc giac tot, giao tiep gioi, kha nang lanh dao.',
    destiny: 'Co van may tot, khong lo ve tai chinh khi ve gia.',
  },
  goldIngot: {
    name: 'Duong chi tay thoi vang',
    formation: 'Duong sinh dao, tri dao va su nghiep noi lai, rong o tren hep o duoi nhu thoi vang.',
    traits: 'Tai nang, gioi quan ly tai chinh. Nu gioi co duong nay thuong manh me, doc lap.',
    destiny: 'Giau co va may man, nhung phai trai qua kho khan truoc khi thanh cong.',
  },
  letterX: {
    name: 'Duong chi tay chu X',
    formation: 'Hinh thanh giua hai duong cong ngang duoi cac ngon tay.',
    traits: 'Thang than, trung thuc, duoc yeu men, truc giac tot, thong minh.',
    destiny: 'Cuoc song thinh vuong, giau co, it kho khan.',
  },
  letterOne: {
    name: 'Duong chi tay hinh chu Nhat',
    formation: 'Duong tri dao va tam dao chay ngang thanh mot duong thang, chia doi long ban tay.',
    traits: 'Rat thong minh, tham vong, luon hoc hoi, nhung doi khi buong binh va cung nhac.',
    destiny: 'Dat nhieu thanh cong lon nhung phai vuot qua nhieu kho khan.',
  },
  threeBranch: {
    name: 'Duong chi tay tam xien',
    formation: 'Giong nhanh cay toa ra ba huong, ca ba cat duong tam dao.',
    traits: 'Nhanh nhen, sac sao, cam xuc can bang, nhieu moi quan he tot.',
    destiny: 'Su nghiep va tinh cam deu phat trien tot.',
  },
};

// ============================================================
// 8. DAU HIEU SONG THO (Longevity signs - xemchitay.com.vn)
// ============================================================
export const LONGEVITY_SIGNS_REFERENCE = {
  positive: {
    longClearLifeLine: 'Duong sinh dao dai, ro, khong dut doan — dau hieu suc khoe tot va song tho.',
    doubleLifeLine: 'Duong sinh dao kep (duong song song) — suc song manh me va co nguoi bao ho.',
    curvedWellDefined: 'Duong sinh dao cong dep, ro net — phuc hoi nhanh, suc de khang tot.',
    rosyPalm: 'Long ban tay hong hao — khi huyet luu thong tot, suc khoe on dinh.',
    fullFingertips: 'Dau ngon tay day dan, khong nhan nheo — sinh luc doi dao.',
    developedMounts: 'Go Venus va go Moon phat trien — suc song manh me va tinh than on dinh.',
  },
  negative: {
    brokenLifeLine: 'Duong sinh dao dut doan, mo, co duong cat ngang — can chu y suc khoe.',
    triangularPatterns: 'Hinh tam giac, chu X, hinh nguoc — dau hieu canh bao suc khoe.',
    veryShortLifeLine: 'Duong sinh dao rat ngan hoac vang — can cham soc dac biet (nhung KHONG co nghia tuoi tho ngan).',
    headLineCutting: 'Duong tri dao cat vao duong sinh dao — stress anh huong suc khoe.',
  },
};

// ============================================================
// 9. DAU HIEU DAO HOA (Romance/Peach blossom - xemchitay.com.vn)
// ============================================================
export const ROMANCE_SIGNS_REFERENCE = {
  heartLineBranches: 'Duong tam dao phan nhanh hoac co nhieu duong cat nho ngang — doi song tinh cam da dang.',
  multipleMarriageLines: 'Nhieu duong hon nhan — doi song tinh cam phong phu nhung phuc tap.',
  starTrianglePatterns: 'Hinh sao hoac tam giac tren duong tam dao — thu hut nhieu nguoi theo duoi.',
  pinkyFingerLines: 'Duong doc tren ngon ut — duoc nguoi khac quan tam thuong xuyen.',
  fullVenusMount: 'Go Venus day dan va hong hao — cam xuc sau sac, suc loi cuon lon.',
  positiveSign: 'Duong ro, khong dut — van dao hoa tot, tinh cam hanh phuc.',
  negativeSign: 'Duong dut doan, pha tap — tinh cam phuc tap, kho on dinh.',
};

// ============================================================
// 10. DUONG BUON BAN / TAI LOC (Business lines - xemchitay.com.vn)
// ============================================================
export const BUSINESS_LINES_REFERENCE = {
  positive: {
    clearWealthLine: 'Duong tai loc ro, sau, dai — van tai loc doi dao, kha nang kiem tien gioi.',
    letterMPalm: 'Dau chu M tren long ban tay — truc giac sac ben, nam bat co hoi nhanh, thanh cong kinh doanh.',
    moneyLineFromPinky: 'Duong tien tu goc ngon ut — tiem nang kiem tien xuat sac. Nhieu nhanh huong len = nhieu nguon thu nhap.',
    noblePersonLine: 'Duong quy nhan phu tro — luon co nguoi giup do trong su nghiep.',
  },
  negative: {
    brokenWealthLine: 'Duong tai loc dut doan, mo — kho khan tai chinh, that bai kinh doanh.',
    shortHeadLineWithCrossings: 'Duong tri dao ngan + nhieu duong cat ngang — quyet dinh yeu, kho nhan biet co hoi.',
    flatMercuryHill: 'Go Thuy Tinh (duoi ngon ut) phang — thieu linh hoat kinh doanh.',
    multipleCrossingsMercury: 'Nhieu duong cat qua go Thuy Tinh — that bai kinh doanh, bi lua dao.',
  },
};

// ============================================================
// 11. DUONG HON NHAN (Marriage lines - xemchitay.com.vn)
// ============================================================
export const MARRIAGE_LINES_REFERENCE = {
  clearAndStrong: 'Duong hon nhan ro rang, khong dut — hon nhan hanh phuc, ben vung.',
  broken: 'Duong hon nhan dut doan — moi quan he bat on, co the ly hon hoac chia tay.',
  cutByHorizontal: 'Duong hon nhan bi cat ngang ro ret — tinh cam, hon nhan co the do vo.',
  downwardBranches: 'Nhanh huong xuong — hon nhan khong hanh phuc, bat hoa, lanh nhat.',
  crossesFateLine: 'Cat duong su nghiep — tro ngai va kho khan trong doi song hon nhan.',
  starShaped: 'Hinh sao hoac hinh nguoc — thieu hoa hop, tranh cai, co the bi nguoi thu ba can thiep.',
  advice: 'Duong chi tay khong phai dinh menh bat bien. Co the cai thien hon nhan bang: kiem soat cam xuc, cai thien giao tiep, cam thong va trach nhiem, tao trai nghiem chung tot dep.',
};

// ============================================================
// 12. NGUYEN TAC NAM TA NU HUU (General principle)
// ============================================================
export const GENERAL_PRINCIPLES = {
  namTaNuHuu: 'Nam ta nu huu: nam xem tay trai, nu xem tay phai. Tuy nhien, nhieu truong phai hien dai xem ca hai tay — tay thuan (dominant) phan anh hien tai, tay con lai phan anh tiem nang bam sinh.',
  disclaimer: 'Xem chi tay khong phai khoa hoc chinh xac, chi la phuong tien tham khao va giai tri. Duong chi tay co the thay doi theo thoi gian.',
  mainLines: 'Ba duong chinh: Tam Dao (Heart), Tri Dao (Head), Sinh Dao (Life). Cac duong phu: Su Nghiep (Fate), Thai Duong (Sun), Hon Nhan (Marriage), Suc Khoe (Health).',
  changeOverTime: {
    positive: 'Duong dai hon, ro rang hon, lien mach hon — van menh dang cai thien.',
    negative: 'Duong ngan hon, mo nhat hon, gay gap hon — can chu y suc khoe va loi song.',
  },
  handSigns: {
    rosySmooth: 'Ban tay hong hao, bong: tuan hoan mau tot, suc khoe on dinh.',
    roundFingers: 'Ngon tay tron, khong nhan: tinh than va the chat on dinh.',
    developedMounts: 'Go Thai Am va Thai Duong phat trien: suc song doi dao.',
    dryRough: 'Ban tay kho rap, gay guoc: dieu kien song kho khan.',
  },
};

// ============================================================
// 13. DUONG CONG DANH (Sun/Fame Line - xemchitay.com.vn)
// ============================================================
export const FAME_LINE_REFERENCE = {
  general: 'Duong Cong Danh chay tu vung go Thai Am den vung Thai Duong. The hien nang luc, tai nang va su noi tieng.',
  clear: 'Ro, dam, khong dut: su nghiep on dinh, nhieu thanh tuu.',
  longToSun: 'Dai keo den vung Thai Duong: co hoi thuan loi, quy nhan ho tro.',
  branchUp: 'Nhanh huong len: phat trien khong ngung.',
  broken: 'Dut doan hoac bi cat: tro ngai, thuong doi viec.',
  starSymbol: 'Bieu tuong ngoi sao: tiem nang noi tieng lon, dac biet nghe thuat/kinh doanh.',
  crossOrX: 'Dau X hoac chu thap: kho khan noi lam viec, quan he phuc tap.',
  triangle: 'Hinh tam giac: tai nang, sang tao, nang luc quan ly.',
  touchesHeartLine: 'Tiep xuc voi duong tam dao: cam xuc anh huong den can bang su nghiep.',
  absent: 'Vang mat: cuoc song binh thuong, khong co su cong nhan dac biet nhung van co the thanh cong bang noi luc.',
};

// ============================================================
// 14. DUONG XUAT NGOAI (Emigration Line - xemchitay.com.vn)
// ============================================================
export const EMIGRATION_LINE_REFERENCE = {
  general: 'Duong xuat ngoai nam o vung go Thai Am, huong ve mep ban tay.',
  clearLong: 'Ro, dai, khong dut: trien vong xuat ngoai thuan loi.',
  brokenFaint: 'Dut doan hoac mo: gap tro ngai khi lam thu tuc.',
  crossesFateLine: 'Giao voi duong dinh menh: co quy nhan giup do.',
  upward: 'Huong len: co hoi may man o nuoc ngoai.',
  cutByOthers: 'Bi cat boi duong khac: kho khan neu xuat ngoai.',
};

// ============================================================
// 15. CAC HINH DAC BIET TREN BAN TAY (Special patterns - xemchitay.com.vn)
// ============================================================
export const SPECIAL_PATTERNS_REFERENCE = {
  letterM: {
    description: 'Ket hop duong tam dao, sinh dao va tri dao thanh hinh chu M.',
    meaning: 'Tai lanh dao, nam bat co hoi phat trien su nghiep. Khoang 10% dan so co hinh nay.',
  },
  letterX: {
    description: 'Hai duong cat nhau thanh hinh chu X giua long ban tay.',
    meaning: 'Thong minh, nhay ben, thanh cong kinh doanh/giao duc/nghe thuat.',
  },
  letterOne: {
    description: 'Duong tri dao va tam dao hop nhat thanh mot duong thang chia doi long ban tay.',
    meaning: 'Ca tinh manh me, doc lap, quyet doan. Thong minh, sang tao nhung doi khi cung nhac. Khoang 10% dan so.',
  },
  threeBranch: {
    description: 'Ba duong toa ra nhu nhanh cay, cat duong tam dao.',
    meaning: 'Thu hut van may va tai loc. Nhanh nhen, sac sao.',
  },
  parallel: {
    description: 'Duong song song voi cac duong chinh.',
    meaning: 'Nam bat co hoi phat trien, hon nhan hanh phuc.',
  },
  star: {
    description: 'Nhieu duong ngan giao nhau thanh hinh sao.',
    meaning: 'Phu quy, thanh cong, may man. Rat hiem gap.',
  },
  phoenixEye: {
    description: 'Van tay hinh mat phuong tren ngon cai.',
    meaning: 'Tai nang thien phu, xinh dep, duyen dang.',
  },
  triangleIsland: {
    description: 'Hinh tam giac hoac dao tren cac duong chinh.',
    meaning: 'Thach thuc cong viec, bien co suc khoe. Vi tri cua hinh cho biet giai doan nao.',
  },
};
