const knex = require("../database/knex");

class MenuRepository {
  async createMenu({name, type, description, price, ingredients}){

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
  };

  async findMenuItemById(id){

    const item_menu = await knex("menu").where({ id }).first();
    const ingredients = await knex("ingredients").where({ menu_id: id }).orderBy("name");

    const item = {
      ...item_menu,
      ingredients
    };

    return item;
  };

  async deleteMenuItem(id){
    await knex("menu").where({ id }).delete();
  };

  async indexMenu(name){
    
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

    return menuWithIngredients;
  };

  async updateMenuItem({ name, type, description, price, ingredients, id }){

    await knex("menu").update({ name, type, description, price }).where({id});

    await knex("ingredients").where({menu_id: id}).delete();

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        menu_id: id,
        name: ingredient
      }
    });

    await knex("ingredients").insert(ingredientsInsert);
  };

  async findMenuItemForPicture(id){
    const menu = knex("menu").where({id}).first();

    return menu;
  };

  async updateMenuItemForPicture({menu, id}){
    await knex("menu").update(menu).where({id});
  };

};

module.exports = MenuRepository;