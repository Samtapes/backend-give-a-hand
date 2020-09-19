const connection = require('../database/connection');

module.exports = {
    async index (req,res) {
        const users = await connection('users').select('*');
    
        return res.json(users);
    },


    async create (req,res) {
        const { name, password } = req.body;
    
        if(await connection('users').select('id').where('name', name).where('password', password).first()){
            return res.json({permission: "permited"})
        }
    
        else{
            return res.json({error: "Conta inexistente"})
        }
    },
}