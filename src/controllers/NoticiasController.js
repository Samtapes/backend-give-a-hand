const connection = require('../database/connection');


module.exports = {

    // List news
    async index (req,res) {

        // Getting all the news
        const noticias = await connection('noticias').select('*');
    

        // Retunrning all the news
        return res.json(noticias);
    },







    // Create new news
    async create (req,res) {

        // Getting data in the "form"
        const { title, content, photo } = req.body;
    
        // Creating new news
        const [id] = await connection('noticias').insert({
            title,
            content,
            photo
        });
    
        // Returning the news ID 
        return res.json({id});
    },








    // Edit news
    async edit (req,res) {

        // Getting the data in the "forms"
        const { title, content, photo } = req.body;

        // Getting the news id in the route params
        const { id } = req.params;
    

        // Updating the news
        const updateRes = await connection('noticias').where('id', id).update({
            title,
            content,
            photo
        });


        // If the news doesn't exist
        if(updateRes === 0){
            return res.json({error: "Essa notícia não existe!"});
        }
    

        // Returning OK
        return res.status(204).send();
    },







    // Delete news
    async delete (req,res) {

        // Getting news ID in the route params
        const { id } = req.params;
    
        try{

            // Deleting the news
            const delRes = await connection('noticias').where('id', id).delete();
    

            // If the news don't exist
            if(delRes === 0){
                return res.json({error: "Não existe essa notícia!"});
            }
    
            // If the news exist
            else{
                return res.status(204).send();
            }
        }
    
        // If get some error
        catch(err){
            return res.json({error: err})
        }
    }
}