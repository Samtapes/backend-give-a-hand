const connection = require('../database/connection');

module.exports = {

    // Listing Requests
    async index (req,res){

        // Getting the requests page in the route
        const { page = 1 } = req.query;

        // Counting how much reqeust have in the total
        const [ count ] = await connection('pedidos').count();


        // Getting all the request and joining the user name with the request
        const requests = await connection('pedidos')
            .join('users', 'users.id', '=', 'pedidos.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['pedidos.*', 'users.name']);


        // Returning in the header the requests count
        res.header('X-Total-Count', count['count(*)']);


        // Returning the requests
        return res.json(requests)
    },








    // Create Request
    async create (req,res) {

        // Getting data in the "form"
        const { request, description, adress, photo } = req.body;


        // Getting the user ID
        const user_id = req.headers.authorization;


        // Creating request in the database
        const [id] = await connection('pedidos').insert({
            request,
            description,
            adress,
            photo,
            user_id
        });


        // Returning request ID
        return res.json({id})
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
        

        // If is another user trying to delete an another user request
        if(!canDelete){
            return res.json({error: "Something wrong!"})
        }


        // Deleting the request
        await connection('pedidos').where('user_id', user_id).where('id', id).delete();


        // Returning OK
        return res.status(204).send();
    }
}