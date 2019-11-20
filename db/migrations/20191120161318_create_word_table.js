
exports.up = knex =>
  knex.schema.createTable('word', table => {
    table.increments('id').unsigned().primary();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('dictionaryId').unsigned().notNullable();
    table.foreign('dictionaryId').references('dictionary.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('word', 255).notNull();
    table.string('translation', 255).notNull();
    table.timestamps(true, true);
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('word');
