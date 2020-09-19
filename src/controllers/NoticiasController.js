const connection = require('../database/connection');


module.exports = {
    async index (req,res) {
        const noticias = await connection('noticias').select('*');
    
        return res.json(noticias);
    },


    async create (req,res) {
        const { title, content, photo } = req.body;
    
        await connection('noticias').insert({
            title,
            content,
            photo
        });
    
        return res.json(await connection('noticias').select('id').where('title', title).first());
    },


    async edit (req,res) {
        const { title, content, photo } = req.body;
        const noticia_id = req.headers.noticia;
    
        await connection('noticias').where('id', noticia_id).update({
            title,
            content,
            photo
        })
    
        return res.json(await connection('noticias').select('id').where('title', title).first());
    },


    async delete (req,res) {
        const noticia_id = req.headers.noticia;
    
        try{
            const delRes = await connection('noticias').where('id', noticia_id).delete();
    
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