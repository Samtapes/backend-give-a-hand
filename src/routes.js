const express = require('express');
const routes = express.Router();

const CadastroController = require('./controllers/CadastroController');
const LoginController = require('./controllers/LoginController');
const NoticiasController = require('./controllers/NoticiasController');
const CargosController = require('./controllers/CargosController');
const PedidosControler = require('./controllers/PedidosControler');


// Register
routes.post('/cadastro', CadastroController.create);






// Login

// Get all the existing accounts
routes.get('/login', LoginController.index);


// Create session
routes.post('/login', LoginController.create);







// News

// Create new news
routes.post('/noticias', NoticiasController.create);


// List news
routes.get('/noticias', NoticiasController.index);


// Edit news
routes.put('/noticias/:id', NoticiasController.edit);


// Delete news
routes.delete('/noticias/:id', NoticiasController.delete);





// Positions


// Create new position
routes.post('/cargos', CargosController.create);

// Geting all the positions
routes.get('/cargos', CargosController.index);

// Edit position
routes.put('/cargos/:id', CargosController.edit);

// Delete position
routes.delete('/cargos/:id', CargosController.delete);





// Requests


// Create new request 
routes.post('/pedidos', PedidosControler.create);

// List all the requests
routes.get('/pedidos', PedidosControler.index);

// Edit request
routes.put('/pedidos/:id', PedidosControler.edit);

// Delete request
routes.delete('/pedidos/:id', PedidosControler.delete);


module.exports = routes;