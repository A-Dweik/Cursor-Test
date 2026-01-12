# نظام إدارة استئجار وبيع الكتب (BooksApp)

## 📚 نظرة عامة

تطبيق ويب شامل لإدارة استئجار وبيع الكتب ومراجعتها، تم بناؤه باستخدام:
- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Build**: MSBuild + Vue CLI 3.10 + npm/Webpack
- **Theme**: Blue Theme (نمط أزرق احترافي)

## ✨ الميزات الرئيسية

### 1. تصفح الكتب
- عرض مكتبة شاملة من الكتب المتاحة
- بحث متقدم حسب العنوان، المؤلف، أو الوصف
- تصفية الكتب حسب التصنيف (البرمجة، قواعد البيانات، الذكاء الاصطناعي، إلخ)
- عرض تفاصيل كاملة لكل كتاب (الوصف، المؤلف، سنة النشر، ISBN، التقييم)
- عرض سعر الإيجار والشراء لكل كتاب

### 2. استئجار الكتب
- استئجار الكتب المتاحة لفترة محددة (حتى 30 يوم)
- حساب تلقائي للتكلفة الإجمالية
- تتبع الكتب المستأجرة الحالية
- إرجاع الكتب المستأجرة
- عرض حالة الاستئجار (نشط، تم الإرجاع، متأخر)

### 3. شراء الكتب ⭐ جديد
- شراء الكتب بشكل دائم
- عرض سعر الشراء لكل كتاب
- تتبع الكتب المشتراة
- نافذة تأكيد الشراء مع عرض السعر النهائي
- سجل كامل لجميع المشتريات مع التواريخ والحالة

### 4. نظام المراجعات
- إضافة مراجعات وتقييمات للكتب (1-5 نجوم)
- عرض جميع المراجعات لكل كتاب
- تحديث تلقائي لمتوسط التقييم

### 5. واجهة مستخدم احترافية
- **نمط أزرق احترافي** (Blue Theme)
- تصميم متجاوب يعمل على جميع الأجهزة (موبايل، تابلت، ديسكتوب)
- دعم كامل للغة العربية (RTL)
- ألوان متناسقة (أزرق، أزرق فاتح، سماوي)
- رسوم متحركة وتأثيرات انتقالية سلسة
- نظام شارات حالة (Status Badges) باستخدام نمط BEM

## 🚀 التشغيل السريع

### المتطلبات الأساسية
- Node.js (v12+)
- .NET Core SDK 3.1
- npm

### خطوات التثبيت

1. **استنساخ المشروع**
   ```bash
   git clone <repository-url>
   cd workspace
   ```

2. **تثبيت التبعيات**
   ```bash
   npm install
   ```

3. **بناء الواجهة الأمامية**
   ```bash
   npm run build
   ```

4. **بناء الخادم**
   ```bash
   dotnet restore
   dotnet build
   ```

5. **تشغيل التطبيق**
   ```bash
   dotnet run
   ```

6. **الوصول للتطبيق**
   افتح المتصفح على: `http://localhost:5001/applications/booksapp/`

## 📁 هيكل المشروع

```
workspace/
├── ClientApp/                   # الواجهة الأمامية (Vue.js)
│   ├── assets/                 # الملفات الثابتة والأنماط
│   │   └── styles/
│   │       └── main.css       # الأنماط العامة المخصصة
│   ├── components/            # مكونات Vue
│   │   ├── App/              # المكون الرئيسي
│   │   ├── Index/            # الصفحة الرئيسية
│   │   └── Books/            # مكون إدارة الكتب
│   ├── Services/             # خدمات API والمنطق
│   │   ├── Books/           # خدمات الكتب
│   │   │   ├── BooksService.ts
│   │   │   └── BookModel.ts
│   │   ├── AxiosService.ts
│   │   ├── LoaderService.ts
│   │   └── TelemetryService.ts
│   ├── plugins/              # إضافات Vue
│   │   ├── vuetify.js       # إعدادات Vuetify (RTL + MDI Icons)
│   │   └── i18n.ts          # إعدادات اللغة
│   ├── shared/              # مكونات مشتركة
│   └── main.ts              # نقطة الدخول
├── Config/                   # ملفات الإعدادات
│   └── NLog.config
├── Pages/                    # صفحات Razor
├── Properties/              # إعدادات المشروع
├── public/                  # ملفات عامة
├── Program.cs               # نقطة دخول الخادم
├── Startup.cs               # إعدادات ASP.NET
├── BooksApp.csproj          # ملف المشروع
├── package.json             # تبعيات npm
├── tsconfig.json            # إعدادات TypeScript
└── vue.config.js            # إعدادات Vue CLI
```

## 🎨 التصميم والواجهة

### نظام الألوان - Blue Theme
- **Primary**: #2196F3 (أزرق ساطع)
- **Secondary**: #1565C0 (أزرق داكن)
- **Accent**: #42A5F5 (أزرق فاتح)
- **Info**: #03A9F4 (أزرق سماوي)
- **Success**: #00BCD4 (سماوي)
- **Error**: #FF5252 (أحمر)
- **Warning**: #FFC107 (كهرماني)

### نمط BEM للشارات
التطبيق يستخدم نمط BEM (Block Element Modifier) للشارات:
- شارات الحالة بألوان زرقاء (#2196F3، #00BCD4، #03A9F4)
- أزرار بنمط Blue Theme (blueFill, greenFill, border)
- تصميم متناسق ومتسق عبر جميع الصفحات

### استجابة التصميم
- **Mobile** (xs): < 600px
- **Tablet** (sm): 600px - 960px
- **Desktop** (md): 960px - 1264px
- **Large** (lg): 1264px - 1904px

## 🔒 التوافق مع سياسة CSP

التطبيق متوافق تماماً مع سياسة أمان المحتوى (CSP) في منصة Sigma-S:

✅ **جميع الأصول محملة محلياً**
- أيقونات Material Design Icons مُجمعة عبر `@mdi/font`
- Vuetify CSS مُجمع محلياً
- لا توجد روابط CDN خارجية (ما عدا Google Fonts المسموح)

✅ **التحقق من البناء**
```bash
dist/fonts/materialdesignicons-webfont.* (318K - 1M)  ✓
dist/css/chunk-vendors.css (484K)                     ✓
```

## 📦 البيانات التجريبية

التطبيق يتضمن بيانات تجريبية (Mock Data) لـ:
- 6 كتب متنوعة في مجالات مختلفة مع صور بنمط أزرق
- نظام استئجار كامل مع حساب التكاليف
- نظام شراء كامل مع أسعار محددة (40-65 ر.س)
- مراجعات وتقييمات للكتب
- سجل المشتريات والإيجارات

في الإنتاج، يمكن استبدال هذه البيانات بـ API حقيقي عبر تعديل `BooksService.ts`.

## 🛠️ التطوير

### أوامر مفيدة

```bash
# تطوير الواجهة الأمامية مع التحديث التلقائي
npm run serve

# بناء للإنتاج
npm run build

# بناء مع المراقبة
npm run watch

# فحص الأكواد
npm run lint

# تشغيل الخادم في وضع التطوير
dotnet run
```

### إضافة ميزات جديدة

1. **إضافة مكون جديد**:
   ```bash
   mkdir ClientApp/components/NewComponent
   # أنشئ NewComponent.ts و NewComponent.html
   ```

2. **إضافة خدمة جديدة**:
   ```typescript
   // في ClientApp/Services/
   import { Service } from 'vue-di-container';
   
   @Service()
   export default class NewService {
     // منطق الخدمة
   }
   
   // سجل في main.ts:
   diProvide: [
     // ...
     NewService,
   ]
   ```

3. **إضافة مسار جديد**:
   ```typescript
   // في ClientApp/router.ts
   import NewComponent from './components/NewComponent/NewComponent';
   
   routes: [
     // ...
     { path: '/new', name: 'new', component: NewComponent },
   ]
   ```

## ✅ قائمة التحقق

- [x] جميع ملفات القالب تم إنشاؤها (44+ ملف)
- [x] البنية التحتية للمشروع كاملة
- [x] ميزات استئجار الكتب مطبقة
- [x] ميزات شراء الكتب مطبقة ⭐
- [x] نظام المراجعات مطبق
- [x] التوافق مع CSP محقق
- [x] أيقونات MDI مُجمعة محلياً
- [x] Vuetify RTL مُفعل
- [x] نمط Blue Theme مُطبق ⭐
- [x] التصميم المتجاوب مطبق
- [x] البناء ناجح بدون أخطاء (70.74 KiB JS, 3.07 KiB CSS)

## 📝 ملاحظات مهمة

1. **إعدادات TypeScript**: يجب أن يكون `strict: false` و `useDefineForClassFields: false` لتوافق Vue 2
2. **إعدادات Vuetify**: يجب تضمين `iconfont: 'mdi'` لعمل الأيقونات بشكل صحيح
3. **شبكة Vuetify**: تأكد أن مجموع الأعمدة في كل صف = 12 لكل نقطة توقف (xs, sm, md)
4. **تسجيل الخدمات**: كل خدمة جديدة يجب تسجيلها في `main.ts` في مصفوفة `diProvide`

## 📄 الترخيص

هذا المشروع جزء من منصة Najiz/Sigma-S.

## 🤝 المساهمة

تم إنشاء هذا التطبيق باستخدام قالب Najiz.MicroTemplate القياسي.

---

تم الإنشاء بواسطة Cloud AI Agent | يناير 2026
