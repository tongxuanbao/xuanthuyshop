"use client";

import { District, getDistricts } from "@lib/giaohangnhanh";
import NativeSelect, {
    NativeSelectProps,
} from "@modules/common/components/native-select";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

const DistrictSelect = forwardRef<
    HTMLSelectElement,
    NativeSelectProps & {
        city?: number;
    }
>(
    (
        { placeholder = "Quận / Huyện", defaultValue, city = 203, ...props },
        ref
    ) => {
        const innerRef = useRef<HTMLSelectElement>(null);

        useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
            ref,
            () => innerRef.current
        );

        const { data, isFetching } = getDistricts();

        const districts = useMemo(() => {
            const compareProvinceByID = (a: District, b: District) =>
                a.DistrictID - b.DistrictID;

            const filterdDistricts =
                data?.filter((d) => d.ProvinceID === city) || [];

            const sortedDistricts = filterdDistricts.sort(compareProvinceByID);

            return sortedDistricts.map((c) => ({
                value: c.DistrictID,
                label: c.DistrictName,
            }));
        }, [data, city]);

        return (
            <>
                {isFetching && (
                    <NativeSelect
                        placeholder={"Đang tải..."}
                        loading={true}
                        value={""}
                    />
                )}
                {!isFetching && (
                    <NativeSelect
                        ref={innerRef}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...props}
                    >
                        {districts.map(({ value, label }, index) => (
                            <option key={index} value={value}>
                                {label}
                            </option>
                        ))}
                    </NativeSelect>
                )}
            </>
        );
    }
);

DistrictSelect.displayName = "DistrictSelect";

export default DistrictSelect;
