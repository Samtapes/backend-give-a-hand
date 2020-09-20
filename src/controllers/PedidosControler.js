const connection = require('../database/connection');

module.exports = {

    // Listando pedidos
    async index (req,res){
        const { page = 1 } = req.query;

        // Contando quantos pedidos possuem no total
        const [ count ] = await connection('pedidos').count();


        // Pegando todos os pedidos e dando innerjoin o nome do usuário com o pedido
        const requests = await connection('pedidos')
            .join('users', 'users.id', '=', 'pedidos.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['pedidos.*', 'users.name']);


        // Retornando no header a contagem dos pedidos
        res.header('X-Total-Count', count['count(*)']);


        // Retornando os pedidos
        return res.json(requests)
    },








    // Criar Pedido
    async create (req,res) {

        // Pegando dados do "formulário"
        const { request, description, adress, photo } = req.body;


        // Pegando a ID do usuário
        const user_id = req.headers.authorization;


        // Criando pedido no banco de dados
        const [id] = await connection('pedidos').insert({
            request,
            description,
            adress,
            photo,
            user_id
        });


        // Retornando ID do pedido
        return res.json({id})
    },








    // Editar Pedido
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
        return res.json(await connection('pedidos').select('id').where('request', request).where('description', description).where('user_id', user_id).first())
    },





    


    // Deletar Pedido
    async delete (req,res) {

        // Getting user ID in headers
        const user_id = req.headers.authorization;


        // Getting request id in the route params
        const { id } = req.params;


        // Checking if this user can edit this request solicited
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