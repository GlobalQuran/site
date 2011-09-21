var Notice = 'Copyright (C) 2008-2010 Hamid Zarrabi-Zadeh // Source: http://tanzil.info // License: GPLv3 ';
var QuranData = {};
QuranData.Sura = [
    [],
    [0, 7, 5, 1, 'الفاتحة', "Al-Faatiha", 'The Opening', 'Meccan'],
    [7, 286, 87, 40, 'البقرة', "Al-Baqara", 'The Cow', 'Medinan'],
    [293, 200, 89, 20, 'آل عمران', "Aal-i-Imraan", 'The Family of Imraan', 'Medinan'],
    [493, 176, 92, 24, 'النساء', "An-Nisaa", 'The Women', 'Medinan'],
    [669, 120, 112, 16, 'المائدة', "Al-Maaida", 'The Table', 'Medinan'],
    [789, 165, 55, 20, 'الأنعام', "Al-An'aam", 'The Cattle', 'Meccan'],
    [954, 206, 39, 24, 'الأعراف', "Al-A'raaf", 'The Heights', 'Meccan'],
    [1160, 75, 88, 10, 'الأنفال', "Al-Anfaal", 'The Spoils of War', 'Medinan'],
    [1235, 129, 113, 16, 'التوبة', "At-Tawba", 'The Repentance', 'Medinan'],
    [1364, 109, 51, 11, 'يونس', "Yunus", 'Jonas', 'Meccan'],
    [1473, 123, 52, 10, 'هود', "Hud", 'Hud', 'Meccan'],
    [1596, 111, 53, 12, 'يوسف', "Yusuf", 'Joseph', 'Meccan'],
    [1707, 43, 96, 6, 'الرعد', "Ar-Ra'd", 'The Thunder', 'Medinan'],
    [1750, 52, 72, 7, 'ابراهيم', "Ibrahim", 'Abraham', 'Meccan'],
    [1802, 99, 54, 6, 'الحجر', "Al-Hijr", 'The Rock', 'Meccan'],
    [1901, 128, 70, 16, 'النحل', "An-Nahl", 'The Bee', 'Meccan'],
    [2029, 111, 50, 12, 'الإسراء', "Al-Israa", 'The Night Journey', 'Meccan'],
    [2140, 110, 69, 12, 'الكهف', "Al-Kahf", 'The Cave', 'Meccan'],
    [2250, 98, 44, 6, 'مريم', "Maryam", 'Mary', 'Meccan'],
    [2348, 135, 45, 8, 'طه', "Taa-Haa", 'Taa-Haa', 'Meccan'],
    [2483, 112, 73, 7, 'الأنبياء', "Al-Anbiyaa", 'The Prophets', 'Meccan'],
    [2595, 78, 103, 10, 'الحج', "Al-Hajj", 'The Pilgrimage', 'Medinan'],
    [2673, 118, 74, 6, 'المؤمنون', "Al-Muminoon", 'The Believers', 'Meccan'],
    [2791, 64, 102, 9, 'النور', "An-Noor", 'The Light', 'Medinan'],
    [2855, 77, 42, 6, 'الفرقان', "Al-Furqaan", 'The Criterion', 'Meccan'],
    [2932, 227, 47, 11, 'الشعراء', "Ash-Shu'araa", 'The Poets', 'Meccan'],
    [3159, 93, 48, 7, 'النمل', "An-Naml", 'The Ant', 'Meccan'],
    [3252, 88, 49, 8, 'القصص', "Al-Qasas", 'The Stories', 'Meccan'],
    [3340, 69, 85, 7, 'العنكبوت', "Al-Ankaboot", 'The Spider', 'Meccan'],
    [3409, 60, 84, 6, 'الروم', "Ar-Room", 'The Romans', 'Meccan'],
    [3469, 34, 57, 3, 'لقمان', "Luqman", 'Luqman', 'Meccan'],
    [3503, 30, 75, 3, 'السجدة', "As-Sajda", 'The Prostration', 'Meccan'],
    [3533, 73, 90, 9, 'الأحزاب', "Al-Ahzaab", 'The Clans', 'Medinan'],
    [3606, 54, 58, 6, 'سبإ', "Saba", 'Sheba', 'Meccan'],
    [3660, 45, 43, 5, 'فاطر', "Faatir", 'The Originator', 'Meccan'],
    [3705, 83, 41, 5, 'يس', "Yaseen", 'Yaseen', 'Meccan'],
    [3788, 182, 56, 5, 'الصافات', "As-Saaffaat", 'Those drawn up in Ranks', 'Meccan'],
    [3970, 88, 38, 5, 'ص', "Saad", 'The letter Saad', 'Meccan'],
    [4058, 75, 59, 8, 'الزمر', "Az-Zumar", 'The Groups', 'Meccan'],
    [4133, 85, 60, 9, 'غافر', "Al-Ghaafir", 'The Forgiver', 'Meccan'],
    [4218, 54, 61, 6, 'فصلت', "Fussilat", 'Explained in detail', 'Meccan'],
    [4272, 53, 62, 5, 'الشورى', "Ash-Shura", 'Consultation', 'Meccan'],
    [4325, 89, 63, 7, 'الزخرف', "Az-Zukhruf", 'Ornaments of gold', 'Meccan'],
    [4414, 59, 64, 3, 'الدخان', "Ad-Dukhaan", 'The Smoke', 'Meccan'],
    [4473, 37, 65, 4, 'الجاثية', "Al-Jaathiya", 'Crouching', 'Meccan'],
    [4510, 35, 66, 4, 'الأحقاف', "Al-Ahqaf", 'The Dunes', 'Meccan'],
    [4545, 38, 95, 4, 'محمد', "Muhammad", 'Muhammad', 'Medinan'],
    [4583, 29, 111, 4, 'الفتح', "Al-Fath", 'The Victory', 'Medinan'],
    [4612, 18, 106, 2, 'الحجرات', "Al-Hujuraat", 'The Inner Apartments', 'Medinan'],
    [4630, 45, 34, 3, 'ق', "Qaaf", 'The letter Qaaf', 'Meccan'],
    [4675, 60, 67, 3, 'الذاريات', "Adh-Dhaariyat", 'The Winnowing Winds', 'Meccan'],
    [4735, 49, 76, 2, 'الطور', "At-Tur", 'The Mount', 'Meccan'],
    [4784, 62, 23, 3, 'النجم', "An-Najm", 'The Star', 'Meccan'],
    [4846, 55, 37, 3, 'القمر', "Al-Qamar", 'The Moon', 'Meccan'],
    [4901, 78, 97, 3, 'الرحمن', "Ar-Rahmaan", 'The Beneficent', 'Medinan'],
    [4979, 96, 46, 3, 'الواقعة', "Al-Waaqia", 'The Inevitable', 'Meccan'],
    [5075, 29, 94, 4, 'الحديد', "Al-Hadid", 'The Iron', 'Medinan'],
    [5104, 22, 105, 3, 'المجادلة', "Al-Mujaadila", 'The Pleading Woman', 'Medinan'],
    [5126, 24, 101, 3, 'الحشر', "Al-Hashr", 'The Exile', 'Medinan'],
    [5150, 13, 91, 2, 'الممتحنة', "Al-Mumtahana", 'She that is to be examined', 'Medinan'],
    [5163, 14, 109, 2, 'الصف', "As-Saff", 'The Ranks', 'Medinan'],
    [5177, 11, 110, 2, 'الجمعة', "Al-Jumu'a", 'Friday', 'Medinan'],
    [5188, 11, 104, 2, 'المنافقون', "Al-Munaafiqoon", 'The Hypocrites', 'Medinan'],
    [5199, 18, 108, 2, 'التغابن', "At-Taghaabun", 'Mutual Disillusion', 'Medinan'],
    [5217, 12, 99, 2, 'الطلاق', "At-Talaaq", 'Divorce', 'Medinan'],
    [5229, 12, 107, 2, 'التحريم', "At-Tahrim", 'The Prohibition', 'Medinan'],
    [5241, 30, 77, 2, 'الملك', "Al-Mulk", 'The Sovereignty', 'Meccan'],
    [5271, 52, 2, 2, 'القلم', "Al-Qalam", 'The Pen', 'Meccan'],
    [5323, 52, 78, 2, 'الحاقة', "Al-Haaqqa", 'The Reality', 'Meccan'],
    [5375, 44, 79, 2, 'المعارج', "Al-Ma'aarij", 'The Ascending Stairways', 'Meccan'],
    [5419, 28, 71, 2, 'نوح', "Nooh", 'Noah', 'Meccan'],
    [5447, 28, 40, 2, 'الجن', "Al-Jinn", 'The Jinn', 'Meccan'],
    [5475, 20, 3, 2, 'المزمل', "Al-Muzzammil", 'The Enshrouded One', 'Meccan'],
    [5495, 56, 4, 2, 'المدثر', "Al-Muddaththir", 'The Cloaked One', 'Meccan'],
    [5551, 40, 31, 2, 'القيامة', "Al-Qiyaama", 'The Resurrection', 'Meccan'],
    [5591, 31, 98, 2, 'الانسان', "Al-Insaan", 'Man', 'Medinan'],
    [5622, 50, 33, 2, 'المرسلات', "Al-Mursalaat", 'The Emissaries', 'Meccan'],
    [5672, 40, 80, 2, 'النبإ', "An-Naba", 'The Announcement', 'Meccan'],
    [5712, 46, 81, 2, 'النازعات', "An-Naazi'aat", 'Those who drag forth', 'Meccan'],
    [5758, 42, 24, 1, 'عبس', "Abasa", 'He frowned', 'Meccan'],
    [5800, 29, 7, 1, 'التكوير', "At-Takwir", 'The Overthrowing', 'Meccan'],
    [5829, 19, 82, 1, 'الإنفطار', "Al-Infitaar", 'The Cleaving', 'Meccan'],
    [5848, 36, 86, 1, 'المطففين', "Al-Mutaffifin", 'Defrauding', 'Meccan'],
    [5884, 25, 83, 1, 'الإنشقاق', "Al-Inshiqaaq", 'The Splitting Open', 'Meccan'],
    [5909, 22, 27, 1, 'البروج', "Al-Burooj", 'The Constellations', 'Meccan'],
    [5931, 17, 36, 1, 'الطارق', "At-Taariq", 'The Morning Star', 'Meccan'],
    [5948, 19, 8, 1, 'الأعلى', "Al-A'laa", 'The Most High', 'Meccan'],
    [5967, 26, 68, 1, 'الغاشية', "Al-Ghaashiya", 'The Overwhelming', 'Meccan'],
    [5993, 30, 10, 1, 'الفجر', "Al-Fajr", 'The Dawn', 'Meccan'],
    [6023, 20, 35, 1, 'البلد', "Al-Balad", 'The City', 'Meccan'],
    [6043, 15, 26, 1, 'الشمس', "Ash-Shams", 'The Sun', 'Meccan'],
    [6058, 21, 9, 1, 'الليل', "Al-Lail", 'The Night', 'Meccan'],
    [6079, 11, 11, 1, 'الضحى', "Ad-Dhuhaa", 'The Morning Hours', 'Meccan'],
    [6090, 8, 12, 1, 'الشرح', "Ash-Sharh", 'The Consolation', 'Meccan'],
    [6098, 8, 28, 1, 'التين', "At-Tin", 'The Fig', 'Meccan'],
    [6106, 19, 1, 1, 'العلق', "Al-Alaq", 'The Clot', 'Meccan'],
    [6125, 5, 25, 1, 'القدر', "Al-Qadr", 'The Power, Fate', 'Meccan'],
    [6130, 8, 100, 1, 'البينة', "Al-Bayyina", 'The Evidence', 'Medinan'],
    [6138, 8, 93, 1, 'الزلزلة', "Az-Zalzala", 'The Earthquake', 'Medinan'],
    [6146, 11, 14, 1, 'العاديات', "Al-Aadiyaat", 'The Chargers', 'Meccan'],
    [6157, 11, 30, 1, 'القارعة', "Al-Qaari'a", 'The Calamity', 'Meccan'],
    [6168, 8, 16, 1, 'التكاثر', "At-Takaathur", 'Competition', 'Meccan'],
    [6176, 3, 13, 1, 'العصر', "Al-Asr", 'The Declining Day, Epoch', 'Meccan'],
    [6179, 9, 32, 1, 'الهمزة', "Al-Humaza", 'The Traducer', 'Meccan'],
    [6188, 5, 19, 1, 'الفيل', "Al-Fil", 'The Elephant', 'Meccan'],
    [6193, 4, 29, 1, 'قريش', "Quraish", 'Quraysh', 'Meccan'],
    [6197, 7, 17, 1, 'الماعون', "Al-Maa'un", 'Almsgiving', 'Meccan'],
    [6204, 3, 15, 1, 'الكوثر', "Al-Kawthar", 'Abundance', 'Meccan'],
    [6207, 6, 18, 1, 'الكافرون', "Al-Kaafiroon", 'The Disbelievers', 'Meccan'],
    [6213, 3, 114, 1, 'النصر', "An-Nasr", 'Divine Support', 'Medinan'],
    [6216, 5, 6, 1, 'المسد', "Al-Masad", 'The Palm Fibre', 'Meccan'],
    [6221, 4, 22, 1, 'الإخلاص', "Al-Ikhlaas", 'Sincerity', 'Meccan'],
    [6225, 5, 20, 1, 'الفلق', "Al-Falaq", 'The Dawn', 'Meccan'],
    [6230, 6, 21, 1, 'الناس', "An-Naas", 'Mankind', 'Meccan'],
    [6236, 1]
];
QuranData.Juz = [
    [],
    [1, 1],
    [2, 142],
    [2, 253],
    [3, 93],
    [4, 24],
    [4, 148],
    [5, 82],
    [6, 111],
    [7, 88],
    [8, 41],
    [9, 93],
    [11, 6],
    [12, 53],
    [15, 1],
    [17, 1],
    [18, 75],
    [21, 1],
    [23, 1],
    [25, 21],
    [27, 56],
    [29, 46],
    [33, 31],
    [36, 28],
    [39, 32],
    [41, 47],
    [46, 1],
    [51, 31],
    [58, 1],
    [67, 1],
    [78, 1],
    [115, 1]
];
QuranData.HizbQaurter = [
    [],
    [1, 1],
    [2, 26],
    [2, 44],
    [2, 60],
    [2, 75],
    [2, 92],
    [2, 106],
    [2, 124],
    [2, 142],
    [2, 158],
    [2, 177],
    [2, 189],
    [2, 203],
    [2, 219],
    [2, 233],
    [2, 243],
    [2, 253],
    [2, 263],
    [2, 272],
    [2, 283],
    [3, 15],
    [3, 33]
    //......
    
];
QuranData.Manzil = [
    [],
    [1, 1],
    [5, 1],
    [10, 1],
    [17, 1],
    [26, 1],
    [37, 1],
    [50, 1]
];
QuranData.Ruku = [
    [],
    [1, 1],
    [2, 1],
    [2, 8],
    [2, 21],
    [2, 30],
    [2, 40]
    //....
];
QuranData.Page = [
    [],
    [1, 1],
    [2, 1],
    [2, 6],
    [2, 17],
    [2, 25],
    [2, 30],
    [2, 38]
    //...
];
QuranData.Sajda = [
    [],
    [7, 206, 'recommended'],
    [13, 15, 'recommended'],
    [16, 50, 'recommended'],
    [17, 109, 'recommended'],
    [19, 58, 'recommended'],
    [22, 18, 'recommended'],
    [22, 77, 'recommended'],
    [25, 60, 'recommended'],
    [27, 26, 'recommended'],
    [32, 15, 'obligatory'],
    [38, 24, 'recommended'],
    [41, 38, 'obligatory'],
    [53, 62, 'obligatory'],
    [84, 21, 'recommended'],
    [96, 19, 'obligatory'], ];﻿
var RootList = 'آدم‌ آزر ا أبابيل‌ ابب‌ ابد ابراهيم‌ ابريق‌ ابق‌ ابل‌ إبليس‌ ابو ابى‌ اتى‌ اثث‌ اثر اثل‌ اثم‌ اجج‌ اجر اجل‌ احد احزاب‌ احقاف‌ احمد اخذ اخر اخو ادد ادريس‌ ادى‌ اذ اذا اذن‌ اذى‌ ارب‌ ارث‌ ارض‌ ارك‌ ارم‌ ازر ازز ازف‌ اسباط استبرق‌ اسحاق‌ اسر اسرائيل‌ اسس‌ اسف‌ اسلام‌ اسماعيل‌ اسن‌ اسو اسى‌ اشر اصر اصل‌ أعراف‌ افف‌ افق‌ افك‌ افل‌ اقصو اكل‌ الا التى‌ الذان‌ الذى‌ الذين‌ الف‌ الك‌ اللاتى‌ اللائى‌ الل‌ الله‌ الم‌ اله‌ الو الى‌ الياس‌ ال‌ياسين‌ اليسع‌ ام‌ اما أما امت‌ امد امر امس‌ امل‌ امم‌ امن‌ امو ان‌ انا انت‌ انتم‌ انتما انث‌ انجيل‌ انس‌ انف‌ انم‌ انن‌ اننى‌ انى‌ اهل‌ او اوب‌ اود اولاء اول‌ اولى‌ اون‌ اوه‌ اوى‌ اى‌ اياك‌ اياكم‌ ايان‌ ايانا اياه‌ اياهم‌ اياى‌ ايد ايكه‌ ايم‌ اين‌ ايوب‌ ائى‌ ايى‌ ب‌ بابل‌ بتر بتك‌ بتل‌ بثث‌ بجس‌ بحث‌ بحر بخس‌ بخع‌ بخل‌ بدء بدر بدع‌ بدل‌ بدن‌ بدو بذر برء برج‌ برح‌ برد برر برز برزخ‌ برص‌ برق‌ برك‌ برم‌ بره‌ برهن‌ بزغ‌ بسر بسس‌ بسط بسق‌ بسل‌ بسم‌ بشر بصر بصل‌ بضع‌ بطء بطر بطش‌ بطل‌ بطن‌ بعث‌ بعثر بعد بعر بعض‌ بعل‌ بغت‌ بغض‌ بغل‌ بغى‌ بقر بقع‌ بقل‌ بقى‌ بكر بكم‌ بكة بكى‌ بل‌ بلد بلس‌ بلع‌ بلغ‌ بلو بلى‌ بنن‌ بنو بنى‌ بهت‌ بهج‌ بهل‌ بهم‌ بوء بوب‌ بور بول‌ بيت‌ بيد بئر بئس‌ بيض‌ بيع‌ بين‌ ت‌ تابوت‌ تبب‌ تبت‌ تبر تبع‌ تجر تحت‌ ترب‌ ترف‌ ترق‌ ترقوه‌ ترك‌ تسع‌ تعس‌ تفث‌ تقن‌ تلك‌ تلكم‌ تلكما تلل‌ تلو تمم‌ تنور توب‌ تور توراة تين‌ تيه‌ ثبت‌ ثبر ثبط ثبى‌ ثجج‌ ثخن‌ ثرب‌ ثرى‌ ثعب‌ ثقب‌ ثقف‌ ثقل‌ ثلث‌ ثلل‌ ثم‌ ثمر ثمم‌ ثمن‌ ثمود ثنى‌ ثوب‌ ثور ثوى‌ ثيب‌ جالوت‌ جبب‌ جبت‌ جبر جبريل‌ جبل‌ جبن‌ جبه‌ جبى‌ جثث‌ جثم‌ جثو جحد جحم‌ جدث‌ جدد جدر جدل‌ جذذ جذع‌ جذو جرح‌ جرد جرر جرز جرع‌ جرف‌ جرم‌ جرى‌ جزء جزع‌ جزى‌ جسد جسس‌ جسم‌ جعل‌ جف‌ء جفن‌ جفو جلب‌ جلد جلس‌ جلل‌ جلو جمح‌ جمد جمع‌ جمعة جمل‌ جمم‌ جناح‌ جنب‌ جنح‌ جند جنف‌ جنن‌ جنى‌ جهد جهر جهز جهل‌ جهنم‌ جوب‌ جود جودى‌ جور جوز جوس‌ جوع‌ جوف‌ جوو جى‌ء جيب‌ جيد جئر ح‌ حبب‌ حبر حبس‌ حبط حبك‌ حبل‌ حتم‌ حتى‌ حثث‌ حجب‌ حجج‌ حجر حجز حدب‌ حدث‌ حدد حدق‌ حذر حرب‌ حرث‌ حرج‌ حرد حرر حرس‌ حرص‌ حرض‌ حرف‌ حرق‌ حرك‌ حرم‌ حرى‌ حرير حزب‌ حزن‌ حسب‌ حسد حسر حسس‌ حسم‌ حسن‌ حشر حصب‌ حصحص‌ حصد حصر حصل‌ حصن‌ حصى‌ حضر حضض‌ حطب‌ حطط حطم‌ حظر حظظ حفد حفر حفظ حفف‌ حفو حقب‌ حقق‌ حكم‌ حلف‌ حلق‌ حلقم‌ حلل‌ حلم‌ حلى‌ حم‌ء حمد حمر حمل‌ حمم‌ حمى‌ حنث‌ حنجر حنذ حنف‌ حنك‌ حنن‌ حنين‌ حواريون‌ حوب‌ حوت‌ حوج‌ حوذ حور حوش‌ حوط حول‌ حوى‌ حيث‌ حيد حير حيز حيص‌ حيض‌ حيف‌ حيق‌ حين‌ حيى‌ خب‌ء خبت‌ خبث‌ خبر خبز خبط خبل‌ خبو ختر ختم‌ خدد خدع‌ خدن‌ خذل‌ خرب‌ خرج‌ خردل‌ خرر خرص‌ خرطم‌ خرق‌ خزن‌ خزى‌ خس‌ء خسر خسف‌ خشب‌ خشع‌ خشى‌ خصص‌ خصف‌ خصم‌ خضد خضر خضع‌ خطء خطب‌ خطط خطف‌ خطو خفت‌ خفض‌ خفف‌ خفى‌ خلد خلص‌ خلط خلع‌ خلف‌ خلق‌ خلل‌ خلو خمد خمر خمس‌ خمص‌ خمط خنزر خنس‌ خنق‌ خور خوض‌ خوف‌ خول‌ خون‌ خوى‌ خيب‌ خير خيط خيل‌ خيم‌ داود دبب‌ دبر دثر دحر دحض‌ دحو دحى‌ دخر دخل‌ دخن‌ درء درج‌ درر درس‌ درك‌ درهم‌ درى‌ دسر دسس‌ دسو دعع‌ دعو دف‌ء دفع‌ دفق‌ دكك‌ دلك‌ دلل‌ دلو دمدم‌ دمر دمع‌ دمغ‌ دمم‌ دمو دمى‌ دنر دنو دهر دهق‌ دهم‌ دهن‌ دهى‌ دور دول‌ دوم‌ دون‌ دئب‌ دين‌ ذا ذات ذانك‌ ذبب‌ ذبح‌ ذبذب‌ ذخر ذرء ذرر ذرع‌ ذرو ذعن‌ ذقن‌ ذكر ذكو ذلك‌ ذلكم‌ ذلكما ذلكن‌ ذلل‌ ذمم‌ ذنب‌ ذهب‌ ذهل‌ ذو ذوا ذود ذوق‌ ذوى‌ ذى‌ ذئب‌ ذيع‌ ذئم‌ ر رب‌ ربب‌ ربح‌ ربص‌ ربط ربع‌ ربو رتع‌ رتق‌ رتل‌ رجج‌ رجز رجس‌ رجع‌ رجف‌ رجل‌ رجم‌ رجو رحب‌ رحق‌ رحل‌ رحم‌ رحمان‌ رخو ردء ردد ردف‌ ردم‌ ردى‌ رذل‌ رزق‌ رس‌ رسخ‌ رسل‌ رسو رشد رصد رصص‌ رضع‌ رضو رطب‌ رعب‌ رعد رعى‌ رغب‌ رغد رغم‌ رفت‌ رفث‌ رفد رفرف‌ رفع‌ رفق‌ رقب‌ رقد رقق‌ رقم‌ رقى‌ ركب‌ ركد ركز ركس‌ ركض‌ ركع‌ ركم‌ ركن‌ رمح‌ رمد رمز رمضان‌ رمم‌ رمن‌ رمى‌ رهب‌ رهط رهق‌ رهن‌ رهو روح‌ رود روض‌ روع‌ روغ‌ روم‌ رويد ريب‌ رئس‌ ريش‌ ريع‌ رئف‌ رين‌ رئى‌ زبد زبر زبن‌ زبور زجج‌ زجر زجو زحزح‌ زحف‌ زخرف‌ زربيه‌ زرع‌ زرق‌ زرى‌ زعم‌ زفر زفف‌ زقم‌ زكريا زكو زلزل‌ زلف‌ زلق‌ زلل‌ زلم‌ زمر زمل‌ زمهر زنجبيل‌ زنم‌ زنى‌ زهد زهر زهق‌ زوج‌ زود زور زول‌ زيت‌ زيتون‌ زيد زيغ‌ زيل‌ زين‌ س‌ سال‌ سامرى‌ سبإ سبب‌ سبت‌ سبح‌ سبط سبع‌ سبغ‌ سبق‌ سبل‌ ستت‌ ستر سجد سجر سجل‌ سجن‌ سجو سجيل‌ سحب‌ سحت‌ سحر سحق‌ سحل‌ سخر سخط سدد سدر سدس‌ سدى‌ سراب‌ سرادق‌ سرب‌ سربال‌ سرج‌ سرح‌ سرد سرر سرع‌ سرف‌ سرق‌ سرمد سرى‌ سطح‌ سطر سطو سعد سعر سعى‌ سغب‌ سفح‌ سفر سفع‌ سفك‌ سفل‌ سفن‌ سفه‌ سقر سقط سقف‌ سقم‌ سقى‌ سكب‌ سكت‌ سكر سكن‌ سلب‌ سلح‌ سلخ‌ سلسبيل‌ سلسل‌ سلط سلف‌ سلق‌ سلك‌ سلل‌ سلم‌ سلو سليمان‌ سمد سمر سمع‌ سمك‌ سمم‌ سمن‌ سمو سنبل‌ سند سندس‌ سنم‌ سنن‌ سنه‌ سنو سهر سهل‌ سهم‌ سهو سواع‌ سوء سوح‌ سود سور سوط سوع‌ سوغ‌ سوف‌ سوق‌ سوم‌ سوى‌ سيب‌ سيح‌ سير سئل‌ سيل‌ سئم‌ سيناء سينين‌ شبه‌ شتت‌ شتو شجر شحح‌ شحم‌ شحن‌ شخص‌ شدد شرب‌ شرح‌ شرد شرذم‌ شرر شرط شرع‌ شرق‌ شرك‌ شرى‌ شطء شطر شطط شطن‌ شعب‌ شعر شعرى‌ شعل‌ شعيب‌ شغف‌ شغل‌ شفع‌ شفق‌ شفه‌ شفو شفى‌ شقق‌ شقو شقى‌ شكر شكس‌ شكك‌ شكل‌ شكو شمت‌ شمخ‌ شمس‌ شمل‌ شمئز شن‌ء شهب‌ شهد شهر شهق‌ شهو شوب‌ شور شوظ شوك‌ شوى‌ شى‌ء شيب‌ شيخ‌ شيد شيع‌ شئم‌ شئن‌ ص‌ صابئون‌ صالح‌ صبب‌ صبح‌ صبر صبع‌ صبغ‌ صبو صحب‌ صحف‌ صخخ‌ صخر صدد صدر صدع‌ صدف‌ صدق‌ صدى‌ صرح‌ صرخ‌ صرر صرصر صرط صرع‌ صرف‌ صرم‌ صعد صعر صعق‌ صغر صغو صفا صفح‌ صفد صفر صفصف‌ صفف‌ صفن‌ صفو صكك‌ صلب‌ صلح‌ صلد صلصل‌ صلو صلى‌ صمت‌ صمد صمع‌ صمم‌ صنع‌ صنم‌ صنو صهر صوب‌ صوت‌ صور صوع‌ صوف‌ صوم‌ صيح‌ صيد صير صيص‌ صيف‌ ضبح‌ ضجع‌ ضحك‌ ضحو ضحى‌ ضدد ضرب‌ ضرر ضرع‌ ضعف‌ ضغث‌ ضغن‌ ضفدع‌ ضلل‌ ضمر ضمم‌ ضنك‌ ضنن‌ ضه‌ء ضوء ضير ضيز ضيع‌ ضيف‌ ضيق‌ ضئن‌ ط طاغوت‌ طالوت‌ طبع‌ طبق‌ طحو طحى‌ طرح‌ طرد طرف‌ طرق‌ طرو طعم‌ طعن‌ طغو طغى‌ طف‌ء طفف‌ طفق‌ طفل‌ طلب‌ طلح‌ طلع‌ طلق‌ طلل‌ طمث‌ طمس‌ طمع‌ طمم‌ طمن‌ طمئن‌ طهر طود طور طوع‌ طوف‌ طوفان‌ طوق‌ طول‌ طوى‌ طيب‌ طير طين‌ ظعن‌ ظفر ظلل‌ ظلم‌ ظما ظم‌ء ظنن‌ ظهر ع‌ عاد عب‌ء عبث‌ عبد عبر عبس‌ عبقر عتب‌ عتد عتق‌ عتل‌ عتو عثر عثو عجب‌ عجز عجف‌ عجل‌ عجم‌ عدد عدس‌ عدل‌ عدن‌ عدو عذب‌ عذر عرب‌ عرج‌ عرجن‌ عرجون‌ عرر عرش‌ عرض‌ عرف‌ عرفات‌ عرم‌ عرو عرى‌ عزب‌ عزر عزز عزل‌ عزم‌ عزو عزى‌ عزير عسر عسعس‌ عسل‌ عسى‌ عشر عشو عصب‌ عصر عصف‌ عصم‌ عصو عصى‌ عضد عضض‌ عضل‌ عضو عطف‌ عطل‌ عطو عظم‌ عفر عفف‌ عفو عقب‌ عقد عقر عقل‌ عقم‌ عكف‌ علق‌ علم‌ علن‌ علو على‌ عمد عمر عمران‌ عمق‌ عمل‌ عمم‌ عمه‌ عمى‌ عن‌ عنب‌ عنت‌ عند عنق‌ عنكب‌ عنكبوت‌ عنو عنى‌ عهد عهن‌ عوج‌ عود عوذ عور عوق‌ عول‌ عوم‌ عون‌ عيب‌ عير عيسى‌ عيش‌ عيل‌ عين‌ عيى‌ غبر غبن‌ غثو غدر غدق‌ غدو غرب‌ غرر غرف‌ غرق‌ غرم‌ غرو غزل‌ غزو غسق‌ غسل‌ غشو غشى‌ غصب‌ غصص‌ غضب‌ غضض‌ غطش‌ غطو غفر غفل‌ غلب‌ غلظ غلف‌ غلق‌ غلل‌ غلم‌ غلو غلى‌ غمر غمز غمض‌ غمم‌ غنم‌ غنى‌ غوث‌ غور غوص‌ غوط غول‌ غوى‌ غيب‌ غيث‌ غير غيض‌ غيظ ف‌ فت‌ء فتح‌ فتر فتق‌ فتل‌ فتن‌ فتو فتى‌ فجج‌ فجر فجو فحش‌ فخر فدى‌ فرت‌ فرث‌ فرج‌ فرح‌ فرد فردوس‌ فرر فرش‌ فرض‌ فرط فرع‌ فرعون‌ فرغ‌ فرق‌ فره‌ فرى‌ فزز فزع‌ فسح‌ فسد فسر فسق‌ فشل‌ فصح‌ فصل‌ فصم‌ فضح‌ فضض‌ فضل‌ فضو فطر فظظ فعل‌ فقد فقر فقع‌ فقه‌ فكر فكك‌ فكه‌ فلح‌ فلق‌ فلك‌ فلن‌ فند فنن‌ فنى‌ فهم‌ فوت‌ فوج‌ فور فوز فوض‌ فوق‌ فوم‌ فوه‌ فى‌ فى‌ء فئد فيض‌ فيل‌ فئى‌ ق‌ قارون‌ قبح‌ قبر قبس‌ قبض‌ قبل‌ قتر قتل‌ قث‌ء قحم‌ قد قدح‌ قدد قدر قدس‌ قدم‌ قدو قذف‌ قرآن‌ قرء قرب‌ قرح‌ قرد قرر قرض‌ قرطس‌ قرع‌ قرف‌ قرن‌ قرنين‌ قرى‌ قريش‌ قسر قسط قسطس‌ قسم‌ قسو قسور قسيسين‌ قشعر قصد قصر قصص‌ قصف‌ قصم‌ قصو قضب‌ قضض‌ قضى‌ قطر قطط قطع‌ قطف‌ قطمر قعد قعر قفل‌ قفو قلب‌ قلد قلع‌ قلل‌ قلم‌ قلى‌ قمح‌ قمر قمص‌ قمطر قمع‌ قمل‌ قنت‌ قنط قنطر قنع‌ قنو قنى‌ قهر قوب‌ قوت‌ قوس‌ قوع‌ قول‌ قوم‌ قوى‌ قيض‌ قيل‌ ك‌ كافور كان‌ كاين‌ كبب‌ كبت‌ كبد كبر كبكب‌ كتب‌ كتم‌ كثب‌ كثر كدح‌ كدر كدى‌ كذب‌ كرب‌ كرر كرس‌ كرم‌ كره‌ كسب‌ كسد كسف‌ كسل‌ كسو كشط كشف‌ كظم‌ كعب‌ كعبة كفت‌ كفر كفف‌ كفل‌ كفو كفى‌ كلا كل‌ء كلب‌ كلتا كلح‌ كلف‌ كلل‌ كلم‌ كلو كم‌ كما كمل‌ كمم‌ كمه‌ كن‌ كند كنز كنس‌ كنن‌ كهف‌ كهل‌ كهن‌ كوب‌ كود كور كوكب‌ كون‌ كوى‌ كى‌ كيد كئس‌ كيف‌ كيل‌ كين‌ لا لات‌ ل‌ لبب‌ لبث‌ لبد لبس‌ لبن‌ لج‌ء لجج‌ لحد لحف‌ لحق‌ لحم‌ لحن‌ لحى‌ لدد لدن‌ لدى‌ لذذ لزب‌ لزم‌ لسن‌ لطف‌ لظى‌ لعب‌ لعل‌ لعن‌ لغب‌ لغو لفت‌ لفح‌ لفظ لفف‌ لفو لقب‌ لقح‌ لقط لقف‌ لقم‌ لقمان‌ لقى‌ لكن‌ لم‌ لما لمح‌ لمز لمس‌ لمم‌ لن‌ لهب‌ لهث‌ لهم‌ لهو لو لوت‌ لوح‌ لوذ لوط لولا لولو لوم‌ لون‌ لوى‌ ليت‌ ليس‌ لئك‌ ليل‌ لين‌ م‌ ما ماجوج‌ ماروت‌ مالك‌ متع‌ متن متى‌ مثل‌ مجد مجوس‌ محص‌ محق‌ محل‌ محمد محن‌ محو مخر مخض‌ مدد مدن‌ مدين‌ مدينه‌ مرء مرج‌ مرح‌ مرد مرر مرض‌ مروه‌ مرى‌ مريم‌ مزج‌ مزق‌ مزن‌ مسح‌ مسخ‌ مسد مسس‌ مسك‌ مسو مسيح‌ مشج‌ مشعر مشى‌ مصر مضغ‌ مضى‌ مطر مطو مع‌ معز معن‌ معى‌ مقت‌ مكث‌ مكر مكن‌ مكة مكو مل‌ء ملح‌ ملق‌ ملك‌ ملل‌ ملو من‌ مناة منع‌ منن‌ منى‌ مهد مهل‌ مهما مهن‌ موت‌ مؤتفكة موج‌ مور موسى‌ مول‌ موه‌ ميد مير ميز ميكال‌ ميل‌ مئى‌ ن‌ نا نب‌ء نبت‌ نبذ نبز نبط نبع‌ نبو نتق‌ نثر نجد نجس‌ نجم‌ نجو نحب‌ نحت‌ نحر نحس‌ نحل‌ نحن‌ نخر نخل‌ ندد ندم‌ ندو ندى‌ نذر نزع‌ نزغ‌ نزف‌ نزل‌ نس‌ء نسب‌ نسخ‌ نسر نسف‌ نسك‌ نسل‌ نسو نسى‌ نش‌ء نشر نشز نشط نصارى‌ نصب‌ نصت‌ نصح‌ نصر نصرانى‌ نصف‌ نصو نصى‌ نضج‌ نضخ‌ نضد نضر نطح‌ نطف‌ نطق‌ نظر نعج‌ نعس‌ نعق‌ نعل‌ نعم‌ نغض‌ نفث‌ نفح‌ نفخ‌ نفد نفذ نفر نفس‌ نفش‌ نفع‌ نفق‌ نفل‌ نفى‌ نقب‌ نقذ نقر نقص‌ نقض‌ نقع‌ نقم‌ نكب‌ نكث‌ نكح‌ نكد نكر نكس‌ نكص‌ نكف‌ نكل‌ نمرق‌ نمل‌ نمم‌ نن‌ نهج‌ نهر نهى‌ نوء نوب‌ نوح‌ نور نوش‌ نوص‌ نوق‌ نوم‌ نون‌ نوى‌ نيل‌ نئى‌ ه‌ ها هاء هات‌ هاتوا هاتين‌ هاروت‌ هارون‌ هامان‌ هاؤم‌ هبط هبو هتى‌ هجد هجر هجع‌ هدد هدم‌ هدهد هدى‌ هذا هذان‌ هذه‌ هرب‌ هرع‌ هزء هزز هزل‌ هزم‌ هشش‌ هشم‌ هضم‌ هطع‌ هكذا هل‌ هلع‌ هلك‌ هلل‌ هلم‌ هم‌ هما همد همر همز همس‌ همم‌ همن‌ هن‌ هنا هنالك‌ هن‌ء هو هود هور هؤلاء هون‌ هوى‌ هى‌ هى‌ء هيت‌ هيج‌ هيل‌ هيم‌ هيهات‌ و وبر وبق‌ وبل‌ وتد وتر وتن‌ وثق‌ وثن‌ وجب‌ وجد وجس‌ وجف‌ وجل‌ وجه‌ وحد وحش‌ وحى‌ ودد ودع‌ ودق‌ ودى‌ وذر ورث‌ ورد ورق‌ ورى‌ وزر وزع‌ وزن‌ وسط وسع‌ وسق‌ وسل‌ وسم‌ وسن‌ وسوس‌ وشى‌ وصب‌ وصد وصف‌ وصل‌ وصى‌ وضع‌ وضن‌ وطء وطر وطن‌ وعد وعظ وعلن‌ وعى‌ وفد وفر وفض‌ وفق‌ وفى‌ وقب‌ وقت‌ وقد وقذ وقر وقع‌ وقف‌ وقى‌ وك‌ء وكد وكز وكل‌ ولج‌ ولد وله‌ ولى‌ ونى‌ وهب‌ وهج‌ وهن‌ وهى‌ وى‌ وئد وئل‌ ويل‌ ى‌ يا ياجوج‌ ياقوت‌ يبس‌ يتم‌ يثرب‌ يحيى‌ يدى‌ يسر يعقوب‌ يعوق‌ يغوث‌ يقطن‌ يقطين‌ يقظ يقن‌ يمم‌ يمن‌ ينع‌ يهود يوسف‌ يوم‌ يونس‌ يى‌ يئس‌ ';
var UChars = {
    HAMZA: '\u0621',
    ALEF_WITH_MADDA_ABOVE: '\u0622',
    ALEF_WITH_HAMZA_ABOVE: '\u0623',
    WAW_WITH_HAMZA_ABOVE: '\u0624',
    ALEF_WITH_HAMZA_BELOW: '\u0625',
    YEH_WITH_HAMZA: '\u0626',
    ALEF: '\u0627',
    BEH: '\u0628',
    MARBUTA: '\u0629',
    TEH: '\u062A',
    THEH: '\u062B',
    JEMM: '\u062C',
    HAH: '\u062D',
    KHAH: '\u062E',
    DAL: '\u062F',
    THAL: '\u0630',
    REH: '\u0631',
    ZAIN: '\u0632',
    SEEN: '\u0633',
    SHEEN: '\u0634',
    SAD: '\u0635',
    DAD: '\u0636',
    TAH: '\u0637',
    ZAH: '\u0638',
    AIN: '\u0639',
    GHAIN: '\u063A',
    TATWEEL: '\u0640',
    FEH: '\u0641',
    QAF: '\u0642',
    KAF: '\u0643',
    LAM: '\u0644',
    MEEM: '\u0645',
    NOON: '\u0646',
    HEH: '\u0647',
    WAW: '\u0648',
    ALEF_MAKSURA: '\u0649',
    YEH: '\u064A',
    FATHATAN: '\u064B',
    DAMMATAN: '\u064C',
    KASRATAN: '\u064D',
    FATHA: '\u064E',
    DAMMA: '\u064F',
    KASRA: '\u0650',
    SHADDA: '\u0651',
    SUKUN: '\u0652',
    MADDA: '\u0653',
    HAMZA_ABOVE: '\u0654',
    HAMZA_BELOW: '\u0655',
    SMALL_ALEF: '\u065F',
    SUPERSCRIPT_ALEF: '\u0670',
    ALEF_WASLA: '\u0671',
    HIGH_SALA: '\u06D6',
    HIGH_GHALA: '\u06D7',
    HIGH_MEEM_INITIAL_FORM: '\u06D8',
    HIGH_LA: '\u06D9',
    HIGH_JEMM: '\u06DA',
    HIGH_THREE_DOT: '\u06DB',
    HIGH_SEEN: '\u06DC',
    RUB_EL_HIZB: '\u06DE',
    HIGH_ROUNDED_ZERO: '\u06DF',
    HIGH_UPRIGHT_ZERO: '\u06E0',
    HIGH_MEEM: '\u06E2',
    LOW_SEEN: '\u06E3',
    SMALL_WAW: '\u06E5',
    SMALL_YEH: '\u06E6',
    HIGH_NOON: '\u06E8',
    SAJDAH: '\u06E9',
    LOW_STOP: '\u06EA',
    HIGH_STOP: '\u06EB',
    HIGH_STOP_FILLED: '\u06EC',
    LOW_MEEM: '\u06ED',
    HAMZA_ABOVE_ALEF: '\u0675',
    DOTLESS_BEH: '\u066E',
    HIGH_YEH: '\u06E7',
    ZWNJ: '\u200C',
    NBSP: '\u00A0',
    NNBSP: '\u202F',
    FARSI_YEH: '\u06CC',
    FARSI_KEHEH: '\u06A9',
    SWASH_KAF: '\u06AA',
    YEH_BARREE: '\u06D2'
}
var UGroups = {
    LETTER: "[$HAMZA-$YEH]",
    HARAKA: "[$FATHATAN-$MADDA$SUPERSCRIPT_ALEF]",
    SPACE: "[\\s$HIGH_SALA-$LOW_MEEM]*\\s",
    HAMZA_SHAPE: "[$HAMZA_ABOVE$HAMZA$ALEF_WITH_HAMZA_ABOVE-$YEH_WITH_HAMZA]",
    LETTER_HARAKA: "[$HAMZA-$ALEF_WASLA]"
}
var Quran = {
    numAyas: 6236,
    numSuras: 114,
    numPages: 604,
    numJuzs: 30,
    suraStarts: [],
    pageStarts: [],
    juzStarts: [],
    init: function () {
        for (var i = 1; i < QuranData.Sura.length; i++)
        this.suraStarts[i] = this.getSuraStart(i);
        for (var i = 1; i < QuranData.Page.length; i++)
        this.pageStarts[i] = this.getPageStart(i);
        for (var i = 1; i < QuranData.Juz.length; i++)
        this.juzStarts[i] = this.getJuzStart(i);
    },
    getIndex: function (ayaCoord) {
        var addr = ayaCoord;
        if (Object.prototype.toString.call(addr) === '[object Array]') addr = {
            sura: addr[0],
            aya: addr[1]
        };
        if (typeof addr == 'object') addr = this.getAyaStart(addr.sura, addr.aya);
        return this.fixLineNum(addr);
    },
    getAya: function (line) {
        var sura = this.binarySearch(this.suraStarts, line);
        var aya = line - this.suraProps(sura).start + 1;
        return {
            sura: sura,
            aya: aya
        };
    },
    getAyaStart: function (sura, aya) {
        aya = aya || 1;
        return this.suraProps(sura).start + (aya - 1);
    },
    getSuraStart: function (sura) {
        return this.getAyaStart(sura);
    },
    getPageStart: function (page) {
        return this.getAyaStart(this.pageProps(page).sura, this.pageProps(page).aya);
    },
    getJuzStart: function (juz) {
        return this.getAyaStart(this.juzProps(juz).sura, this.juzProps(juz).aya);
    },
    suraProps: function (sura) {
        var s = QuranData.Sura[sura] || [0, 7];
        var data = {};
        var items = ['start', 'ayas', 'order', 'rukus', 'name', 'tname', 'ename', 'type'];
        for (var i = 0; i < items.length; i++)
        data[items[i]] = s[i];
        return data;
    },
    pageProps: function (page) {
        var page = QuranData.Page[page] || [1, 1];
        return {
            sura: page[0],
            aya: page[1]
        };
    },
    juzProps: function (juz) {
        var juz = QuranData.Juz[juz] || [1, 1];
        return {
            sura: juz[0],
            aya: juz[1]
        };
    },
    getPrevAya: function (sura, aya) {
        if (--aya == 0) aya = this.suraProps(--sura).ayas;
        return {
            sura: sura,
            aya: aya
        };
    },
    getNextAya: function (sura, aya) {
        if (++aya > this.suraProps(sura).ayas) {
            aya = 1;
            sura++;
        }
        return {
            sura: sura,
            aya: aya
        };
    },
    addOffset: function (sura, aya, offset, cyclic) {
        var line = this.getAyaStart(sura, aya) + offset;
        line = this.fixLineNum(line, cyclic);
        return this.getAya(line);
    },
    isOutOfRange: function (sura, aya) {
        var line = this.getAyaStart(sura, aya);
        return line < 0 || line >= this.numAyas;
    },
    fixLineNum: function (line, cyclic) {
        if (cyclic && line >= this.numAyas) return 0;
        return Math.min(Math.max(line, 0), this.numAyas - 1);
    },
    fixAyaNum: function (sura, aya) {
        return Math.min(Math.max(aya, 1), this.suraProps(sura).ayas);
    },
    fixSuraNum: function (sura) {
        return Math.min(Math.max(sura, 1), this.numSuras);
    },
    fixPageNum: function (page) {
        return Math.min(Math.max(page, 1), this.numPages);
    },
    fixJuzNum: function (juz) {
        return Math.min(Math.max(juz, 1), this.numJuzs);
    },
    getSuraName: function (sura, nameType) {
        nameType = nameType || 'name'
        return this.suraProps(sura)[nameType];
    },
    getSuraNum: function (suraName, nameType) {
        nameType = nameType || 'name'
        for (i = 1; i <= this.numSuras; i++)
        if (this.suraProps(i)[nameType] == suraName) return i;
        return 0;
    },
    getPage: function (sura, aya) {
        return this.binarySearch(this.pageStarts, this.getAyaStart(sura, aya));
    },
    getJuz: function (sura, aya) {
        return this.binarySearch(this.juzStarts, this.getAyaStart(sura, aya));
    },
    binarySearch: function (theArray, item) {
        var down = 0,
            mid;
        var up = theArray.length;
        while (up - down > 1) {
            mid = (down + up) >> 1;
            if (theArray[mid] < item) down = mid;
            else up = mid;
        }
        if (theArray[up] != item) return up - 1;
        return up;
    },
    getPageItems: function (page) {
        var pageArray = [];
        var from = this.pageProps(page);
        var to = this.pageProps(page + 1);
        to = this.getPrevAya(to.sura, to.aya);
        if (from.sura == to.sura) pageArray = pageArray.concat(this.getAyaRange(from.sura, from.aya, to.aya));
        else {
            pageArray = pageArray.concat(this.getAyaRange(from.sura, from.aya, this.suraProps(from.sura).ayas));
            for (var i = from.sura + 1; i < to.sura; i++)
            pageArray = pageArray.concat(this.getAyaRange(i, 1, this.suraProps(i).ayas));
            pageArray = pageArray.concat(this.getAyaRange(to.sura, 1, to.aya));
        }
        return pageArray;
    },
    getAyaRange: function (sura, fromAya, toAya) {
        var outArray = [];
        for (i = fromAya; i <= toAya; i++)
        outArray.push({
            sura: sura,
            aya: i
        });
        return outArray;
    }
}
Quran.init();
var Cookies = {};
Cookies.set = function (name, value, expireDays) {
    var argv = arguments;
    var argc = arguments.length;
    var today = new Date();
    var expires = (expireDays) ? new Date(today.getTime() + expireDays * 86400000) : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
};
Cookies.get = function (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while (i < clen) {
        j = i + alen;
        if (document.cookie.substring(i, j) == arg) return Cookies.getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
Cookies.getCookieVal = function (offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
Cookies.clear = function (name) {
    if (Cookies.get(name)) document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
};