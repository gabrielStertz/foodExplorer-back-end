const knex = require("../database/knex");

class OrderPaymentRepository {

  async update({paid, orders_id}){
    
    await knex("order_payment").update({ paid }).where({orders_id});
  };

  async showOrderById({orders_id}){
    
    const [order] = await knex("order_payment").where(orders_id);
      
    return order;
  };
};

module.exports = OrderPaymentRepository;