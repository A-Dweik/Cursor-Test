# تطبيق بيع السيارات (Car Selling Application)

منصة شاملة لبيع وشراء السيارات مبنية على Najiz.MicroTemplate

## 🎯 نظرة عامة

تطبيق بيع السيارات هو منصة حديثة وسهلة الاستخدام لإدارة عمليات بيع وشراء السيارات. تم بناء التطبيق باستخدام تقنيات حديثة ويتبع أفضل الممارسات في تطوير البرمجيات.

## 🛠 التقنيات المستخدمة

### Backend
- ASP.NET Core 3.1
- Najiz Framework 3.55.3
- Entity Framework Core (جاهز للاستخدام)

### Frontend
- Vue.js 2.6.10
- TypeScript 4.5.5
- Vuetify 1.5.14
- Material Design Icons (@mdi/font 5.9.55)
- Axios للتواصل مع الـ API
- Vue Router للتنقل
- Vue I18n للترجمة

### Build Tools
- Vue CLI 3.10
- Webpack
- MSBuild
- TypeScript Compiler

## ✨ الميزات الرئيسية

### 1. إدارة السيارات
- ✅ عرض قائمة جميع السيارات
- ✅ إضافة سيارة جديدة
- ✅ تعديل بيانات سيارة موجودة
- ✅ حذف سيارة
- ✅ عرض تفاصيل السيارة بشكل كامل

### 2. البحث والتصفية
- ✅ البحث عن السيارات حسب الماركة، الموديل، أو اللون
- ✅ تصفية السيارات حسب الحالة (متاحة، محجوزة، مباعة)
- ✅ نتائج فورية للبحث

### 3. لوحة التحكم
- ✅ إحصائيات شاملة (إجمالي السيارات، المتاحة، المحجوزة، المباعة)
- ✅ آخر السيارات المضافة
- ✅ إجراءات سريعة

### 4. واجهة المستخدم
- ✅ تصميم عصري ومتجاوب (Responsive Design)
- ✅ دعم كامل للغة العربية (RTL)
- ✅ رسوم متحركة سلسة
- ✅ حالات التحميل والفراغ (Loading & Empty States)
- ✅ رسائل النجاح والخطأ

## 📁 هيكل المشروع

```
CarSelling/
├── ClientApp/                    # Frontend Application
│   ├── assets/
│   │   └── styles/
│   │       └── main.css         # Global Styles (Sigma-S Dashboard BEM)
│   ├── components/
│   │   ├── App/                 # Root Component
│   │   ├── Index/               # Dashboard/Home Page
│   │   ├── CarList/             # Cars List Component
│   │   ├── CarDetails/          # Car Details Component
│   │   └── AddCar/              # Add/Edit Car Form
│   ├── plugins/
│   │   ├── vuetify.js           # Vuetify Configuration (RTL + MDI icons)
│   │   ├── i18n.ts              # Internationalization
│   │   └── application-initialization.ts
│   ├── Services/
│   │   ├── AxiosService.ts      # HTTP Client
│   │   ├── LoaderService.ts     # Loading Indicator
│   │   ├── TelemetryService.ts  # Application Insights
│   │   ├── CarService/
│   │   │   ├── CarService.ts    # Car Business Logic
│   │   │   └── CarModel.ts      # Car Data Model
│   │   ├── errorHandler.ts
│   │   └── toast.ts             # Notifications
│   ├── shared/
│   │   └── userService/         # User Management
│   ├── main.ts                  # Application Entry Point
│   ├── router.ts                # Vue Router Configuration
│   └── public/
│       └── index.html           # HTML Template
├── Config/
│   └── NLog.config              # Logging Configuration
├── Pages/                       # Razor Pages
├── Properties/
│   └── launchSettings.json      # Launch Configuration
├── Controller/                  # API Controllers (empty - ready for use)
├── Models/                      # Data Models (empty - ready for use)
├── MapperProfiles/              # AutoMapper Profiles (empty - ready for use)
├── public/                      # Static Files
│   ├── manifest.json
│   ├── config.json
│   └── robots.txt
├── Program.cs                   # Application Entry Point
├── Startup.cs                   # Application Configuration
├── CarSelling.csproj            # Project File
├── package.json                 # NPM Dependencies
├── tsconfig.json                # TypeScript Configuration
├── vue.config.js                # Vue CLI Configuration
└── README.md                    # This File
```

## 🚀 التثبيت والتشغيل

### المتطلبات الأساسية
- .NET Core SDK 3.1 or later
- Node.js 12.x or later
- npm 6.x or later

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd CarSelling
```

2. **تثبيت المكتبات الخلفية (Backend)**
```bash
dotnet restore
```

3. **تثبيت المكتبات الأمامية (Frontend)**
```bash
npm install
```

4. **بناء التطبيق الأمامي**
```bash
npm run build
```

5. **تشغيل التطبيق**
```bash
dotnet run
```

6. **فتح المتصفح**
افتح المتصفح على العنوان:
```
http://localhost:5001/applications/carselling/
```

### التطوير (Development Mode)

لتشغيل التطبيق في وضع التطوير:

```bash
# Terminal 1: Frontend Development Server
npm run serve

# Terminal 2: Backend Server
dotnet run
```

## 📋 نماذج البيانات

### CarModel
```typescript
{
  id: string;              // معرف السيارة
  brand: string;           // الماركة (تويوتا، هوندا، إلخ)
  model: string;           // الموديل (كامري، أكورد، إلخ)
  year: number;            // السنة
  price: number;           // السعر بالريال
  mileage: number;         // المسافة المقطوعة بالكيلومتر
  color: string;           // اللون
  status: string;          // الحالة (available, reserved, sold)
  description: string;     // الوصف
  imageUrl: string;        // رابط الصورة
  createdDate: string;     // تاريخ الإضافة
  updatedDate: string;     // تاريخ آخر تحديث
}
```

## 🎨 معايير التصميم

### الألوان
- **Primary**: #1976D2 (أزرق)
- **Secondary**: #424242 (رمادي داكن)
- **Success**: #4CAF50 (أخضر)
- **Error**: #FF5252 (أحمر)
- **Warning**: #FF9800 (برتقالي)
- **Info**: #2196F3 (أزرق فاتح)

### حالات السيارات (Status Colors - Sigma-S Dashboard Pattern)
- **Available** (متاحة): #36c5ba (أخضر)
- **Reserved** (محجوزة): #ff9800 (برتقالي)
- **Sold** (مباعة): #ff4459 (أحمر)

### الخطوط
- **العربية**: Tajawal
- **الإنجليزية**: Roboto

## 🔧 الإعدادات الهامة

### التحقق من CSP (Content Security Policy)
✅ جميع الأيقونات محلية عبر @mdi/font (لا CDN)
✅ الخطوط من Google Fonts (مسموح في CSP)
✅ لا توجد روابط CDN محظورة

### تكوين Vuetify
```javascript
Vue.use(Vuetify, {
  rtl: true,              // دعم RTL للعربية
  iconfont: 'mdi',        // استخدام Material Design Icons
  theme: { /* ... */ }
});
```

### تكوين TypeScript
```json
{
  "strict": false,                    // Required for Vue 2
  "useDefineForClassFields": false,   // CRITICAL for Vue 2 decorators
  "emitDecoratorMetadata": true,      // Required for DI
  "experimentalDecorators": true
}
```

## 🧪 الاختبار

### اختبار التطبيق محلياً
1. تأكد من تشغيل التطبيق
2. افتح المتصفح على http://localhost:5001/applications/carselling/
3. تحقق من:
   - ✅ ظهور الأيقونات بشكل صحيح
   - ✅ عمل البحث والتصفية
   - ✅ إضافة وتعديل السيارات
   - ✅ حذف السيارات
   - ✅ التصميم المتجاوب على الموبايل

## 📦 البناء للإنتاج (Production Build)

```bash
# Build Frontend
npm run build

# Build Backend
dotnet build --configuration Release

# Publish
dotnet publish --configuration Release --output ./publish
```

## 🔐 الأمان

- ✅ التحقق من صحة المدخلات
- ✅ حماية ضد CSRF
- ✅ سياسة أمان المحتوى (CSP)
- ✅ HTTPS في الإنتاج
- ✅ تسجيل دخول آمن (جاهز للتكامل)

## 📈 التحسينات المستقبلية

- [ ] إضافة صور حقيقية للسيارات
- [ ] نظام تقييم السيارات
- [ ] إضافة خريطة لموقع السيارة
- [ ] نظام المفضلة
- [ ] إشعارات للمستخدمين
- [ ] تقارير متقدمة
- [ ] تصدير البيانات (PDF, Excel)
- [ ] API للتكامل مع أنظمة خارجية

## 🐛 الإبلاغ عن المشاكل

إذا واجهت أي مشكلة:
1. تحقق من Console في المتصفح
2. تحقق من logs في App_Data/logs/
3. تأكد من تثبيت جميع المكتبات
4. تأكد من تطابق إصدارات المكتبات

## 📝 الترخيص

هذا المشروع مبني على Najiz.MicroTemplate وخاضع لسياسات وزارة العدل السعودية.

## 👥 المساهمة

لتقديم مساهمة:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 الدعم الفني

للحصول على الدعم الفني:
- البريد الإلكتروني: support@najiz.sa
- الموقع: https://najiz.sa

---

**تم البناء بواسطة**: Najiz Platform Team  
**آخر تحديث**: يناير 2026  
**الإصدار**: 1.0.0
