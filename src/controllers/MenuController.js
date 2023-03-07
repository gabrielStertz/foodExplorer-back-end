const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class MenuController {
  async create(request, response){
    const { name, type, description, price, ingredients} = request.body;

    const user_id = request.user.id;

    const [user] = await knex("users").where({id: user_id});
    
    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };

    const menu_id = await knex("menu").insert({
      name,
      type,
      description,
      price
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        menu_id,
        name: ingredient
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  };

  async show(request, response){
    const { id } = request.params;

    const item_menu = await knex("menu").where({ id }).first();
    const ingredients = await knex("ingredients").where({ menu_id: id }).orderBy("name");


    return response.json({
      ...item_menu,
      ingredients
    });

  };

  async delete(request, response){
    const { id } = request.params;

    const user_id = request.user.id;

    const diskStorage = new DiskStorage();

    const [user] = await knex("users").where({id: user_id});

    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401)
    };

    const menu = await knex("menu").where({id});
    await diskStorage.deleteFile(menu[0].picture);
    
    await knex("menu").where({ id }).delete();

    return response.status(201).json();
  };

  async index(request, response){
    const { name } = request.query;

    let menu;

    if(name) {
      menu = await knex("menu")
      .whereLike("name", `%${name}%`)
      .orderBy("name");
    } else {
      menu = await knex("menu")
      .orderBy("name");
    };
    let menuWithIngredients;
    let menuIngredients = [];
    for(let i = 0; i < menu.length; i++){
      menuIngredients[i] = await knex("ingredients").where({menu_id: menu[i].id});
    };
    menuWithIngredients = menu.map((item_menu, index) => {
      return {
        ...item_menu,
        ingredients: menuIngredients[index]
      };
    });

    return response.json(menuWithIngredients);
  };

  async update(request, response){
    const { name, type, description, price, ingredients } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const [user] = await knex("users").where({id: user_id});

    if(user.is_admin === "false"){
      throw new AppError("Operação não permitida para este usuário", 401);
    };

    await knex("menu").update({ name, type, description, price }).where({id});

    await knex("ingredients").where({menu_id: id}).delete();

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        menu_id: id,
        name: ingredient
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  };

};

module.exports = MenuController;