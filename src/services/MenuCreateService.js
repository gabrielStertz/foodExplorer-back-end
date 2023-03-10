const AppError = require("../utils/AppError");

class MenuCreateService {
  
  constructor(menuRepository, userRepository){
    this.menuRepository = menuRepository;
    this.userRepository = userRepository;
  };

  async execute({user_id, name, type, description, price, ingredients}){
    const user = await this.userRepository.findById({id: user_id});
    
    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };
    
    await this.menuRepository.createMenu({name, type, description, price, ingredients});
  };
};

module.exports = MenuCreateService;