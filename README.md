# HRMS Lite - Human Resource Management System

A lightweight, full-stack HRMS web application for managing employees and attendance records.

## 🚀 Live Demo

- **Frontend**: [Your Vercel/Netlify URL]
- **Backend API**: [Your Render/Railway URL]
- **API Documentation**: [Your Backend URL]/docs

## 📋 Tech Stack

### Frontend
- **React** (v18+) - UI library with functional components and hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with glassmorphism and gradients

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

### Database
- **PostgreSQL** - Production database (Render/Railway/Supabase)
- **SQLite** - Local development fallback

## ✨ Features

### Employee Management
- ➕ Add new employees with validation
- 📋 View all employees in a table
- 🗑️ Delete employees
- ✅ Duplicate ID/Email prevention
- 📧 Email format validation

### Attendance Management
- ✓ Mark attendance (Present/Absent)
- 📅 Date-based tracking
- 🔍 Filter by employee
- 🚫 Duplicate attendance prevention
- ⏰ Future date validation

### UI/UX Features
- 🎨 Modern dark theme with glassmorphism
- 🌈 Gradient accents and smooth animations
- 📱 Fully responsive design
- ⚡ Loading states and spinners
- 🎯 Empty states with helpful messages
- ⚠️ Error handling with user-friendly messages
- ✅ Success notifications

## 🛠️ Local Setup

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL (optional, SQLite used by default)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. (Optional) Set database URL:
```bash
# Windows
set DATABASE_URL=postgresql://user:password@localhost/hrms

# macOS/Linux
export DATABASE_URL=postgresql://user:password@localhost/hrms
```

6. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file if needed:
```env
VITE_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🐳 Docker Setup

You can run the entire stack using Docker and Docker Compose.

### 1. Prerequisites
- Docker installed
- Docker Compose installed

### 2. Run with Docker Compose
From the project root:
```bash
docker-compose up --build
```

This will:
1. Start a **PostgreSQL** database container.
2. Build and start the **FastAPI** backend container.
3. Build and start the **React (Nginx)** frontend container.

### 3. Access the application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: localhost:5432 (User: `user`, Pass: `password`, DB: `hrms`)

### 4. Stopping the containers
```bash
docker-compose down
```

## 📡 API Endpoints

### Employees
- `POST /employees/` - Create new employee
- `GET /employees/` - Get all employees
- `GET /employees/{employee_id}` - Get employee by ID
- `DELETE /employees/{employee_id}` - Delete employee

### Attendance
- `POST /attendance/` - Mark attendance
- `GET /attendance/` - Get all attendance records
- `GET /attendance/{employee_id}` - Get attendance for specific employee

## 🚀 Deployment

### Backend (Render/Railway)

1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable:
   - `DATABASE_URL` - Your PostgreSQL connection string
6. Deploy!

### Frontend (Vercel/Netlify)

1. Create a new project
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` - Your backend URL
6. Deploy!

### Database (Render/Railway/Supabase)

1. Create a PostgreSQL database
2. Copy the connection string
3. Add it to your backend environment variables as `DATABASE_URL`

## 📝 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required)
- Employee ID is unique and manually assigned
- Attendance can only be marked once per employee per day
- Dates cannot be in the future
- All fields are required

### Limitations
- No user authentication/authorization
- No payroll management
- No leave management
- No employee profile editing (only add/delete)
- No attendance editing/deletion
- No reporting or analytics dashboard
- No file uploads (documents, photos)
- No email notifications

## 🎯 Future Enhancements

- [ ] User authentication and role-based access
- [ ] Employee profile editing
- [ ] Attendance editing/deletion
- [ ] Date range filtering
- [ ] Export to CSV/PDF
- [ ] Dashboard with statistics
- [ ] Leave management
- [ ] Department management
- [ ] Search and advanced filtering

## 📂 Project Structure

```
HRM/
├── backend/
│   ├── __init__.py
│   ├── main.py          # FastAPI app and routes
│   ├── database.py      # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── crud.py          # Database operations
│   └── requirements.txt # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeManagement.jsx
│   │   │   └── AttendanceManagement.jsx
│   │   ├── api.js       # API service
│   │   ├── App.jsx      # Main component
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Styles
│   ├── .env             # Environment variables
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🐛 Troubleshooting

### Backend Issues

**Database connection error:**
- Ensure PostgreSQL is running (if using PostgreSQL)
- Check DATABASE_URL format: `postgresql://user:password@host:port/database`
- For local development, SQLite will be used automatically if DATABASE_URL is not set

**CORS errors:**
- Ensure frontend URL is added to CORS origins in `main.py`
- Check that API_URL in frontend `.env` is correct

### Frontend Issues

**API calls failing:**
- Verify backend is running
- Check `VITE_API_URL` in `.env` file
- Ensure no trailing slash in API URL

**Build errors:**
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `npm run dev -- --force`

## 📄 License

This project is created for educational/evaluation purposes.

## 👨‍💻 Author

Built with ❤️ using React, FastAPI, and PostgreSQL
