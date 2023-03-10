class ShowOrderIsPaidService {
  
  constructor(orderPaymentRepository){
    this.orderPaymentRepository = orderPaymentRepository;
  };

  async execute(orders_id){
    
    const order = await this.orderPaymentRepository.showOrderById({orders_id});
    
    return order;
  };
};

module.exports = ShowOrderIsPaidService;