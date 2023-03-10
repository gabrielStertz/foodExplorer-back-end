const AppError = require("../utils/AppError");

class UpdateOrderPaymentService {
  constructor(orderPaymentRepository, userRepository){
    this.orderPaymentRepository = orderPaymentRepository;
    this.userRepository = userRepository;
  };
  async execute({user_id, paid, orders_id}){
    const user = await this.userRepository.findById({id: user_id});

    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };

    await this.orderPaymentRepository.update({paid, orders_id});
  };
};

module.exports = UpdateOrderPaymentService;