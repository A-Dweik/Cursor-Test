# متجر سامسونج للهواتف - Samsung Phone Store

A Vue.js 2.6 + TypeScript application for selling Samsung phones, built using the Najiz.MicroTemplate framework.

## Features

- 📱 Complete Samsung phone catalog (Galaxy S, Z, and A series)
- 🔍 Search and filter functionality
- 💰 Price range filtering
- 🏷️ Product badges (New, On Sale)
- 📊 Product specifications display
- 🎨 Najiz design system with RTL support
- 🌐 Arabic-first interface

## Technology Stack

- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Backend**: ASP.NET Core 3.1
- **Build**: Vue CLI 3.10 + MSBuild

## Getting Started

### Prerequisites

- Node.js (v12+)
- .NET Core SDK 3.1
- npm

### Installation

1. Install npm dependencies:
```bash
npm install
```

2. Build the frontend:
```bash
npm run build
```

3. Restore backend dependencies:
```bash
dotnet restore
```

4. Run the application:
```bash
dotnet run
```

5. Access the app at: `http://localhost:5020/applications/samsungphones/`

## Development

- **Serve frontend**: `npm run serve`
- **Build frontend**: `npm run build`
- **Watch mode**: `npm run watch`
- **Lint**: `npm run lint`

## Project Structure

```
SamsungPhones/
├── ClientApp/           # Vue.js frontend
│   ├── components/      # Vue components
│   ├── Services/        # Application services
│   ├── assets/          # Styles and assets
│   ├── plugins/         # Vue plugins
│   └── shared/          # Shared utilities
├── Config/              # Backend configuration
├── Pages/               # Razor pages
├── Properties/          # Launch settings
└── public/              # Static files
```

## Products

The store includes:
- **Galaxy S Series**: Flagship phones (S24 Ultra, S24+, S24)
- **Galaxy Z Series**: Foldable phones (Z Fold5, Z Flip5)
- **Galaxy A Series**: Budget-friendly phones (A54, A34, A14)

## Design System

This application follows the Najiz design system with:
- ✅ RTL (Right-to-Left) layout
- ✅ Arabic typography (Almarai, Cairo fonts)
- ✅ Najiz color palette (Green #1B8354 primary)
- ✅ Najiz component patterns for product cards
- ✅ Responsive grid layout

## License

Najiz Framework - Saudi Arabia
