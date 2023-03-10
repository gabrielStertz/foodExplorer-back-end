const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DeleteMenuItemService {
  
  constructor(menuRepository, userRepository){
    this.menuRepository = menuRepository;
    this.userRepository = userRepository;
  };

  async execute({id, user_id}){
    const diskStorage = new DiskStorage();

    const user = await this.userRepository.findById({id: user_id});
    
    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };

    const menu = await this.menuRepository.findMenuItemById(id);
    await diskStorage.deleteFile(menu.picture);
    
    await this.menuRepository.deleteMenuItem(id);
  };
};

module.exports = DeleteMenuItemService;