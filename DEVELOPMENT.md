# Development Tips & Best Practices

## Local Development Setup

### Quick Start
```bash
# Clone and setup
git clone https://github.com/Aarya01p/emergency-response-coordination.git
cd emergency-response-coordination
cp .env.example .env

# Using Docker (recommended)
docker-compose up -d

# Or manually
npm install
cd backend && npm install
cd ../frontend && npm install
cd ../ai-engine && npm install
```

## Common Development Tasks

### Running Services

**Backend Development**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Frontend Development**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

**AI Engine**
```bash
cd ai-engine
npm run dev
```

### Database Management

**Run Migrations**
```bash
cd backend
npm run migrate
```

**Connect to Database**
```bash
psql -h localhost -U emergency_user -d emergency_response_db
```

**View Database**
```sql
-- List all tables
\dt

-- View incidents
SELECT * FROM incidents;

-- View users
SELECT id, email, role FROM users;
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- incidents.test.ts

# Generate coverage report
npm test -- --coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Build TypeScript
npm run build
```

## Debugging

### Backend Debugging

**VS Code Launch Configuration** (`.vscode/launch.json`)
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Backend Debug",
      "program": "${workspaceFolder}/backend/src/index.ts",
      "preLaunchTask": "tsc: build",
      "outFiles": ["${workspaceFolder}/backend/dist/**/*.js"]
    }
  ]
}
```

**Console Logging**
```typescript
logger.info('Message', { data: value });
logger.error('Error', error);
```

### Frontend Debugging

**React DevTools**
```bash
npm install -g react-devtools
react-devtools
```

**Redux DevTools**
- Install browser extension
- View state changes in real-time

**Network Tab**
- Check API requests in DevTools
- Inspect request/response headers

### Database Debugging

```bash
# View slow queries
SET log_min_duration_statement = 1000; -- 1 second

# Check query plans
EXPLAIN ANALYZE SELECT * FROM incidents WHERE severity = 'CRITICAL';
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "[FEATURE] Description of changes"

# Push to remote
git push origin feature/feature-name

# Create Pull Request on GitHub
```

## API Testing

### Using curl

```bash
# Get health status
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password","full_name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Create incident (with token)
curl -X POST http://localhost:5000/api/incidents \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Fire","description":"Building fire","type":"FIRE","severity":"CRITICAL","location":"123 Main St"}'
```

### Using Postman

1. Import API collection
2. Set environment variables
3. Test endpoints with pre-configured requests
4. Save responses for reference

### Using REST Client VS Code

**File: `requests.rest`**
```rest
### Health Check
GET http://localhost:5000/api/health

### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password",
  "full_name": "Test User"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password"
}
```

## Performance Optimization

### Frontend

```typescript
// Use React.memo for expensive components
const StatsCard = React.memo(({ title, value }) => (
  <Card>{title}: {value}</Card>
));

// Use useCallback for memoized callbacks
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// Use useMemo for expensive computations
const sorted = useMemo(() => {
  return items.sort();
}, [items]);
```

### Backend

```typescript
// Use database indexes
CREATE INDEX idx_incidents_status ON incidents(status);

// Use connection pooling
const pool = new Pool({ max: 20 });

// Cache expensive queries
const cached = await redis.get('key') || await query();
```

## Environment Variables

**Development** (`.env`)
```env
NODE_ENV=development
DB_HOST=localhost
OPENAI_API_KEY=sk-...
```

**Production** (`.env.production`)
```env
NODE_ENV=production
DB_HOST=prod-db.example.com
OPENAI_API_KEY=<production-key>
```

## Troubleshooting

### "Port already in use"
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

### "Database connection failed"
```bash
# Check PostgreSQL is running
psql -U postgres

# Or with Docker
docker-compose ps
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "TypeScript compilation errors"
```bash
# Rebuild project
npm run build

# Check tsconfig.json
cat tsconfig.json
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Socket.io Documentation](https://socket.io/docs/)

## Getting Help

1. Check [docs/](./docs/) directory
2. Review [GitHub Issues](https://github.com/Aarya01p/emergency-response-coordination/issues)
3. Check existing code examples
4. Ask in project discussions
5. Reach out to maintainers
