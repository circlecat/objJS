
exports.up = knex =>
  knex.schema.createTable('category-dictionary', table => {
    table.increments('id').unsigned().primary();
    table.integer('dictionaryId').unsigned().notNullable();
    table.foreign('dictionaryId').references('dictionary.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('categoryId').unsigned().notNullable();
    table.foreign('categoryId').references('category.id').onDelete('CASCADE').onUpdate('CASCADE');
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('category-dictionary');
