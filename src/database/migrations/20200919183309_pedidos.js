// tabela pedidos
exports.up = function(knex) {
    return knex.schema.createTable('pedidos', function(table){
        table.increments().primary();

        table.string('request').notNullable();
        table.string('description', 650).notNullable();
        table.string('adress');
        table.string('photo');

        table.integer('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    })
};

// Função para derrubar tabela caso dê ruim
exports.down = function(knex) {
    return knex.schema.dropTabe('pedidos')
};
