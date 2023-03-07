const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.post("/:menu_id", favoritesController.create);
favoritesRoutes.delete("/:menu_id", favoritesController.delete);
favoritesRoutes.get("/", favoritesController.index);

module.exports = favoritesRoutes;