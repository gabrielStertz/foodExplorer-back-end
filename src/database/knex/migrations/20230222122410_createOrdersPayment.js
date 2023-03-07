
exports.up = knex => knex.schema.createTable("order_payment", table => {
  table.increments("id");
  table.integer("orders_id").references("id").inTable("orders");
  table.integer("paid").default("false");
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("order_payment");