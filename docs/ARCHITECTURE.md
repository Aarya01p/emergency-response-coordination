# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           React Dashboard (Frontend)                  │  │
│  │  - Real-time Incident Monitoring                     │  │
│  │  - Resource Management                               │  │
│  │  - Alert Management                                  │  │
│  │  - Map-based Visualization                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      │ HTTP/WebSocket
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                   API Layer                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     Express.js REST API & WebSocket Server           │  │
│  │  - Authentication & Authorization                    │  │
│  │  - Incident Management                               │  │
│  │  - Resource Coordination                             │  │
│  │  - Alert System                                      │  │
│  │  - Real-time Updates (Socket.io)                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┬──────────────────────────────────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
         │            │            │
┌────────▼──┐ ┌──────▼───┐ ┌──────▼────┐
│   AI      │ │ Database │ │  Cache    │
│  Engine   │ │PostgreSQL│ │  Redis    │
│           │ │          │ │           │
│ - LLM     │ │ - Users  │ │ - Sessions│
│ - ML      │ │ - Incidents
│ - Incident│ │ - Resources
│   Classify│ │ - Alerts │ │ - Data    │
│ - Severity│ │ - History│ │ - Cache   │
│ - Resource│ │          │ │           │
│ Optimized │ │          │ │           │
│ - Anomaly │ │          │ │           │
│ Detection │ │          │ │           │
└───────────┘ └──────────┘ └───────────┘
```

## Component Architecture

### 1. Frontend (React)

**Stack:**
- React 18
- Redux Toolkit (State Management)
- TypeScript
- Material-UI (Components)
- React Router (Navigation)
- Axios (HTTP Client)
- Socket.io Client (Real-time)

**Key Components:**
- Authentication (Login/Register)
- Dashboard (Overview)
- Incident Reporting
- Resource Management
- Alert Panel
- Map Visualization

**Features:**
- Responsive Design
- Real-time Updates
- Role-based UI
- Offline Support (Planned)

### 2. Backend (Express.js)

**Stack:**
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Redis
- Socket.io
- JWT Authentication

**Modules:**
- **Auth Service**: User authentication and authorization
- **Incident Service**: CRUD operations for incidents
- **Resource Service**: Resource tracking and allocation
- **Alert Service**: Alert generation and delivery
- **Dashboard Service**: Analytics and statistics
- **WebSocket Manager**: Real-time communication

**Key Features:**
- RESTful API
- JWT-based Authentication
- Role-based Access Control (RBAC)
- Real-time WebSocket updates
- Error Handling & Logging
- Rate Limiting

### 3. AI/ML Engine

**Stack:**
- Node.js with TypeScript
- OpenAI API (GPT-4)
- TensorFlow.js (Planned)
- PostgreSQL

**Services:**

#### 3.1 Incident Categorizer
```typescript
- Input: Incident title, description
- Process: LLM-based classification
- Output: Category, Severity, Confidence, Reasoning
- Categories: FIRE, MEDICAL, ACCIDENT, NATURAL_DISASTER, SECURITY, OTHER
- Severities: LOW, MEDIUM, HIGH, CRITICAL
```

#### 3.2 Resource Optimizer
```typescript
- Input: Incident type, severity, available resources
- Process: Allocation matrix + availability matching
- Output: Recommended resources, Response time estimate, Optimization score
- Optimization: Matches resource types to incident requirements
```

#### 3.3 Anomaly Detector
```typescript
- Input: Incident data, historical patterns
- Process: Statistical analysis of historical data
- Output: Anomaly score, Description
- Detects: Unusual frequency, Severity patterns, Geographic clusters
```

#### 3.4 Resource Need Assessor
```typescript
- Input: Incident category, severity, description
- Process: LLM-based assessment
- Output: List of required resource types
```

### 4. Database (PostgreSQL)

**Schema:**

```sql
Tables:
- users: User accounts and roles
- incidents: Reported incidents
- resources: Emergency resources
- alerts: System alerts
- response_teams: Team management
- team_members: Team composition
- incident_history: Audit trail
- ai_categorizations: AI results
- audit_logs: System audit logs
```

**Key Features:**
- ACID compliance
- Foreign key relationships
- Indexes on frequently queried columns
- Audit logging

### 5. Cache Layer (Redis)

**Purpose:**
- Session storage
- Real-time data caching
- Rate limiting
- Message queuing

**Data Stored:**
- User sessions
- Cached incident data
- Resource availability
- Notification queue

## Data Flow

### Incident Reporting Flow

```
1. User submits incident via Frontend
   ↓
2. Frontend sends POST /incidents to Backend
   ↓
3. Backend validates and stores in Database
   ↓
4. Backend triggers AI Engine
   ↓
5. AI Engine categorizes and assesses resources
   ↓
6. Results stored in Database
   ↓
7. Backend sends updates via WebSocket
   ↓
8. Frontend updates Dashboard in real-time
   ↓
9. Alerts generated and sent to recipients
```

### Real-time Update Flow

```
1. Backend receives incident update
   ↓
2. Database updated
   ↓
3. Redis cache invalidated
   ↓
4. WebSocket broadcast to connected clients
   ↓
5. Frontend receives update
   ↓
6. UI updated without page refresh
```

## Security Architecture

### Authentication
- JWT tokens with expiration
- Password hashing with bcryptjs
- Secure token storage in localStorage

### Authorization
- Role-based Access Control (RBAC)
- Route-level authorization
- Resource-level authorization

### Data Protection
- HTTPS/TLS in production
- Password encryption
- Sensitive data logging prevention
- Input validation and sanitization

### Audit & Compliance
- Audit logging for all operations
- User activity tracking
- Incident history preservation
- Compliance ready (HIPAA, GDPR preparation)

## Scalability Considerations

### Database Scaling
- Connection pooling
- Read replicas (Planned)
- Query optimization with indexes
- Partitioning for large tables (Planned)

### API Scaling
- Load balancing (Planned)
- Horizontal scaling with Docker
- Caching strategy
- Rate limiting

### Real-time Scaling
- Socket.io adapter for multi-instance (Planned)
- Redis for cross-instance communication
- Message queue system (Planned)

## Deployment Architecture

### Development
- Local Docker Compose setup
- All services in one network
- Hot reloading enabled

### Production (Planned)
- Kubernetes orchestration
- Separate service deployments
- Managed database (AWS RDS, Azure Database)
- CDN for static assets
- Load balancer
- Auto-scaling

## Monitoring & Logging

### Logging Strategy
- Application logs: Winston
- Request logs: Morgan (Planned)
- Error tracking: Sentry (Planned)
- Log aggregation: ELK Stack (Planned)

### Monitoring (Planned)
- Performance metrics: Prometheus
- Dashboard: Grafana
- Uptime monitoring: Datadog
- Alert triggers: Critical events

## Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|----------|
| Frontend | React | 18.2.0 |
| State Mgmt | Redux Toolkit | 1.9.7 |
| UI Framework | Material-UI | 5.14.14 |
| Backend | Express.js | 4.18.2 |
| Runtime | Node.js | 18+ |
| Language | TypeScript | 5.3.3 |
| Database | PostgreSQL | 15 |
| Cache | Redis | 7 |
| Real-time | Socket.io | 4.5.4 |
| AI/ML | OpenAI API | Latest |
| Auth | JWT | Standard |
| Password | bcryptjs | 2.4.3 |
| Validation | Joi | 17.11.0 |
| Containerization | Docker | Latest |
| Orchestration | Docker Compose | 3.8 |

## Future Enhancements

1. **Machine Learning**
   - Custom ML models for prediction
   - Pattern recognition
   - Resource usage optimization

2. **Advanced Analytics**
   - Incident trends
   - Response time analysis
   - Resource utilization reports

3. **Integration**
   - Third-party emergency systems
   - Weather API integration
   - Traffic management systems
   - Notification services (SMS, Email, Push)

4. **Mobile Application**
   - React Native app
   - Offline capabilities
   - Push notifications

5. **Advanced Features**
   - Predictive incident modeling
   - Automatic resource pre-positioning
   - Multi-agency coordination
   - Video/Live stream integration
