import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import corsOptions from './configs/cors';
import { PORT } from './configs/constants';
import logger from './configs/logger';
import authRouter from './features/auth';

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.get('/healthcheck', (req, res) => {
  logger.info('Healthcheck OK');
  res.send('OK');
});

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});