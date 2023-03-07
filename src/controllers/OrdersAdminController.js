const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const sqliteConnection = require('../database/sqlite');

class OrdersAdminController {
  
  async index(request, response){
    const user_id = request.user.id;

    const [user] = await knex("users").where({id: user_id});

    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };

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

module.exports = OrdersAdminController;