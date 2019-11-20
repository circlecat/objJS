
exports.up = knex =>
  knex.schema.createTable('category', table => {
    table.increments('id').unsigned().primary();
    table.string('title', 255).notNull();
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('category');
