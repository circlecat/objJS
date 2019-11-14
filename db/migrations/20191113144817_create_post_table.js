
exports.up = knex =>
  knex.schema.createTable('post', table => {
    table.increments('id').unsigned().primary();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('title', 255).notNull();
    table.string('body', 10000).notNull();
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('post');
