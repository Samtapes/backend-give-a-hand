const express = require('express');
const routes = express.Router();

const connection = require('./database/connection');


const CadastroController = require('./controllers/CadastroController');
const LoginController = require('./controllers/LoginController');
const NoticiasController = require('./controllers/NoticiasController');
const CargosController = require('./controllers/CargosController');


// Cadastro 
routes.post('/cadastro', CadastroController.create);






// Login

// Ver contas existentes
routes.get('/login', LoginController.index);


// Logar
routes.post('/login', LoginController.create);







// Principais Notícias

// Criar principais noticias
routes.post('/noticias', NoticiasController.create);


// Ver principais noticias
routes.get('/noticias', NoticiasController.index);


// Editar principais noticias
routes.put('/noticias', NoticiasController.edit);


// Excluir notícia
routes.delete('/noticias', NoticiasController.delete);





// Principais cargos no governo

// Criar principal cargo no governo
routes.post('/cargos', CargosController.create);

routes.get('/cargos', CargosController.index);

routes.put('/cargos', CargosController.edit);

routes.delete('/cargos', CargosController.delete);



module.exports = routes;