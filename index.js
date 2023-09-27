require('dotenv').config()

let express = require('express');
let app = express();
const port = process.env.PORT;
const bodeParser = require('body-parser');
const routes = require('./routes/index')

app.use(bodeParser.urlencoded({ extended: false }));
app.use(bodeParser.json());

app.use('/api', routes)

app.listen(port, () => console.log('server started on ' + port + ' port'))

// test update render 