
exports.up = knex => knex.schema.createTable("menu", table => {
  table.increments("id");
  table.text("name");
  table.text("type");
  table.text("description");
  table.integer("price");
  table.text("picture");
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("menu");
