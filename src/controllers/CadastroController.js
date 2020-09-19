const connection = require('../database/connection');

module.exports = {
    async create (req,res) {
        const {name, email, password, admin} = req.body;
    
        if(await (await connection('users').where('email', email)).length > 0){
            return res.status(401).json({error: "Esse email já está em uso!"})
        }
    
        await connection('users').insert({
            name,
            email,
            password,
            admin
        })
    
        return res.json(await connection('users').select('id').where('name', name).where('email', email).first());
    }
}