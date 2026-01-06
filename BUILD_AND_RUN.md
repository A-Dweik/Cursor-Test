# 🚀 Build and Run Instructions

## Current Location
All files are now at **workspace root level** (`/workspace/`)

## Quick Start

### 1️⃣ Install Dependencies
```bash
npm install
```

Expected output: Installing ~50 packages...

### 2️⃣ Build Frontend
```bash
npm run build
```

Expected output:
- `dist/` folder created
- `dist/css/` with compiled styles
- `dist/js/` with compiled JavaScript
- `dist/fonts/` with Material Design Icons

### 3️⃣ Restore .NET Dependencies
```bash
dotnet restore
```

### 4️⃣ Build Backend
```bash
dotnet build
```

Expected output: Build succeeded

### 5️⃣ Run Application
```bash
dotnet run
```

Expected output:
```
Now listening on: http://0.0.0.0:5200
Application started. Press Ctrl+C to shut down.
```

### 6️⃣ Access Application
Open browser and navigate to:
```
http://localhost:5200/applications/contractverification/
```

## File Structure (Root Level)

```
/workspace/
├── ClientApp/                    # Vue.js Frontend
│   ├── assets/styles/           # CSS files
│   ├── components/              # Vue components
│   │   ├── App/                # Root component
│   │   ├── Index/              # Home page
│   │   ├── ContractList/       # List view
│   │   ├── ContractForm/       # Add/Edit form
│   │   └── ContractDetails/    # Details view
│   ├── Services/               # Business logic
│   │   └── Contract/          # Contract service
│   ├── plugins/               # Vue plugins
│   ├── shared/                # Shared utilities
│   ├── main.ts                # Entry point
│   └── router.ts              # Routes
├── Config/                      # Configuration
├── Pages/                       # Razor pages
├── Properties/                  # Launch settings
├── public/                      # Public assets
├── Program.cs                   # ASP.NET entry
├── Startup.cs                   # ASP.NET config
├── ContractVerification.csproj  # Project file
├── package.json                 # npm config
├── tsconfig.json               # TypeScript config
├── vue.config.js               # Vue CLI config
└── README.md                   # Documentation
```

## Development Mode

### Frontend Only (Hot Reload)
```bash
npm run serve
```
Access at: `http://localhost:8080`

### Backend Only
```bash
dotnet watch run
```

### Full Stack (Recommended)
```bash
# Terminal 1: Build frontend
npm run build

# Terminal 2: Run backend
dotnet run
```

## Production Build

```bash
# Build everything
npm run build
dotnet publish -c Release -o ./publish

# Output in ./publish/ folder
```

## Verification Checklist

After running, verify:

### ✅ Application Starts
- [ ] No errors in terminal
- [ ] Listening on port 5200
- [ ] No compilation errors

### ✅ Browser Access
- [ ] Home page loads
- [ ] Arabic text displayed correctly
- [ ] RTL layout active
- [ ] Icons visible (not blank/text)

### ✅ Console Clean
- [ ] No CSP violations
- [ ] No JavaScript errors
- [ ] No 404 errors

### ✅ Features Work
- [ ] Navigate to "عرض جميع العقود"
- [ ] See 3 sample contracts
- [ ] Filter and search work
- [ ] Can add new contract
- [ ] Can view details
- [ ] Can edit pending contracts
- [ ] Can verify contracts
- [ ] Can delete contracts

## Troubleshooting

### Port Already in Use
```bash
# Change port in Properties/launchSettings.json
# Or kill existing process:
lsof -ti:5200 | xargs kill -9
```

### Icons Not Showing
```bash
# Verify @mdi/font installed
npm list @mdi/font

# If missing:
npm install @mdi/font@^5.9.55
npm run build
```

### Build Errors
```bash
# Clear and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Database Connection (Future)
Currently using **mock data** in ContractService.
To connect real database:
1. Add connection string to `appsettings.json`
2. Create models in `Models/` folder
3. Create controllers in `Controller/` folder
4. Update ContractService to call API

## Environment Variables

Create `.env` file in root (optional):
```bash
VUE_APP_API_URL=http://localhost:5200
VUE_APP_ENV=development
```

## Logs

Application logs stored in:
```
App_Data/logs/log-YYYY-MM-DD.log
```

## Next Steps

1. ✅ Application running
2. 🔄 Test all features
3. 🎨 Customize branding (colors, logo)
4. 🔌 Connect backend API
5. 🔐 Add authentication
6. 🚀 Deploy to production

---

**Need Help?** Check README.md for full documentation
