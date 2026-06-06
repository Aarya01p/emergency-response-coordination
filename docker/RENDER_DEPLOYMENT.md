# Render Deployment Configuration

This directory contains Dockerfiles optimized for Render deployment.

## Usage

When deploying to Render, use these Dockerfile paths:

### Backend
- Root Directory: `backend`
- Dockerfile Path: `../docker/Dockerfile.backend.render`

### Frontend
- Root Directory: `frontend`
- Dockerfile Path: `../docker/Dockerfile.frontend.render`

### AI Engine
- Root Directory: `ai-engine`
- Dockerfile Path: `../docker/Dockerfile.ai-engine.render`

## Key Differences from Regular Dockerfiles

1. **Monorepo Support**: These handle the monorepo structure properly
2. **Build Optimization**: Multi-stage builds to reduce image size
3. **Port Configuration**: Uses PORT environment variable for Render
4. **Alpine Linux**: Smaller, faster base image

## Environment Variables

Make sure to set these in Render dashboard:

```
NODE_ENV=production
BACKEND_PORT=10000
PORT=10000
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=emergency_db
OPENAI_API_KEY=sk-your-key
JWT_SECRET=your-long-random-string
```
