import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { Logger } from './utils/logger';
import { connectDatabase } from './database/connection';
import { errorHandler } from './middleware/errorHandler';

// Routes
import incidentRoutes from './routes/incidents';
import resourceRoutes from './routes/resources';
import alertRoutes from './routes/alerts';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';

dotenv.config();

const logger = new Logger('Server');
const app: Express = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.SOCKET_IO_CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = parseInt(process.env.PORT || '10000', 10);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDatabase()
  .then(() => {
    logger.info('Database connected successfully');
  })
  .catch((err) => {
    logger.error('Failed to connect to database:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// WebSocket Events
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('subscribe_incidents', (userId) => {
    socket.join(`user:${userId}`);
    logger.info(`User ${userId} subscribed to incidents`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error Handler (must be last)
app.use(errorHandler);

server.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { app, io };
server.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { app, io };
