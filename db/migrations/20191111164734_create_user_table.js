exports.up = knex =>
  knex.schema.createTable('user', table => {
    table.increments('id').unsigned().primary();
    table.string('email', 255).notNull();
    table.string('password').notNull();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTableIfExists('user');
