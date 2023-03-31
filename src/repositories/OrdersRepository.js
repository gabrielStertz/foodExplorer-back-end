const knex = require("../database/knex");

const sqliteConnection = require('../database/sqlite');

class OrdersRepository {
  async create(user_id, order_menu_list){
    
    const response = await knex("orders").insert({
      user_id
    });
    
    const [orders_id] = response;
    
    const orderMenuListInsert = order_menu_list.map(item => {
      return {
        orders_id,
        menu_id: item
      }
    });

    await knex("order_menu_list").insert(orderMenuListInsert);

    await knex("order_payment").insert({orders_id});

    return orders_id;
  };

  async findOrderById(id){

    const order = await knex("orders").where({ id }).first();
    const order_menu_list = await knex("order_menu_list")
    .where({ orders_id: id })
    .innerJoin("menu", "menu.id", "order_menu_list.menu_id");
    
    const orderWithMenuList = {order, order_menu_list};

    return orderWithMenuList;
  };

  async findOrdersByUserId(user_id){
    const orders = await knex("orders")
    .where({user_id})
    .orderBy("created_at", "desc")

    let ordersWithNames;
    let order_menu_list = [];
    for(let i = 0; i < orders.length; i++){
      order_menu_list[i] = await knex('order_menu_list')
      .select(["menu.name", "order_menu_list.orders_id"])
      .where({orders_id: orders[i].id})
      .innerJoin("menu", "menu.id", "order_menu_list.menu_id");
    };  
    ordersWithNames = orders.map((order, index) => {
      
      return {
        ...order,
        menu_list: order_menu_list[index]
      }
    });

    return ordersWithNames;
  };

  async findOrdersByStatus(){
    const orders = await knex("orders")
    .whereNot("status", "Entregue")
    .orderBy("created_at", "desc")

    let ordersWithNames;
    let order_menu_list = [];
    for(let i = 0; i < orders.length; i++){
      order_menu_list[i] = await knex('order_menu_list')
      .select(["menu.name", "order_menu_list.orders_id"])
      .where({orders_id: orders[i].id})
      .innerJoin("menu", "menu.id", "order_menu_list.menu_id");
    };  
    ordersWithNames = orders.map((order, index) => {
      
      return {
        ...order,
        menu_list: order_menu_list[index]
      }
    });

    return ordersWithNames;
  };

  async updateOrder({id, status, order}){
    const database = await sqliteConnection();

    await database.run(`
      UPDATE orders SET
      status = ?,
      user_id = ?,
      created_at = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`, [status, order.user_id, order.created_at, id]);
  };

};

module.exports = OrdersRepository;