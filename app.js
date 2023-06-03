const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const limiter = require('./utils/configs/expressLimiter');
const router = require('./routes');
const { handleError } = require('./utils/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/useCors');
const { PORT, MONGO_URL } = require('./utils/configs');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(cors);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log('The service is running! Have fun!');
});
