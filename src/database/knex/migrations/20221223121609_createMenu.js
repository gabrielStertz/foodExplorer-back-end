
exports.up = knex => knex.schema.createTable("menu", table => {
  table.increments("id");
  table.text("name");
  table.text("type");
  table.text("description");
  table.text("price");
  table.text("picture").default(null);
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("menu");
