# 🚀 Quick Start Guide - Contract Verification System

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd /workspace
npm install
```

### Step 2: Build Frontend
```bash
npm run build
```

### Step 3: Run Application
```bash
dotnet restore
dotnet build
dotnet run
```

### Step 4: Access Application
Open browser and navigate to:
```
http://localhost:5200/applications/contractverification/
```

## 🎯 What You'll See

### Home Page (/)
- Welcome message
- Quick stats
- Contract types overview
- Features list
- Action buttons to view contracts or add new contract

### Contracts List (/contracts)
- List of all contracts with filters
- Search by contract number or party names
- Filter by contract type (Real Estate, Vehicle, Commercial)
- Filter by status (Pending, Verified, Rejected)
- Actions: View, Edit, Verify, Delete

### Add Contract (/contracts/new)
- Form to add new contract
- Contract type selection (Real Estate, Vehicle, Commercial)
- Transaction type (Sale, Purchase, Rent, Lease)
- Party A and Party B information
- Property/Vehicle/Commercial details
- Contract value

### Contract Details (/contracts/:id)
- Full contract information
- Party details
- Property description
- Timeline of events
- Actions: Edit (if pending), Verify (if pending)

## 📊 Sample Data

The application comes with 3 sample contracts:

1. **Real Estate Contract** (RE-2025-001)
   - Type: Real Estate Sale
   - Status: Verified
   - Value: 500,000 SAR

2. **Vehicle Contract** (VH-2025-002)
   - Type: Vehicle Sale
   - Status: Pending
   - Value: 85,000 SAR

3. **Commercial Contract** (CM-2025-003)
   - Type: Commercial Lease
   - Status: Verified
   - Value: 120,000 SAR

## 🎨 Key Features to Test

1. **Browse Contracts**
   - Click "عرض جميع العقود" on home page
   - Try filtering by type and status
   - Search for contract numbers or names

2. **Add New Contract**
   - Click "إضافة عقد جديد"
   - Fill in the form
   - Submit to see it in the list

3. **View Details**
   - Click eye icon (👁️) on any contract
   - See full contract information
   - Check timeline

4. **Verify Contract**
   - On a pending contract details page
   - Click "توثيق العقد" button
   - Status changes to "موثق" (Verified)

5. **Edit Contract**
   - Only available for pending contracts
   - Click pencil icon (✏️)
   - Modify and save

6. **Delete Contract**
   - Click delete icon (🗑️)
   - Confirm deletion

## 🎭 Testing Responsive Design

1. **Desktop View** (> 960px)
   - Full layout with all columns
   - Sidebar navigation ready
   - Maximum content width

2. **Tablet View** (600px - 960px)
   - Adapted grid layout
   - Touch-friendly buttons
   - Optimized spacing

3. **Mobile View** (< 600px)
   - Single column layout
   - Large touch targets
   - Hamburger menu ready
   - All features accessible

## 🔍 Verification Points

After running, verify:

✅ **Icons Display Correctly**
- Home icon (🏠) for real estate
- Car icon (🚗) for vehicles
- Briefcase icon (💼) for commercial
- All action icons visible

✅ **Styles Applied**
- Vuetify theme colors
- RTL layout (right-to-left)
- Cards with shadows
- Proper spacing

✅ **No Console Errors**
- Open browser DevTools (F12)
- Check Console tab
- Should see no CSP violations
- Should see no JavaScript errors

✅ **Functionality Works**
- Navigation between pages
- Form validation
- CRUD operations
- Status changes

## 🐛 Common Issues & Fixes

### Icons Not Showing?
```bash
# Verify @mdi/font is installed
npm list @mdi/font

# If missing, install:
npm install @mdi/font@^5.9.55

# Rebuild:
npm run build
```

### Styles Not Applied?
```bash
# Clear dist folder and rebuild
rm -rf dist/
npm run build
```

### Port Already in Use?
```bash
# Change port in Properties/launchSettings.json
# Or kill process on port 5200
```

## 📱 Mobile Testing

Use browser DevTools device emulation:
1. Press F12
2. Click device toolbar icon (📱)
3. Select device (iPhone, iPad, etc.)
4. Test all features

## 🎉 Next Steps

Once everything works:

1. **Customize Branding**
   - Update colors in `ClientApp/plugins/vuetify.js`
   - Modify logo in `ClientApp/components/App/`

2. **Add Backend API**
   - Create controllers in `Controller/` folder
   - Add models in `Models/` folder
   - Replace mock data with real API calls

3. **Add Authentication**
   - Integrate with Najiz Security Framework
   - Add user roles and permissions

4. **Deploy**
   - Build for production: `dotnet publish -c Release`
   - Deploy to Azure, IIS, or Kubernetes

## 📚 Documentation

- [README.md](README.md) - Full project documentation
- [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) - Complete verification checklist

## 🆘 Need Help?

Check these files:
- `/ClientApp/Services/Contract/ContractService.ts` - Contract business logic
- `/ClientApp/components/ContractList/ContractList.ts` - List component logic
- `/ClientApp/components/ContractForm/ContractForm.ts` - Form component logic

---

**Happy Coding! 🎊**
