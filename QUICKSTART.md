# 🚀 Quick Start Guide - Car Rental Application

## Prerequisites

- .NET Core 3.1 SDK
- Node.js (v12 or higher)
- npm

## Installation & Running

### 1. Navigate to Project Directory
```bash
cd /workspace
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Build Frontend
```bash
npm run build
```

### 4. Restore Backend Dependencies
```bash
dotnet restore
```

### 5. Run the Application
```bash
dotnet run
```

### 6. Access the Application
Open your browser and navigate to:
```
http://localhost:5200/applications/carrental/
```

## Initial Data

The application comes pre-loaded with:
- **5 Cars**: Toyota Camry, Honda Accord, Nissan Altima, Hyundai Sonata, Kia Optima
- **1 Active Rental**: Sample rental for demonstration

## Features Overview

### 🏠 Dashboard (/)
- View statistics: total cars, available cars, active rentals, total revenue
- Quick action buttons
- Welcome card with feature highlights

### 🚗 Car Management (/cars)
- View all cars in a data table
- Search and filter
- Add new car
- Edit car details
- Delete car (with validation for active rentals)
- Status indicators (available/rented)

### 📋 Rental Management (/rentals)
- View all rentals
- Create new rental
- View rental details
- Complete rental
- Cancel rental
- Delete rental (non-active only)
- Auto-calculate total cost

## API Endpoints

### Cars
```
GET    /api/Cars              - Get all cars
GET    /api/Cars/{id}         - Get car by ID
GET    /api/Cars/available    - Get available cars
POST   /api/Cars              - Create new car
PUT    /api/Cars/{id}         - Update car
DELETE /api/Cars/{id}         - Delete car
```

### Rentals
```
GET    /api/Rentals             - Get all rentals
GET    /api/Rentals/{id}        - Get rental by ID
GET    /api/Rentals/active      - Get active rentals
POST   /api/Rentals             - Create new rental
PUT    /api/Rentals/{id}        - Update rental
POST   /api/Rentals/{id}/complete - Complete rental
POST   /api/Rentals/{id}/cancel   - Cancel rental
DELETE /api/Rentals/{id}        - Delete rental
```

## Development

### Watch Mode (Frontend)
```bash
npm run watch
```

### Serve Mode (Frontend Development Server)
```bash
npm run serve
```

## Testing

### Add a New Car
1. Navigate to السيارات (Cars)
2. Click "إضافة سيارة جديدة" (Add New Car)
3. Fill in the form
4. Click "حفظ" (Save)

### Create a Rental
1. Navigate to عقود الإيجار (Rentals)
2. Click "إنشاء عقد إيجار جديد" (Create New Rental)
3. Select an available car
4. Fill in customer details
5. Select start and end dates
6. Click "حفظ" (Save)

### Complete a Rental
1. Navigate to عقود الإيجار (Rentals)
2. Click the eye icon on an active rental
3. Click "إكمال العقد" (Complete Rental)
4. The car becomes available again

## Troubleshooting

### Build Errors
If you encounter build errors:
```bash
# Clean node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

### Port Already in Use
If port 5200 is already in use, edit `Properties/launchSettings.json`:
```json
"applicationUrl": "http://0.0.0.0:5201/"
```

### Icons Not Showing
Verify that:
1. @mdi/font is installed: `npm list @mdi/font`
2. CSS is imported in main.ts
3. vuetify.js has `iconfont: 'mdi'`

## Technology Stack

- **Backend**: ASP.NET Core 3.1, Entity Framework Core (In-Memory)
- **Frontend**: Vue.js 2.6, TypeScript 4.5, Vuetify 1.5
- **Build**: Vue CLI 3.10, Webpack
- **Language**: Arabic (RTL)

## Support

For issues or questions, refer to:
- README.md - Comprehensive documentation
- VERIFICATION_CHECKLIST.md - Build verification
- Najiz.MicroTemplate documentation

## Next Steps

1. Customize the theme in `ClientApp/plugins/vuetify.js`
2. Add more validation rules in services
3. Implement user authentication
4. Add reporting features
5. Connect to a real database (replace In-Memory)

---

Happy Coding! 🎉
