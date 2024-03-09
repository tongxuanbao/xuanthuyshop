"use client";

import { getWard } from "@lib/giaohangnhanh";
import NativeSelect, {
    NativeSelectProps,
} from "@modules/common/components/native-select";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

const WardSelect = forwardRef<
    HTMLSelectElement,
    NativeSelectProps & {
        district?: number;
    }
>(({ placeholder = "Xã / Phường", defaultValue, district, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
        ref,
        () => innerRef.current
    );

    const { data, isFetching } = getWard(district);

    const wards = useMemo(() => {
        const filterdWards =
            data?.filter((d) => d.DistrictID === district) || [];

        return filterdWards.map((c) => ({
            value: c.WardCode,
            label: c.WardName,
        }));
    }, [data, district]);

    return (
        <>
            {!district && (
                <NativeSelect
                    placeholder={"Chọn quận / huyện trước"}
                    defaultValue={""}
                />
            )}
            {isFetching && !!district && (
                <NativeSelect
                    placeholder={"Đang tải..."}
                    loading={true}
                    defaultValue={""}
                />
            )}
            {!isFetching && !!district && (
                <NativeSelect
                    ref={innerRef}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    {...props}
                >
                    {wards.map(({ value, label }, index) => (
                        <option key={index} value={value}>
                            {label}
                        </option>
                    ))}
                </NativeSelect>
            )}
        </>
    );
});

WardSelect.displayName = "WardSelect";

export default WardSelect;
