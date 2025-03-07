import React from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import AddressLine from "../profile/AddressLine";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
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
        <button
          className="gray-outline-button w-full py-2 px-4 flex items-center justify-center gap-2"
          onClick={() => {
            onClose();
            navigate("/user/addresses");
          }}
        >
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
  );
};

export default ShippingAddressesPopup;
