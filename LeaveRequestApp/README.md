# Leave Request Application

A complete Najiz MicroTemplate-based leave request management application built with ASP.NET Core 3.1 and Vue.js 2.6.

## Features

- **Submit Leave Requests**: Employees can submit new leave requests with details like leave type, dates, and reason
- **View Leave Requests**: View all leave requests in a data table with filtering and sorting
- **Manage Requests**: Approve, reject, or delete leave requests
- **Status Tracking**: Track request status (Pending, Approved, Rejected)
- **Responsive UI**: Modern, mobile-friendly interface built with Vuetify 1.5

## Technology Stack

### Backend
- ASP.NET Core 3.1
- RESTful API with in-memory data storage
- Najiz Framework integration

### Frontend
- Vue.js 2.6
- TypeScript 4.5
- Vuetify 1.5
- Vue Router for navigation
- Axios for HTTP requests
- Dependency Injection with vue-di-container

### Build Tools
- MSBuild for backend
- Vue CLI 3.10 for frontend
- npm/Webpack for package management

## Project Structure

```
LeaveRequestApp/
├── ClientApp/                  # Frontend Vue.js application
│   ├── components/
│   │   ├── App/               # Root component
│   │   ├── Index/             # Home page
│   │   └── LeaveRequest/      # Leave request components
│   ├── Models/                # TypeScript models
│   ├── Services/              # Service layer (API, Loader, etc.)
│   ├── plugins/               # Vue plugins (i18n, vuetify)
│   └── shared/                # Shared utilities
├── Controller/                 # API Controllers
│   └── LeaveRequestController.cs
├── Models/                     # C# models
│   └── LeaveRequest.cs
├── Pages/                      # Razor Pages
├── Config/                     # Configuration files
├── public/                     # Static assets
└── Properties/                 # Launch settings

```

## Prerequisites

- .NET Core 3.1 SDK
- Node.js 12+ and npm
- Visual Studio 2019+ or VS Code (optional)

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd LeaveRequestApp
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Restore backend dependencies**:
   ```bash
   dotnet restore
   ```

## Build

### Frontend Build
```bash
npm run build
```

### Backend Build
```bash
dotnet build
```

## Running the Application

1. **Run the application**:
   ```bash
   dotnet run
   ```

2. **Access the application**:
   - URL: `http://localhost:5000/applications/leaverequest/`

## Development

### Frontend Development
```bash
npm run serve     # Start development server with hot reload
npm run watch     # Build and watch for changes
npm run lint      # Run linter
```

### Available Routes
- `/` - Home page with navigation cards
- `/leave-requests` - View all leave requests
- `/leave-request/new` - Submit a new leave request

## API Endpoints

### Leave Request API
- `GET /api/LeaveRequest` - Get all leave requests
- `GET /api/LeaveRequest/{id}` - Get a specific leave request
- `POST /api/LeaveRequest` - Create a new leave request
- `PUT /api/LeaveRequest/{id}` - Update a leave request
- `PATCH /api/LeaveRequest/{id}/status` - Update request status
- `DELETE /api/LeaveRequest/{id}` - Delete a leave request

## Leave Request Model

```typescript
{
  id: number;
  employeeName: string;
  leaveType: string;      // Annual Leave, Sick Leave, Personal Leave, Emergency Leave
  startDate: string;
  endDate: string;
  reason: string;
  status: string;         // Pending, Approved, Rejected
}
```

## Features Implementation

### Template Features (Preserved)
- ✅ Complete Najiz MicroTemplate structure
- ✅ AxiosService for HTTP requests
- ✅ LoaderService for loading indicators
- ✅ TelemetryService for Application Insights
- ✅ Error handling and toast notifications
- ✅ User service with authentication support
- ✅ i18n support for localization
- ✅ Service Worker for PWA capabilities

### Leave Request Features (Added)
- ✅ Leave request submission form with validation
- ✅ Leave request list with data table
- ✅ Status management (Approve/Reject/Delete)
- ✅ Request details dialog
- ✅ Responsive design with Vuetify
- ✅ RESTful API with CRUD operations
- ✅ In-memory data storage with sample data

## Configuration

### Frontend Configuration
- `vue.config.js` - Vue CLI configuration
- `tsconfig.json` - TypeScript configuration
- `babel.config.js` - Babel transpilation settings
- `.npmrc` - npm registry configuration

### Backend Configuration
- `appsettings.json` - Application settings
- `appsettings.Development.json` - Development settings
- `launchSettings.json` - Launch profiles
- `NLog.config` - Logging configuration

## Troubleshooting

### Common Issues

1. **npm install fails**:
   - Ensure `.npmrc` is properly configured
   - Check registry connectivity

2. **Build errors**:
   - Verify .NET Core 3.1 SDK is installed
   - Check Node.js version (12+)

3. **Application doesn't load**:
   - Verify port 5000 is available
   - Check if frontend build completed successfully

## License

This project is built using the Najiz MicroTemplate framework.

## Support

For issues or questions, please refer to the Najiz Framework documentation.
