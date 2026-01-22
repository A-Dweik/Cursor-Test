# Contract Verification Application - تثبيت عقود بيع وإيجار العقارات

تطبيق لتثبيت والتحقق من عقود بيع وإيجار العقارات في منصة نجيز.

## التقنيات المستخدمة

- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Build**: MSBuild + Vue CLI 3.10 + npm/Webpack

## الميزات

- عرض قائمة العقود (بيع وإيجار)
- البحث في العقود برقم العقد أو الموقع
- تصفية العقود حسب النوع (بيع/إيجار)
- تثبيت ورفض العقود
- عرض تفاصيل كل عقد
- واجهة عربية كاملة مع دعم RTL

## التثبيت والتشغيل

### المتطلبات

- Node.js 12+
- .NET Core SDK 3.1
- npm

### خطوات التشغيل

1. تثبيت الحزم:
```bash
npm install
```

2. بناء المشروع الأمامي:
```bash
npm run build
```

3. تشغيل التطبيق:
```bash
dotnet run
```

4. افتح المتصفح على:
```
http://localhost:5000/applications/contractverification/
```

## بناء للإنتاج

```bash
npm run build
dotnet publish -c Release
```

## الهيكل

```
/ClientApp          # Frontend Vue.js application
  /components       # Vue components
  /Services         # Services (API, Loader, etc.)
  /plugins          # Vue plugins
  /assets           # CSS and static assets
/Config             # Configuration files
/Pages              # Razor pages
/Properties         # ASP.NET properties
/public             # Public static files
```

## الدعم

للمزيد من المعلومات، راجع وثائق منصة نجيز.
