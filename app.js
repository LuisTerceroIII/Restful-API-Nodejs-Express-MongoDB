const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/db');
const mongoose = require('mongoose')



var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes')); // Asigno una carpeta a donde deba mirar en cada request,alli econtrara las rutas.

app.set('view engine', 'pug');

app.listen(port, () => console.log(`Listening on port ${port}!`));