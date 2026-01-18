# آلة الحلويات الذكية (Sweet Machine)

A modern sweet vending machine application built with the Najiz.MicroTemplate framework.

## 🎯 Project Overview

This application provides a digital interface for a smart sweet vending machine, allowing users to browse and select sweets with real-time availability tracking.

## 🛠️ Technology Stack

- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Build**: MSBuild + Vue CLI 3.10 + npm/Webpack
- **Design System**: Najiz Design Patterns (RTL, Arabic-first)

## ✨ Features

### Implemented Features

- **Sweet Catalog**: Display of 9+ different sweets with Arabic and English names
- **Category Filtering**: Filter by categories (شوكولاتة, حلويات, معجنات, بسكويت)
- **Search Functionality**: Real-time search across sweet names and descriptions
- **Stock Management**: Real-time stock availability display with visual indicators
- **Responsive Design**: Mobile-first design with proper grid calculations
- **RTL Support**: Full right-to-left layout for Arabic content
- **Status Badges**: Visual indicators for availability (متوفر/غير متوفر)
- **Price Display**: Clear pricing in Saudi Riyals

### Sweet Categories

- **شوكولاتة (Chocolate)**: Dark chocolate, milk chocolate
- **حلويات (Desserts)**: Vanilla cake, strawberry cake, brownies
- **معجنات (Pastries)**: Caramel donut, French croissant
- **بسكويت (Cookies)**: Chocolate cookies, oatmeal cookies

## 🎨 Design Implementation

### Najiz Design Patterns Used

✅ **Service Card Pattern**: Used `dashboardServicesCards` for sweet listings
✅ **Filter Pills Pattern**: Category filters with icon and count
✅ **Title & Search Section**: Standardized page header with search input
✅ **Status Indicators**: BEM pattern for stock availability badges
✅ **Najiz Button Classes**: `dashboardServicesCards__buttonFill` and `buttonMore`

### Design Compliance

✅ **RTL Layout**: Full RTL support with `dir="rtl"`
✅ **Arabic Fonts**: Almarai and Cairo fonts from Google Fonts
✅ **Najiz Colors**: Brand green (#1B8354) as primary color
✅ **Responsive Grid**: Proper column calculations (xs + sm + md = 12)
✅ **Icon Font Configuration**: Vuetify configured with `iconfont: 'mdi'`

## 🔒 CSP Compliance

### Security Implementation

✅ **Icons Bundled Locally**: @mdi/font installed and bundled (no CDN)
✅ **Fonts from Allowed CDN**: Google Fonts (CSP-compliant)
✅ **Najiz Theme from Portal**: Centralized theme from localhost:40001
✅ **No External CDNs**: All assets bundled or from approved sources

### Build Verification

- ✅ Icon fonts in `dist/fonts/` (318KB-1000KB)
- ✅ Vuetify CSS bundled (484KB chunk-vendors.css)
- ✅ Material Design Icons included (woff2, woff, eot, ttf)
- ✅ Build completed without errors (900KB vendors, 26KB app)

## 📦 File Structure

```
workspace/
├── ClientApp/                      # Vue.js frontend
│   ├── assets/styles/main.css     # Global styles with Najiz patterns
│   ├── components/
│   │   ├── App/                   # Root app component
│   │   ├── Index/                 # Main page with sweet listings
│   │   └── Sweets/                # Sweet-specific components
│   ├── plugins/
│   │   ├── vuetify.js            # Vuetify config (RTL, iconfont: 'mdi')
│   │   └── i18n.ts               # Internationalization
│   ├── Services/
│   │   ├── AxiosService.ts       # HTTP client
│   │   ├── LoaderService.ts      # Loading states
│   │   └── TelemetryService.ts   # Analytics
│   └── shared/userService/       # User management
├── Config/
│   └── NLog.config               # Logging configuration
├── Pages/                         # Razor Pages
├── Properties/
│   └── launchSettings.json       # Launch settings (port 5200)
├── public/
│   ├── index.html                # Entry point (deleted, using ClientApp/public/)
│   ├── manifest.json             # PWA manifest
│   └── config.json               # App configuration
├── ClientApp/public/
│   └── index.html                # Actual HTML template with Najiz CDN links
├── Program.cs                     # ASP.NET Core entry point
├── Startup.cs                     # App startup configuration
├── SweetMachine.csproj           # Project file
├── package.json                   # npm dependencies
├── vue.config.js                 # Vue CLI configuration
├── tsconfig.json                 # TypeScript configuration
└── babel.config.js               # Babel configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 12+
- .NET Core 3.1 SDK
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Build frontend
npm run build

# Restore backend
dotnet restore

# Build backend
dotnet build

# Run application
dotnet run
```

### Access Application

Development: `http://localhost:5200/applications/sweetmachine/`

## 📋 Template Compliance Checklist

### Template Files (44+ files created)

✅ All configuration files (.npmrc, package.json, tsconfig.json, vue.config.js, babel.config.js, postcss.config.js, tslint.json)
✅ Backend files (Program.cs, Startup.cs, .csproj, appsettings.json, NLog.config, Razor Pages)
✅ Frontend core files (main.ts, router.ts, registerServiceWorker.ts, shims-*.ts)
✅ Plugins (vuetify.js, i18n.ts, application-initialization.ts, RecaptchaKey.js, module.ts)
✅ Services (AxiosService, LoaderService, TelemetryService, errorHandler, toast)
✅ Shared utilities (UserService, UserModel)
✅ Base components (App, Index)
✅ Public files (index.html, manifest.json, config.json, robots.txt)
✅ Global styles (main.css with Najiz patterns)

### Critical Requirements Met

✅ **Technology Stack**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5 + ASP.NET Core 3.1 (NOT Angular)
✅ **Template Philosophy**: All template files created + user requirements added on top
✅ **CSP Compliance**: Icons bundled locally, no blocked CDNs
✅ **Vuetify Configuration**: RTL enabled + `iconfont: 'mdi'` configured
✅ **Grid Layout**: All columns add up to 12 for each breakpoint
✅ **Najiz Patterns**: Service cards, filters, buttons following design system
✅ **Build Success**: 0 errors, proper asset bundling

### UI/UX Standards

✅ RTL enabled (`rtl: true` in vuetify.js)
✅ Icon font configured (`iconfont: 'mdi'`)
✅ `dir="rtl"` in App.html
✅ main.css imported in main.ts
✅ Content wrapped in Najiz card patterns
✅ Responsive grid layout (xs, sm, md)
✅ Arabic text by default
✅ Proper spacing with Najiz patterns

## 🎯 User Requirements Implementation

### Sweet Machine Features

The application fulfills the "sweet machine" requirement by implementing:

1. **Product Catalog**: 9 different sweets with detailed information
2. **Category System**: 4 categories with filtering
3. **Stock Tracking**: Real-time availability display
4. **Search**: Fast search across names and descriptions
5. **Selection**: Visual feedback for sweet selection
6. **Pricing**: Clear price display in SAR
7. **Arabic Support**: Full Arabic names and descriptions
8. **Status Indicators**: Visual stock availability

## 📝 Development Notes

### TypeScript Configuration

Critical settings for Vue 2 compatibility:
- `"strict": false` - Required for Vue 2 class components
- `"useDefineForClassFields": false` - Critical for Vue 2 decorators
- `"emitDecoratorMetadata": true` - Required for dependency injection

### Vuetify Configuration

Critical settings for proper icon display:
- `iconfont: 'mdi'` - Required for Material Design Icons
- Import compiled CSS: `'vuetify/dist/vuetify.min.css'`
- NOT Stylus: `'vuetify/src/stylus/app.styl'` (fails)

### Build Output

- Vendors: 900KB (Vue + Vuetify + dependencies)
- App: 26KB (application code)
- CSS: 487KB (Vuetify + custom styles)
- Fonts: 2.8MB (Material Design Icons)

## 🔗 References

- [Vue.js 2.6 Documentation](https://v2.vuejs.org/)
- [Vuetify 1.5 Documentation](https://v15.vuetifyjs.com/)
- [TypeScript 4.5 Documentation](https://www.typescriptlang.org/)
- [ASP.NET Core 3.1 Documentation](https://docs.microsoft.com/en-us/aspnet/core/)

## 📄 License

This project follows the Najiz platform licensing.

---

**Created with**: Najiz.MicroTemplate v1.0  
**Platform**: Sigma-S Portal  
**Branch**: awartani/najiz/4
