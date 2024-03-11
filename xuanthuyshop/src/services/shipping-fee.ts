import { TransactionBaseService, ShippingOption } from "@medusajs/medusa";

class ShippingFeeService extends TransactionBaseService {
    private;

    constructor(container: any) {
        super(container);
    }

    getFee(shippingOption: ShippingOption) {
        shippingOption.data.id = "giao-ha";
        return shippingOption.amount * 1000 + 999;
    }
}

export default ShippingFeeService;
