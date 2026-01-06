# Setup Instructions

## Frontend Setup

1. **Install dependencies** in the frontend folder:
```bash
npm install
```

2. **Start the frontend development server**:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## Backend Setup

1. **Navigate to backend folder**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the backend server**:
```bash
npm run dev
```
or for production:
```bash
npm start
```
The backend will run on `http://localhost:5000`

## Features

### Registration
- Username, email, password required
- Password validation (minimum 6 characters)
- Duplicate email prevention
- Passwords hashed with bcrypt

### Login
- Email and password authentication
- JWT token generation
- Token stored in localStorage

### Search
- Protected route (requires login token)
- Search scientific terms by name or definition
- Pre-populated with 10 sample scientific terms
- Results display with definitions, categories, and examples

## Database Schema

### Users Table
- id (INTEGER PRIMARY KEY)
## Backend Setup (FastAPI)
5. Gravity
1. **Create a Python virtual environment and install dependencies**:
```bash
cd ScientifiTerminology/backend_fastapi
python -m venv .venv
.
\venv\Scripts\activate   # on Windows
pip install -r requirements.txt
```
6. Ecosystem
2. **Start the FastAPI server**:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
7. Osmosis
The backend will run on `http://localhost:8000` and exposes `/search` and `/` endpoints.
8. Kinetic Energy
9. Enzyme
10. Polymer

## Testing Flow

1. Go to `http://localhost:5173`
2. Click "Register here" and create an account
3. Login with your credentials
4. Try searching for terms like: "Photosynthesis", "Biology", "Energy", etc.

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for session management
- Duplicate email prevention in database
- Unique username and email constraints
- Protected search route with token verification
