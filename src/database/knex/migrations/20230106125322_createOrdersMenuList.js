
exports.up = knex => knex.schema.createTable("order_menu_list", table => {
  table.increments("id");
  table.integer("orders_id").references("id").inTable("orders").onDelete("CASCADE");
  table.integer("menu_id").references("id").inTable("menu").onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("order_menu_list");