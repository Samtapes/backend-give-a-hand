const connection = require('../database/connection');
const { edit } = require('./NoticiasController');

module.exports = {
    async index (req,res){
        const cargos = await connection('cargos').select('*');

        return res.json(cargos);
    },

    async create (req,res){
        const { name, phrase, photo } = req.body;

        await connection('cargos').insert({
            name,
            phrase,
            photo
        });

        return res.json(await connection('cargos').select('id').where('name', name).where('phrase', phrase).first());
    },

    async edit (req,res){
        const { name, phrase, photo } = req.body;

        const cargo_id = req.headers.cargo;

        await connection('cargos').where('id', cargo_id).update({
            name,
            phrase,
            photo
        });

        return res.json(await connection('cargos').select('id').where('name', name).where('phrase', phrase).first());
    },

    async delete (req,res){
        const cargo_id = req.headers.cargo;

        const delRes = await connection('cargos').where('id', cargo_id).delete();

        if(delRes === 0){
            return res.json({error: "Esse cargo não existe"})
        }

        else{
            return res.status(204).send();
        }
    }
}