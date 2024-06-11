import express from 'express';
const { json, urlencoded } = express;
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/auth.js";
import vegetablesRouter from "./routes/vegetables.js";
import articleRouter from "./routes/article.js";
import benefitRouter from "./routes/benefit.js";
import authRouter from "./routes/auth.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/vegetables", vegetablesRouter);
app.use("/articles", articleRouter);
app.use("/benefits", benefitRouter);
app.use("/auth", authRouter);

export default app;
