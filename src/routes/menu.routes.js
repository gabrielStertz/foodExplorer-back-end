const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const MenuController = require("../controllers/MenuController");
const MenuPictureController = require("../controllers/MenuPictureController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const menuRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const menuController = new MenuController();
const menuPictureController = new MenuPictureController();

menuRoutes.post("/", ensureAuthenticated, menuController.create);
menuRoutes.get("/:id", ensureAuthenticated, menuController.show);
menuRoutes.delete("/:id", ensureAuthenticated, menuController.delete);
menuRoutes.get("/", ensureAuthenticated, menuController.index);
menuRoutes.patch("/:id", ensureAuthenticated, menuController.update);
menuRoutes.patch("/picture/:id", ensureAuthenticated, upload.single("picture"), menuPictureController.update);

module.exports = menuRoutes;