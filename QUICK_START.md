# 🚀 Quick Start Guide - Car Rental Application

## ✅ Application is Ready to Run!

Both frontend and backend have been built, verified, and **UI rendering is now fixed**!

---

## 📦 What's Already Done

- ✅ **Frontend Built** - Vue.js app compiled to `dist/` folder with correct paths
- ✅ **Backend Built** - .NET 6.0 application compiled successfully
- ✅ **Database Configured** - EF Core In-Memory with 5 pre-seeded cars
- ✅ **All Dependencies Installed** - npm packages and NuGet packages restored
- ✅ **UI Rendering Fixed** - PublicPath corrected, loader functions added
- ✅ **SPA Routing Configured** - Proper fallback routing for Vue Router

---

## 🎯 Run the Application (3 Simple Steps)

### Step 1: Navigate to Project Directory
```bash
cd /workspace
```

### Step 2: Run the Application
```bash
dotnet run
```

### Step 3: Open in Browser
```
http://localhost:5001/
```

**That's it!** The application will:
1. Start the ASP.NET Core 6.0 web server
2. Serve the Vue.js SPA from `/dist` folder
3. Initialize the in-memory database with 5 sample cars
4. Make all API endpoints available at `/api/*`

---

## 🎨 What You'll See

### 1. Dashboard (Home Page)
- Real-time statistics showing total cars and active rentals
- Quick action buttons to navigate to Cars and Rentals
- Feature highlights and welcome message

### 2. Cars Management (`/cars`)
- Grid view of all cars with images
- Add new car button
- Edit and delete car buttons
- Status badges (Available/Unavailable)
- Responsive design for mobile and desktop

### 3. Rentals Management (`/rentals`)
- List view of all rentals
- Tabs for filtering (All/Active/Completed)
- Add new rental form
- Complete rental button
- Customer information display

---

## 📊 Pre-Seeded Data

The application comes with 5 sample cars:

| ID | Make | Model | Year | Color | Daily Rate | Status |
|----|------|-------|------|-------|------------|--------|
| 1 | تويوتا | كامري | 2023 | أبيض | 200 ريال | متاحة |
| 2 | هوندا | أكورد | 2022 | أسود | 180 ريال | متاحة |
| 3 | نيسان | التيما | 2023 | فضي | 190 ريال | متاحة |
| 4 | هيونداي | سوناتا | 2022 | أزرق | 170 ريال | متاحة |
| 5 | كيا | أوبتيما | 2021 | أحمر | 160 ريال | غير متاحة |

---

## 🔌 API Endpoints Ready to Use

### Test with cURL:

#### Get All Cars
```bash
curl http://localhost:5001/api/Cars
```

#### Get Available Cars Only
```bash
curl http://localhost:5001/api/Cars/Available
```

#### Get All Rentals
```bash
curl http://localhost:5001/api/Rentals
```

#### Add New Car
```bash
curl -X POST http://localhost:5001/api/Cars \
  -H "Content-Type: application/json" \
  -d '{
    "make": "BMW",
    "model": "X5",
    "year": 2024,
    "color": "Black",
    "plateNumber": "ABC 1234",
    "dailyRate": 350,
    "isAvailable": true,
    "imageUrl": "https://via.placeholder.com/300x200?text=BMW+X5",
    "description": "Luxury SUV"
  }'
```

---

## 🖥️ Development Mode

### Run with Hot Reload (Optional)

If you want to modify the frontend and see changes in real-time:

**Terminal 1 (Backend):**
```bash
dotnet watch run
```

**Terminal 2 (Frontend):**
```bash
npm run serve
```

Then access at: `http://localhost:8080/` (Vue dev server)

---

## 🛑 Stop the Application

Press `Ctrl+C` in the terminal where `dotnet run` is running.

---

## 📝 Common Commands

### Build Commands
```bash
# Restore backend packages
dotnet restore

# Build backend
dotnet build

# Build frontend
npm run build

# Install frontend dependencies
npm install
```

### Run Commands
```bash
# Run application (production mode)
dotnet run

# Run with auto-reload (development mode)
dotnet watch run

# Run on different port
dotnet run --urls "http://localhost:5002"
```

### Clean Commands
```bash
# Clean backend build artifacts
dotnet clean

# Clean frontend build artifacts
rm -rf dist/

# Clean all node modules
rm -rf node_modules/
```

---

## 🎯 Recommended First Steps

1. **Explore the Dashboard**
   - See statistics and navigation

2. **Try Cars Management**
   - Add a new car
   - Edit existing car
   - View car details
   - Delete a car

3. **Test Rentals**
   - Create a rental for an available car
   - See the car become unavailable
   - Complete the rental
   - See the car become available again

4. **Check API Endpoints**
   - Use browser or cURL to test APIs
   - Verify CRUD operations work
   - Check in-memory database updates

---

## 🔍 Application Details

### Technology Stack
- **Backend:** ASP.NET Core 6.0 with EF Core In-Memory Database
- **Frontend:** Vue.js 2.6 + TypeScript + Vuetify 1.5
- **Language:** Arabic (RTL) with full Material Design Icons

### Features
- ✅ Full CRUD operations for cars
- ✅ Full CRUD operations for rentals
- ✅ Automatic availability management
- ✅ Automatic rental amount calculation
- ✅ Real-time statistics
- ✅ Responsive design (mobile-first)
- ✅ Professional Arabic UI with RTL support

### Data Persistence
**Note:** This application uses **in-memory database**. All data is reset when the application restarts. For production use, replace with SQL Server, PostgreSQL, or another persistent database.

---

## 📚 Additional Resources

- **README.md** - Complete documentation
- **BUILD_INSTRUCTIONS.md** - Detailed build and troubleshooting guide
- **CarRentalApp.csproj** - Project configuration
- **package.json** - Frontend dependencies

---

## ✨ Enjoy Your Car Rental Application!

The application is fully functional and ready to use. If you encounter any issues, refer to BUILD_INSTRUCTIONS.md for troubleshooting.

**Happy Coding! 🚗💨**
