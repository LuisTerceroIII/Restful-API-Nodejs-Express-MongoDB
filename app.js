const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt')
require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(expressJWT({
    secret: process.env.SECRET_TOKEN_KEY,
    algorithms: ['sha1', 'RS256', 'HS256']
}).unless({path: ["/api/v2/session/login", "/api/v2/session/register"]}))

/**All routes files are in this folder, node search in index.js and there is redirected*/
app.use(require('./Routes'));

app.set('view engine', 'pug');

app.listen(port, () => console.log(`Listening on port ${port}!`));