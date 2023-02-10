const knex = require("../database/knex");

class FavoritesController {
  async create(request, response){
    const { id } = request.params;
    const user_id = request.user.id;

    const favoriteInsert = {
      user_id,
      menu_id: id
    };

    await knex("favorites").insert(favoriteInsert);

    return response.status(201).json();
  };

  async delete(request, response){
    const { id } = request.params;

    await knex("favorites").where({ id }).delete();

    return response.json();
  };

  async index(request, response){
    const user_id = request.user.id;
    
    const favorites = await knex("favorites")
    .where({user_id})
    .innerJoin("menu", "menu.id", "favorites.menu_id")
    .orderBy("name");

    let menuWithIngredients;
    let menuIngredients = [];
    for(let i = 0; i < favorites.length; i++){
      menuIngredients[i] = await knex("ingredients").where({menu_id: favorites[i].id});
    };
    menuWithIngredients = favorites.map((item_menu, index) => {
      return {
        ...item_menu,
        ingredients: menuIngredients[index]
      };
    });
    

    return response.json(menuWithIngredients);
  };

};

module.exports = FavoritesController;