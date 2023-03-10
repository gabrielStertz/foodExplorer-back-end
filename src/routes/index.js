const { Router } = require("express");

const usersRouter = require("./users.routes");
const menuRouter = require("./menu.routes");
const favoritesRouter = require("./favorites.routes");
const ordersRouter = require("./orders.routes");
const ordersAdminRouter = require("./ordersAdmin.routes");
const orderPaymentRouter = require("./orderPayment.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/menu", menuRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/orders", ordersRouter);
routes.use("/orders-admin", ordersAdminRouter);
routes.use("/order-payment", orderPaymentRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;