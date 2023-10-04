require('dotenv').config()

let express = require('express');
let app = express();
const port = process.env.PORT;
const routes = require('./routes/index');
const Sentry = require('@sentry/node');

Sentry.init({
    dns: 'https://86b2967863a72e1e52d7eb37ec896b60@o4505951837880320.ingest.sentry.io/4505952053231616'
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(express.json())

app.use('/api', routes);

app.listen(port, () => console.log('server started on ' + port + ' port'))

// test update render 
console.log('hello dev');