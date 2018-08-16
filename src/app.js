import DatabaseConnection from './utils/DatabaseConnection';
import WebSocketService from '../bin/WebSocketService';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
dotenv.load();

//Connect to the database
new DatabaseConnection().connect();

let app = express();

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(require('./middlewares/responseTransformer'));
app.use(require('./middlewares/requestValidator'));
app.use(require('./middlewares/jwtValidator'));

//ROUTES
app.use('/', require('./routes/index'));
app.use('/clients', require('./routes/clients'));
app.use('/answers', require('./routes/answers'));
app.use('/questions', require('./routes/questions'));
app.use('/users', require('./routes/users'));
app.use('/authenticate', require('./routes/authenticate'));

//Error handler
app.use(require('./middlewares/erroHandling'));

//Create server
const server = http.createServer(app);
server.listen(process.env.SERVER_PORT || '3000');

//Initialize Socket
WebSocketService.createNotificationSocket(server);

