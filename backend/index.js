const express = require('express');

const app = express();

app.use(express.json());

//HTTP Methods: GET, POST, PUT, DELETE

//Tipos de parametros
//query params -> req.query -> usados geralmente em metodo get ( filtros, ordenação, paginação, ...)
//route params -> req.params -> usados geralmente em metodo put e delete (identificar um recurso na alteração ou remoção)
//body ->  req.body -> usados principalmente em metodos post e put (dados para criação ou alteração de um registro)

app.post('/users', (request, response) => {
    console.log(request.body);
    return response.json({ message: 'Oieeeerr'});
});

app.listen(3333);
