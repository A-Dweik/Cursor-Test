# Todos Najiz Micro Application

This repository hosts **Todos**, a Najiz-compliant micro application that combines an ASP.NET Core 3.1 backend with a Vue 2 + Vuetify SPA frontend. The solution follows the Najiz WebHostSpaStartup pattern, Arabic-first UI conventions, and integrates Application Insights telemetry, JWT-ready authentication, and a PWA-ready frontend.

## Getting Started

```bash
# restore .NET dependencies
 dotnet restore

# install frontend deps (requires Najiz npm registry access)
npm config set registry https://najizportalnpm.azurewebsites.net/
npm install

# run the Vue dev server (proxy via ASP.NET during development)
npm run serve

# run the ASP.NET Core backend
 dotnet run
```

The backend serves API endpoints (e.g., `GET /api/Todos`, `POST /api/Todos`) and the `GET /api/UserInfo` profile endpoint that the Vue client consumes during initialization.

## Build & Publish

```bash
npm run build          # builds ClientApp into /dist
 dotnet publish -c Release
```

Publishing triggers the `PublishRunWebpack` MSBuild target, which installs npm packages from the Najiz registry and bundles the SPA assets into `dist/` for hosting.

## Key Features

- Najiz Framework 3.55.3 with NLog file logging and JWT-ready security packages
- Vue 2.6 + TypeScript 3.5 SPA using Vuetify with RTL + Arabic defaults
- Axios service with interceptors, loader hooks, and toast-based error handling
- Application Insights telemetry wrapper and DI via `vue-di-container`
- PWA essentials: manifest, service worker registration, offline messaging, and icons
- Sample Todos API with in-memory storage plus client UI to add and complete tasks

Update the placeholders in `appsettings*.json` and `public/config.json` (Application Insights, reCAPTCHA, OpenID settings) before deploying to production.
