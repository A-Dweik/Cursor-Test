# نظام إدارة تأجير المنازل

نظام شامل لإدارة عقارات التأجير مع واجهة مستخدم عربية حديثة.

## المميزات

- 📋 إدارة شاملة للعقارات (إضافة، تعديل، حذف، عرض)
- 🔍 بحث وفلترة متقدمة للعقارات
- 📊 إحصائيات وتقارير في الوقت الفعلي
- 📱 واجهة مستخدم متجاوبة (Responsive) تعمل على جميع الأجهزة
- 🎨 تصميم عصري باستخدام Vuetify و Material Design
- 🌐 دعم كامل للغة العربية مع RTL
- ⚡ أداء عالي وسرعة استجابة

## التقنيات المستخدمة

### Frontend
- Vue.js 2.6
- Vuetify 1.5
- TypeScript 4.5
- Vue Router
- Axios

### Backend
- ASP.NET Core 3.1
- Entity Framework Core (للاتصال بقاعدة البيانات)

## التثبيت والتشغيل

### المتطلبات
- Node.js 12+ و npm
- .NET Core SDK 3.1
- Git

### خطوات التثبيت

1. استنساخ المشروع:
```bash
git clone <repository-url>
cd HouseRental
```

2. تثبيت الحزم:
```bash
npm install
```

3. استعادة حزم .NET:
```bash
dotnet restore
```

4. بناء Frontend:
```bash
npm run build
```

5. بناء وتشغيل Backend:
```bash
dotnet build
dotnet run
```

6. فتح التطبيق في المتصفح:
```
http://localhost:5000/applications/houserental/
```

## التطوير

### تشغيل Frontend في وضع التطوير:
```bash
npm run serve
```

### تشغيل Backend في وضع التطوير:
```bash
dotnet watch run
```

## البناء للإنتاج

```bash
# بناء Frontend
npm run build

# نشر Backend
dotnet publish -c Release
```

## الهيكل التنظيمي

```
HouseRental/
├── ClientApp/              # كود Frontend (Vue.js)
│   ├── components/         # مكونات Vue
│   ├── Services/           # خدمات API
│   ├── Models/            # نماذج البيانات
│   ├── assets/            # الأصول الثابتة
│   └── plugins/           # إضافات Vue
├── Config/                # ملفات الإعدادات
├── Controller/            # ASP.NET Controllers
├── Models/                # نماذج البيانات (C#)
├── Pages/                 # Razor Pages
└── Properties/            # إعدادات المشروع

```

## الوظائف الرئيسية

### إدارة العقارات
- ➕ إضافة عقار جديد مع جميع التفاصيل
- ✏️ تعديل معلومات العقار
- 🗑️ حذف العقار
- 👁️ عرض تفاصيل كاملة للعقار

### البحث والفلترة
- 🔍 البحث بالعنوان أو الموقع
- 🏷️ الفلترة حسب الحالة (متاح، مؤجر، صيانة)

### الإحصائيات
- 📊 عدد العقارات الإجمالي
- ✅ عدد العقارات المتاحة
- 🔑 عدد العقارات المؤجرة
- 🔧 عدد العقارات تحت الصيانة

## المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## الدعم

للحصول على الدعم، يرجى فتح Issue في المستودع أو التواصل مع فريق التطوير.
