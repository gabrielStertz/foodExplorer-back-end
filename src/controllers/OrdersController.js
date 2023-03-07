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

    await knex("order_payment").insert({orders_id});

    return response.status(201).json({orders_id});
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

  async index(request, response){
    const user_id = request.user.id;

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
    })
    


    return response.json(ordersWithNames);
  };

};

module.exports = OrdersController;