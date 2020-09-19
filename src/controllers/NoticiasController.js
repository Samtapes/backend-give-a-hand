const connection = require('../database/connection');


module.exports = {
    // Listar notícias
    async index (req,res) {
        const noticias = await connection('noticias').select('*');
    
        return res.json(noticias);
    },


    // Criar notícia
    async create (req,res) {
        const { title, content, photo } = req.body;
    
        const [id] = await connection('noticias').insert({
            title,
            content,
            photo
        });
    
        return res.json({id});
    },


    // Editar notícia
    async edit (req,res) {
        const { title, content, photo } = req.body;
        const { id } = req.params;
    
        await connection('noticias').where('id', id).update({
            title,
            content,
            photo
        })
    
        return res.json({id});
    },


    // Deletar notícia
    async delete (req,res) {
        const { id } = req.params;
    
        try{
            const delRes = await connection('noticias').where('id', id).delete();
    
            if(delRes === 0){
                return res.json({error: "Não existe essa notícia!"});
            }
    
            else{
                return res.status(204).send();
            }
        }
    
        catch(err){
            return res.json({error: err})
        }
    }
}