const UserRepository = require("../repositories/UserRepository");
const OrderPaymentRepository = require("../repositories/OrderPaymentRepository");

const UpdateOrderPaymentService = require("../services/UpdateOrderPaymentService");
const ShowOrderIsPaidService = require("../services/ShowOrderIsPaidService");

class OrderPaymentController {
  async update(request, response){
    const { orders_id } = request.params;
    const { paid } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const orderPaymentRepository = new OrderPaymentRepository();
    const updateOrderPaymentService = new UpdateOrderPaymentService(orderPaymentRepository, userRepository);

    await updateOrderPaymentService.execute({user_id, paid, orders_id});
    
    return response.status(201).json();
  };

  async show(request, response){
    const { orders_id } = request.params;
    
    const orderPaymentRepository = new OrderPaymentRepository();
    const showOrderIsPaidService = new ShowOrderIsPaidService(orderPaymentRepository);
    
    const order = await showOrderIsPaidService.execute({orders_id});
    
    return response.status(201).json(order);
  };
};

module.exports = OrderPaymentController;