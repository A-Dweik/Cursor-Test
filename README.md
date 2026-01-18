# متجر الحلويات - Najiz Sweets Shop

A modern sweets selling microapp built with the Najiz.MicroTemplate architecture.

## Technology Stack

- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Build**: MSBuild + Vue CLI 3.10 + npm/Webpack

## Features

- 🍰 **Product Catalog**: Browse Eastern, Western sweets, and baked goods
- 🔍 **Search & Filter**: Search products by name and filter by category
- 📱 **Responsive Design**: Mobile-first design with RTL support
- 🎨 **Najiz Design System**: Consistent branding with Najiz green (#1B8354)
- 🔒 **CSP Compliant**: All assets bundled locally, no CDN violations
- ♿ **Accessibility**: Full RTL support for Arabic users

## Project Structure

```
SweetsShop/
├── ClientApp/                  # Vue.js frontend
│   ├── components/
│   │   ├── App/               # Root component
│   │   ├── Index/             # Home page
│   │   ├── Products/          # Products listing (Najiz pattern)
│   │   └── ProductDetails/    # Product detail page
│   ├── Services/              # API services
│   ├── plugins/               # Vue plugins (Vuetify, i18n)
│   └── assets/styles/         # Global CSS
├── Config/                    # NLog configuration
├── Pages/                     # Razor pages
├── Properties/                # Launch settings
├── public/                    # Static assets
└── dist/                      # Build output
```

## Build Instructions

### Prerequisites
- Node.js 12+
- .NET Core SDK 3.1
- npm

### Install Dependencies
```bash
npm install
```

### Build Frontend
```bash
npm run build
```

### Run Application
```bash
dotnet run
```

Access at: `http://localhost:5003/applications/sweetsshop/`

## Design System

### Colors
- **Primary**: #1B8354 (Najiz Green)
- **Success**: #1B8354
- **Error**: #dc2626
- **Warning**: #ea580c
- **Info**: #2563eb

### Typography
- **Font Family**: Almarai, Cairo, Segoe UI Arabic, Roboto
- **Direction**: RTL (Right-to-Left)
- **Language**: Arabic (primary)

### Components
- Uses Najiz design patterns for product listings
- Vuetify components for forms and inputs
- Custom CSS for app-specific styles

## Critical Configurations

### CSP Compliance ✅
- Material Design Icons bundled locally via @mdi/font
- All assets loaded from npm packages
- No external CDN links (except Google Fonts - allowed)

### Vuetify Configuration ✅
- Icon font: `iconfont: 'mdi'` configured
- RTL: `rtl: true` enabled
- Theme: Najiz green colors

### TypeScript ✅
- `strict: false` for Vue 2 compatibility
- `useDefineForClassFields: false` for decorators
- `skipLibCheck: true` for faster builds

## Product Categories

1. **حلويات شرقية** (Eastern Sweets)
   - Baklava, Kunafa, Maamoul

2. **حلويات غربية** (Western Sweets)
   - Chocolate Cake, Donuts, Brownies

3. **بسكويت ومخبوزات** (Cookies & Baked Goods)
   - Chocolate Cookies, Butter Cookies

## Deployment

The app is configured for deployment at:
- **Public Path**: `/applications/sweetsshop`
- **Port**: 5003

## License

Najiz Platform - Ministry of Justice, Saudi Arabia
