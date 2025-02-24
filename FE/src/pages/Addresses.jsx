import React, { useState } from "react";
import AddressLine from "../components/profile/AddressLine";
import ShippingAddressFormPopup from "../components/popups/ShippingAddressFormPopup";

const addresses = [
  {
    fullName: "Nguyen Van",
    phoneNumber: "0901057057",
    addressLine1: "Lầu 1-5 Tòa nhà EverRich",
    addressLine2: "968 Đ. 3 Tháng 2",
    ward: "Phường 15",
    district: "Quận 11",
    city: "Hồ Chí Minh",
    country: "Việt Nam",
    postalCode: "090105",
    isDefault: true,
    coordinates: [10.7645, 106.6917],
  },
  {
    fullName: "Nguyen Van",
    phoneNumber: "0901057057",
    addressLine1: "Lầu 1-5 Tòa nhà EverRich",
    addressLine2: "968 Đ. 3 Tháng 2",
    ward: "Phường 15",
    district: "Quận 11",
    city: "Hồ Chí Minh",
    country: "Việt Nam",
    postalCode: "090105",
    isDefault: false,
    coordinates: [10.7645, 106.6917],
  },
  {
    fullName: "Nguyen Van",
    phoneNumber: "0901057057",
    addressLine1: "Lầu 1-5 Tòa nhà EverRich",
    addressLine2: "968 Đ. 3 Tháng 2",
    ward: "Phường 15",
    district: "Quận 11",
    city: "Hồ Chí Minh",
    country: "Việt Nam",
    postalCode: "090105",
    isDefault: false,
    coordinates: [10.7645, 106.6917],
  },
];

const Addresses = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-4">
      {addresses.map((address, index) => (
        <AddressLine
          key={index}
          name={address.fullName}
          phone={address.phoneNumber}
          address={`${address.addressLine1}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
          isDefault={address.isDefault}
        />
      ))}

      <button
        className="gray-outline-button w-full py-2 px-4 flex items-center justify-center gap-2"
        onClick={() => setIsFormOpen(true)}
      >
        + Add new
      </button>

      <ShippingAddressFormPopup
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Addresses;
