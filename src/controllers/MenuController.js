const knex = require("../database/knex");

class MenuController {
  async create(request, response){
    const { name, description, price, ingredients, picture } = request.body;

    const menu_id = await knex("menu").insert({
      name,
      description,
      price,
      picture
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        menu_id,
        name: ingredient
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.status(201).json();
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
    console.log(id)
    await knex("menu").where({ id }).delete();

    return response.json();
  };

  async index(request, response){
    const { name, ingredients } = request.query;

    let menu;

    if(ingredients && !name){
      const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());
      
      menu = await knex("ingredients")
      .select([
        "menu.id",
        "menu.name",
        "menu.description",
        "menu.price",
        "menu.picture"
      ])
      .whereIn("ingredients.name", filterIngredients)
      .innerJoin("menu", "menu.id", "ingredients.menu_id")
      .orderBy("menu.name")

    } else if(name && !ingredients) {
      menu = await knex("menu")
      .whereLike("name", `%${name}%`)
      .orderBy("name")
    } else if(ingredients && name) {
      const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());
      
      menu = await knex("ingredients")
      .select([
        "menu.id",
        "menu.name",
        "menu.description",
        "menu.price",
        "menu.picture"
      ])
      .whereLike("menu.name", `%${name}%`)
      .whereIn("ingredients.name", filterIngredients)
      .innerJoin("menu", "menu.id", "ingredients.menu_id")
      .orderBy("menu.name")
    } else {
      menu = await knex("menu")
      .orderBy("name")
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

};

module.exports = MenuController;