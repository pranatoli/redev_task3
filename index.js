require('dotenv').config()

let express = require('express');
let app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/index');
const Sentry = require('@sentry/node');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

Sentry.init({
    dns: 'https://86b2967863a72e1e52d7eb37ec896b60@o4505951837880320.ingest.sentry.io/4505952053231616'
});

const swaggerOptioins = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Customer API",
            description: "Customer Api Information",
            contact: {
                name: "Anatoli"
            },
            servers: [`http://localhost:${port}/`],
            version: "1.0.0"
        }
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptioins);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(express.json())
app.use('/api', routes);

app.listen(port, () => console.log('server started on ' + port + ' port'))

// test update render 
console.log('hello dev');