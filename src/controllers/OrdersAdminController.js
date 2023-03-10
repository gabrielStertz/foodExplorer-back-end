const OrdersRepository = require("../repositories/OrdersRepository");
const UserRepository = require("../repositories/UserRepository");

const IndexOrdersByStatusService = require("../services/IndexOrdersByStatusService");
const UpdateOrderService = require("../services/UpdateOrderService");

class OrdersAdminController {
  
  async index(request, response){
    const user_id = request.user.id;

    const ordersRepository = new OrdersRepository();
    const userRepository = new UserRepository();
    const indexOrdersByStatusService = new IndexOrdersByStatusService(ordersRepository, userRepository);

    const orders = await indexOrdersByStatusService.execute({user_id});

    return response.json(orders);
  };

  async update(request, response){
    const { status } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const ordersRepository = new OrdersRepository();
    const userRepository = new UserRepository();
    const updateOrderService = new UpdateOrderService(ordersRepository, userRepository);

    await updateOrderService.execute({id, status, user_id});

    return response.json();
  };

};

module.exports = OrdersAdminController;