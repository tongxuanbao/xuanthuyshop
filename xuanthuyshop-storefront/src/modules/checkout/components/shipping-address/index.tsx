import React, { useState, useEffect, useMemo } from "react";
import { Cart, Customer } from "@medusajs/medusa";
import Input from "@modules/common/components/input";
import AddressSelect from "../address-select";
import { Container } from "@medusajs/ui";
import Divider from "@modules/common/components/divider";
import CitySelect from "../city-select";
import DistrictSelect from "../district-select";
import WardSelect from "../ward-select";

const ShippingAddress = ({
    customer,
    cart,
    countryCode,
}: {
    customer: Omit<Customer, "password_hash"> | null;
    cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null;
    checked: boolean;
    onChange: () => void;
    countryCode: string;
}) => {
    const [formData, setFormData] = useState({
        "shipping_address.first_name": cart?.shipping_address?.first_name || "",
        "shipping_address.last_name": cart?.shipping_address?.last_name || "",
        "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
        "shipping_address.address_2": cart?.shipping_address?.address_2 || "",
        "shipping_address.company": cart?.shipping_address?.company || "",
        "shipping_address.postal_code":
            cart?.shipping_address?.postal_code || "",
        "shipping_address.city": cart?.shipping_address?.city || "203",
        "shipping_address.country_code":
            cart?.shipping_address?.country_code || countryCode || "",
        "shipping_address.province": cart?.shipping_address?.province || "",
        email: cart?.email || "",
        "shipping_address.phone": cart?.shipping_address?.phone || "",
    });

    const fullAddressLabel = {
        "shipping_address.address_1": "",
        "shipping_address.address_2": "",
        "shipping_address.province": "",
        "shipping_address.city": "203",
    };

    const countriesInRegion = useMemo(
        () => cart?.region.countries.map((c) => c.iso_2),
        [cart?.region]
    );

    // check if customer has saved addresses that are in the current region
    const addressesInRegion = useMemo(
        () =>
            customer?.shipping_addresses.filter(
                (a) =>
                    a.country_code &&
                    countriesInRegion?.includes(a.country_code)
            ),
        [customer?.shipping_addresses, countriesInRegion]
    );

    useEffect(() => {
        setFormData({
            "shipping_address.first_name":
                cart?.shipping_address?.first_name || "",
            "shipping_address.last_name":
                cart?.shipping_address?.last_name || "",
            "shipping_address.address_1":
                cart?.shipping_address?.address_1 || "",
            "shipping_address.address_2":
                cart?.shipping_address?.address_2 || "",
            "shipping_address.company": cart?.shipping_address?.company || "",
            "shipping_address.postal_code":
                cart?.shipping_address?.postal_code || "",
            "shipping_address.city": cart?.shipping_address?.city || "203",
            "shipping_address.country_code":
                cart?.shipping_address?.country_code || countryCode || "",
            "shipping_address.province": cart?.shipping_address?.province || "",
            email: cart?.email || "",
            "shipping_address.phone": cart?.shipping_address?.phone || "",
        });
    }, [cart?.shipping_address, cart?.email]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLInputElement | HTMLSelectElement
        >
    ) => {
        if (e.target.name === "shipping_address.city") {
            setFormData({
                ...formData,
                "shipping_address.province": "",
                "shipping_address.address_2": "",
                [e.target.name]: `${e.target.value}`,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: `${e.target.value}`,
            });
        }
    };

    return (
        <>
            {customer && (addressesInRegion?.length || 0) > 0 && (
                <Container className="mb-6 flex flex-col gap-y-4 p-5">
                    <p className="text-small-regular">
                        {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
                    </p>
                    <AddressSelect
                        addresses={customer.shipping_addresses}
                        cart={cart}
                    />
                </Container>
            )}
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Họ"
                    name="shipping_address.first_name"
                    autoComplete="given-name"
                    value={formData["shipping_address.first_name"]}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Tên"
                    name="shipping_address.last_name"
                    autoComplete="family-name"
                    value={formData["shipping_address.last_name"]}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Địa chỉ"
                    name="shipping_address.address_1"
                    autoComplete="address-line1"
                    value={formData["shipping_address.address_1"]}
                    onChange={handleChange}
                    required
                />
                <CitySelect
                    placeholder="Thành phố / Tỉnh"
                    name="shipping_address.city"
                    value={formData["shipping_address.city"]}
                    onChange={handleChange}
                    required
                />
                <DistrictSelect
                    placeholder="Quận / Huyện"
                    name="shipping_address.province"
                    value={formData["shipping_address.province"]}
                    city={+formData["shipping_address.city"]}
                    onChange={handleChange}
                    required
                />
                <WardSelect
                    name="shipping_address.address_2"
                    value={formData["shipping_address.address_2"]}
                    district={+formData["shipping_address.province"]}
                    onChange={handleChange}
                    required
                />
            </div>
            <Divider className="my-8" />
            <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    title="Enter a valid email address."
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Số điện thoại"
                    name="shipping_address.phone"
                    autoComplete="tel"
                    value={formData["shipping_address.phone"]}
                    onChange={handleChange}
                    required
                />
            </div>
        </>
    );
};

export default ShippingAddress;
