# Docker Configuration

## Containers

- **postgres**: PostgreSQL 15 database
- **redis**: Redis cache and real-time messaging
- **backend**: Node.js/Express API server
- **frontend**: React dashboard (served with serve)
- **ai-engine**: AI/ML processing service

## Running with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Service URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432
- Redis: localhost:6379

## Environment Configuration

Create a `.env` file in the root directory with necessary configurations.
See `.env.example` for reference.
