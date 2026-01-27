# 🇯🇴 Amman Weather App

A beautiful, real-time weather application for Amman, Jordan built with Angular 21. The app displays current weather conditions including temperature, wind speed, and weather descriptions using the free Open-Meteo API.

## ✨ Features

- 🌡️ Real-time temperature display in Celsius
- 💨 Wind speed information
- 🌤️ Weather condition icons and descriptions
- 🔄 Refresh button to get latest weather data
- ⚡ Fast and responsive UI
- 📱 Mobile-friendly design
- 🆓 No API key required (uses Open-Meteo API)

## 🚀 Quick Start

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

### Development Server

To start a local development server, run:

```bash
npm start
```

Or using Angular CLI:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## 🏗️ Building

To build the project for production, run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build is optimized for performance and speed.

## 🛠️ Tech Stack

- **Angular 21** - Modern web framework with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming with Observables
- **Open-Meteo API** - Free weather data API
- **Angular Signals** - Reactive state management

## 📍 Location

The app is configured to display weather for:
- **City**: Amman, Jordan
- **Coordinates**: 31.9454°N, 35.9284°E

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🎨 Design Features

- Modern gradient background
- Clean card-based layout
- Smooth animations and transitions
- Loading spinner for data fetching
- Error handling with retry functionality
- Responsive design for all screen sizes

## 📝 API Information

This app uses the [Open-Meteo API](https://open-meteo.com/), a free weather API that doesn't require an API key. It provides accurate weather data for locations worldwide.

## 📄 License

This project is open source and available for educational purposes.

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
