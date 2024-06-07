import express from 'express';
import path, { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';

import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import vegetablesRouter from './routes/vegetables.js';
import articleRouter from './routes/article.js';
import benefitRouter from './routes/benefit.js';
import authRouter from './routes/auth.js';

const { json, urlencoded } = express;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const admin = new AdminJS({});
const adminRouter = AdminJSExpress.buildRouter(admin);

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
app.use(admin.options.rootPath, adminRouter);

/// Public Uploads
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

export default app;
