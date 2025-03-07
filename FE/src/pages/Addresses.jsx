import React from "react";
import AddressLine from "../components/profile/AddressLine";
import ShippingAddressFormPopup from "../components/popups/ShippingAddressFormPopup";
import { MODAL_TYPES, useModal } from "../contexts/modal/ModalContext";

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
  const { openModal } = useModal();

  const openForm = (intend = "add", prefilledData = null) => {
    openModal(
      MODAL_TYPES.CUSTOM,
      { intend, prefilledData, onSubmit: handleSubmitForm },
      ShippingAddressFormPopup
    );
  };

  const handleUpdateAddress = (addressId) => {
    openForm("update", addresses[addressId]);
  };

  const handleDeleteAddress = (addressId) => {
    //todo: delete address
  };

  const handleSubmitForm = (intend, data) => {
    console.log("Intend:", intend);
    console.log("Form submitted:", data);

    if (intend === "add") {
      //todo: add new address
    } else if (intend === "update") {
      //todo: update address
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      {addresses.map((address, index) => (
        <AddressLine
          key={index}
          name={address.fullName}
          phone={address.phoneNumber}
          address={`${address.addressLine1}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
          isDefault={address.isDefault}
          onUpdate={() => handleUpdateAddress(index)}
          onDelete={() => handleDeleteAddress(index)}
        />
      ))}

      <button
        className="gray-outline-button w-full py-2 px-4 flex items-center justify-center gap-2"
        onClick={() => openForm()}
      >
        + Add new
      </button>
    </div>
  );
};

export default Addresses;
