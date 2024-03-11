// Read docs here https://docs.medusajs.com/modules/carts-and-checkout/backend/add-fulfillment-provider
import {
    AbstractFulfillmentService,
    Cart,
    Fulfillment,
    LineItem,
    Logger,
    Order,
} from "@medusajs/medusa";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";

class GiaoHangNhanhService extends AbstractFulfillmentService {
    static identifier = "giao-hang-nhanh";

    constructor(container, options) {
        super(container);
        // you can access options here

        // you can also initialize a client that
        // communicates with a third-party service.
        // this.client = new Client(options);
    }

    async getFulfillmentOptions(): Promise<any[]> {
        return [
            {
                id: "giao-hang-nhanh",
            },
        ];
    }

    async validateFulfillmentData(
        optionData: { [x: string]: unknown },
        data: { [x: string]: unknown },
        cart: Cart
    ): Promise<Record<string, unknown>> {
        return data;
    }

    async validateOption(data: { [x: string]: unknown }): Promise<boolean> {
        return data.id == "giao-hang-nhanh";
    }

    async canCalculate(data: { [x: string]: unknown }): Promise<boolean> {
        return data.id === "giao-hang-nhanh";
    }

    async calculatePrice(
        optionData: { [x: string]: unknown },
        data: { [x: string]: unknown },
        cart: Cart
    ): Promise<number> {
        return 123;
    }

    async createFulfillment(
        data: { [x: string]: unknown },
        items: LineItem[],
        order: Order,
        fulfillment: Fulfillment
    ): Promise<{ [x: string]: unknown }> {
        // No data is being sent anywhere
        // No data to be stored in the fulfillment's data object
        return {};
    }

    async cancelFulfillment(fulfillment: {
        [x: string]: unknown;
    }): Promise<any> {
        return {};
    }

    async createReturn(
        returnOrder: CreateReturnType
    ): Promise<Record<string, unknown>> {
        return {};
    }

    async getFulfillmentDocuments(data: {
        [x: string]: unknown;
    }): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getReturnDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getShipmentDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async retrieveDocuments(
        fulfillmentData: Record<string, unknown>,
        documentType: "invoice" | "label"
    ): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export default GiaoHangNhanhService;
