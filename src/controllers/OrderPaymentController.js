const knex = require("../database/knex");

const AppError = require("../utils/AppError");

class OrderPaymentController {
  async update(request, response){
    const { orders_id } = request.params;
    const { paid } = request.body;
    const user_id = request.user.id;

    const [user] = await knex("users").where({id: user_id});
    
    if(user.is_admin === "false"){
      throw new AppError("Somente o administrador pode efetuar esta operação", 401);
    };
    
    await knex("order_payment").update({ paid }).where({orders_id});
    
    return response.status(201).json();
  };

  async show(request, response){
    const { orders_id } = request.params;
    
    const order = await knex("order_payment").where({orders_id});
    
    return response.status(201).json(order);
  };
};

module.exports = OrderPaymentController;