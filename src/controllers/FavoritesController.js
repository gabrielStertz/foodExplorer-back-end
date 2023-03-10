const FavoritesRepository = require("../repositories/FavoritesRepository");

class FavoritesController {
  async create(request, response){
    const { menu_id } = request.params;
    const user_id = request.user.id;

    const favoritesRepository = new FavoritesRepository();

    const favoriteInsert = {
      user_id,
      menu_id
    };

    
    await favoritesRepository.create(favoriteInsert);
    
    return response.status(201).json();
  };

  async delete(request, response){
    const { menu_id } = request.params;

    const favoritesRepository = new FavoritesRepository();

    await favoritesRepository.delete(menu_id);

    return response.json();
  };

  async index(request, response){
    const user_id = request.user.id;
    
    const favoritesRepository = new FavoritesRepository();
    
    const menu = await favoritesRepository.findFavoritesByUserId(user_id);

    return response.json(menu);
  };

};

module.exports = FavoritesController;