# Transaction Verification Application

نظام التحقق من مصدر المعاملات المالية - Najiz Microapplication

## Overview

This application allows users to verify the source of money transactions from Jordan and Saudi Arabia (KSA). It maintains logs of all searched transactions for auditing and compliance purposes.

## Technology Stack

- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Build**: MSBuild + Vue CLI 3.10 + npm/Webpack

## Features

- ✅ Transaction source verification for Jordan and KSA
- ✅ Complete transaction search log
- ✅ User-friendly Arabic interface (RTL)
- ✅ Secure and reliable data handling
- ✅ Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 12.x or higher
- .NET Core SDK 3.1
- npm or yarn

### Installation

1. Install npm dependencies:
```bash
npm install
```

2. Restore .NET packages:
```bash
dotnet restore
```

### Development

1. Build the frontend:
```bash
npm run build
```

2. Run the application:
```bash
dotnet run
```

3. Access the application at: `http://localhost:5000/applications/transactionverification/`

### Build for Production

```bash
npm run build
dotnet publish -c Release
```

## Project Structure

```
/
├── ClientApp/              # Vue.js frontend
│   ├── components/         # Vue components
│   ├── Services/           # Services and API calls
│   ├── plugins/            # Vue plugins (Vuetify, i18n, etc.)
│   └── assets/             # CSS, images, etc.
├── Config/                 # NLog configuration
├── Controller/             # API controllers
├── Models/                 # Data models
├── Pages/                  # Razor pages
└── public/                 # Static assets
```

## Supported Countries

Currently, the application supports transaction verification from:
- 🇯🇴 Jordan
- 🇸🇦 Saudi Arabia (KSA)

## License

Copyright © 2026 Najiz Platform
