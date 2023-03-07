const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ensureAuthenticated, ordersController.create);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.get("/", ensureAuthenticated, ordersController.index);

module.exports = ordersRoutes;