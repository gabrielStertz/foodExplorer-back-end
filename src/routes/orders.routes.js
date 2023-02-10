const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ensureAuthenticated, ordersController.create);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", ordersController.delete);
ordersRoutes.get("/", ensureAuthenticated, ordersController.index);
ordersRoutes.put("/:id", ensureAuthenticated, ordersController.update);

module.exports = ordersRoutes;