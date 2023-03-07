const { Router } = require("express");

const OrdersAdminController = require("../controllers/OrdersAdminController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersAdminRoutes = Router();

const ordersAdminController = new OrdersAdminController();

ordersAdminRoutes.get("/", ensureAuthenticated, ordersAdminController.index);
ordersAdminRoutes.put("/:id", ensureAuthenticated, ordersAdminController.update);

module.exports = ordersAdminRoutes;