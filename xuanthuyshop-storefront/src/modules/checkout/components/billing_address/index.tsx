import React, { useState, useEffect } from "react"
import Input from "@modules/common/components/input"
import CountrySelect from "../country-select"
import { Cart } from "@medusajs/medusa"

const BillingAddress = ({
  cart,
  countryCode,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
  countryCode: string
}) => {
  const [formData, setFormData] = useState({
    "billing_address.first_name": cart?.billing_address?.first_name || "",
    "billing_address.last_name": cart?.billing_address?.last_name || "",
    "billing_address.address_1": cart?.billing_address?.address_1 || "",
    "billing_address.address_2": cart?.billing_address?.address_2 || "",
    "billing_address.company": cart?.billing_address?.company || "",
    "billing_address.postal_code": cart?.billing_address?.postal_code || "",
    "billing_address.city": cart?.billing_address?.city || "",
    "billing_address.country_code":
      cart?.billing_address?.country_code || countryCode || "",
    "billing_address.province": cart?.billing_address?.province || "",
    "billing_address.phone": cart?.billing_address?.phone || "",
  })

  useEffect(() => {
    setFormData({
      "billing_address.first_name": cart?.billing_address?.first_name || "",
      "billing_address.last_name": cart?.billing_address?.last_name || "",
      "billing_address.address_1": cart?.billing_address?.address_1 || "",
      "billing_address.address_2": cart?.billing_address?.address_2 || "",
      "billing_address.company": cart?.billing_address?.company || "",
      "billing_address.postal_code": cart?.billing_address?.postal_code || "",
      "billing_address.city": cart?.billing_address?.city || "",
      "billing_address.country_code": cart?.billing_address?.country_code || "",
      "billing_address.province": cart?.billing_address?.province || "",
      "billing_address.phone": cart?.billing_address?.phone || "",
    })
  }, [cart?.billing_address])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Họ"
          name="billing_address.first_name"
          autoComplete="given-name"
          value={formData["billing_address.first_name"]}
          onChange={handleChange}
          required
        />
        <Input
          label="Tên"
          name="billing_address.last_name"
          autoComplete="family-name"
          value={formData["billing_address.last_name"]}
          onChange={handleChange}
          required
        />
        <Input
          label="Địa chỉ"
          name="billing_address.address_1"
          autoComplete="address-line1"
          value={formData["billing_address.address_1"]}
          onChange={handleChange}
          required
        />
        <Input
          label="Xã / Phường"
          name="billing_address.address_2"
          autoComplete="address-line2"
          value={formData["billing_address.address_2"]}
          onChange={handleChange}
          required
        />
        <Input
          label="Quận / Huyện"
          name="billing_address.province"
          autoComplete="address-level1"
          value={formData["billing_address.province"]}
          onChange={handleChange}
        />
        <Input
          label="Thành phố"
          name="billing_address.city"
          autoComplete="address-level2"
          value={formData["billing_address.city"]}
          onChange={handleChange}
          required
        />
        {/* <CountrySelect
          name="billing_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["billing_address.country_code"]}
          onChange={handleChange}
          required
        /> */}
        <Input
          label="Phone"
          name="billing_address.phone"
          autoComplete="tel"
          value={formData["billing_address.phone"]}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default BillingAddress
