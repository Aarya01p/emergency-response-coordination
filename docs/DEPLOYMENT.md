# Deployment Guide

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database backups tested
- [ ] SSL certificates obtained
- [ ] API keys validated
- [ ] Load testing completed
- [ ] Security audit performed
- [ ] Documentation updated

## Deployment Options

### Option 1: Docker Compose (Small Scale)

Best for: Development, small deployment, single server

**Steps:**

1. SSH into server
```bash
ssh user@server.com
```

2. Clone repository
```bash
git clone https://github.com/Aarya01p/emergency-response-coordination.git
cd emergency-response-coordination
```

3. Configure environment
```bash
cp .env.example .env
# Edit .env with production values
vim .env
```

4. Start services
```bash
docker-compose -f docker-compose.yml up -d
```

5. Verify deployment
```bash
curl http://localhost:5000/api/health
```

### Option 2: Kubernetes (Large Scale)

Best for: High availability, auto-scaling, enterprise

**Prerequisites:**
- kubectl installed
- Kubernetes cluster configured
- Helm (optional)

**Deployment Files:** (Create in `k8s/` directory)

```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db-host
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

**Deploy:**
```bash
kubectl apply -f k8s/
```

### Option 3: Cloud Platforms

#### AWS Deployment

**Services:**
- ECS/Fargate for containers
- RDS for PostgreSQL
- ElastiCache for Redis
- ALB for load balancing
- CloudFront for CDN

**Steps:**
1. Push images to ECR
2. Create ECS task definitions
3. Create ECS services
4. Configure load balancer
5. Set up auto-scaling

#### Azure Deployment

**Services:**
- Azure Container Instances
- Azure Database for PostgreSQL
- Azure Cache for Redis
- Application Gateway
- Azure CDN

#### Google Cloud Deployment

**Services:**
- Cloud Run for serverless
- Cloud SQL for PostgreSQL
- Memorystore for Redis
- Cloud Load Balancing
- Cloud CDN

## Production Configuration

### Environment Variables (Production)

```env
# Server
NODE_ENV=production
BACKEND_PORT=5000
FRONTEND_PORT=3000

# Database
DB_HOST=prod-db.example.com
DB_PORT=5432
DB_USER=prod_user
DB_PASSWORD=<strong_password>
DB_NAME=emergency_prod

# Security
JWT_SECRET=<long_random_string>
JWT_EXPIRES_IN=7d

# HTTPS
SSL_CERT_PATH=/etc/ssl/certs/cert.pem
SSL_KEY_PATH=/etc/ssl/private/key.pem

# API Keys
OPENAI_API_KEY=<your_key>

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/app/app.log
```

### Nginx Configuration

```nginx
upstream backend {
    server backend:5000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name example.com www.example.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;
    
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    
    # API
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket
    location /socket.io {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    
    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Database Backup Strategy

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups"
DB_NAME="emergency_prod"
DB_USER="prod_user"
DB_HOST="localhost"
RETENTION_DAYS=30

# Create backup
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME | gzip > $BACKUP_DIR/db_$(date +%Y%m%d_%H%M%S).sql.gz

# Delete old backups
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +$RETENTION_DAYS -delete
```

Schedule with crontab:
```
0 2 * * * /scripts/backup.sh
```

### Monitoring Setup

#### Health Checks

```bash
# Check backend health
curl -f http://localhost:5000/api/health || exit 1

# Check database
psql -h $DB_HOST -U $DB_USER -c "SELECT 1" || exit 1

# Check Redis
redis-cli ping || exit 1
```

#### Logging

```yaml
# docker-compose.yml (production)
version: '3.8'
services:
  backend:
    image: backend:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Rollback Procedure

```bash
# Check deployment history
docker image ls

# Rollback to previous version
docker-compose down
git checkout <previous_commit>
docker-compose up -d

# Or with Kubernetes
kubectl rollout undo deployment/backend
kubectl rollout undo deployment/frontend
```

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify and bundle code
- Use CDN for static assets
- Implement lazy loading
- Cache static content

### Backend
- Enable query result caching
- Use connection pooling
- Implement rate limiting
- Optimize database queries
- Use compression middleware

### Database
- Add appropriate indexes
- Vacuum and analyze regularly
- Monitor slow queries
- Archive old data
- Use read replicas

## Disaster Recovery

### Recovery Time Objective (RTO): 1 hour
### Recovery Point Objective (RPO): 15 minutes

**Steps:**
1. Restore from latest backup
2. Verify data integrity
3. Restart services
4. Run health checks
5. Monitor logs
6. Notify stakeholders

## Security Hardening

- [ ] Implement Web Application Firewall (WAF)
- [ ] Enable DDoS protection
- [ ] Set up intrusion detection
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Implement API rate limiting
- [ ] Use environment-specific secrets
- [ ] Enable request logging

## Monitoring Dashboards

- API response times
- Error rates
- Database query times
- Resource utilization
- User concurrent sessions
- Incident processing rate

## Support & Maintenance

- Regular backups
- Security updates
- Performance monitoring
- User support
- Incident response
- Documentation updates
