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
import axios from "axios";

const GIAO_HANG_HANH_API_TOKEN = process.env.GIAO_HANG_NHANH_API_TOKEN ?? "";
const GIAO_HANG_NHANH_SHOP_ID = 4927242;
const GIAO_HANG_NHANH_DEFAULT_WEIGHT = 200;
const GIAO_HANG_HANH_SON_TRA_DISCTRICT_ID = 1528;

type GiaoHangNhanhFeeRequestParams = {
    to_district_id: number;
    to_ward_code: string;
    cod_value: number;
};
type GiaoHangNhanhFeeData = {
    total: number;
    service_fee: number;
    insurance_fee: number;
    pick_station_fee: number;
    coupon_value: number;
    r2s_fee: number;
    document_return: number;
    double_check: number;
    cod_fee: number;
    pick_remote_areas_fee: number;
    deliver_remote_areas_fee: number;
    cod_failed_fee: number;
};
type GiaoHangNhanhFeeResponse = {
    code: number;
    message: string;
    data: GiaoHangNhanhFeeData;
};

async function fetchFirstAvailableService(
    to_district: number
): Promise<number> {
    const { data } = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
        {
            headers: {
                token: GIAO_HANG_HANH_API_TOKEN,
            },
            params: {
                shop_id: GIAO_HANG_NHANH_SHOP_ID,
                from_district: GIAO_HANG_HANH_SON_TRA_DISCTRICT_ID,
                to_district,
            },
        }
    );
    return parseInt(data.data[0].service_id);
}

async function fetchGiaoHangNhanhWard(
    params: GiaoHangNhanhFeeRequestParams
): Promise<GiaoHangNhanhFeeData> {
    const service_id = await fetchFirstAvailableService(params.to_district_id);
    const { data } = await axios.get<GiaoHangNhanhFeeResponse>(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
            headers: {
                token: GIAO_HANG_HANH_API_TOKEN,
            },
            params: {
                ...params,
                shop_id: GIAO_HANG_NHANH_SHOP_ID,
                weight: GIAO_HANG_NHANH_DEFAULT_WEIGHT,
                service_id,
                insurance_value: params.cod_value,
            },
        }
    );
    return data.data;
}

class GiaoHangNhanhService extends AbstractFulfillmentService {
    static identifier = "giao-hang-nhanh";
    private logger: any;

    constructor(container, options) {
        super(container);
        // you can access options here
        this.logger = container.logger;

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
        const { shipping_address } = cart;
        const { address_2, province } = shipping_address;
        let total = 123;
        try {
            const data = await fetchGiaoHangNhanhWard({
                to_district_id: +province,
                to_ward_code: address_2,
                cod_value: cart.subtotal ?? 0,
            });
            total = +data.total;
        } catch (e) {
            this.logger.error(e);
        }
        return total;
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
