const connection = require('../database/connection');

module.exports = {

    // Creating user account
    async create (req,res) {

        // Getting the data
        const {name, email, password, admin} = req.body;
    

        // Checking if already exist an user with that email
        if(await (await connection('users').where('email', email)).length > 0){
            return res.status(401).json({error: "Esse email já está em uso!"})
        }
    

        // Creating the account
        const [id] = await connection('users').insert({
            name,
            email,
            password,
            admin
        })
    

        // Returning the account ID
        return res.json({id});
    }
}