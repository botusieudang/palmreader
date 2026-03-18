// ===== LIFE PATH INTERPRETATIONS =====
export const LIFE_PATH_MEANINGS: Record<number, {
  title: string;
  keyword: string;
  description: string;
  strengths: string;
  weaknesses: string;
  career: string;
  love: string;
  health: string;
}> = {
  1: {
    title: 'Nguoi Tien Phong',
    keyword: 'Doc lap - Lanh dao - Sang tao',
    description: 'Ban la nguoi doc lap, co y chi manh me va kha nang lanh dao tu nhien. Ban thich di dau va khong ngai thu thach. Ban co tam nhin xa va luon muon tao ra dieu gi do moi me.',
    strengths: 'Quyet doan, tu tin, sang tao, co kha nang khoi xuong va dan dat nguoi khac. Ban la nguoi hanh dong, khong ngoi doi.',
    weaknesses: 'De tro nen doc doan, buong binh, thieu kien nhan voi nguoi khac. Doi khi qua tap trung vao ban than ma quen di cam xuc nguoi xung quanh.',
    career: 'Phu hop lam lanh dao, khoi nghiep, giam doc, quan ly. Thanh cong trong cac linh vuc doi hoi su tien phong va sang tao. Nen tu lam chu hon la lam thue.',
    love: 'Can mot nguoi ban dong hanh hieu va ton trong su doc lap cua ban. Hay hoc cach lang nghe va chia se quyen kiem soat trong moi quan he.',
    health: 'Can chu y: dau dau, mat, tim mach. Stress do ap luc lanh dao. Nen tap the duc deu dan va hoc cach thu gian.',
  },
  2: {
    title: 'Nguoi Hoa Giai',
    keyword: 'Hop tac - Ngoai giao - Nhan cam',
    description: 'Ban la nguoi nhay cam, co kha nang thau hieu cam xuc nguoi khac. Ban gioi trong viec hoa giai mau thuan va tao su hai hoa. Ban la nguoi lang nghe tuyet voi.',
    strengths: 'Ngoai giao, kien nhan, truc giac tot, biet cach hop tac va lam viec nhom. Ban co kha nang nhin thay ca hai mat cua van de.',
    weaknesses: 'Qua nhay cam, de bi ton thuong, thieu quyet doan, hay phu thuoc vao nguoi khac. Doi khi hy sinh ban than qua nhieu.',
    career: 'Phu hop lam tu van, ngoai giao, nhan su, tam ly, nghe thuat. Lam viec nhom tot hon lam viec doc lap. Thanh cong khi hop tac voi nguoi khac.',
    love: 'Ban la nguoi ban doi ly tuong - tan tuy, chu dao, lang nghe. Nhung can hoc cach noi len nhu cau cua minh, khong chi chieu long nguoi khac.',
    health: 'Can chu y: he tieu hoa, da day, van de tam ly nhu lo au, tram cam. Nen thien dinh va giur moi truong song yen tinh.',
  },
  3: {
    title: 'Nguoi Sang Tao',
    keyword: 'Bieu dat - Giao tiep - Lac quan',
    description: 'Ban co kha nang giao tiep va bieu dat xuat sac. Ban la nguoi lac quan, vui ve, co suc hut xa hoi tu nhien. Ban truyen cam hung cho nguoi khac bang nang luong tich cuc.',
    strengths: 'Sang tao, hoat ngon, hai huoc, co duyen. Ban co kha nang bien y tuong thanh hien thuc thong qua ngon tu va nghe thuat.',
    weaknesses: 'De phan tan, thieu tap trung, noi nhieu hon lam. Doi khi hoi phong va thieu tinh thuc te. Can hoc cach ket thuc nhung gi da bat dau.',
    career: 'Phu hop lam marketing, truyen thong, MC, content creator, giang day, ban hang. Bat cu nghe nao can giao tiep va sang tao deu phu hop.',
    love: 'Ban la nguoi thu vi trong tinh yeu, luon mang lai niem vui. Nhung can hoc cach di sau hon trong cam xuc, khong chi o be mat.',
    health: 'Can chu y: co hong, thanh quan, he than kinh. De mat giong, stress do lam viec qua suc. Nen nghi ngoi du va han che noi qua nhieu.',
  },
  4: {
    title: 'Nguoi Xay Dung',
    keyword: 'Ky luat - To chuc - On dinh',
    description: 'Ban la nguoi thuc te, co ky luat va kha nang to chuc tuyet voi. Ban xay dung moi thu tren nen tang vung chac. Ban la tru cot dang tin cay cua gia dinh va to chuc.',
    strengths: 'Ky luat, cham chi, dang tin cay, co he thong. Ban lam viec cham chi va luon hoan thanh nhiem vu dung han.',
    weaknesses: 'Cung nhac, bao thu, thieu linh hoat, qua cau toan. Doi khi qua nghiem khac voi ban than va nguoi khac.',
    career: 'Phu hop lam ky su, ke toan, quan ly du an, xay dung, luat su. Thanh cong trong cac linh vuc doi hoi su chinh xac va to chuc.',
    love: 'Ban la nguoi chung thuy va dang tin cay. Nhung can hoc cach the hien tinh cam va khong qua cung nhac trong moi quan he.',
    health: 'Can chu y: xuong khop, rang, he co xuong. Stress do lam viec qua nhieu. Can tap the duc va nghi ngoi hop ly.',
  },
  5: {
    title: 'Nguoi Tu Do',
    keyword: 'Phieu luu - Thay doi - Da nang',
    description: 'Ban la nguoi yeu tu do, thich phieu luu va trai nghiem moi. Ban co kha nang thich nghi nhanh va da nang. Cuoc song cua ban luon day mau sac va su thay doi.',
    strengths: 'Linh hoat, phieu luu, giao tiep tot, da nang. Ban hoc nhanh va co the lam nhieu viec cung luc.',
    weaknesses: 'Thieu kien nhan, de chan, thieu trach nhiem, qua phan tan. Can hoc cach cam ket va kien tri voi mot huong di.',
    career: 'Phu hop lam du lich, truyen thong, kinh doanh, marketing, ban hang. Can su da dang va thay doi trong cong viec. Khong phu hop voi cong viec van phong co dinh.',
    love: 'Ban can mot nguoi hieu va ton trong nhu cau tu do cua ban. Hay hoc cach cam ket va khong bo chay khi moi quan he gap kho khan.',
    health: 'Can chu y: he than kinh, nghien ngap (ruou, thuoc la, game). He mien dich yeu do loi song thieu dieu do. Nen co lich sinh hoat on dinh.',
  },
  6: {
    title: 'Nguoi Che Cho',
    keyword: 'Trach nhiem - Yeu thuong - Gia dinh',
    description: 'Ban la nguoi co trach nhiem, yeu thuong va luon muon cham soc nguoi khac. Ban co kha nang tao ra su hai hoa va am ap trong moi truong xung quanh.',
    strengths: 'Yeu thuong, trach nhiem, co khieu tham my, gioi cham soc. Ban la tru cot cua gia dinh va cong dong.',
    weaknesses: 'Hay lo lang, kiem soat nguoi khac, hy sinh ban than qua nhieu. Can hoc cach de nguoi khac tu giai quyet van de cua ho.',
    career: 'Phu hop lam bac si, giao vien, tu van, thiet ke, nha hang, lam dep. Thanh cong trong cac linh vuc phuc vu va cham soc.',
    love: 'Ban la nguoi ban doi ly tuong - tan tuy va chung thuy. Nhung can tranh kiem soat qua muc va hoc cach yeu ban than truoc.',
    health: 'Can chu y: lung, vai, he tieu hoa, tim mach. Stress do ganh nang trach nhiem. Can hoc cach chia se ganh nang.',
  },
  7: {
    title: 'Nguoi Tim Kiem',
    keyword: 'Phan tich - Tam linh - Tri tue',
    description: 'Ban la nguoi co chieu sau tri tue va tam linh. Ban luon tim kiem chan ly va y nghia cua cuoc song. Ban co truc giac manh va kha nang phan tich sac ben.',
    strengths: 'Phan tich tot, truc giac manh, co chieu sau, tri tue. Ban co kha nang nhin xuyen qua be mat cua su viec.',
    weaknesses: 'Co don, kho hoa nhap, qua ly tri, nghi ngo. Can hoc cach mo long va tin tuong nguoi khac.',
    career: 'Phu hop lam nghien cuu, cong nghe, triet hoc, tam ly hoc, khoa hoc. Thanh cong khi lam viec doc lap va co thoi gian suy ngam.',
    love: 'Ban can mot nguoi hieu va ton trong nhu cau rieng tu cua ban. Hay hoc cach chia se cam xuc va khong xay buc tuong xung quanh minh.',
    health: 'Can chu y: he than kinh, mat ngu, tram cam, cac van de ve da. Nen thien dinh, yoga, va tiep xuc voi thien nhien.',
  },
  8: {
    title: 'Nguoi Thanh Dat',
    keyword: 'Quyen luc - Tai chinh - Thanh cong',
    description: 'Ban la nguoi co kha nang quan ly tai chinh va dat duoc thanh cong vat chat. Ban co tam nhin kinh doanh va kha nang lanh dao to chuc lon.',
    strengths: 'Quyet doan, co tam nhin kinh doanh, quan ly tai chinh gioi, co uy quyen. Ban biet cach tao ra gia tri va su giau co.',
    weaknesses: 'Tham vong qua muc, de tro nen lanh lung, hay ap dat. Can hoc cach can bang giua vat chat va tinh than.',
    career: 'Phu hop lam giam doc, ngan hang, bat dong san, dau tu, luat su. Thanh cong trong cac linh vuc doi hoi quyen luc va tai chinh.',
    love: 'Ban can mot nguoi hieu va ung ho su nghiep cua ban. Hay nho rang tinh yeu khong the mua duoc bang tien bac.',
    health: 'Can chu y: huyet ap, tim mach, stress man tinh. Ap luc cong viec anh huong suc khoe. Can tap the duc va can bang cuoc song.',
  },
  9: {
    title: 'Nguoi Nhan Dao',
    keyword: 'Ly tuong - Bao dung - Phung su',
    description: 'Ban la nguoi co tam nhin rong va ly tuong cao. Ban muon cong hien cho cong dong va tao ra su thay doi tich cuc. Ban co long bao dung va thau hieu.',
    strengths: 'Bao dung, sang tao, co tam nhin, truyen cam hung. Ban co kha nang nhin thay buc tranh lon va truyen cam hung cho nguoi khac.',
    weaknesses: 'Mo mong, xa roi thuc te, de that vong, hy sinh qua nhieu. Can hoc cach chap nhan the gioi khong hoan hao.',
    career: 'Phu hop lam nghe thuat, nhan dao, giao duc, y te, tu thien. Thanh cong khi lam viec co y nghia xa hoi. Khong phu hop voi cong viec chi vi tien.',
    love: 'Ban yeu thuong theo kieu ly tuong hoa. Can hoc cach chap nhan doi phuong nhu ho la, khong phai nhu ban muon ho tro thanh.',
    health: 'Can chu y: he mien dich, kiet suc vi lam viec qua nhieu cho nguoi khac. Can hoc cach cham soc ban than truoc.',
  },
  11: {
    title: 'Nguoi Truyen Cam Hung (Master 11)',
    keyword: 'Truc giac - Linh cam - Tam linh',
    description: 'So 11 la Master Number - ban co truc giac va linh cam vuot troi. Ban la nguoi co kha nang truyen cam hung va dan dat nguoi khac bang tam nhin tam linh.',
    strengths: 'Truc giac phi thuong, sang tao, truyen cam hung, co suc thu hut dac biet. Ban co the cam nhan duoc nhung dieu nguoi khac khong thay.',
    weaknesses: 'Ap luc noi tam lon, de lo au, qua nhay cam, kho song thuc te. Can hoc cach can bang giua the gioi tinh than va vat chat.',
    career: 'Phu hop lam cac nghe sang tao, tam linh, tu van, giang day, nghe thuat. Ban co the thanh cong lon nhung cung phai doi mat voi ap luc lon.',
    love: 'Ban can mot nguoi hieu duoc chieu sau tam hon ban. Moi quan he cua ban thuong rat manh me nhung cung day song gio.',
    health: 'Can chu y: he than kinh, lo au, mat ngu, nang luong bi tieu hao nhanh. Can thien dinh hang ngay va tranh moi truong tieu cuc.',
  },
  22: {
    title: 'Nguoi Kien Tao (Master 22)',
    keyword: 'Tam nhin - Hien thuc hoa - Kien tao',
    description: 'So 22 la Master Number manh nhat - ban co kha nang bien tam nhin lon thanh hien thuc. Ban la nguoi xay dung nhung dieu vi dai va lau dai.',
    strengths: 'Tam nhin xa, kha nang hien thuc hoa y tuong lon, ky luat, lanh dao. Ban co the tao ra nhung cong trinh de doi.',
    weaknesses: 'Ap luc cuc lon, de tro nen doc doan, qua cau toan. Can hoc cach chap nhan su khong hoan hao va chia se ganh nang.',
    career: 'Phu hop lam kien truc su, CEO cong ty lon, chinh tri gia, nha lanh dao. Ban co the tao ra anh huong toan cau.',
    love: 'Ban can mot nguoi ban dong hanh vung vang va hieu su nghiep lon cua ban. Hay nho danh thoi gian cho gia dinh.',
    health: 'Can chu y: stress man tinh, kiet suc, van de ve cot song. Ap luc cua Master Number 22 rat lon, can nghi ngoi hop ly.',
  },
  33: {
    title: 'Nguoi Phung Su (Master 33)',
    keyword: 'Tinh yeu - Phung su - Hy sinh',
    description: 'So 33 la Master Number cua tinh yeu vo dieu kien. Ban co kha nang chua lanh va phung su nhan loai o cap do cao nhat.',
    strengths: 'Tinh yeu vo dieu kien, kha nang chua lanh, truyen cam hung, hy sinh. Ban la nguoi dan duong cho nhung gia tri nhan van.',
    weaknesses: 'Hy sinh ban than qua muc, de bi loi dung, ganh nang cam xuc lon. Can hoc cach bao ve ban than.',
    career: 'Phu hop lam cac nghe phuc vu nhan loai: bac si, nha tu thien, giao duc, tam linh. Cuoc doi ban la de phung su.',
    love: 'Ban yeu thuong vo dieu kien nhung can hoc cach nhan lai. Dung de tinh yeu tro thanh su hy sinh mot chieu.',
    health: 'Can chu y: kiet suc ve cam xuc va the chat do cho di qua nhieu. Can hoc cach noi "khong" va cham soc ban than.',
  },
};

// ===== MISSING NUMBER INTERPRETATIONS =====
export const MISSING_NUMBER_MEANINGS: Record<number, {
  title: string;
  meaning: string;
  advice: string;
}> = {
  1: { title: 'Thieu Tu Tin', meaning: 'Thieu su tu tin va doc lap. De phu thuoc vao nguoi khac.', advice: 'Tap lam nhung viec nho mot minh, xay dung long tu tin tu nhung thanh cong nho.' },
  2: { title: 'Thieu Nhay Cam', meaning: 'Kho cam nhan cam xuc nguoi khac. Thieu su nhan nai trong quan he.', advice: 'Tap lang nghe, thien dinh, va chu y den cam xuc cua nguoi xung quanh.' },
  3: { title: 'Thieu Sang Tao', meaning: 'Kho bieu dat cam xuc va y tuong. Tri nho khong tot.', advice: 'Viet nhat ky, tham gia cac hoat dong nghe thuat, tap ke chuyen.' },
  4: { title: 'Thieu Ky Luat', meaning: 'Thieu tinh to chuc va ky luat. Kho lap ke hoach va thuc hien.', advice: 'Tao routine hang ngay, su dung to-do list, dat muc tieu nho va cu the.' },
  5: { title: 'Thieu Linh Hoat', meaning: 'So thay doi, thieu phieu luu. Cuoc song de tro nen nham chan.', advice: 'Thu nhung dieu moi, di du lich, gap go nguoi moi, thoat khoi vung an toan.' },
  6: { title: 'Thieu Trach Nhiem', meaning: 'Kho cam ket trong cac moi quan he. Thieu trach nhiem voi gia dinh.', advice: 'Hoc cach cham soc nguoi khac, lam tinh nguyen, xay dung moi quan he sau sac.' },
  7: { title: 'Thieu Chieu Sau', meaning: 'Thieu su ket noi noi tam va tam linh. Song o be mat.', advice: 'Doc sach, thien dinh, viet nhat ky tu van, tim hieu triet hoc va tam linh.' },
  8: { title: 'Thieu Quan Ly Tai Chinh', meaning: 'Kho quan ly tien bac va dat muc tieu tai chinh. De tieu hoang.', advice: 'Hoc ve dau tu, lap ngan sach, dat muc tieu tai chinh cu the.' },
  9: { title: 'Thieu Bao Dung', meaning: 'Thieu long vi tha va tam nhin rong. De ich ky va hen hep.', advice: 'Lam tu thien, giup do nguoi khac, hoc cach nhin moi viec tu goc do rong hon.' },
};

// ===== PERSONAL YEAR MEANINGS =====
export const PERSONAL_YEAR_MEANINGS: Record<number, {
  theme: string;
  description: string;
  advice: string;
}> = {
  1: { theme: 'Khoi Dau Moi', description: 'Nam cua su khoi dau, gieo hat, bat dau du an moi. Day la thoi diem tot de lam nhung gi ban da muon tu lau.', advice: 'Hanh dong manh me, khoi dong du an moi, tu tin di tien.' },
  2: { theme: 'Hop Tac & Kien Nhan', description: 'Nam cua su hop tac, xay dung quan he, kien nhan cho doi. Nhung hat giong ban gieo o nam 1 can thoi gian lon len.', advice: 'Kien nhan, lang nghe, xay dung moi quan he, hop tac voi nguoi khac.' },
  3: { theme: 'Sang Tao & Mo Rong', description: 'Nam cua su sang tao, bieu dat, va mo rong. Day la nam de ban toa sang va the hien ban than.', advice: 'Networking, sang tao noi dung, ra mat san pham, the hien ban than.' },
  4: { theme: 'Xay Nen Tang', description: 'Nam cua ky luat, lam viec cham chi, xay dung nen tang vung chac. Khong phai nam de phieu luu.', advice: 'Lam viec cham chi, to chuc lai cuoc song, xay dung he thong, ky luat.' },
  5: { theme: 'Thay Doi & Tu Do', description: 'Nam cua su thay doi lon, tu do, va trai nghiem moi. Moi thu co the bi dao lon nhung theo huong tich cuc.', advice: 'Don nhan thay doi, du lich, thu dieu moi, linh hoat va thich nghi.' },
  6: { theme: 'Gia Dinh & Trach Nhiem', description: 'Nam cua gia dinh, tinh yeu, va trach nhiem. Day la nam de cham soc nhung nguoi ban yeu thuong.', advice: 'Tap trung gia dinh, hon nhan, nha cua. Nhan trach nhiem va cham soc nguoi than.' },
  7: { theme: 'Noi Tam & Hoc Hoi', description: 'Nam cua su tu van, hoc hoi, va phat trien noi tam. Day la nam de nhin lai ben trong va tim kiem chan ly.', advice: 'Thien dinh, doc sach, hoc khoa hoc moi, nghi ngoi, tu van ban than.' },
  8: { theme: 'Thu Hoach & Quyen Luc', description: 'Nam cua thanh cong tai chinh, quyen luc, va thu hoach. Nhung no luc tu nhung nam truoc se mang lai ket qua.', advice: 'Dau tu, thang tien, dat muc tieu tai chinh lon. Day la nam manh me nhat.' },
  9: { theme: 'Ket Thuc & Buong Bo', description: 'Nam cua su ket thuc chu ky, buong bo cai cu, va chuan bi cho giai doan moi. Hay ket thuc nhung gi khong con phuc vu ban.', advice: 'Buong bo cai cu, lam tu thien, du lich, chuan bi tinh than cho chu ky moi.' },
};

// ===== PINNACLE MEANINGS =====
export const PINNACLE_MEANINGS: Record<number, string> = {
  1: 'Giai doan doc lap, tu lap, xay dung ban than. Can quyet doan va tu tin.',
  2: 'Giai doan hop tac, ngoai giao, phat trien moi quan he. Can kien nhan.',
  3: 'Giai doan sang tao, bieu dat, mo rong. Co hoi toa sang va the hien tai nang.',
  4: 'Giai doan lam viec cham chi, xay dung nen tang. Can ky luat va noi luc.',
  5: 'Giai doan thay doi, tu do, phieu luu. Nhieu co hoi nhung cung nhieu bien dong.',
  6: 'Giai doan gia dinh, trach nhiem, tinh yeu. Tap trung xay dung to am.',
  7: 'Giai doan hoc hoi, nghien cuu, phat trien tam linh. Can su yeu tinh va suy ngam.',
  8: 'Giai doan thanh cong tai chinh, quyen luc. Co hoi dat dinh cao su nghiep.',
  9: 'Giai doan phung su, nhan dao, tam anh huong rong. Chia se va cong hien.',
  11: 'Giai doan truc giac vuot troi, tam nhin xa. Tiem nang lanh dao tinh than va truyen cam hung.',
  22: 'Giai doan kien tao vi dai. Co kha nang hien thuc hoa nhung du an lon tam co quoc gia/quoc te.',
  33: 'Giai doan phung su cao nhat. Tinh yeu vo dieu kien va kha nang chua lanh cong dong.',
};

// ===== CHALLENGE MEANINGS =====
export const CHALLENGE_MEANINGS: Record<number, string> = {
  0: 'Thu thach cua su lua chon - ban co the chon bat ky huong di nao nhung cung de lac loi.',
  1: 'Thu thach ve su tu tin va doc lap. Can hoc cach dung len mot minh.',
  2: 'Thu thach ve cam xuc va moi quan he. Can hoc cach can bang va ngoai giao.',
  3: 'Thu thach ve bieu dat va sang tao. Can vuot qua su nghi ngo ban than.',
  4: 'Thu thach ve ky luat va to chuc. Can xay dung nen tang vung chac.',
  5: 'Thu thach ve su thay doi va tu do. Can hoc cach thich nghi ma khong mat phuong huong.',
  6: 'Thu thach ve trach nhiem va gia dinh. Can can bang giua cho di va nhan lai.',
  7: 'Thu thach ve noi tam va su co don. Can hoc cach mo long va tin tuong.',
  8: 'Thu thach ve tai chinh va quyen luc. Can hoc cach su dung quyen luc dung dan.',
  9: 'Thu thach ve long bao dung va hy sinh. Can hoc cach buong bo va chap nhan.',
};

// ===== BIRTHDAY NUMBER MEANINGS =====
export const BIRTHDAY_MEANINGS: Record<number, string> = {
  1: 'Ban co kha nang lanh dao va doc lap tu nhien.',
  2: 'Ban nhay cam, ngoai giao va gioi hop tac.',
  3: 'Ban co tai giao tiep, sang tao va thu vi.',
  4: 'Ban thuc te, ky luat va dang tin cay.',
  5: 'Ban linh hoat, phieu luu va da nang.',
  6: 'Ban co trach nhiem, yeu thuong va co khieu tham my.',
  7: 'Ban co chieu sau, phan tich gioi va truc giac manh.',
  8: 'Ban co kha nang quan ly tai chinh va thanh dat vat chat.',
  9: 'Ban co tam nhin rong, bao dung va nhan dao.',
  10: 'Ban co tinh than tien phong va lanh dao tu nhien.',
  11: 'Ban co truc giac phi thuong va kha nang truyen cam hung.',
  12: 'Ban sang tao, giao tiep tot va co duyen.',
  13: 'Ban cham chi, thuc te va co kha nang xay dung.',
  14: 'Ban linh hoat, da nang va thich phieu luu.',
  15: 'Ban yeu thuong, co trach nhiem va kha nang chua lanh.',
  16: 'Ban co chieu sau tam linh va tri tue.',
  17: 'Ban co kha nang kinh doanh va quan ly tai chinh.',
  18: 'Ban co tam nhin rong va kha nang lanh dao nhan dao.',
  19: 'Ban doc lap, sang tao va co y chi sat da.',
  20: 'Ban nhay cam, truc giac va gioi hop tac.',
  21: 'Ban sang tao, xa hoi va truyen cam hung.',
  22: 'Ban la Master Builder - co kha nang hien thuc hoa tam nhin lon.',
  23: 'Ban linh hoat, giao tiep tot va thich tu do.',
  24: 'Ban co trach nhiem, tan tuy va huong gia dinh.',
  25: 'Ban co chieu sau tri tue va truc giac manh.',
  26: 'Ban co kha nang kinh doanh va quan ly to chuc.',
  27: 'Ban nhan dao, co tam nhin va kha nang lanh dao.',
  28: 'Ban doc lap, sang tao va co kha nang khoi nghiep.',
  29: 'Ban truc giac manh, nhan dao va co chieu sau tam linh.',
  30: 'Ban sang tao, giao tiep va co tai nghe thuat.',
  31: 'Ban thuc te, sang tao va co kha nang xay dung.',
};

// ===== NUMBER REPEAT MEANINGS =====
export const NUMBER_REPEAT_MEANINGS: Record<string, string> = {
  '1_2': 'Ban tu tin va doc lap.',
  '1_3': 'Ban rat tu tin, co the tro nen doc doan.',
  '2_2': 'Ban nhay cam va co truc giac tot.',
  '2_3': 'Ban qua nhay cam, de bi ton thuong.',
  '3_2': 'Ban co tri nho tot va sang tao.',
  '3_3': 'Ban song trong the gioi tuong tuong, can thuc te hon.',
  '4_2': 'Ban rat ky luat va to chuc.',
  '4_3': 'Ban qua cau toan, can hoc cach linh hoat.',
  '5_2': 'Ban quyet doan va co y chi manh.',
  '5_3': 'Ban qua manh me, can hoc cach kiem che.',
  '6_2': 'Ban co trach nhiem va yeu thuong.',
  '6_3': 'Ban lo lang qua muc, can hoc cach buong bo.',
  '7_2': 'Ban co chieu sau va tri tue.',
  '7_3': 'Ban qua co don va kho mo long.',
  '8_2': 'Ban gioi quan ly tai chinh.',
  '8_3': 'Ban qua tap trung vao tien bac, can can bang.',
  '9_2': 'Ban co ly tuong cao va tam nhin rong.',
  '9_3': 'Ban qua ly tuong hoa, can thuc te hon. Tham vong lon nhung de xa roi thuc te.',
};
