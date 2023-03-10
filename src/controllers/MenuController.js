const MenuRepository = require("../repositories/MenuRepository");
const UserRepository = require("../repositories/UserRepository");

const MenuCreateService = require("../services/MenuCreateService");
const DeleteMenuItemService = require("../services/DeleteMenuItemService");
const UpdateMenuItemService = require("../services/UpdateMenuItemService");

class MenuController {
  async create(request, response){
    const { name, type, description, price, ingredients} = request.body;

    const user_id = request.user.id;

    const menuRepository = new MenuRepository();
    const userRepository = new UserRepository();
    const menuCreateService = new MenuCreateService(menuRepository, userRepository);

    await menuCreateService.execute({user_id, name, type, description, price, ingredients});

    return response.status(201).json();
  };

  async show(request, response){
    const { id } = request.params;

    const menuRepository = new MenuRepository();

    const item = await menuRepository.findMenuItemById(id);


    return response.json(item);

  };

  async delete(request, response){
    const { id } = request.params;
    const user_id = request.user.id;

    const menuRepository = new MenuRepository();
    const userRepository = new UserRepository();
    const deleteMenuItemService = new DeleteMenuItemService(menuRepository, userRepository);

    await deleteMenuItemService.execute({id, user_id});
    
    return response.json();
  };

  async index(request, response){
    const { name } = request.query;

    const menuRepository = new MenuRepository();

    const menu = await menuRepository.indexMenu(name);

    return response.json(menu);
  };

  async update(request, response){
    const { name, type, description, price, ingredients } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const menuRepository = new MenuRepository();
    const userRepository = new UserRepository();
    const updateMenuItemService = new UpdateMenuItemService(menuRepository, userRepository);

    await updateMenuItemService.execute({ name, type, description, price, ingredients, id, user_id });
    
    return response.status(201).json();
  };

};

module.exports = MenuController;