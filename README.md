# Weather German Application

تطبيق الطقس في ألمانيا - تطبيق ويب شامل لعرض معلومات الطقس الحالية والتوقعات للمدن الألمانية الرئيسية.

## المميزات

- ✅ معلومات الطقس الحالية (درجة الحرارة، سرعة الرياح، الوصف)
- ✅ توقعات الطقس لمدة 7 أيام
- ✅ دعم 6 مدن ألمانية رئيسية (برلين، ميونخ، هامبورغ، فرانكفورت، كولونيا، شتوتغارت)
- ✅ واجهة مستخدم عربية (RTL)
- ✅ تصميم متجاوب (Mobile-first)
- ✅ بيانات من Open-Meteo API
- ✅ أيقونات Material Design Icons

## التقنيات المستخدمة

### Backend
- ASP.NET Core 3.1
- Najiz Framework

### Frontend
- Vue.js 2.6
- TypeScript 4.5
- Vuetify 1.5
- Material Design Icons (@mdi/font)

### Build Tools
- Vue CLI 3.10
- Webpack
- MSBuild

## التثبيت والتشغيل

### المتطلبات
- Node.js (v12 or higher)
- .NET Core SDK 3.1
- npm

### خطوات التثبيت

1. **تثبيت الحزم**
```bash
npm install
```

2. **بناء الواجهة الأمامية**
```bash
npm run build
```

3. **استعادة حزم .NET**
```bash
dotnet restore
```

4. **بناء المشروع**
```bash
dotnet build
```

5. **تشغيل التطبيق**
```bash
dotnet run
```

التطبيق سيعمل على: `http://localhost:5003/applications/weathergerman/`

## البنية

```
WeatherGerman/
├── ClientApp/                  # Frontend Vue.js application
│   ├── assets/                 # Static assets (CSS, images)
│   ├── components/             # Vue components
│   │   ├── App/                # Root component
│   │   ├── Index/              # Home page
│   │   └── Weather/            # Weather display component
│   ├── plugins/                # Vue plugins (Vuetify, i18n)
│   ├── Services/               # Service layer
│   │   ├── WeatherService.ts   # Weather data service
│   │   ├── AxiosService.ts     # HTTP client
│   │   └── ...
│   ├── shared/                 # Shared utilities
│   ├── main.ts                 # Vue entry point
│   └── router.ts               # Vue Router configuration
├── Config/                     # Configuration files
├── Controller/                 # API Controllers (empty - reserved)
├── Models/                     # Data models (empty - reserved)
├── Pages/                      # Razor Pages
├── Properties/                 # Project properties
├── public/                     # Public assets
├── Program.cs                  # ASP.NET entry point
├── Startup.cs                  # ASP.NET configuration
└── WeatherGerman.csproj        # Project file
```

## المدن المدعومة

- برلين (Berlin)
- ميونخ (Munich)
- هامبورغ (Hamburg)
- فرانكفورت (Frankfurt)
- كولونيا (Cologne)
- شتوتغارت (Stuttgart)

## API

التطبيق يستخدم [Open-Meteo API](https://open-meteo.com/) للحصول على بيانات الطقس:
- مجاني بالكامل
- لا يحتاج مفتاح API
- يوفر بيانات دقيقة وموثوقة

## التطوير

### تشغيل وضع التطوير
```bash
npm run serve
```

### بناء للإنتاج
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## المعايير المطبقة

### CSP Compliance
- ✅ جميع الأصول محلية (bundled via npm)
- ✅ لا توجد روابط CDN خارجية (ما عدا Google Fonts)
- ✅ Material Design Icons محملة محلياً

### UI/UX Standards
- ✅ تصميم متجاوب (12-column grid system)
- ✅ دعم RTL كامل
- ✅ أيقونات Material Design
- ✅ نظام ألوان متسق
- ✅ تباعد منظم (8px spacing units)
- ✅ حالات تحميل وخطأ مناسبة

### TypeScript Configuration
- ✅ `strict: false` للتوافق مع Vue 2
- ✅ `useDefineForClassFields: false` للديكوراتورز
- ✅ `emitDecoratorMetadata: true` لحقن التبعيات

## الترخيص

هذا المشروع جزء من منصة Najiz/Sigma-S.

## الدعم

للمساعدة أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق التطوير.
