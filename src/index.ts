import 'dotenv/config';
import * as express from 'express';
import { AppDataSource } from './database/data-source';
import { routes } from './routers';
import bodyParser = require('body-parser');
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = Number(process.env.SERVER_PORT) || 8080;
console.log({ PORT });

app.get('/health', (req: express.Request, res: express.Response) => {
  res.send('OK');
});

// // GET method route
// app.get('/', (req, res) => {
//   res.send('GET request to the homepage');
// });

// // POST method route
// app.post('/', (req, res) => {
//   res.send('POST request to the homepage');
// });
app.use('/v1/', routes);
app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
