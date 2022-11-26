const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/* Middleware */
app.use(express.json()); 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true} ));
app.use(express.urlencoded({ extended: true }));

/* Routes */
const appRoutes = require('../src/routes/app.routes')(app)

const port = 3015
app.listen(port, () => {
    console.log("Listening on port ", port)
})
