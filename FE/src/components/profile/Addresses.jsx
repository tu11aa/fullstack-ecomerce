import React, { useState } from "react";
import AddressLine from "./AddressLine";
import ShippingAddressesPopup from "../popups/ShippingAddressesPopup";

const Addresses = () => {
  const [isAddressesPopupOpen, setIsAddressesPopupOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 p-4 border rounded-lg shadow-sm">
        <h1>Shipping Address:</h1>
        <AddressLine
          name="LOTTE Mart Quận 11"
          phone="0901057057"
          address="Lầu 1-5 Tòa nhà EverRich, 968 Đ. 3 Tháng 2, Phường 15, Quận 11, Hồ Chí Minh, Việt Nam"
          isDefault
          onUpdate={() => setIsAddressesPopupOpen(true)}
        />
      </div>
      {isAddressesPopupOpen && (
        <ShippingAddressesPopup
          onClose={() => setIsAddressesPopupOpen(false)}
        />
      )}
    </>
  );
};

export default Addresses;
