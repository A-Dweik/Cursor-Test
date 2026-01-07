# تطبيق الطقس - عمّان (Weather App - Amman)

A comprehensive weather application for Amman city built using the Najiz.MicroTemplate.

## 🌟 Features

- **Real-time Weather**: Current weather conditions for Amman including temperature, feels-like, humidity, wind speed, pressure, visibility, and UV index
- **Hourly Forecast**: 24-hour weather forecast with detailed conditions
- **Daily Forecast**: 7-day weather forecast with min/max temperatures
- **Weather Advice**: Smart recommendations based on current weather conditions
- **Responsive Design**: Beautiful UI that works on all devices (mobile, tablet, desktop)
- **RTL Support**: Full right-to-left layout for Arabic language
- **CSP Compliant**: All assets bundled locally, no blocked CDN dependencies

## 🛠️ Technology Stack

- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5
- **UI Framework**: Vuetify 1.5 (Material Design)
- **Build Tools**: Vue CLI 3.10, Webpack, npm
- **Icons**: Material Design Icons (bundled locally)

## 📦 Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- .NET Core SDK 3.1

### Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build frontend**:
   ```bash
   npm run build
   ```

3. **Restore backend packages**:
   ```bash
   dotnet restore
   ```

4. **Build backend**:
   ```bash
   dotnet build
   ```

5. **Run application**:
   ```bash
   dotnet run
   ```

6. **Access the application**:
   - Open browser and navigate to: `http://localhost:5010/applications/weatherapp/`

## 🚀 Development

### Frontend Development

- **Serve with hot-reload**: `npm run serve`
- **Build for production**: `npm run build`
- **Lint code**: `npm run lint`

### Project Structure

```
WeatherApp/
├── ClientApp/                    # Frontend Vue.js application
│   ├── assets/
│   │   └── styles/
│   │       └── main.css         # Global styles and Sigma-S Dashboard patterns
│   ├── components/
│   │   ├── App/                 # Root component
│   │   └── Index/               # Weather dashboard component
│   ├── plugins/
│   │   ├── vuetify.js          # Vuetify configuration (RTL, icons, theme)
│   │   ├── i18n.ts             # Internationalization
│   │   └── application-initialization.ts
│   ├── Services/
│   │   ├── WeatherService.ts   # Weather data service (static data)
│   │   ├── AxiosService.ts     # HTTP client service
│   │   ├── LoaderService.ts    # Loading state service
│   │   └── TelemetryService.ts # Application Insights
│   ├── main.ts                  # Application entry point
│   └── router.ts                # Vue Router configuration
├── Config/
│   └── NLog.config              # Logging configuration
├── Pages/                        # Razor pages
├── Properties/
│   └── launchSettings.json      # Launch configuration
├── public/                       # Static assets
├── Program.cs                    # Backend entry point
├── Startup.cs                    # ASP.NET Core configuration
├── WeatherApp.csproj            # Project file
├── package.json                  # Frontend dependencies
├── tsconfig.json                 # TypeScript configuration
└── vue.config.js                 # Vue CLI configuration

```

## 🎨 UI Design Standards

This application follows the Najiz.MicroTemplate UI/UX design standards:

### Key Design Principles

1. **RTL First**: Full right-to-left layout for Arabic content
2. **Responsive Grid**: Uses Vuetify's 12-column grid system
3. **Card-Based Layout**: All content wrapped in Material Design cards
4. **Status Indicators**: Uses Sigma-S Dashboard BEM pattern for badges
5. **Proper Spacing**: Consistent 8px spacing units throughout
6. **Color System**: 
   - Primary: #1976D2 (Blue)
   - Success: #4CAF50 (Green)
   - Error: #FF5252 (Red)
   - Info: #2196F3 (Light Blue)
   - Warning: #FF9800 (Orange)

### CSP Compliance

✅ **Allowed CDNs**:
- Google Fonts (fonts.googleapis.com)

❌ **Blocked CDNs** (NOT used):
- cdn.jsdelivr.net
- unpkg.com
- cdnjs.cloudflare.com

All icons and libraries are bundled locally via npm packages.

## 📊 Weather Service

The application uses a `WeatherService` with static data (no third-party API integration required).

### Weather Data Includes:

- **Current Weather**:
  - Temperature (°C)
  - Feels like temperature
  - Weather condition (sunny, cloudy, rainy, etc.)
  - Humidity (%)
  - Wind speed (km/h)
  - Atmospheric pressure (hPa)
  - Visibility (km)
  - UV index

- **Hourly Forecast**:
  - 24-hour forecast
  - Temperature and conditions for each hour
  - Precipitation probability

- **Daily Forecast**:
  - 7-day forecast
  - Min/Max temperatures
  - Weather conditions
  - Precipitation and humidity

### Data Randomization

To simulate realistic weather data, the service includes slight randomization:
- Temperature variations (±5°C from base)
- Random weather conditions (sunny, cloudy, rainy, windy)
- Varying humidity and precipitation levels

## 🔧 Configuration

### Frontend Configuration

**vue.config.js**:
- `publicPath`: `/applications/weatherapp` (deployment path)
- `pages`: Entry point configuration
- `transpileDependencies`: Vuetify transpilation

**tsconfig.json**:
- `strict: false` - Required for Vue 2 compatibility
- `useDefineForClassFields: false` - Critical for decorators
- `experimentalDecorators: true` - Required for class decorators

**ClientApp/plugins/vuetify.js**:
```javascript
Vue.use(Vuetify, {
  rtl: true,           // Enable RTL
  iconfont: 'mdi',     // Use Material Design Icons
  theme: { ... }       // Color theme
});
```

### Backend Configuration

**appsettings.json**:
- Logging configuration
- Application Insights (optional)
- OpenID Connect settings

**launchSettings.json**:
- Port: 5010
- Environment: Development

## 🧪 Testing

The application has been verified for:

✅ **Build Verification**:
- Frontend builds successfully without errors
- All dependencies resolved
- dist/fonts/ contains Material Design Icons
- chunk-vendors.css is ~484KB (includes Vuetify)
- No CDN violations

✅ **Design Standards**:
- RTL layout enabled
- Responsive grid (xs, sm, md breakpoints)
- Proper card-based layout
- Icon font configured (`iconfont: 'mdi'`)
- Global styles imported

✅ **CSP Compliance**:
- All assets bundled locally
- Only allowed CDNs used (Google Fonts)
- No console errors expected

## 📝 Notes

### Static Data

This application uses static weather data and does not require:
- API keys
- External weather service integration
- Network connectivity (after initial load)

The data is randomized on each refresh to simulate real-time updates.

### Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

RTL layout and Material Design components are fully supported in all modern browsers.

## 📄 License

This application is part of the Najiz.MicroTemplate and follows the same licensing terms.

## 🤝 Support

For issues or questions:
1. Check browser console for errors
2. Verify all npm packages are installed
3. Ensure .NET Core 3.1 SDK is installed
4. Check that port 5010 is available

---

**Built with ❤️ using Najiz.MicroTemplate**
