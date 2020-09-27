const connection = require('../database/connection');

module.exports ={
    async index (req,res) {
        const id = req.headers.authorization;       
        
        const requests = await connection('pedidos')
        .where('users.id', id)
        .join('users', 'users.id', '=', 'pedidos.user_id')
        .select(['pedidos.*', 'users.name'])

        
        return res.json(requests);
    }
}