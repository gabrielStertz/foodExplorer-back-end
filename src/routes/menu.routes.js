const { Router } = require("express");

const MenuController = require("../controllers/MenuController");

const menuRoutes = Router();

const menuController = new MenuController();

menuRoutes.post("/", menuController.create);
menuRoutes.get("/:id", menuController.show);
menuRoutes.delete("/:id", menuController.delete);
menuRoutes.get("/", menuController.index);

module.exports = menuRoutes;