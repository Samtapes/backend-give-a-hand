const express = require('express');
const routes = express.Router();

const connection = require('./database/connection');


const CadastroController = require('./controllers/CadastroController');
const LoginController = require('./controllers/LoginController');
const NoticiasController = require('./controllers/NoticiasController');
const CargosController = require('./controllers/CargosController');
const PedidosControler = require('./controllers/PedidosControler');


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
routes.put('/noticias/:id', NoticiasController.edit);


// Excluir notícia
routes.delete('/noticias/:id', NoticiasController.delete);





// Principais cargos no governo


// Criar principal cargo no governo
routes.post('/cargos', CargosController.create);

// Pegando principais cargos no governo
routes.get('/cargos', CargosController.index);

// Editar principal cargo no governo
routes.put('/cargos/:id', CargosController.edit);

// Deletar princpal cargo no governo
routes.delete('/cargos/:id', CargosController.delete);




// Pedidos


// Criar Pedido 
routes.post('/pedidos', PedidosControler.create);

// Listar Pedido
routes.get('/pedidos', PedidosControler.index);

// Editar Pedido
routes.put('/pedidos/:id', PedidosControler.edit);

// Deletar Pedido
routes.delete('/pedidos/:id', PedidosControler.delete);


module.exports = routes;