const connection = require('../database/connection');

module.exports = {

    // Creating user account
    async create (req,res) {
        const {name, email, password, admin} = req.body;
    
        if(await (await connection('users').where('email', email)).length > 0){
            return res.status(401).json({error: "Esse email já está em uso!"})
        }
    
        const [id] = await connection('users').insert({
            name,
            email,
            password,
            admin
        })
    
        return res.json({id});
    }
}