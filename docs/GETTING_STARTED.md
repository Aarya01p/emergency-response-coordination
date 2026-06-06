# Getting Started Guide

## Prerequisites

- Node.js 16+
- Docker and Docker Compose
- PostgreSQL 13+
- OpenAI API Key
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Aarya01p/emergency-response-coordination.git
cd emergency-response-coordination
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Backend
BACKEND_PORT=5000
BACKEND_HOST=localhost
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=emergency_user
DB_PASSWORD=emergency_password
DB_NAME=emergency_response_db

# Frontend
FRONTEND_PORT=3000
REACT_APP_API_URL=http://localhost:5000/api

# AI Configuration
OPENAI_API_KEY=your_openai_api_key_here
AI_MODEL=gpt-4
AI_TEMPERATURE=0.7

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

### 3. Install Dependencies (Local Development)

If running locally without Docker:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# AI Engine
cd ../ai-engine
npm install

cd ..
```

### 4. Start the Application

#### Option A: Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis on port 6379
- Backend API on port 5000
- Frontend on port 3000
- AI Engine service

#### Option B: Local Development

**Terminal 1 - Database:**
```bash
# Make sure PostgreSQL is running
psql -U emergency_user -d emergency_response_db
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```

**Terminal 4 - AI Engine:**
```bash
cd ai-engine
npm run dev
```

### 5. Database Setup

Run database migrations:

```bash
# With Docker
docker-compose exec backend npm run migrate

# Or locally
cd backend
npm run migrate
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health**: http://localhost:5000/api/health

## First Time Login

1. Go to http://localhost:3000/login
2. Click "Register" or use the registration endpoint
3. Create your account with email and password
4. Log in with your credentials

## Project Structure

```
emergency-response-coordination/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── index.ts        # Entry point
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, error handling
│   │   ├── database/       # DB connection & migrations
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React dashboard
│   ├── src/
│   │   ├── App.tsx         # Main component
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── store/          # Redux state management
│   │   ├── services/       # API client
│   │   └── styles/         # CSS/Tailwind
│   ├── package.json
│   └── tsconfig.json
├── ai-engine/              # AI/ML service
│   ├── src/
│   │   ├── index.ts        # Entry point
│   │   ├── services/       # AI services
│   │   ├── database/       # DB connection
│   │   └── utils/          # Utilities
│   ├── package.json
│   └── tsconfig.json
├── database/               # Database configuration
│   └── schema.sql          # Database schema
├── docker/                 # Docker configurations
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── Dockerfile.ai-engine
│   └── README.md
├── docs/                   # Documentation
│   ├── API_DOCS.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
└── docker-compose.yml      # Docker Compose configuration
```

## Key Features

### 1. Incident Reporting
- Real-time incident submission
- AI-powered categorization
- Severity assessment
- Geolocation tracking

### 2. Resource Coordination
- Real-time resource tracking
- Smart allocation
- Availability management
- Capacity planning

### 3. Alert System
- Context-aware notifications
- Multi-channel delivery (SMS, Email, Push)
- Alert escalation
- Recipient management

### 4. Operational Dashboard
- Real-time incident monitoring
- Resource availability tracking
- Analytics and reporting
- Geospatial visualization

### 5. AI-Powered Features
- Incident categorization
- Severity prediction
- Resource optimization
- Anomaly detection

## Troubleshooting

### Database Connection Failed
```bash
# Check if PostgreSQL is running
ps aux | grep postgres

# Or using Docker
docker-compose ps
```

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
lsof -i :5432  # Database

# Kill process
kill -9 <PID>
```

### OpenAI API Key Issues
- Verify your API key in `.env`
- Check OpenAI account has sufficient credits
- Ensure API key has necessary permissions

### Docker Issues
```bash
# Clean up containers
docker-compose down -v

# Rebuild containers
docker-compose build --no-cache

# View logs
docker-compose logs -f
```

## Next Steps

1. Read the [Architecture Documentation](./ARCHITECTURE.md)
2. Review [API Documentation](./API_DOCS.md)
3. Check [Deployment Guide](./DEPLOYMENT.md)
4. Explore AI engine capabilities
5. Set up monitoring and logging

## Support

For issues or questions:
1. Check the documentation
2. Review GitHub issues
3. Create a new issue with detailed information

## License

MIT License - See LICENSE file
