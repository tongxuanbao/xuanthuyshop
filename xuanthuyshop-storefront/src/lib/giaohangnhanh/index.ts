import { QueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GIAO_HANG_HANH_API_TOKEN = process.env.NEXT_PUBLIC_GHN_API_TOKEN ?? "";
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export interface Province {
    ProvinceID: number;
    ProvinceName: string;
    CountryID: number;
    Code: string;
    NameExtension: string[];
    IsEnable: number;
    RegionID: number;
    RegionCPN: number;
    UpdatedBy: number;
    CreatedAt: string;
    UpdatedAt: string;
    CanUpdateCOD: boolean;
    Status: number;
}
export interface District {
    DistrictID: number;
    ProvinceID: number;
    DistrictName: string;
    Code: string;
    Type: number;
    SupportType: number;
}
export interface Ward {
    WardCode: string;
    DistrictID: number;
    WardName: string;
}
interface GiaoHangNhanhResponse<TData> {
    data: TData[];
    code: number;
    message: string;
}

async function fetchGiaoHangNhanhProvice() {
    const { data } = await axios.get<GiaoHangNhanhResponse<Province>>(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
            headers: {
                Token: GIAO_HANG_HANH_API_TOKEN,
            },
        }
    );
    return data.data;
}

export function getProvinces() {
    const query = useQuery(["provinces"], fetchGiaoHangNhanhProvice, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
    });
    return query;
}

async function fetchGiaoHangNhanhDistricts() {
    const { data } = await axios.get<GiaoHangNhanhResponse<District>>(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
            headers: {
                token: GIAO_HANG_HANH_API_TOKEN,
            },
        }
    );
    return data.data;
}
export function getDistricts() {
    const query = useQuery(
        ["dicstricts"],
        () => fetchGiaoHangNhanhDistricts(),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs,
        }
    );
    return query;
}

async function fetchGiaoHangNhanhWard(districtID: number) {
    const { data } = await axios.get<GiaoHangNhanhResponse<Ward>>(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
        {
            headers: {
                token: GIAO_HANG_HANH_API_TOKEN,
            },
            params: {
                district_id: districtID,
            },
        }
    );
    return data.data;
}
export function getWard(districtID?: number) {
    const query = useQuery(
        ["wards", districtID],
        () => (districtID ? fetchGiaoHangNhanhWard(districtID) : []),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs,
            enabled: !!districtID,
        }
    );
    return query;
}
