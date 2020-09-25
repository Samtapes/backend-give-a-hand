// Tabela casos resolvidos
exports.up = function(knex) {
    return knex.schema.createTable('casos_resolvidos', function(table) {
        table.increments().primary();

        table.integer('quantity').notNullable();
    })
};

// Função para derrubar tabela caso dê ruim
exports.down = function(knex) {
    return knex.schema.dropTable('casos_resolvidos');
};
