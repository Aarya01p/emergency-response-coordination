# Project Structure Overview

```
emergency-response-coordination/
│
├── README.md                          # Project overview and features
├── CHANGELOG.md                       # Version history
├── LICENSE                            # MIT License
├── docker-compose.yml                 # Docker Compose orchestration
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore rules
│
├── backend/                           # Express.js API Server
│   ├── src/
│   │   ├── index.ts                   # Server entry point
│   │   ├── database/
│   │   │   ├── connection.ts          # Database connection setup
│   │   │   └── migrations/
│   │   │       └── migrate.ts         # Database migration runner
│   │   ├── routes/
│   │   │   ├── auth.ts                # Authentication endpoints
│   │   │   ├── incidents.ts           # Incident CRUD operations
│   │   │   ├── resources.ts           # Resource management
│   │   │   ├── alerts.ts              # Alert system
│   │   │   └── dashboard.ts           # Dashboard statistics
│   │   ├── middleware/
│   │   │   ├── auth.ts                # JWT authentication
│   │   │   └── errorHandler.ts        # Error handling
│   │   ├── services/
│   │   │   ├── incidentService.ts     # Business logic
│   │   │   └── resourceService.ts     # Resource logic
│   │   └── utils/
│   │       └── logger.ts              # Logging utility
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile                     # (in docker/ folder)
│
├── frontend/                          # React Dashboard
│   ├── src/
│   │   ├── App.tsx                    # Main App component
│   │   ├── index.tsx                  # React entry point
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx          # Dashboard page
│   │   │   ├── IncidentReport.tsx     # Incident reporting
│   │   │   ├── Resources.tsx          # Resource management
│   │   │   ├── Alerts.tsx             # Alert management
│   │   │   ├── Login.tsx              # Login page
│   │   │   └── NotFound.tsx           # 404 page
│   │   ├── components/
│   │   │   ├── Layout.tsx             # Page layout
│   │   │   ├── Navbar.tsx             # Top navigation
│   │   │   ├── Sidebar.tsx            # Side navigation
│   │   │   ├── PrivateRoute.tsx       # Protected routes
│   │   │   ├── Dashboard/
│   │   │   │   ├── StatsCard.tsx      # Statistics card
│   │   │   │   ├── IncidentList.tsx   # Incident list
│   │   │   │   ├── IncidentMap.tsx    # Map component
│   │   │   │   └── AlertPanel.tsx     # Alert panel
│   │   │   └── Common/
│   │   │       ├── Loading.tsx        # Loading spinner
│   │   │       └── Modal.tsx          # Modal component
│   │   ├── services/
│   │   │   └── api.ts                 # API client setup
│   │   ├── store/
│   │   │   ├── index.ts               # Redux store
│   │   │   ├── authSlice.ts           # Auth state slice
│   │   │   └── incidentSlice.ts       # Incident state slice
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript types
│   │   └── styles/
│   │       └── index.css              # Global styles
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile                     # (in docker/ folder)
│
├── ai-engine/                         # AI/ML Service
│   ├── src/
│   │   ├── index.ts                   # AI Engine entry point
│   │   ├── services/
│   │   │   ├── categorizer.ts         # Incident categorization
│   │   │   ├── resourceOptimizer.ts   # Resource optimization
│   │   │   ├── anomalyDetector.ts     # Anomaly detection
│   │   │   └── resourceAssessor.ts    # Resource needs assessment
│   │   ├── database/
│   │   │   └── connection.ts          # Database connection
│   │   └── utils/
│   │       └── logger.ts              # Logging utility
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile                     # (in docker/ folder)
│
├── database/                          # Database Configuration
│   ├── schema.sql                     # Database schema definition
│   └── README.md                      # Database documentation
│
├── docker/                            # Docker Configurations
│   ├── Dockerfile.backend             # Backend container
│   ├── Dockerfile.frontend            # Frontend container
│   ├── Dockerfile.ai-engine           # AI Engine container
│   └── README.md                      # Docker documentation
│
├── docs/                              # Documentation
│   ├── API_DOCS.md                    # API endpoints documentation
│   ├── GETTING_STARTED.md             # Installation and setup guide
│   ├── ARCHITECTURE.md                # System architecture details
│   ├── DEPLOYMENT.md                  # Deployment procedures
│   ├── CONTRIBUTING.md                # Contributing guidelines
│   └── ROADMAP.md                     # Feature roadmap
│
├── tests/                             # Test Suite (Planned)
│   ├── unit/
│   │   ├── backend/
│   │   └── frontend/
│   ├── integration/
│   └── e2e/
│
└── scripts/                           # Utility Scripts (Planned)
    ├── setup.sh                       # Project setup
    ├── deploy.sh                      # Deployment script
    └── backup.sh                      # Database backup
```

## File Descriptions

### Root Level
- **README.md**: Project overview, features, and quick start
- **docker-compose.yml**: Orchestrates all services
- **.env.example**: Template for environment variables
- **.gitignore**: Files to ignore in git

### Backend Directory
- **src/index.ts**: Express server initialization
- **src/routes/**: API endpoint handlers
- **src/middleware/**: Express middleware (auth, errors)
- **src/database/**: Database connection and migrations
- **src/services/**: Business logic layer
- **src/utils/**: Helper functions and logging

### Frontend Directory
- **src/App.tsx**: Main React component with routing
- **src/pages/**: Page-level components
- **src/components/**: Reusable UI components
- **src/services/**: API client configuration
- **src/store/**: Redux state management
- **src/types/**: TypeScript type definitions

### AI Engine Directory
- **src/services/**: AI/ML service implementations
- **src/database/**: Database connection
- **src/utils/**: Utilities and logging

### Documentation
- **API_DOCS.md**: Complete API endpoint reference
- **GETTING_STARTED.md**: Setup and installation instructions
- **ARCHITECTURE.md**: System design and components
- **DEPLOYMENT.md**: Production deployment guide
- **CONTRIBUTING.md**: Contribution guidelines
- **ROADMAP.md**: Future features and enhancements

## Key Technologies

### Backend
- Node.js with Express.js
- TypeScript for type safety
- PostgreSQL for persistent data
- Redis for caching
- Socket.io for real-time updates
- OpenAI API for AI features

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Material-UI for components
- Axios for HTTP requests
- Socket.io client for real-time
- React Router for navigation

### Infrastructure
- Docker for containerization
- Docker Compose for orchestration
- PostgreSQL 15
- Redis 7

## Data Flow

1. **Incident Submission**
   - Frontend → Backend API → Database
   - AI Engine processes → Database
   - WebSocket update to Frontend

2. **Real-time Updates**
   - Database change → Backend notification
   - WebSocket broadcast → Frontend update
   - UI refreshes without reload

3. **Alert Generation**
   - Incident triggers alert logic
   - Alert service creates records
   - Notifications sent to users
   - Dashboard updated

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- RBAC (Role-Based Access Control)
- Input validation and sanitization
- CORS configuration
- Helmet for HTTP headers
- Rate limiting
- Audit logging

## Performance Considerations

- Database connection pooling
- Redis caching layer
- Indexed database queries
- Optimized React rendering
- Lazy loading components
- API response compression

## Monitoring & Logging

- Winston logging for backend
- Application logs in `logs/` directory
- Error tracking and reporting
- Health check endpoints
- Performance monitoring (Planned)
- Metrics collection (Planned)

## Getting Started

See [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) for detailed setup instructions.

Quick start:
```bash
cp .env.example .env
docker-compose up -d
```

Then visit:
- Frontend: http://localhost:3000
- API: http://localhost:5000/api
- Health: http://localhost:5000/api/health
