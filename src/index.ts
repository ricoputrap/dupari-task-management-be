import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import corsOptions from './configs/cors';
import { PORT } from './configs/constants';

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});