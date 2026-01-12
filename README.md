# تطبيق تأجير الأراضي - Land Rental Application

## نظرة عامة | Overview

تطبيق ويب متكامل لإدارة وتأجير الأراضي، تم بناؤه باستخدام ASP.NET Core 3.1 و Vue.js 2.6 مع Vuetify 1.5.

A complete web application for managing and renting lands, built with ASP.NET Core 3.1 and Vue.js 2.6 with Vuetify 1.5.

## المميزات | Features

- ✅ عرض قائمة الأراضي المتاحة | Display list of available lands
- ✅ إضافة أراضي جديدة | Add new lands
- ✅ تعديل معلومات الأراضي | Edit land information
- ✅ عرض تفاصيل الأرض | View land details
- ✅ حذف الأراضي | Delete lands
- ✅ البحث والتصفية | Search and filter
- ✅ واجهة عربية بالكامل (RTL) | Full Arabic interface (RTL)
- ✅ تصميم متجاوب | Responsive design
- ✅ امتثال لسياسة أمان المحتوى (CSP) | CSP compliant

## التقنيات المستخدمة | Tech Stack

### Backend
- ASP.NET Core 3.1
- C# with Razor Pages
- Najiz Framework (Sigma-S Platform)

### Frontend
- Vue.js 2.6.10
- TypeScript 4.5.5
- Vuetify 1.5.14
- Vue Router 3.1.0
- Axios 0.19.0
- Material Design Icons (@mdi/font 5.9.55)

### Build Tools
- Vue CLI 3.10
- Webpack
- Babel
- TypeScript Compiler

## البنية المجلدات | Folder Structure

```
LandRental/
├── ClientApp/                      # Vue.js Frontend
│   ├── assets/
│   │   └── styles/
│   │       └── main.css           # Global styles
│   ├── components/
│   │   ├── App/                   # Root component
│   │   ├── Index/                 # Home page
│   │   └── Lands/                 # Land management components
│   │       ├── LandList.ts/html   # List of lands
│   │       ├── LandForm.ts/html   # Add/Edit form
│   │       └── LandDetails.ts/html # Details view
│   ├── Services/
│   │   ├── AxiosService.ts        # HTTP client
│   │   ├── LoaderService.ts       # Loading overlay
│   │   ├── TelemetryService.ts    # Application Insights
│   │   ├── errorHandler.ts        # Error handling
│   │   ├── toast.ts               # Toast notifications
│   │   └── LandService/
│   │       ├── LandModel.ts       # Land data model
│   │       └── LandService.ts     # Land CRUD operations
│   ├── shared/
│   │   └── userService/           # User service
│   ├── plugins/
│   │   ├── vuetify.js            # Vuetify configuration
│   │   ├── i18n.ts               # Internationalization
│   │   └── application-initialization.ts
│   ├── main.ts                    # Vue entry point
│   └── router.ts                  # Vue Router configuration
├── Config/
│   └── NLog.config               # Logging configuration
├── Pages/                         # Razor Pages
│   ├── Error.cshtml
│   └── _ViewImports.cshtml
├── Properties/
│   └── launchSettings.json       # Launch configuration
├── public/                        # Static assets
│   ├── config.json
│   ├── manifest.json
│   └── robots.txt
├── Program.cs                     # ASP.NET Core entry point
├── Startup.cs                     # ASP.NET Core startup
├── LandRental.csproj             # C# project file
├── package.json                   # npm dependencies
├── tsconfig.json                  # TypeScript configuration
├── vue.config.js                  # Vue CLI configuration
└── README.md                      # This file
```

## التثبيت والتشغيل | Installation & Running

### المتطلبات | Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- .NET Core 3.1 SDK
- Git

### خطوات التثبيت | Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LandRental
   ```

2. **Install npm dependencies**
   ```bash
   npm install
   ```

3. **Build frontend**
   ```bash
   npm run build
   ```

4. **Restore .NET packages**
   ```bash
   dotnet restore
   ```

5. **Build backend**
   ```bash
   dotnet build
   ```

6. **Run the application**
   ```bash
   dotnet run
   ```

7. **Access the application**
   - Open browser: `http://localhost:5001/applications/landrental/`

### Development Mode

For frontend development with hot reload:
```bash
npm run serve
```

Watch mode for continuous build:
```bash
npm run watch
```

## البيانات التجريبية | Mock Data

The application includes 3 sample lands for demonstration:
- أرض زراعية في الخرج (Agricultural land in Al-Kharj)
- أرض تجارية في الرياض (Commercial land in Riyadh)
- أرض سكنية في جدة (Residential land in Jeddah)

Data is stored in-memory in `LandService.ts`. In production, replace with actual API calls.

## واجهات المستخدم | User Interfaces

### 1. الصفحة الرئيسية | Home Page
- Welcome message
- Quick statistics
- Feature highlights
- Navigation buttons

### 2. قائمة الأراضي | Land List
- Display all lands in cards
- Search functionality
- Advanced filters (status, city, area, price)
- Action buttons (view, edit, delete)

### 3. إضافة/تعديل أرض | Add/Edit Land
- Comprehensive form with validation
- Owner information
- Property details
- Feature tags
- RTL-friendly layout

### 4. تفاصيل الأرض | Land Details
- Full land information
- Owner contact details
- Features list
- Metadata (creation date, last update)
- Action buttons

## التحقق من امتثال CSP | CSP Compliance Verification

✅ **Verified CSP Compliance:**
- No blocked CDN links (cdn.jsdelivr.net, unpkg.com, cdnjs.cloudflare.com)
- Google Fonts only (allowed by CSP)
- Icons bundled locally via @mdi/font
- Vuetify CSS bundled locally
- All assets served from application

**Build Output Verification:**
```
dist/
├── css/
│   ├── chunk-vendors.13150904.css (484 KB) ✅ Includes Vuetify CSS
│   └── index.9d486569.css (2.7 KB)
├── fonts/                                   ✅ Icons bundled locally
│   ├── materialdesignicons-webfont.woff2 (318 KB)
│   ├── materialdesignicons-webfont.woff (455 KB)
│   ├── materialdesignicons-webfont.ttf (1 MB)
│   └── materialdesignicons-webfont.eot (1 MB)
└── js/
    ├── chunk-vendors.2ba576b7.js (899 KB)
    └── index.be483ab1.js (82 KB)
```

## التصميم والتطوير | Design & Development

### Design Standards Followed
✅ RTL layout enabled (Arabic support)
✅ Vuetify 1.5 with Material Design Icons
✅ Proper grid layout (12-column system)
✅ Card-based UI design
✅ Responsive breakpoints (xs, sm, md, lg)
✅ Sigma-S Dashboard BEM pattern for status indicators
✅ Consistent spacing (8px units)
✅ Accessible forms with validation
✅ Loading and empty states
✅ Error handling with toast notifications

### Critical Configuration
- `vuetify.js`: RTL enabled, iconfont set to 'mdi'
- `tsconfig.json`: strict: false, useDefineForClassFields: false
- `vue.config.js`: publicPath set to '/applications/landrental'
- `main.ts`: @mdi/font CSS imported, main.css imported

## خدمات الإدارة | Management Services

### LandService
Provides CRUD operations for lands:
- `getAllLands()`: Get all lands
- `getLandById(id)`: Get land by ID
- `addLand(land)`: Add new land
- `updateLand(land)`: Update existing land
- `deleteLand(id)`: Delete land
- `searchLands(query)`: Search lands
- `filterLands(filters)`: Filter lands by criteria

### Service Registration Pattern
All services follow the 3-step registration pattern:
1. Add `@Service()` decorator
2. Register in `main.ts` diProvide array
3. Inject in components with `@Inject(ServiceName)`

## الأمان | Security

- ✅ CSP compliant (no external CDN except Google Fonts)
- ✅ Input validation on all forms
- ✅ Error handling with user-friendly messages
- ✅ Secure HTTP client configuration
- ✅ HTTPS ready

## الأداء | Performance

**Build Performance:**
- Initial bundle size: ~1.4 MB (with Vuetify and icons)
- Gzipped: ~240 KB for vendors
- Code splitting enabled
- Service worker for offline support
- PWA ready

**Optimization Recommendations:**
- Consider lazy loading routes
- Implement virtual scrolling for large lists
- Add image optimization
- Enable caching strategies

## الاختبار | Testing

To test the application:
1. Navigate to home page
2. Click "عرض جميع الأراضي" to see land list
3. Try search and filter functionality
4. Click "إضافة أرض جديدة" to add a new land
5. View land details by clicking the eye icon
6. Edit or delete lands as needed

## الاستكشاف والإصلاح | Troubleshooting

### Issue: Icons not showing
**Solution:** Verify:
- `@mdi/font` is installed
- `@mdi/font/css/materialdesignicons.css` is imported in main.ts
- `iconfont: 'mdi'` is set in vuetify.js
- dist/fonts/ folder exists after build

### Issue: Styles not applied
**Solution:** Verify:
- vuetify.js imports 'vuetify/dist/vuetify.min.css'
- chunk-vendors.css is > 200KB
- main.css is imported in main.ts

### Issue: Build fails
**Solution:** Verify:
- Node version is 12+
- npm install completed successfully
- tsconfig.json has correct settings
- vue.config.js has correct entry point

## الترخيص | License

This project is part of the Sigma-S platform (Najiz Framework).

## المساهمة | Contributing

For bug reports or feature requests, please contact the development team.

## الدعم | Support

For support, please contact:
- Technical Team: [Support Contact]
- Documentation: [Documentation URL]

---

**Built with ❤️ using Vue.js 2.6 + Vuetify 1.5 + ASP.NET Core 3.1**

**تم التطوير بواسطة | Developed by**: AI Agent (Cloud Agent)  
**التاريخ | Date**: January 12, 2026
