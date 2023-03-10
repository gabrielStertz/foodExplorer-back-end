const AppError = require("../utils/AppError");

class UpdateOrderService {
  constructor(ordersRepository, userRepository){
    this.ordersRepository = ordersRepository;
    this.userRepository = userRepository;
  };
  async execute({id, status, user_id}){
    const user = await this.userRepository.findById({id: user_id});

    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };

    const {order} = await this.ordersRepository.findOrderById(id);

    if(!order){
      throw new AppError("Pedido não existe");
    };

    await this.ordersRepository.updateOrder({id, status, order});
  };
};

module.exports = UpdateOrderService;