import asyncHandler from 'express-async-handler';

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

const addNewAddress = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2 = '',
    ward,
    district,
    city,
    country,
    postalCode = '',
    isDefault = false,
    coordinates = '',
  } = req.body;
  const user = req.user;

  if (
    !fullName ||
    !phoneNumber ||
    !addressLine1 ||
    !ward ||
    !district ||
    !city ||
    !country
  ) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields',
    });
  }

  user.addresses.push({
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    ward,
    district,
    city,
    country,
    postalCode,
    isDefault,
    coordinates,
  });

  if (isDefault && user.addresses.length > 1) {
    for (let i = 0; i < user.addresses.length - 1; ++i) {
      if (user.addresses[i].isDefault) {
        user.addresses[i].isDefault = false;
      }
    }
  }

  await user.save();

  res.status(201).json({
    success: true,
    message: 'Address created successfully',
    addresses: user.addresses,
  });
});

const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    ward,
    district,
    city,
    country,
    postalCode,
    isDefault,
    coordinates,
  } = req.body;
  const user = req.user;

  const address = user.addresses[addressId];

  if (!address) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid address ID' });
  }

  if (fullName) {
    address.fullName = fullName;
  }
  if (phoneNumber) {
    address.phoneNumber = phoneNumber;
  }
  if (addressLine1) {
    address.addressLine1 = addressLine1;
  }
  if (addressLine2) {
    address.addressLine2 = addressLine2;
  }
  if (ward) {
    address.ward = ward;
  }
  if (district) {
    address.district = district;
  }
  if (city) {
    address.city = city;
  }
  if (country) {
    address.country = country;
  }
  if (postalCode) {
    address.postalCode = postalCode;
  }
  if (isDefault !== undefined) {
    address.isDefault = isDefault;
  }
  if (coordinates) {
    address.coordinates = coordinates;
  }
  user.addresses[addressId] = address;

  if (isDefault && user.addresses.length > 1) {
    for (let i = 0; i < user.addresses.length - 1; ++i) {
      if (user.addresses[i].isDefault && addressId !== i) {
        user.addresses[i].isDefault = false;
      }
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Address updated successfully',
    addresses: user.addresses,
  });
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const user = req.user;

  const address = req.user.addresses[addressId];

  if (!address) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid address ID' });
  }

  user.addresses.splice(addressId, 1);

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Address deleted successfully',
    addresses: user.addresses,
  });
});

export { getMe, addNewAddress, updateAddress, deleteAddress };
