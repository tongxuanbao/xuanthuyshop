"use client";

import { Province, getProvinces } from "@lib/giaohangnhanh";
import NativeSelect, {
    NativeSelectProps,
} from "@modules/common/components/native-select";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

const CitySelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
    ({ placeholder = "Thành phố", defaultValue, ...props }, ref) => {
        const innerRef = useRef<HTMLSelectElement>(null);

        useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
            ref,
            () => innerRef.current
        );

        const { data, isFetching } = getProvinces();

        const cites = useMemo(() => {
            const compareProvinceID = (a: Province, b: Province) =>
                a.ProvinceID - b.ProvinceID;
            const sortedCountry = data?.sort(compareProvinceID) || [];

            return sortedCountry.map((c) => ({
                value: c.ProvinceID,
                label: c.ProvinceName,
            }));
        }, [data]);

        return (
            <>
                {isFetching && (
                    <NativeSelect
                        placeholder={"Đang tải..."}
                        loading={true}
                        defaultValue={""}
                    />
                )}
                {!isFetching && (
                    <NativeSelect
                        ref={innerRef}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...props}
                    >
                        {cites.map(({ value, label }, index) => (
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

CitySelect.displayName = "CitySelect";

export default CitySelect;
