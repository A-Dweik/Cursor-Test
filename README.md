# تطبيق تبني القطط (Cat Adoption Application)

تطبيق ويب لتبني القطط مبني على Najiz.MicroTemplate باستخدام Vue.js 2.6 + Vuetify 1.5 + ASP.NET Core 3.1

## ✨ الميزات

- 🐱 عرض قائمة القطط المتاحة للتبني مع الصور والتفاصيل
- 🔍 فلترة القطط حسب العمر (صغيرة، شابة، بالغة)
- 📝 صفحة تفاصيل لكل قطة مع معلومات كاملة
- 💚 نموذج طلب تبني مع التحقق من البيانات
- 🎨 تصميم متجاوب يتبع معايير Najiz Design System
- 🌐 دعم كامل للغة العربية مع RTL
- ♿ واجهة سهلة الاستخدام ومتاحة للجميع

## 🏗️ البنية التقنية

### Frontend
- **Framework:** Vue.js 2.6.10
- **UI Library:** Vuetify 1.5.14
- **Language:** TypeScript 4.5.5
- **Icons:** Material Design Icons (@mdi/font)
- **State Management:** Vuex
- **Routing:** Vue Router
- **Build Tool:** Vue CLI 3.10 + Webpack

### Backend
- **Framework:** ASP.NET Core 3.1
- **Language:** C# (.NET Core 3.1)
- **Logging:** NLog
- **Security:** Najiz.Web.Security + JWT Bearer

## 📦 المتطلبات

- Node.js (v14 أو أحدث)
- npm (v6 أو أحدث)
- .NET Core SDK 3.1

## 🚀 التثبيت والتشغيل

### 1. تثبيت المكتبات

```bash
# تثبيت مكتبات Frontend
npm install --legacy-peer-deps

# استعادة مكتبات Backend
dotnet restore
```

### 2. بناء التطبيق

```bash
# بناء Frontend
npm run build

# بناء Backend
dotnet build
```

### 3. تشغيل التطبيق

```bash
# تشغيل في وضع التطوير
dotnet run

# أو باستخدام
dotnet watch run
```

الوصول للتطبيق: `http://localhost:5000/applications/catadoption/`

## 📁 هيكل المشروع

```
CatAdoption/
├── ClientApp/                  # Frontend (Vue.js)
│   ├── assets/
│   │   └── styles/            # ملفات CSS العامة
│   ├── components/
│   │   ├── App/               # المكون الرئيسي
│   │   ├── Index/             # صفحة القائمة الرئيسية
│   │   └── Cats/              # صفحة تفاصيل القطة
│   ├── Services/
│   │   ├── CatService.ts      # خدمة إدارة القطط
│   │   ├── AxiosService.ts    # HTTP client
│   │   ├── LoaderService.ts   # Loading state
│   │   └── Models/            # TypeScript interfaces
│   ├── plugins/               # Vue plugins
│   ├── shared/                # Shared utilities
│   ├── main.ts                # Entry point
│   └── router.ts              # Vue Router config
├── Config/                     # Configuration files
├── Pages/                      # Razor Pages
├── Properties/                 # Launch settings
├── Program.cs                  # Backend entry point
├── Startup.cs                  # Backend configuration
└── CatAdoption.csproj         # Project file

```

## 🎨 معايير التصميم

التطبيق يتبع معايير Najiz Design System:

### الألوان
- **Primary:** `#1B8354` (أخضر نجز)
- **Secondary:** `#424242` (رمادي)
- **Success:** `#1B8354` (أخضر)
- **Error:** `#dc2626` (أحمر)

### الخطوط
- **Primary:** Almarai
- **Secondary:** Cairo
- **Fallback:** Segoe UI Arabic, Roboto

### المكونات
- يستخدم Najiz patterns (`.dashboardServicesCards`) للقوائم
- Vuetify components للنماذج والحوارات
- Material Design Icons لجميع الأيقونات

## 🔒 CSP Compliance

التطبيق متوافق مع Content Security Policy:
- ✅ جميع الأيقونات محملة محلياً عبر `@mdi/font`
- ✅ لا توجد روابط CDN محظورة
- ✅ Google Fonts فقط (مسموح في CSP)
- ✅ جميع المكتبات مثبتة عبر npm

## 🐱 البيانات التجريبية

التطبيق يحتوي على 6 قطط تجريبية:
1. **لولو** - قطة صغيرة شيرازية
2. **سمسم** - قط شاب بريطاني
3. **ميمي** - قطة بالغة سيامي
4. **فهد** - قط صغير تابي
5. **نونو** - قطة شابة فارسية
6. **بوسي** - قط بالغ مين كون

## 📱 الصفحات

### 1. الصفحة الرئيسية (`/`)
- عرض جميع القطط المتاحة
- فلترة حسب العمر
- بطاقات تفاعلية مع صور
- أزرار للتفاصيل والتبني

### 2. صفحة التفاصيل (`/cat/:id`)
- صورة كبيرة للقطة
- معلومات كاملة (السلالة، اللون، الجنس، الحالة الصحية)
- سمات الشخصية
- نموذج طلب التبني

## ✅ التحقق من البناء

بعد تشغيل `npm run build`، تأكد من:

```bash
dist/
├── css/
│   ├── chunk-vendors.css      # ~483KB (يحتوي Vuetify CSS)
│   └── index.css              # ~3KB (التطبيق)
├── fonts/                      # Material Design Icons
│   ├── materialdesignicons-webfont.woff2
│   ├── materialdesignicons-webfont.woff
│   └── ...
├── js/
│   ├── chunk-vendors.js       # ~900KB (Vue + Vuetify)
│   └── index.js               # ~49KB (التطبيق)
└── index.html                  # Entry point
```

## 🔧 استكشاف الأخطاء

### الأيقونات لا تظهر
- تأكد من تثبيت `@mdi/font`: `npm install @mdi/font`
- تأكد من استيراد CSS في `main.ts`: `import '@mdi/font/css/materialdesignicons.css'`
- تأكد من إعداد `iconfont: 'mdi'` في `vuetify.js`

### مشاكل البناء
- استخدم `--legacy-peer-deps`: `npm install --legacy-peer-deps`
- امسح `node_modules` وأعد التثبيت: `rm -rf node_modules package-lock.json && npm install --legacy-peer-deps`

### تداخل النصوص على الموبايل
- تأكد من أن مجموع أعمدة Grid = 12 لكل breakpoint (xs, sm, md)

## 📄 الترخيص

هذا المشروع هو جزء من منصة نجز (Najiz Platform)

## 👥 المساهمة

تطوير: Cloud AI Agent
القالب: Najiz.MicroTemplate
التصميم: Najiz Design System

---

تم التطوير باستخدام ❤️ و ☕
