import express from 'express';
import { config } from './config';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet'; //  <-- NEW
import authRoutes from './routes/authRoutes';
import spotifyRoutes from './routes/spotifyRoutes';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

// Add Helmet to set security headers
app.use(helmet());

// Use CORS. Adjust origin in production.
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://your-frontend-domain.com'
      : 'http://localhost:5173',
    credentials: true,
  })
);

// Morgan logging with Winston
app.use(
  morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// Mount routes
app.use('/auth', authRoutes);
app.use('/api/spotify', spotifyRoutes);

// Centralized error handling
interface Error {
  status?: number;
  message?: string;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
