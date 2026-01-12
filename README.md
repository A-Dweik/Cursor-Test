# إدارة مبيعات الحليب واللحوم

نظام شامل لإدارة أعمال بيع حليب ولحوم الأبقار

## الميزات

- **إدارة المخزون**: تتبع كميات الحليب واللحوم المتوفرة
- **تسجيل المبيعات**: إضافة وإدارة عمليات البيع اليومية
- **إدارة العملاء**: قاعدة بيانات العملاء وسجل التعاملات
- **التقارير والإحصائيات**: تحليل المبيعات والأداء المالي

## التقنيات المستخدمة

- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Build**: MSBuild + Vue CLI 3.10 + npm/Webpack

## التثبيت والتشغيل

```bash
# تثبيت المكتبات
npm install

# بناء الواجهة الأمامية
npm run build

# استعادة المكتبات الخلفية
dotnet restore

# بناء التطبيق
dotnet build

# تشغيل التطبيق
dotnet run
```

الوصول إلى التطبيق: `http://localhost:5010/applications/cowbusiness/`

## البنية

```
/
├── ClientApp/              # Frontend Vue.js application
│   ├── components/         # Vue components
│   │   ├── Products/       # Product management
│   │   ├── Sales/          # Sales management
│   │   ├── Customers/      # Customer management
│   │   └── Analytics/      # Reports and analytics
│   ├── Services/           # Business logic services
│   ├── Models/             # TypeScript interfaces
│   └── assets/             # Styles and static assets
├── Config/                 # Configuration files
├── Controller/             # API controllers
├── Models/                 # Data models
└── Pages/                  # Razor pages
```

## الترخيص

حقوق النشر © 2026 Najiz
