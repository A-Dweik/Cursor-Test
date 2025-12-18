# Amman Weather (Static API Demo)

This project delivers a lightweight Angular 17 single-page app that showcases the weather for a single city (Amman, Jordan). Instead of calling a live API, the UI consumes a static payload to make local development and demos deterministic.

## How it Works

- The UI calls `/api/weather.json`, which is served directly from the `public/` folder by the Angular dev server.
- `WeatherService` maps that payload into a rich view model (current conditions, range, humidity, and a short forecast).
- You can trigger a "refresh" inside the UI to re-read the same static file—useful after editing the JSON.

## Development

```bash
npm install
npm start   # runs ng serve
```

Navigate to `http://localhost:4200/` and you’ll see the Amman dashboard. The app automatically reloads when you edit any source file.

## Updating the Static API

1. Open `public/api/weather.json`.
2. Adjust any of the fields (`temperatureC`, `forecast`, `sunrise`, etc.).
3. Save the file and click **Reload static data** in the UI to pull your changes.

Because the payload ships with the bundle, no additional backend services are required for manual testing or QA sign-off.

## Building for Production

```bash
npm run build
```

The compiled artifacts land in `dist/`. The `public/api/weather.json` file is copied automatically, so hosting the build folder reproduces the same static API behaviour.
