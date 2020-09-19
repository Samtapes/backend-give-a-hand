
exports.up = function(knex) {
    return knex.schema.createTable('cargos', function(table){
        table.increments().primary();

        table.string('name').notNullable();
        table.string('phrase', 1000).notNullable();
        table.string('photo').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cargos');
};
