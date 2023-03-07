const { Router } = require("express");

const OrderPaymentController = require("../controllers/OrderPaymentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const orderPaymentRoutes = Router();

const orderPaymentController = new OrderPaymentController();

orderPaymentRoutes.put("/:orders_id", ensureAuthenticated, orderPaymentController.update);
orderPaymentRoutes.get("/:orders_id", ensureAuthenticated, orderPaymentController.show);

module.exports = orderPaymentRoutes;