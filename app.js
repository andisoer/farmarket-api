import express from 'express';
import path, { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { createServer } from 'http';

import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import vegetablesRouter from './routes/vegetables.js';
import articleRouter from './routes/article.js';
import benefitRouter from './routes/benefit.js';
import authRouter from './routes/auth.js';
import vegetableBenefitRouter from './routes/vegetables_benefit.js';
import transactionRouter from './routes/transaction.js';

const { json, urlencoded } = express;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/vegetables', vegetablesRouter);
app.use('/articles', articleRouter);
app.use('/benefits', benefitRouter);
app.use('/auth', authRouter);
app.use('/vegetable-benefits', vegetableBenefitRouter);
app.use('/transactions', transactionRouter);

/// Public Uploads
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

const server = createServer(app);

server.listen(port);

console.log(`Server running at http://${host}:${port}`);

// const PORT = process.env.PORT || 5000;

// const server = createServer(app);
// server.listen(PORT, () => {
//   console.log('Server is running....');
// });

// export default app;
