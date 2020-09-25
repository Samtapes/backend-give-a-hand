const connection = require('../database/connection');

module.exports = {

    // Listing the users
    async index (req,res) {
        const users = await connection('users').select('*');
    
        return res.json(users);
    },


    // Create session
    async create (req,res) {

        // Getting the user data
        const { name, password } = req.body;
    
        const id = await connection('users').select('id').where('name', name).where('password', password).first()
        // If the name and the password are correct
        if(id){

            // Getting if the user is admin
            const [ admin ]  = await connection('users').select('admin').where('name', name).where('password', password);

            // Returning if the user is admin
            res.header('X-Is-Admin', admin['admin']);

            return res.json({permission: "permited", id: id.id})
        }
    

        // if aren't
        else{
            return res.status(401).send()
        }
    },
}