const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

//dotenv configs
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect(`${MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json());
app.use(routes);

app.post('/users', (request, response) => {
    console.log(request.body);
    return response.json({ message: 'Conexão realizada' });
});

server.listen(process.env.PORT || 3333);
