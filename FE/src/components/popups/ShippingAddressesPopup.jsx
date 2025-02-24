import React, { useState } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import AddressLine from "../profile/AddressLine";

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

const ShippingAddressesPopup = ({ onClose }) => {
  // const { addresses } = useAuth().state.user;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">My Addresses:</h2>
        </div>

        <div className="max-h-[60vh] p-4 flex flex-col gap-2 overflow-y-auto">
          {addresses.map((address, index) => (
            <AddressLine
              key={index}
              name={address.fullName}
              phone={address.phoneNumber}
              address={`${address.addressLine1}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
              isDefault={address.isDefault}
            />
          ))}
        </div>

        <div className="p-4 border-t">
          <button className="gray-outline-button w-full py-2 px-4 flex items-center justify-center gap-2">
            + Add new
          </button>
        </div>

        <div className="p-4 border-t flex gap-3">
          <button
            className="gray-outline-button flex-1 py-2 px-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="blue-button flex-1 py-2 px-4">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressesPopup;
