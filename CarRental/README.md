# نظام إدارة تأجير السيارات

تطبيق ويب شامل لإدارة أسطول السيارات وعقود الإيجار.

## التقنيات المستخدمة

### Backend
- ASP.NET Core 3.1
- Entity Framework Core (In-Memory Database)
- RESTful API

### Frontend
- Vue.js 2.6
- TypeScript 4.5
- Vuetify 1.5
- Vue Router
- Axios

## المميزات

### إدارة السيارات
- ✅ عرض قائمة السيارات
- ✅ إضافة سيارة جديدة
- ✅ تعديل بيانات السيارة
- ✅ حذف السيارة
- ✅ البحث والفلترة
- ✅ عرض حالة التوفر

### إدارة عقود الإيجار
- ✅ عرض قائمة العقود
- ✅ إنشاء عقد إيجار جديد
- ✅ عرض تفاصيل العقد
- ✅ إكمال العقد
- ✅ إلغاء العقد
- ✅ حذف العقد
- ✅ حساب التكلفة التلقائي

### لوحة التحكم
- ✅ إحصائيات سريعة
- ✅ عدد السيارات الإجمالي
- ✅ عدد السيارات المتاحة
- ✅ عقود الإيجار النشطة
- ✅ إجمالي الإيرادات

## البيانات الأولية

يتم تحميل البيانات التالية تلقائياً عند بدء التطبيق:
- 5 سيارات (تويوتا كامري، هوندا أكورد، نيسان ألتيما، هيونداي سوناتا، كيا أوبتيما)
- عقد إيجار تجريبي واحد

## البناء والتشغيل

### المتطلبات
- .NET Core 3.1 SDK
- Node.js (v12 أو أحدث)
- npm

### تثبيت المكتبات

```bash
# تثبيت مكتبات Frontend
npm install

# استعادة مكتبات Backend
dotnet restore
```

### بناء المشروع

```bash
# بناء Frontend
npm run build

# بناء Backend
dotnet build
```

### تشغيل التطبيق

```bash
dotnet run
```

التطبيق سيعمل على: `http://localhost:5200`

## واجهة البرمجة (API Endpoints)

### Cars API
- `GET /api/Cars` - جلب جميع السيارات
- `GET /api/Cars/{id}` - جلب سيارة محددة
- `GET /api/Cars/available` - جلب السيارات المتاحة
- `POST /api/Cars` - إضافة سيارة جديدة
- `PUT /api/Cars/{id}` - تحديث بيانات السيارة
- `DELETE /api/Cars/{id}` - حذف السيارة

### Rentals API
- `GET /api/Rentals` - جلب جميع عقود الإيجار
- `GET /api/Rentals/{id}` - جلب عقد إيجار محدد
- `GET /api/Rentals/active` - جلب العقود النشطة
- `POST /api/Rentals` - إنشاء عقد إيجار جديد
- `PUT /api/Rentals/{id}` - تحديث عقد الإيجار
- `POST /api/Rentals/{id}/complete` - إكمال عقد الإيجار
- `POST /api/Rentals/{id}/cancel` - إلغاء عقد الإيجار
- `DELETE /api/Rentals/{id}` - حذف عقد الإيجار

## الهيكل البرمجي

```
CarRental/
├── ClientApp/              # Frontend (Vue.js)
│   ├── assets/            # CSS وملفات الأنماط
│   ├── components/        # مكونات Vue
│   │   ├── App/          # المكون الرئيسي
│   │   ├── Index/        # لوحة التحكم
│   │   ├── Cars/         # إدارة السيارات
│   │   └── Rentals/      # إدارة عقود الإيجار
│   ├── Services/         # خدمات API
│   ├── plugins/          # إضافات Vue
│   └── shared/           # مكونات مشتركة
├── Controller/           # API Controllers
├── Data/                 # DbContext
├── Models/               # نماذج البيانات
├── Pages/                # Razor Pages
└── Config/               # ملفات الإعدادات

```

## الواجهة

التطبيق يدعم اللغة العربية بالكامل مع دعم RTL (من اليمين لليسار).

### الألوان
- Primary: #1976D2 (أزرق)
- Success: #4CAF50 (أخضر)
- Error: #FF5252 (أحمر)
- Info: #2196F3 (أزرق فاتح)

### المكونات
- نظام الشبكة المستجيب (Responsive Grid)
- بطاقات (Cards) لعرض المحتوى
- جداول بيانات (Data Tables) مع البحث والترتيب
- نوافذ منبثقة (Dialogs) للنماذج
- مؤشرات الحالة (Status Indicators)
- رسائل التنبيه (Toasts)

## الأمان

- التحقق من صحة البيانات على مستوى Frontend و Backend
- منع حذف السيارات المرتبطة بعقود نشطة
- التحقق من توفر السيارة قبل إنشاء عقد الإيجار

## المطور

تم إنشاء هذا التطبيق باستخدام Najiz.MicroTemplate وفقاً لمعايير Sigma-S Dashboard.
