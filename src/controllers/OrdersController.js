const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const sqliteConnection = require('../database/sqlite');

class OrdersController {
  async create(request, response){
    const { order_menu_list } = request.body;
    const user_id = request.user.id;

    const orders_id = await knex("orders").insert({
      user_id
    });

    const orderMenuListInsert = order_menu_list.map(item => {
      return {
        orders_id,
        menu_id: item
      }
    });

    await knex("order_menu_list").insert(orderMenuListInsert);

    return response.status(201).json();
  };

  async show(request, response){
    const { id } = request.params;

    const order = await knex("orders").where({ id }).first();
    const order_menu_list = await knex("order_menu_list")
    .where({ orders_id: id })
    .innerJoin("menu", "menu.id", "order_menu_list.menu_id");


    return response.json({
      ...order,
      order_menu_list
    });

  };

  async delete(request, response){
    const { id } = request.params;

    await knex("orders").where({ id }).delete();

    return response.json();
  };

  async index(request, response){
    const user_id = request.user.id;

    const orders = await knex("orders")
    .where({user_id})
    .orderBy("created_at")

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
    })
    


    return response.json(ordersWithNames);
  };

  async update(request, response){
    const { status } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const [user] = await knex("users").where({id: user_id});

    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };

    const order = await knex("orders")
    .where({id})
    .first();

    if(!order){
      throw new AppError("Pedido não existe");
    };

    await database.run(`
      UPDATE orders SET
      status = ?,
      user_id = ?,
      created_at = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`, [status, order.user_id, order.created_at, id]);
    
    return response.json();

  };

};

module.exports = OrdersController;