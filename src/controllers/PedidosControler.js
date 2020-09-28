const connection = require('../database/connection');

module.exports = {

    // Listing Requests
    async index (req,res){

        // Counting how much reqeust have in the total
        const [ count ] = await connection('pedidos').count();


        // Getting all the request and joining the user name with the request
        const requests = await connection('pedidos')
            .join('users', 'users.id', '=', 'pedidos.user_id')
            .select(['pedidos.*', 'users.name']);


        // Returning in the header the requests count
        res.header('X-Total-Count', count['count(*)']);


        // Returning the requests
        return res.json(requests)
    },


    
    async specific_index (req,res) {

        const { id } = req.params;

        const request = await connection('pedidos')
            .where('pedidos.id', id)
            .join('users', 'users.id', '=', 'pedidos.user_id')
            .select(['pedidos.*', 'users.name'])
            .first();

        return res.json(request);
    },







    // Create Request
    async create (req,res) {

        // Getting data in the "form"
        const { request, description, adress, photo } = req.body;


        // Getting the user ID
        const user_id = req.headers.authorization;


        // Creating request in the database
        await connection('pedidos').insert({
            request,
            description,
            adress,
            photo,
            user_id,
        });


        // Returning request ID
        return res.status(204).send()
    },








    // Edit Request
    async edit (req,res) {

        // Getting "forms" data
        const { request, description, adress, photo } = req.body;


        // Getting user ID at request header
        const user_id = req.headers.authorization;


        // Getting request ID in the route params
        const { id } = req.params;


        // Checking if this user can edit this request solicited
        const canEdit = await connection('pedidos').select('id').where('user_id', user_id).where('id', id).first();
        

        // If is another user trying to edit an another user request
        if(!canEdit){
            return res.json({error: "Something wrong!"})
        }


        // Updating request
        await connection('pedidos').where('id', id).update({
            request,
            description,
            adress,
            photo,
            user_id
        });


        // Returning request ID
        return res.status(204).send();
    },








    // Delete Request
    async delete (req,res) {

        // Getting user ID in headers
        const user_id = req.headers.authorization;


        // Getting request id in the route params
        const { id } = req.params;


        // Checking if this user can delete this request solicited
        const canDelete = await connection('pedidos').select('id').where('user_id', user_id).where('id', id).first();


        const isAdmin = await connection('users').select('admin').where('id', user_id).first();
        

        // If is another user trying to delete an another user request
        if(!canDelete && isAdmin['admin'] === 0){
            return res.json({error: "Something wrong!"})
        }


        // Deleting the request
        const deleteRes = await connection('pedidos').where('id', id).delete();

        if(deleteRes === 0){
            return res.json({error: "Esse pedido não existe!"})
        }


        // Returning OK
        return res.status(204).send();
    }
}