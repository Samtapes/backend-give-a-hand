// Tabela notícias
exports.up = function(knex) {
    return knex.schema.createTable('noticias', function(table) {
        table.increments().primary();

        table.string('title').notNullable();
        table.string('content').notNullable();
        table.string('photo').notNullable();
    })
};

// Função para derrubar tabela caso dê ruim
exports.down = function(knex) {
    return knex.schema.dropTable('noticias');
};
