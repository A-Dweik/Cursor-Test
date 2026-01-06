# تطبيق الطقس - عمان

تطبيق ويب لعرض حالة الطقس الحالية في مدينة عمان، الأردن.

## التقنيات المستخدمة

### Backend
- ASP.NET Core 3.1
- Najiz Framework

### Frontend
- Vue.js 2.6
- TypeScript 4.5
- Vuetify 1.5
- Vue Router
- Axios

## المتطلبات

- .NET Core SDK 3.1
- Node.js 12+ و npm

## التثبيت والتشغيل

### 1. استنساخ المشروع

```bash
cd WeatherApp
```

### 2. تثبيت الحزم

```bash
npm install
```

### 3. بناء الواجهة الأمامية

```bash
npm run build
```

### 4. استعادة حزم .NET

```bash
dotnet restore
```

### 5. بناء المشروع

```bash
dotnet build
```

### 6. تشغيل التطبيق

```bash
dotnet run
```

التطبيق سيعمل على: `http://localhost:5000/applications/weatherapp/`

## الميزات

### الميزات الرئيسية
- ✅ عرض درجة الحرارة الحالية في عمان
- ✅ عرض درجة الحرارة المحسوسة
- ✅ عرض الرطوبة والضغط الجوي
- ✅ عرض سرعة واتجاه الرياح
- ✅ عرض الرؤية
- ✅ عرض أوقات الشروق والغروب
- ✅ عرض نطاق درجات الحرارة (الأعلى والأدنى)
- ✅ تحديث تلقائي للبيانات
- ✅ واجهة عربية كاملة (RTL)
- ✅ تصميم متجاوب لجميع الأجهزة

### الميزات التقنية
- ✅ CSP Compliant (جميع الأصول محملة محلياً)
- ✅ Material Design Icons محملة عبر npm
- ✅ تكامل كامل مع Najiz Framework
- ✅ Service Worker للعمل بلا اتصال
- ✅ TypeScript للأمان من الأخطاء
- ✅ Dependency Injection Pattern

## البنية

```
WeatherApp/
├── ClientApp/                 # تطبيق Vue.js
│   ├── assets/               # الأصول (CSS, صور)
│   ├── components/           # مكونات Vue
│   │   ├── App/             # مكون التطبيق الرئيسي
│   │   └── Index/           # الصفحة الرئيسية
│   ├── plugins/             # إعدادات Vuetify وغيرها
│   ├── Services/            # الخدمات
│   │   └── Weather/         # خدمة الطقس
│   └── shared/              # مكونات مشتركة
├── Config/                   # ملفات التكوين
├── Pages/                    # Razor Pages
├── Properties/               # خصائص المشروع
└── public/                   # الملفات العامة
```

## ملاحظات مهمة

### بيانات الطقس
حالياً، التطبيق يستخدم بيانات وهمية واقعية لأغراض العرض التوضيحي. للاستخدام الفعلي:

1. احصل على API Key من [OpenWeatherMap](https://openweathermap.org/api)
2. أضف المفتاح في `public/config.json`:
```json
{
  "Weather": {
    "ApiKey": "YOUR_API_KEY_HERE"
  }
}
```
3. استخدم الدالة `getWeatherForAmmanFromAPI()` في `WeatherService.ts`

### CSP Compliance
التطبيق متوافق تماماً مع Content Security Policy الخاص بمنصة Sigma-S:
- ✅ جميع الأيقونات محملة محلياً عبر @mdi/font
- ✅ الخطوط محملة من Google Fonts (مسموح)
- ✅ لا توجد روابط CDN محظورة

### التخصيص
يمكنك تخصيص الألوان والتصميم عبر:
- `ClientApp/plugins/vuetify.js` - الألوان الأساسية
- `ClientApp/assets/styles/main.css` - الأنماط المخصصة

## استكشاف الأخطاء

### الأيقونات لا تظهر
تأكد من:
1. تثبيت @mdi/font: `npm install @mdi/font`
2. الاستيراد في main.ts: `import '@mdi/font/css/materialdesignicons.css';`
3. إعداد vuetify.js: `iconfont: 'mdi'`

### أخطاء البناء
1. تأكد من تثبيت جميع الحزم: `npm install`
2. تأكد من نسخة TypeScript: `~4.5.5`
3. امسح المجلد dist: `rm -rf dist`
4. أعد البناء: `npm run build`

## الترخيص

هذا المشروع تابع لمنصة Najiz وهو للاستخدام الداخلي فقط.

## الدعم

للدعم الفني، يرجى التواصل مع فريق التطوير.
