import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';

import corsOptions from './configs/cors';
import { PORT } from './configs/constants';
import logger from './configs/logger';
import authRouter from './features/auth';
import "./sentry/instrument";

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// an endpoint to test healthcheck
app.get('/healthcheck', (req, res) => {
  logger.info('Healthcheck OK');
  res.send('OK');
});

// an endpoint to test sentry
app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error");
})

app.use("/api/v1/auth", authRouter);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});