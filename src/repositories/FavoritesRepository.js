const knex = require("../database/knex");

class FavoritesRepository {
  async create({user_id, menu_id}){
    // await knex("favorites").insert(favoriteInsert);
    await knex.raw("insert into favorites(menu_id, user_id) values(?, ?)", [menu_id, user_id])
  };
  async delete(menu_id){
    await knex("favorites").where({ menu_id }).delete();
  };

  async findFavoritesByUserId(user_id){
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

    return menuWithIngredients;
  };
};

module.exports = FavoritesRepository;