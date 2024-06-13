import 'dotenv/config';
import { FormatResponse } from '@middleware/format-response.middleware';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import configs from './configs';
import { AppDataSource } from './database/data-source';
import { errorHandler } from './middlewares/error-handler.middleware';
import { routes } from './routers';
import swaggerFile from './swagger_output.json';
import pino from 'pino';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

const logger = pino();

app.use(compression())

app.use(cors());

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
    logger.info(`Swagger at http://localhost:${PORT}/doc`);
  })
  .catch((error) => console.log(error));
