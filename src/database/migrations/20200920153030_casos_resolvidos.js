
exports.up = function(knex) {
    return knex.schema.createTable('casos_resolvidos', function(table) {
        table.increments().primary();

        table.integer('quantity').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('casos_resolvidos');
};
