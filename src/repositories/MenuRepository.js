const knex = require("../database/knex");

class MenuRepository {
  async createMenu({name, type, description, price, ingredients}){

    const response = await knex("menu").insert({
      name,
      type,
      description,
      price
    });

    const [menu_id] = response;

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
      if(menu.length === 0){
        const findIngredients = await knex("ingredients").whereLike("name", `%${name}%`);
        let menuOfIngredients = [];
        for(let i = 0; i < findIngredients.length; i++){
          [menuOfIngredients[i]] = await knex("menu").where({id: findIngredients[i].menu_id});
        };
        menu = menuOfIngredients;
      };
    } else {
      menu = await knex("menu")
      .orderBy("name");
    };
    
    return menu;
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