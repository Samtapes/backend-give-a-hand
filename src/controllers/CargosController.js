const connection = require('../database/connection');

module.exports = {
    
    // Listar cargos
    async index (req,res){
        const cargos = await connection('cargos').select('*');

        return res.json(cargos);
    },







    // Criar cargo
    async create (req,res){
        const { name, phrase, photo } = req.body;

        const [id] = await connection('cargos').insert({
            name,
            phrase,
            photo
        });

        return res.json({id});
    },







    // Editar cargo
    async edit (req,res){
        const { name, phrase, photo } = req.body;

        const { id } = req.params;

        await connection('cargos').where('id', id).update({
            name,
            phrase,
            photo
        });

        return res.json(await connection('cargos').select('id').where('name', name).where('phrase', phrase).first());
    },







    // Deletar cargo
    async delete (req,res){
            const { id } = req.params;

        const delRes = await connection('cargos').where('id', id).delete();

        if(delRes === 0){
            return res.json({error: "Esse cargo não existe"})
        }

        else{
            return res.status(204).send();
        }
    }
}