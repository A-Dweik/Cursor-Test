# نظام تأجير السيارات - Car Rental Application

## 📋 نظرة عامة / Overview

تطبيق متكامل لإدارة تأجير السيارات مبني باستخدام ASP.NET Core 3.1 و Vue.js 2.6 مع Vuetify 1.5.

A complete car rental management application built with ASP.NET Core 3.1 and Vue.js 2.6 with Vuetify 1.5.

## 🏗️ التقنيات المستخدمة / Technology Stack

### Backend
- **ASP.NET Core 3.1**
- **Entity Framework Core 3.1** (In-Memory Database)
- **RESTful API**

### Frontend
- **Vue.js 2.6**
- **TypeScript 4.5**
- **Vuetify 1.5** (Material Design)
- **Vue Router**
- **Vue DI Container** (Dependency Injection)

### Build Tools
- **Vue CLI 3.10**
- **MSBuild**
- **npm/Webpack**

## ✨ الميزات / Features

### 1. إدارة السيارات / Cars Management
- ✅ عرض جميع السيارات
- ✅ إضافة سيارة جديدة
- ✅ تعديل بيانات السيارة
- ✅ حذف سيارة
- ✅ عرض حالة التوفر
- ✅ بيانات كاملة (الشركة المصنعة، الموديل، السنة، اللون، رقم اللوحة، السعر اليومي)

### 2. إدارة الحجوزات / Rentals Management
- ✅ عرض جميع الحجوزات
- ✅ تصفية الحجوزات (نشطة / مكتملة)
- ✅ إضافة حجز جديد
- ✅ حساب المبلغ الإجمالي تلقائياً
- ✅ إتمام الحجز
- ✅ حذف حجز
- ✅ بيانات العميل الكاملة

### 3. لوحة التحكم / Dashboard
- ✅ إحصائيات سريعة
- ✅ عدد السيارات الإجمالي
- ✅ عدد الحجوزات النشطة
- ✅ روابط سريعة للصفحات

## 📁 هيكل المشروع / Project Structure

```
CarRentalApp/
├── ClientApp/                    # Frontend (Vue.js)
│   ├── assets/
│   │   └── styles/              # Global CSS styles
│   ├── components/
│   │   ├── App/                 # Root component
│   │   ├── Index/               # Dashboard
│   │   ├── Cars/                # Cars management
│   │   └── Rentals/             # Rentals management
│   ├── plugins/
│   │   ├── vuetify.js           # Vuetify configuration (RTL + MDI icons)
│   │   └── i18n.ts              # Internationalization
│   ├── Services/
│   │   ├── AxiosService.ts
│   │   ├── LoaderService.ts
│   │   └── CarRental/
│   │       ├── CarService.ts
│   │       └── RentalService.ts
│   ├── main.ts                  # App entry point
│   └── router.ts                # Vue Router configuration
│
├── Controller/                   # Backend API Controllers
│   ├── CarsController.cs
│   └── RentalsController.cs
│
├── Models/                       # Data Models
│   ├── Car.cs
│   ├── Rental.cs
│   └── CarRentalDbContext.cs    # EF Core DbContext
│
├── Config/
│   └── NLog.config              # Logging configuration
│
├── Pages/                        # Razor Pages
├── Properties/
│   └── launchSettings.json
│
├── Program.cs                    # Application entry point
├── Startup.cs                    # Services configuration
├── CarRentalApp.csproj           # Project file
├── package.json                  # npm dependencies
├── tsconfig.json                 # TypeScript configuration
└── vue.config.js                 # Vue CLI configuration
```

## 🚀 كيفية التشغيل / How to Run

### المتطلبات / Prerequisites

- **.NET Core SDK 3.1** or higher
- **Node.js 12+** and **npm**
- Visual Studio 2019+ or VS Code (optional)

### خطوات التشغيل / Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd CarRentalApp
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Build frontend**
```bash
npm run build
```

4. **Restore backend packages**
```bash
dotnet restore
```

5. **Run the application**
```bash
dotnet run
```

6. **Access the application**
```
http://localhost:5001/applications/carrental/
```

## 🎨 UI/UX Design Standards

### RTL Support
- ✅ Full RTL (Right-to-Left) support for Arabic
- ✅ Vuetify configured with `rtl: true`
- ✅ Material Design Icons via `@mdi/font` (bundled locally)

### Color Scheme
- **Primary**: #1976D2 (Blue)
- **Secondary**: #424242 (Grey)
- **Success**: #4CAF50 (Green)
- **Error**: #FF5252 (Red)
- **Info**: #2196F3 (Light Blue)

### Status Indicators
Using Sigma-S Dashboard BEM pattern:
- **متاحة (Available)**: Green badge
- **غير متاحة (Unavailable)**: Red badge
- **نشط (Active)**: Green badge
- **مكتمل (Completed)**: Blue badge

### Responsive Design
- Mobile-first approach
- Grid system: 12 columns
- Breakpoints:
  - xs: < 600px (mobile)
  - sm: 600px - 960px (tablet)
  - md: 960px - 1264px (desktop)
  - lg: 1264px+ (wide desktop)

## 📊 API Endpoints

### Cars API
- `GET /api/Cars` - Get all cars
- `GET /api/Cars/{id}` - Get car by ID
- `GET /api/Cars/Available` - Get available cars only
- `POST /api/Cars` - Add new car
- `PUT /api/Cars/{id}` - Update car
- `DELETE /api/Cars/{id}` - Delete car

### Rentals API
- `GET /api/Rentals` - Get all rentals
- `GET /api/Rentals/{id}` - Get rental by ID
- `GET /api/Rentals/Active` - Get active rentals only
- `POST /api/Rentals` - Create new rental
- `POST /api/Rentals/{id}/Complete` - Complete a rental
- `DELETE /api/Rentals/{id}` - Delete rental

## 💾 Database

### In-Memory Database (EF Core)
The application uses **Entity Framework Core In-Memory Database** for development and testing.

**Pre-seeded data:**
- 5 sample cars with different makes and models
- Cars include: Toyota Camry, Honda Accord, Nissan Altima, Hyundai Sonata, Kia Optima

### Data Models

**Car**
```csharp
- Id (int)
- Make (string)
- Model (string)
- Year (int)
- Color (string)
- PlateNumber (string)
- DailyRate (decimal)
- IsAvailable (bool)
- ImageUrl (string)
- Description (string)
- CreatedAt (DateTime)
```

**Rental**
```csharp
- Id (int)
- CarId (int)
- CustomerName (string)
- CustomerPhone (string)
- CustomerEmail (string)
- CustomerIdNumber (string)
- StartDate (DateTime)
- EndDate (DateTime)
- TotalAmount (decimal)
- Status (string)
- Notes (string)
- CreatedAt (DateTime)
```

## 🔧 Configuration

### Frontend Configuration

**vue.config.js**
- Public path: `/applications/carrental`
- Entry point: `ClientApp/main.ts`
- Template: `ClientApp/public/index.html`

**vuetify.js**
```javascript
Vue.use(Vuetify, {
  rtl: true,              // Enable RTL for Arabic
  iconfont: 'mdi',        // Material Design Icons
  theme: { ... }
});
```

**tsconfig.json**
```json
{
  "strict": false,                    // Required for Vue 2
  "useDefineForClassFields": false,   // Critical for decorators
  "emitDecoratorMetadata": true,      // Required for DI
  "experimentalDecorators": true
}
```

### Backend Configuration

**Startup.cs**
```csharp
// EF Core In-Memory Database
services.AddDbContext<CarRentalDbContext>(options =>
    options.UseInMemoryDatabase("CarRentalDb"));
```

## 📝 Development Notes

### Icon Configuration
✅ Icons are bundled locally via `@mdi/font` package  
✅ Vuetify configured with `iconfont: 'mdi'`  
✅ CSP (Content Security Policy) compliant - no external CDN for icons

### Grid Layout Rules
- ✅ All grid rows must add up to exactly 12 columns per breakpoint
- ✅ Mobile-first responsive design
- ✅ Proper column calculations prevent text overlap

### Service Registration Pattern
All services must follow the 3-step pattern:
1. Add `@Service()` decorator
2. Register in `main.ts` `diProvide` array
3. Inject with `@Inject(ServiceName)`

## 🎯 Build Verification Checklist

- ✅ All template files created (44+ files)
- ✅ Technology stack: Vue.js 2.6 + ASP.NET Core 3.1
- ✅ CSP compliance: No blocked CDN links
- ✅ Icons bundled locally via @mdi/font
- ✅ Vuetify CSS: chunk-vendors.css = 483KB ✓
- ✅ Icon fonts: dist/fonts/ folder exists ✓
- ✅ Grid columns add up to 12 for all breakpoints
- ✅ RTL enabled in vuetify.js
- ✅ Services registered in main.ts
- ✅ Frontend build successful

## 🐛 Troubleshooting

### Icons not showing
- ✅ Check `iconfont: 'mdi'` in vuetify.js
- ✅ Verify `@mdi/font` is installed
- ✅ Verify `import '@mdi/font/css/materialdesignicons.css'` in main.ts

### Layout overlap on mobile
- ✅ Verify grid columns add up to 12 for xs breakpoint
- ✅ Check column sizes: xs, sm, md values

### Backend build issues
- Ensure .NET Core 3.1 SDK is installed
- Run `dotnet restore` before `dotnet build`

## 📄 License

This project is part of the Najiz Platform microapps ecosystem.

## 🤝 Contributing

For bug reports and feature requests, please contact the development team.

---

**Built with ❤️ using Najiz.MicroTemplate**
