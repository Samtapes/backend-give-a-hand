// Tabela usuários
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments().primary();

        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();

        table.boolean('admin').notNullable();
    })
};

// Função para derrubar tabela caso dê ruim
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
