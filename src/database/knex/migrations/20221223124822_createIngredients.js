
exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.integer("menu_id").references("id").inTable("menu").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("ingredients");
