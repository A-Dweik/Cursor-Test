# طقس الزرقاء - الأردن

تطبيق ويب لعرض حالة الطقس في مدينة الزرقاء، الأردن. تم بناؤه باستخدام Vue.js 2.6 و ASP.NET Core 3.1.

## الميزات

- 🌡️ عرض الطقس الحالي لمدينة الزرقاء
- 📅 توقعات الطقس لمدة 5 أيام
- 💧 معلومات تفصيلية (الرطوبة، سرعة الرياح، الضغط الجوي)
- 📱 تصميم متجاوب يعمل على جميع الأجهزة
- 🌐 واجهة باللغة العربية (RTL)

## التقنيات المستخدمة

### Frontend
- Vue.js 2.6
- TypeScript 4.5
- Vuetify 1.5
- Vue Router
- Axios

### Backend
- ASP.NET Core 3.1
- C#

## التثبيت والتشغيل

### المتطلبات
- Node.js (v12 أو أحدث)
- .NET Core SDK 3.1
- npm أو yarn

### خطوات التثبيت

1. استنساخ المشروع:
```bash
git clone <repository-url>
cd zarqaweather
```

2. تثبيت الحزم:
```bash
npm install
```

3. بناء Frontend:
```bash
npm run build
```

4. استعادة حزم .NET:
```bash
dotnet restore
```

5. تشغيل التطبيق:
```bash
dotnet run
```

6. فتح المتصفح على:
```
http://localhost:5000/applications/zarqaweather/
```

## البنية

```
ZarqaWeather/
├── ClientApp/              # Frontend (Vue.js)
│   ├── assets/            # الأصول (CSS، صور)
│   ├── components/        # مكونات Vue
│   │   ├── App/          # المكون الرئيسي
│   │   ├── Index/        # الصفحة الرئيسية
│   │   └── Weather/      # صفحة الطقس
│   ├── plugins/          # إضافات Vue
│   ├── Services/         # خدمات API
│   │   └── Weather/      # خدمة الطقس
│   └── shared/           # مكونات مشتركة
├── Controller/           # API Controllers
│   └── WeatherController.cs
├── Config/               # ملفات الإعدادات
├── Pages/                # Razor Pages
├── Properties/           # إعدادات المشروع
└── public/              # ملفات عامة

```

## البيانات

حالياً، التطبيق يستخدم بيانات ثابتة (Static Data) كما هو مطلوب. يمكن دمج API حقيقي للطقس لاحقاً.

## API Endpoints

- `GET /api/Weather/current` - الحصول على الطقس الحالي
- `GET /api/Weather/forecast` - الحصول على توقعات 5 أيام

## المساهمة

هذا المشروع تم إنشاؤه باستخدام Najiz.MicroTemplate. للمساهمة:

1. Fork المشروع
2. إنشاء branch للميزة الجديدة
3. Commit التغييرات
4. Push إلى Branch
5. فتح Pull Request

## الترخيص

هذا المشروع لأغراض تعليمية وتجريبية.

## التواصل

للمزيد من المعلومات، يرجى التواصل مع فريق التطوير.
