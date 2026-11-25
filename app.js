const express = require('express');
const helmet = require('helmet');

const PORT = 3000;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { MONGO_URL } = require('./utils/config');
const limiter = require('./utils/limiter');

mongoose.connect(MONGO_URL);
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const allowedOrigins = new Set([
  'http://localhost:3001', // frontend durante desarrollo
  'https://mrvacs.github.io', // frontend en producción
]);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(helmet());
app.set('trust proxy', 1); // trust first proxy
app.use(limiter);
app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}`);
});
