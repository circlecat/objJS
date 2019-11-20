
exports.up = knex =>
  knex.schema.createTable('dictionary', table => {
    table.increments('id').unsigned().primary();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('folderId').unsigned().nullable();
    table.foreign('folderId').references('folder.id').onDelete('SET NULL').onUpdate('CASCADE');
    table.string('title', 255).notNull();
    table.string('description', 3000).nullable();
    table.boolean('public').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('dictionary');
