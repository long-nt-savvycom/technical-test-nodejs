import 'dotenv/config';
import configs from './configs';

const swaggerAutoGen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    version: '1.0', // by default: '1.0.0'
    title: 'REST API', // by default: 'REST API'
    description: 'for MINI GAME SERVER', // by default: ''
  },
  host: `localhost:${configs.server.port}`, // by default: ''
  basePath: '/v1', // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '', // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object
  components: {
    schemas: {
      loginSchema: {
        username: 'abc124',
        password: 'abc123',
      },
      defineItemSchema: {
        name: 'Gun',
        description: 'Can fire',
      },
      buyItemSchema: {
        itemId: '9a84f41f-be07-456a-a277-41a3cdbc2fdc',
      },
      updateItemLevelSchema: {
        userItemId: '9a84f41f-be07-456a-a277-41a3cdbc2fdc',
        level: 2,
      },
      removeUserItemSchema: {
        userItemId: '9a84f41f-be07-456a-a277-41a3cdbc2fdc',
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routers/index.ts'];

swaggerAutoGen(outputFile, endpointsFiles, doc);
