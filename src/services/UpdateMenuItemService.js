const AppError = require("../utils/AppError");

class UpdateMenuItemService {
  constructor(menuRepository, userRepository){
    this.menuRepository = menuRepository;
    this.userRepository = userRepository;
  };
  async execute({ name, type, description, price, ingredients, id, user_id }){
    const user = await this.userRepository.findById({id: user_id});

    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };

    await this.menuRepository.updateMenuItem({ name, type, description, price, ingredients, id });
  };
};

module.exports = UpdateMenuItemService;