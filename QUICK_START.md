# 🚀 Quick Start Guide - Zarqa Weather App

## ⚡ Fast Setup (5 minutes)

### 1️⃣ Install Dependencies
```bash
npm install
```
**Expected**: ~46 seconds, 2306 packages installed

### 2️⃣ Build Frontend
```bash
npm run build
```
**Expected**: ~11 seconds, creates `dist/` folder with 7.6MB

### 3️⃣ Run Backend
```bash
dotnet restore
dotnet build
dotnet run
```
**Expected**: Application starts on `http://localhost:5000`

### 4️⃣ Open Browser
```
http://localhost:5000/applications/zarqaweather/
```

## ✅ What You'll See

### Home Page (`/`)
- Welcome card with weather icon
- App information card
- Features list
- "View Weather" button

### Weather Page (`/weather`)
- **Current Weather Card**: Temperature, description, icon
- **4 Detail Cards**: Humidity, Wind Speed, Pressure, Temperature
- **5-Day Forecast**: Cards with max/min temps, icons, details
- Refresh button

## 🎨 Features

- 🌡️ Current temperature for Zarqa city
- 📅 5-day weather forecast
- 💧 Humidity, wind, pressure details
- 🌐 Arabic (RTL) interface
- 📱 Fully responsive design
- ⚡ Fast loading with cached assets

## 🔧 Development Commands

```bash
# Serve with hot reload (development)
npm run serve

# Build for production
npm run build

# Build and watch for changes
npm run watch

# Lint code
npm run lint
```

## 📂 Key Folders

```
ClientApp/
├── components/Weather/    # Weather display component
├── Services/Weather/      # Weather service (static data)
├── assets/styles/         # Global CSS
└── public/               # HTML template

Controller/
└── WeatherController.cs   # API endpoints (static data)
```

## 🔐 Static Data

Currently using **static data** for Zarqa city:
- Temperature: 28°C
- Humidity: 45%
- Wind: 15 km/h
- Pressure: 1013 hPa

## 🚨 Troubleshooting

### Icons not showing?
✅ Already fixed! `iconfont: 'mdi'` is configured in `vuetify.js`

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port 5000 already in use?
Change port in `Properties/launchSettings.json`:
```json
"applicationUrl": "http://0.0.0.0:5001/"
```

## 📚 Documentation

- `README.md` - Full documentation (Arabic)
- `PROJECT_SUMMARY.md` - Technical details
- `VERIFICATION_CHECKLIST.md` - Complete checklist (Arabic)

## 🎯 Next Steps

1. ✅ Application is ready to run
2. 🔄 To integrate real weather API: Update `WeatherService.ts`
3. 🎨 To customize UI: Edit `main.css` and component HTML files
4. 🌍 To add more cities: Extend `WeatherController.cs`

---

**Created with Najiz.MicroTemplate** | Vue.js 2.6 + ASP.NET Core 3.1
