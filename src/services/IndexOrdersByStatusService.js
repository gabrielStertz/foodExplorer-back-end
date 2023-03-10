const AppError = require("../utils/AppError");

class IndexOrdersByStatusService {
  constructor(ordersRepository, userRepository){
    this.ordersRepository = ordersRepository;
    this.userRepository = userRepository;
  };
  async execute({user_id}){
    const user = await this.userRepository.findById({id: user_id});
    
    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };
    
    const orders = await this.ordersRepository.findOrdersByStatus();
    
    
    return orders;
  };
};

module.exports = IndexOrdersByStatusService;