const connection = require('../database/connection');

module.exports = {

    // Listando pedidos
    async index (req,res){
        const page = req.query;

        const requests = await connection('pedidos').select('*');

        return res.json(requests)
    },



    // Criar Pedido
    async create (req,res) {
        const { request, description, adress, photo } = req.body;

        const user_id = req.headers.authorization;

        const [id] = await connection('pedidos').insert({
            request,
            description,
            adress,
            photo,
            user_id
        });

        return res.json({id})
    },



    // Editar Pedido
    async edit (req,res) {
        const { request, description, adress, photo } = req.body;

        const user_id = req.headers.authorization;

        const { id } = req.params;


        const canEdit = await connection('pedidos').select('id').where('user_id', user_id).where('id', id).first();
        

        // If is another user trying to edit an another user request
        if(!canEdit){
            return res.json({error: "Something wrong!"})
        }


        await connection('pedidos').where('id', id).update({
            request,
            description,
            adress,
            photo,
            user_id
        });

        return res.json(await connection('pedidos').select('id').where('request', request).where('description', description).where('user_id', user_id).first())
    },



    // Deletar Pedido
    async delete (req,res) {
        const user_id = req.headers.authorization;

        const { id } = req.params;


        const canDelete = await connection('pedidos').select('id').where('user_id', user_id).where('id', id).first();
        

        // If is another user trying to delete an another user request
        if(!canDelete){
            return res.json({error: "Something wrong!"})
        }


        await connection('pedidos').where('user_id', user_id).where('id', id).delete();

        return res.status(204).send();
    }
}