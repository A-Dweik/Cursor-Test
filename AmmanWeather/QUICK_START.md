# Quick Start Guide - Amman Weather App

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd AmmanWeather
npm install
dotnet restore
```

### Step 2: Build the Application
```bash
npm run build
```

### Step 3: Run the Application
```bash
dotnet run
```

### Access the App
Open your browser and navigate to:
```
http://localhost:5000/applications/ammanweather/
```

---

## 📋 What You'll See

- **Beautiful Weather Dashboard** with:
  - Real-time temperature for Amman, Jordan
  - Live clock and date
  - Current weather conditions (humidity, wind speed)
  - 5-day weather forecast
  - Stunning gradient purple UI
  - Material Design cards
  - Responsive mobile layout

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Restore .NET packages
dotnet restore

# Build frontend for production
npm run build

# Watch frontend changes (auto-rebuild)
npm run watch

# Run frontend dev server (with hot reload)
npm run serve

# Build backend
dotnet build

# Run backend
dotnet run

# Publish for production
dotnet publish --configuration Release
```

---

## 📂 Project Structure Overview

```
AmmanWeather/
├── ClientApp/              # Vue.js 2.6 Frontend
│   ├── components/        
│   │   ├── Weather/       # ⭐ Weather display component
│   │   ├── App/           # Root component
│   │   └── Index/         # Landing page
│   ├── Services/          
│   │   └── WeatherService.ts  # ⭐ Weather API integration
│   └── main.ts            # Vue app entry point
├── Program.cs             # ASP.NET Core entry
├── Startup.cs             # Service configuration
└── public/                # Static files
```

---

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Weather dashboard (default) |
| `/weather` | Weather dashboard |
| `/index` | Landing page |

---

## 🎨 Features

✅ Real-time weather data for Amman  
✅ 5-day forecast  
✅ Beautiful Vuetify UI  
✅ Live clock  
✅ Responsive design  
✅ Error handling  
✅ Loading states  
✅ Material Design icons  
✅ Gradient backgrounds  
✅ Hover animations  

---

## 🛠️ Technology Stack

**Frontend:**
- Vue.js 2.6
- TypeScript 4.5
- Vuetify 1.5
- Axios

**Backend:**
- ASP.NET Core 3.1
- Najiz Framework

**Build:**
- Vue CLI 3.10
- MSBuild
- npm/Webpack

---

## 📦 Port Configuration

**Default Port:** 5000

To change, edit:
```json
// Properties/launchSettings.json
{
  "profiles": {
    "AmmanWeather": {
      "applicationUrl": "http://0.0.0.0:YOUR_PORT/"
    }
  }
}
```

---

## 🐛 Troubleshooting

### npm install fails
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### dotnet restore fails
```bash
# Clear NuGet cache
dotnet nuget locals all --clear
dotnet restore
```

### Build errors
```bash
# Clean and rebuild
rm -rf node_modules dist bin obj
npm install
dotnet clean
dotnet build
```

### App not loading
1. Check port 5000 is not in use
2. Verify npm run build completed successfully
3. Check browser console for errors
4. Ensure all dependencies are installed

---

## 📖 More Information

- **Full Documentation:** See `README.md`
- **Project Summary:** See `PROJECT_SUMMARY.md`
- **Configuration:** See `appsettings.json` and `vue.config.js`

---

## ✨ Ready to Code!

Your Najiz.MicroTemplate Amman Weather App is ready to go! 🎉

Just run:
```bash
npm install && dotnet restore && npm run build && dotnet run
```

Then visit: `http://localhost:5000/applications/ammanweather/`

---

**Happy Coding! ☀️🌤️⛈️**
