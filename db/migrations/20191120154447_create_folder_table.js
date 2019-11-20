
exports.up = knex =>
  knex.schema.createTable('folder', table => {
    table.increments('id').unsigned().primary();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('title', 255).notNull();
<<<<<<< HEAD:db/migrations/20191120154447_create_folder_table.js
    table.string('description', 3000).nullable();
=======
    table.string('body', 10000).notNull();
>>>>>>> e492e3dec77885cca510aa60cccc69bd770dd331:db/migrations/20191113144817_create_post_table.js
    table.timestamps(true, true);
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('folder');
