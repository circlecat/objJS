
exports.up = knex =>
  knex.schema.createTable('folder', table => {
    table.increments('id').unsigned().primary();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('title', 255).notNull();
    table.string('description', 3000).nullable();
    table.timestamps(true, true);
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('folder');
