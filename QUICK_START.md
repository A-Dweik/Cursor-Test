# 🚀 Quick Start Guide - Car Selling Application

## ⏱ 5-Minute Setup

Follow these steps to get the application running:

### Step 1: Install Dependencies (2 minutes)
```bash
# Backend dependencies
dotnet restore

# Frontend dependencies
npm install
```

### Step 2: Build Frontend (1 minute)
```bash
npm run build
```

### Step 3: Run Application (30 seconds)
```bash
dotnet run
```

### Step 4: Open Browser
Navigate to:
```
http://localhost:5001/applications/carselling/
```

**That's it! 🎉 The application should be running.**

---

## 📱 What You'll See

### 1. **Dashboard (Home Page)**
- Statistics: Total cars, Available, Sold, Reserved
- Quick Actions: Add Car, View All, Reports, Settings
- Recent Cars: Last 3 cars added
- Features Overview

### 2. **Car List Page**
- Grid view of all cars
- Search by brand, model, or color
- Filter by status (Available, Reserved, Sold)
- Actions: View, Edit, Delete

### 3. **Car Details Page**
- Complete car information
- Price, year, mileage, color
- Edit and Delete actions
- Car features list

### 4. **Add/Edit Car Page**
- Form to add new car or edit existing
- All fields with validation
- Preview section
- Status selection

---

## 🧪 Quick Test

### Test 1: View Cars
1. Click "عرض جميع السيارات" on dashboard
2. You should see 5 sample cars
3. ✅ If you see the cars grid, test passed

### Test 2: Add a Car
1. Click "إضافة سيارة جديدة"
2. Fill the form:
   - Brand: فورد
   - Model: فوكس
   - Year: 2022
   - Color: أزرق
   - Price: 60000
   - Mileage: 30000
   - Description: سيارة اقتصادية
3. Click "إضافة السيارة"
4. ✅ If you see success message and car appears in list, test passed

### Test 3: Search
1. Go to Car List
2. Type "تويوتا" in search box
3. ✅ If only Toyota cars show, test passed

### Test 4: Edit Car
1. Click pencil icon on any car
2. Change the price to 100000
3. Click "حفظ التعديلات"
4. ✅ If price updates, test passed

### Test 5: Delete Car
1. Click delete icon on any car
2. Confirm deletion
3. ✅ If car disappears from list, test passed

---

## 🔍 Verification Checklist

After running the app, verify these items:

### Visual Checks
- [ ] Icons display correctly (not blank squares or text)
- [ ] Text is right-aligned (Arabic RTL)
- [ ] Cards have shadows and look professional
- [ ] Status badges show colors (green for available, red for sold, orange for reserved)
- [ ] No layout overlap on mobile (resize browser to < 600px width)

### Console Checks (Press F12)
- [ ] No errors in Console tab
- [ ] No CSP violations (Content Security Policy)
- [ ] No 404 errors for fonts or icons

### Functionality Checks
- [ ] Dashboard statistics update correctly
- [ ] Search works instantly
- [ ] Filter by status works
- [ ] Add car form validates correctly
- [ ] Edit car loads existing data
- [ ] Delete shows confirmation dialog

---

## 🐛 Troubleshooting

### Issue: Icons show as blank squares
**Solution:**
1. Check browser console for errors
2. Verify @mdi/font is installed: `npm list @mdi/font`
3. Rebuild: `npm run build && dotnet run`

### Issue: Styles not applied (plain HTML)
**Solution:**
1. Check if dist/css/ folder exists
2. Rebuild frontend: `npm run build`
3. Check browser console for CSS loading errors

### Issue: "Cannot find module" errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Port 5001 already in use
**Solution:**
Change port in Properties/launchSettings.json:
```json
"applicationUrl": "http://0.0.0.0:5002/"
```
Then access: http://localhost:5002/applications/carselling/

### Issue: Build errors in TypeScript
**Solution:**
1. Verify tsconfig.json has:
   - `"strict": false`
   - `"useDefineForClassFields": false`
2. Run: `npm run build`

---

## 📚 Next Steps

### 1. Connect to Real Database
The app currently uses mock data. To connect to a real database:
1. Add connection string to appsettings.json
2. Create API controllers in Controller/ folder
3. Create models in Models/ folder
4. Update CarService to call API instead of mock data

### 2. Add Authentication
1. Configure OpenIdConnect in appsettings.json
2. Add [Authorize] attributes to controllers
3. Update UserService to fetch real user info

### 3. Deploy to Production
```bash
# Build for production
npm run build
dotnet publish --configuration Release

# Deploy the publish/ folder to server
```

### 4. Add Car Images
1. Add file upload in AddCar component
2. Store images in blob storage
3. Update CarModel with real image URLs
4. Display images instead of placeholders

---

## 💡 Tips

### Development Mode
For faster development, run frontend and backend separately:
```bash
# Terminal 1: Frontend (with hot reload)
npm run serve

# Terminal 2: Backend
dotnet run
```

### Code Organization
- Add new pages in ClientApp/components/
- Add new services in ClientApp/Services/
- Add API endpoints in Controller/
- Add models in Models/

### Styling
- Global styles: ClientApp/assets/styles/main.css
- Component styles: Add `<style scoped>` in .html files
- Use Vuetify classes for consistency

---

## 📞 Support

- Check README.md for detailed documentation
- Check VERIFICATION_CHECKLIST.md for implementation details
- Review Najiz.MicroTemplate documentation

**Happy Coding! 🚀**
