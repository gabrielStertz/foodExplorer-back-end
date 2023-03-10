const OrdersRepository = require("../repositories/OrdersRepository");

class OrdersController {
  async create(request, response){
    const { order_menu_list } = request.body;
    const user_id = request.user.id;

    const ordersRepository = new OrdersRepository();

    const order_id = await ordersRepository.create(user_id, order_menu_list);

    return response.status(201).json({order_id});
  };

  async show(request, response){
    const { id } = request.params;

    const ordersRepository = new OrdersRepository();

    const order = await ordersRepository.findOrderById(id);
    
    return response.json(order);

  };

  async index(request, response){
    const user_id = request.user.id;

    const ordersRepository = new OrdersRepository();

    const orders = await ordersRepository.findOrdersByUserId(user_id);
    
    return response.json(orders);
  };

};

module.exports = OrdersController;