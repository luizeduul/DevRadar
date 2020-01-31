const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

//dotenv configs
require('dotenv').config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-yqhtv.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json());
app.use(routes);

//HTTP Methods: GET, POST, PUT, DELETE

//Tipos de parametros
//query params -> req.query -> usados geralmente em metodo get ( filtros, ordenação, paginação, ...)
//route params -> req.params -> usados geralmente em metodo put e delete (identificar um recurso na alteração ou remoção)
//body ->  req.body -> usados principalmente em metodos post e put (dados para criação ou alteração de um registro)

app.post('/users', (request, response) => {
    console.log(request.body);
    return response.json({ message: 'Conexão realizada' });
});

server.listen(3333);
