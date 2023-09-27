require('dotenv').config()

let express = require('express');
let app = express();
const port = process.env.PORT;
const bodeParser = require('body-parser');
const routes = require('./routes/index');
const Sentry = require('@sentry/node');

Sentry.init({
    dns: 'https://0ee26c4afbbe0eb2e409a7d56d48262f@o4505951837880320.ingest.sentry.io/4505951890964480'
})

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(bodeParser.urlencoded({ extended: false }));
app.use(bodeParser.json());

app.use('/api', routes)

app.listen(port, () => console.log('server started on ' + port + ' port'))

// test update render 
console.log('hello');