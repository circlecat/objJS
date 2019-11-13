exports.up = knex =>
  knex.schema.createTable('user', table => {
    table.increments('id').unsigned().primary();
    table.string('username', 25).notNull();
    table.string('email', 255).notNull();
    table.string('password', 255).notNull();
    table.integer('tokenVersion').notNull().defaultTo(0);
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTableIfExists('user');
