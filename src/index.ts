// NOTE: Enable line below when build production and comment in development (TODO:FIX)
// import 'module-alias/register';
import 'dotenv/config';
import { FormatResponse } from '@middlewares/format-response.middleware';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import configs from './configs';
import { AppDataSource } from './database/data-source';
import { errorHandler } from './middlewares/error-handler.middleware';
import { routes } from './routers';
import * as swaggerFile from './swagger_output.json';
import pino from 'pino';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

const logger = pino();

app.use(compression());

app.use(cors());

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ limit: '500kb', extended: true }));

const PORT = configs.server.port;

app.get('/health', (req: express.Request, res: express.Response) => {
  res.send('OK');
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/v1/', routes);
app.use(FormatResponse);
app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    logger.info('Database connected!');

    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
    logger.info(`Swagger at http://localhost:${PORT}/doc`);

    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
      });
    });
  })
  .catch((error) => console.log(error));
