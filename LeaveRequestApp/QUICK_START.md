# Quick Start Guide - Leave Request Application

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd LeaveRequestApp
npm install
```

### Step 2: Build & Run
```bash
dotnet run
```

### Step 3: Access Application
Open your browser and navigate to:
```
http://localhost:5000/applications/leaverequest/
```

---

## 📋 What You'll See

### Home Page
- **View Leave Requests** card - Click to see all leave requests
- **Submit New Request** card - Click to create a new leave request

### Leave Request List (`/leave-requests`)
- Table showing all leave requests
- Actions: View details, Approve, Reject, Delete
- Color-coded status indicators:
  - 🟡 Yellow = Pending
  - 🟢 Green = Approved
  - 🔴 Red = Rejected

### Submit Leave Request (`/leave-request/new`)
- Employee Name (required)
- Leave Type (dropdown: Annual/Sick/Personal/Emergency)
- Start Date (date picker)
- End Date (date picker)
- Reason (text area)
- Submit or Cancel buttons

---

## 🎯 Try These Actions

1. **View Existing Requests**
   - From home, click "View Leave Requests"
   - See 3 sample requests with different statuses

2. **Submit New Request**
   - From home, click "Submit New Request"
   - Fill in the form
   - Click "Submit"

3. **Approve a Request**
   - In the list, click the green checkmark ✓ on a pending request

4. **Reject a Request**
   - In the list, click the red X ✗ on a pending request

5. **View Details**
   - Click the eye icon 👁 to see full request details in a dialog

6. **Delete a Request**
   - Click the trash icon 🗑 and confirm deletion

---

## 🛠 Development Commands

### Frontend Only
```bash
npm run serve     # Development server with hot reload
npm run watch     # Build and watch for changes
npm run build     # Production build
npm run lint      # Run linter
```

### Backend Only
```bash
dotnet build      # Build the project
dotnet run        # Run the application
```

---

## 📁 Key Files to Customize

### Frontend
- **`ClientApp/components/LeaveRequest/`** - Leave request components
- **`ClientApp/Services/LeaveRequestService.ts`** - API service
- **`ClientApp/Models/LeaveRequestModel.ts`** - Data model
- **`ClientApp/router.ts`** - Routes configuration

### Backend
- **`Controller/LeaveRequestController.cs`** - API endpoints
- **`Models/LeaveRequest.cs`** - Data model
- **`appsettings.json`** - Application configuration

---

## 🎨 UI Components (Vuetify 1.5)

The application uses Vuetify 1.5 components:
- `v-card` - Cards for layout
- `v-data-table` - Data table for list view
- `v-form` - Form validation
- `v-text-field` - Input fields
- `v-select` - Dropdown selections
- `v-date-picker` - Date selection
- `v-dialog` - Modal dialogs
- `v-chip` - Status indicators
- `v-btn` - Buttons
- `v-icon` - Material icons

---

## 🔧 Troubleshooting

### Port Already in Use
If port 5000 is busy, edit `Properties/launchSettings.json`:
```json
"applicationUrl": "http://0.0.0.0:5001/"
```

### npm install Fails
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Build Errors
Ensure you have:
- .NET Core 3.1 SDK installed
- Node.js 12+ installed
- npm 6+ installed

Check versions:
```bash
dotnet --version    # Should be 3.1.x
node --version      # Should be 12.x or higher
npm --version       # Should be 6.x or higher
```

---

## 📚 Learn More

- **README.md** - Full documentation
- **PROJECT_SUMMARY.md** - Complete file list and structure
- **Vuetify 1.5 Docs** - https://v15.vuetifyjs.com/
- **Vue.js 2.6 Docs** - https://v2.vuejs.org/

---

## ✅ Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Application runs (`dotnet run`)
- [ ] Home page loads at http://localhost:5000/applications/leaverequest/
- [ ] Can navigate to leave requests list
- [ ] Can submit a new leave request
- [ ] Can approve/reject requests
- [ ] Can view request details

---

**Happy Coding! 🎉**

For questions or issues, refer to the README.md file.
