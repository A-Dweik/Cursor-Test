# توثيق العقود - Contract Verification System

نظام توثيق العقود للعقارات والمركبات والعقود التجارية

## 📋 نظرة عامة

تطبيق ويب شامل لتوثيق وإدارة العقود المختلفة:
- **العقود العقارية**: بيع وشراء العقارات والمنازل
- **عقود المركبات**: بيع وتأجير السيارات والمركبات
- **العقود التجارية**: العقود التجارية والاتفاقيات

## 🛠️ التقنيات المستخدمة

### Backend
- ASP.NET Core 3.1
- C# 8.0
- Najiz Framework 3.55.3

### Frontend
- Vue.js 2.6.10
- TypeScript 4.5.5
- Vuetify 1.5.14
- Vue Router 3.1.0
- Vuex 3.1.1

### Build Tools
- Vue CLI 3.10
- MSBuild
- npm/Webpack

## 📁 هيكل المشروع

```
ContractVerification/
├── ClientApp/                    # Frontend application
│   ├── assets/
│   │   └── styles/              # Global styles
│   ├── components/              # Vue components
│   │   ├── App/                # Root component
│   │   ├── Index/              # Home page
│   │   ├── ContractList/       # Contracts list
│   │   ├── ContractForm/       # Add/Edit contract
│   │   └── ContractDetails/    # Contract details
│   ├── plugins/                # Vue plugins
│   ├── Services/               # Services and API
│   │   ├── Contract/          # Contract service
│   │   ├── AxiosService.ts
│   │   ├── LoaderService.ts
│   │   └── TelemetryService.ts
│   ├── shared/                 # Shared utilities
│   └── main.ts                 # Application entry
├── Config/                      # Configuration files
├── Pages/                       # Razor pages
├── Properties/                  # Project properties
├── public/                      # Public assets
├── Program.cs                   # Application startup
├── Startup.cs                   # ASP.NET configuration
└── ContractVerification.csproj  # Project file
```

## 🚀 البدء

### المتطلبات الأساسية

- .NET Core SDK 3.1
- Node.js 12+ and npm
- Visual Studio 2019+ or VS Code

### التثبيت

1. **Clone the repository**
   ```bash
   cd ContractVerification
   ```

2. **Install npm dependencies**
   ```bash
   npm install
   ```

3. **Restore .NET dependencies**
   ```bash
   dotnet restore
   ```

### التشغيل

#### Development Mode

**Frontend only:**
```bash
npm run serve
```

**Backend only:**
```bash
dotnet run
```

**Full application:**
```bash
dotnet run
```
Then navigate to: `http://localhost:5200/applications/contractverification/`

#### Production Build

```bash
npm run build
dotnet build
dotnet run
```

## 📦 البناء للنشر

```bash
dotnet publish -c Release
```

The output will be in `bin/Release/netcoreapp3.1/publish/`

## 🎨 الميزات الرئيسية

### إدارة العقود
- ✅ عرض قائمة العقود مع الفلترة والبحث
- ✅ إضافة عقود جديدة
- ✅ تعديل العقود الموجودة
- ✅ عرض تفاصيل العقد الكاملة
- ✅ توثيق العقود
- ✅ حذف العقود

### أنواع العقود
- 🏠 **عقارات**: بيع، شراء
- 🚗 **مركبات**: بيع، إيجار، تأجير
- 💼 **تجارية**: عقود تجارية متنوعة

### حالات العقود
- 🟠 **قيد المراجعة**: العقد في انتظار التوثيق
- 🟢 **موثق**: تم توثيق العقد بنجاح
- 🔴 **مرفوض**: تم رفض العقد

## 🎯 الواجهة

### الصفحة الرئيسية
- نظرة عامة على النظام
- إحصائيات سريعة
- أنواع العقود المتاحة
- روابط سريعة

### قائمة العقود
- جدول تفاعلي لعرض العقود
- فلترة حسب النوع والحالة
- بحث متقدم
- إجراءات سريعة (عرض، تعديل، توثيق، حذف)

### نموذج العقد
- نموذج شامل لإدخال بيانات العقد
- التحقق من صحة البيانات
- دعم جميع أنواع العقود

### تفاصيل العقد
- عرض كامل لبيانات العقد
- معلومات الأطراف
- التسلسل الزمني
- إجراءات التوثيق

## 🔒 الأمان

- ✅ التكامل مع Najiz Security Framework
- ✅ OpenID Connect Authentication
- ✅ JWT Bearer Token
- ✅ Data Protection with Key Storage
- ✅ Content Security Policy (CSP) Compliant

## 📱 الاستجابة (Responsive)

التطبيق متجاوب بالكامل ويعمل على:
- 📱 الهواتف المحمولة (xs: < 600px)
- 📱 الأجهزة اللوحية (sm: 600px - 960px)
- 💻 أجهزة الكمبيوتر (md: 960px - 1264px)
- 🖥️ الشاشات الكبيرة (lg: > 1264px)

## 🌐 التدويل (i18n)

- اللغة الافتراضية: العربية
- دعم RTL (Right-to-Left)
- قابل للتوسع لدعم لغات إضافية

## 📊 المراقبة والتحليل

- Application Insights Integration
- Telemetry Tracking
- Performance Monitoring
- Error Tracking with NLog

## 🧪 الاختبار

### Run Linting
```bash
npm run lint
```

### Build Verification
```bash
npm run build
```

## 📝 ملاحظات مهمة

### CSP Compliance
- ✅ جميع الأيقونات محملة محلياً عبر @mdi/font
- ✅ Vuetify CSS محمل من الحزمة المجمعة
- ✅ الخطوط من Google Fonts فقط (مسموح في CSP)
- ❌ لا يوجد استخدام لـ CDNs خارجية (محظورة)

### TypeScript Configuration
- `strict: false` - مطلوب لـ Vue 2 class components
- `useDefineForClassFields: false` - حرج لـ Vue 2 decorators

### Service Registration
جميع الخدمات الجديدة يجب تسجيلها في:
1. إضافة `@Service()` decorator
2. تسجيل في `main.ts` في `diProvide` array
3. Inject في المكونات باستخدام `@Inject(ServiceName)`

## 🐛 استكشاف الأخطاء

### الأيقونات لا تظهر
- تحقق من تثبيت `@mdi/font`
- تحقق من `import '@mdi/font/css/materialdesignicons.css'` في main.ts
- تحقق من `iconfont: 'mdi'` في vuetify.js

### الأنماط لا تطبق
- تحقق من `import 'vuetify/dist/vuetify.min.css'` في vuetify.js
- تحقق من بناء الملفات بنجاح

### أخطاء TypeScript
- تحقق من `tsconfig.json` settings
- تشغيل `npm install` مجدداً

## 📄 الترخيص

هذا المشروع جزء من منصة نجز (Najiz Platform)

## 👥 الدعم

للدعم والاستفسارات، يرجى التواصل مع فريق التطوير.

---

**Created with ❤️ using Najiz.MicroTemplate**
