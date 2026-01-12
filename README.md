# تطبيق الأراضي (Land App)

تطبيق إدارة وبيع الأراضي - مبني على منصة Najiz.MicroTemplate

## 📋 نظرة عامة

تطبيق شامل لإدارة وبيع الأراضي يوفر واجهة سهلة الاستخدام لعرض الأراضي، إضافة أراضي جديدة، التحقق من حالة الأراضي، وإدارة معلومات الأراضي بشكل كامل.

## 🏗️ التقنيات المستخدمة

### Backend
- **ASP.NET Core 3.1** - الإطار الخلفي
- **Najiz Framework** - إطار عمل Najiz للتكامل مع البوابة

### Frontend
- **Vue.js 2.6** - إطار JavaScript
- **TypeScript 4.5** - لغة البرمجة
- **Vuetify 1.5** - مكتبة المكونات
- **Vue Router** - التنقل بين الصفحات
- **Axios** - طلبات HTTP

## ✨ المميزات

### 1. إدارة الأراضي
- ✅ عرض قائمة جميع الأراضي
- ✅ إضافة أراضي جديدة
- ✅ تعديل معلومات الأراضي
- ✅ حذف الأراضي
- ✅ عرض تفاصيل كل أرض

### 2. البحث والفلترة
- ✅ البحث بالعنوان، الموقع، أو المدينة
- ✅ فلترة حسب الحالة (متاحة، محجوزة، مباعة، قيد الانتظار)
- ✅ فلترة حسب النوع (سكنية، تجارية، زراعية، صناعية)

### 3. التحقق والتوثيق
- ✅ نظام توثيق الأراضي
- ✅ تغيير حالة التوثيق (موثق، قيد المراجعة، مرفوض)
- ✅ تتبع حالة الأراضي

### 4. معلومات تفصيلية
- ✅ معلومات المالك
- ✅ الموقع الجغرافي (خط العرض والطول)
- ✅ المساحة والسعر
- ✅ المرافق المتوفرة (كهرباء، ماء، طرق)
- ✅ المستندات (رقم الصك، رقم المخطط)

### 5. واجهة مستخدم احترافية
- ✅ تصميم متجاوب (Mobile-First)
- ✅ دعم اللغة العربية (RTL)
- ✅ تصميم Material Design
- ✅ رموز Material Design Icons (مدمجة محلياً)
- ✅ حالات التحميل والخطأ
- ✅ رسائل التنبيه والنجاح

## 📁 هيكل المشروع

```
LandApp/
├── ClientApp/                      # التطبيق الأمامي (Vue.js)
│   ├── assets/
│   │   └── styles/
│   │       └── main.css           # الأنماط العامة
│   ├── components/
│   │   ├── App/                   # المكون الرئيسي
│   │   ├── Index/                 # الصفحة الرئيسية
│   │   ├── LandList/              # قائمة الأراضي
│   │   ├── LandForm/              # نموذج إضافة/تعديل أرض
│   │   └── LandDetails/           # تفاصيل الأرض
│   ├── Services/
│   │   ├── LandService/           # خدمة إدارة الأراضي
│   │   ├── AxiosService.ts        # خدمة HTTP
│   │   ├── LoaderService.ts       # خدمة التحميل
│   │   └── TelemetryService.ts    # خدمة التتبع
│   ├── plugins/
│   │   ├── vuetify.js            # إعدادات Vuetify
│   │   └── i18n.ts               # الترجمة
│   ├── main.ts                    # نقطة البدء
│   └── router.ts                  # التوجيه
├── Config/
│   └── NLog.config                # إعدادات السجلات
├── Pages/                         # صفحات Razor
├── Properties/
│   └── launchSettings.json        # إعدادات التشغيل
├── public/                        # الملفات العامة
│   ├── config.json
│   └── manifest.json
├── Program.cs                     # نقطة بدء ASP.NET
├── Startup.cs                     # إعدادات ASP.NET
├── LandApp.csproj                 # ملف المشروع
├── package.json                   # حزم npm
├── vue.config.js                  # إعدادات Vue CLI
└── tsconfig.json                  # إعدادات TypeScript
```

## 🚀 التثبيت والتشغيل

### المتطلبات الأساسية
- .NET Core SDK 3.1+
- Node.js 12+
- npm أو yarn

### خطوات التثبيت

1. **تثبيت حزم npm:**
```bash
npm install
```

2. **بناء التطبيق الأمامي:**
```bash
npm run build
```

3. **تشغيل التطبيق:**
```bash
dotnet run
```

4. **فتح المتصفح:**
```
http://localhost:5020/applications/landapp/
```

### التطوير

للتطوير مع إعادة التحميل التلقائي:

```bash
# Terminal 1 - Vue.js
npm run serve

# Terminal 2 - ASP.NET
dotnet run
```

## 🎨 المعايير التصميمية

### الألوان
- **Primary**: #1976D2 (أزرق)
- **Success**: #4CAF50 (أخضر)
- **Error**: #FF5252 (أحمر)
- **Warning**: #ff9800 (برتقالي)
- **Info**: #2196F3 (أزرق فاتح)

### الطباعة
- **العربية**: Tajawal
- **الإنجليزية**: Roboto

### التخطيط
- **RTL Support**: دعم كامل للعربية
- **Responsive Grid**: نظام 12 عمود
- **Breakpoints**: xs, sm, md, lg, xl

## 📊 نموذج البيانات

### LandModel
```typescript
{
  id: string;
  title: string;
  description: string;
  area: number;                    // المساحة بالمتر المربع
  price: number;                   // السعر بالريال
  location: string;
  city: string;
  district: string;
  latitude?: number;
  longitude?: number;
  status: 'available' | 'pending' | 'sold' | 'reserved';
  ownerName: string;
  ownerPhone: string;
  deedNumber?: string;             // رقم الصك
  planNumber?: string;             // رقم المخطط
  landType: 'residential' | 'commercial' | 'agricultural' | 'industrial';
  hasElectricity: boolean;
  hasWater: boolean;
  hasRoads: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdDate: string;
  updatedDate?: string;
  notes?: string;
}
```

## 🔒 الأمان

- ✅ Content Security Policy (CSP) متوافق
- ✅ جميع الموارد محملة محلياً (لا CDN خارجي)
- ✅ التحقق من المدخلات
- ✅ معالجة الأخطاء الشاملة

## 📱 التوافق

- ✅ متصفحات سطح المكتب (Chrome, Firefox, Safari, Edge)
- ✅ الأجهزة المحمولة (iOS, Android)
- ✅ الأجهزة اللوحية

## 🧪 الاختبار

للاختبار اليدوي:

1. افتح الصفحة الرئيسية
2. انقر على "عرض الأراضي"
3. جرب البحث والفلترة
4. أضف أرض جديدة
5. اعرض تفاصيل أرض
6. عدّل وحذف أرض

## 📝 الملاحظات

- التطبيق يستخدم بيانات وهمية (Mock Data) للعرض التوضيحي
- لاستخدام حقيقي، يجب إضافة API Controllers في مجلد Controller
- يمكن إضافة قاعدة بيانات في مجلد Models

## 🤝 المساهمة

هذا التطبيق تم إنشاؤه باستخدام Najiz.MicroTemplate ويمكن تطويره حسب احتياجات المشروع.

## 📄 الترخيص

هذا المشروع ملك لوزارة العدل - المملكة العربية السعودية

## 📞 الدعم

لأي استفسارات أو مشاكل، يرجى التواصل مع فريق التطوير.

---

**تم الإنشاء بواسطة**: Cloud AI Agent  
**التاريخ**: 2026-01-12  
**الإصدار**: 1.0.0
