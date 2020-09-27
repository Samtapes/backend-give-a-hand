const connection = require('../database/connection');

module.exports = {

    // Getting solved requests
    async index (req,res){

        // Getting how much solved requests have
        const count = await connection('casos_resolvidos').select('quantity').first();


        // Returning OK
        return res.json(count);
    },


    // Updating solved requests
    async edit (req,res){

        // Getting the request ID
        const { id } = req.params;

        // Deleting the request
        const deleteRes = await connection('pedidos').where('id', id).delete();

        // If the request doesn't exist
        if(deleteRes === 0){
            return res.json({error: "Esse pedido não existe!"});
        }


        // Getting the actual value of solved requests
        const actual_value = await connection('casos_resolvidos').select('quantity').first();
        
        // Updating this value
        const quantity =  1 + actual_value['quantity'];


        // Updating in the database
        await connection('casos_resolvidos').where('id', 1).update({
            quantity: quantity
        })

        // Returning the new quantity
        return res.json({quantity: quantity})
    },


    // Creating
    async create (req,res) {
        const [id] = await connection('casos_resolvidos').insert({
            quantity: 0
        });

        return res.json({id});
    }
}