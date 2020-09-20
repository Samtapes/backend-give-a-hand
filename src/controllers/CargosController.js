const connection = require('../database/connection');

module.exports = {

    // Listing positions
    async index (req,res){

        // Getting all the positions
        const cargos = await connection('cargos').select('*');


        // Returning the positions
        return res.json(cargos);
    },







    // Create new position
    async create (req,res){

        // Getting the data in the "forms"
        const { name, phrase, photo } = req.body;


        // Creating the new position
        const [id] = await connection('cargos').insert({
            name,
            phrase,
            photo
        });


        // Returning the position ID
        return res.json({id});
    },







    // Edir position
    async edit (req,res){

        // Getting the data in the "form"
        const { name, phrase, photo } = req.body;

        // Getting the position ID
        const { id } = req.params;


        // Updating the position
        await connection('cargos').where('id', id).update({
            name,
            phrase,
            photo
        });

        // Returning OK
        return res.status(204).send();
    },







    // Delete position
    async delete (req,res){

        // Getting the position ID
        const { id } = req.params;

        // Deleting the position
        const delRes = await connection('cargos').where('id', id).delete();

        
        // If the position doesn't exist
        if(delRes === 0){
            return res.json({error: "Esse cargo não existe"})
        }

        // If the position exist
        else{
            return res.status(204).send();
        }
    }
}