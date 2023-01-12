const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.delete("/:id", favoritesController.delete);
favoritesRoutes.get("/:user_id", favoritesController.index);

module.exports = favoritesRoutes;