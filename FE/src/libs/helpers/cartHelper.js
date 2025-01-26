const initialGuestCart = () => ({
  userId: "guest",
  items: [],
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const updateCartItems = (cart, productId, quantity) => {
  const newCart = { ...cart };
  if (quantity === 0) return newCart;

  if (!newCart) newCart = initialGuestCart();

  const cartItem = {
    productId,
    quantity,
  };

  const itemIndex = newCart.items.findIndex(
    (item) => item.productId === productId
  );

  if (itemIndex > -1) {
    cartItem.quantity += newCart.items[itemIndex].quantity;
    cartItem.addedAt = newCart.items[itemIndex].addedAt;
    newCart.items.splice(itemIndex, 1);
  } else {
    if (quantity > 0) {
      cartItem.addedAt = new Date(); // Add new item
    } else {
      return newCart; // Do not add item if we are removing it but can not found it
    }
  }

  cartItem.updatedAt = new Date();

  if (!(quantity < 0 && cartItem.quantity <= 0)) {
    newCart.items.unshift(cartItem); // Do not re-add item if we are removing it and its quantity is below 0
  }

  newCart.updatedAt = new Date();
  return newCart;
};

const addToCart = (cart, productId, quantity) => {
  return updateCartItems(cart, productId, quantity);
};

const removeFromCart = (cart, productId, quantity) => {
  return updateCartItems(cart, productId, -quantity);
};

const clearCart = (cart) => {
  return { ...cart, items: [], updatedAt: new Date() };
};

const caculateSelectedItems = (cart, selectedIds) => {
  return cart?.items.reduce(
    (acc, item) =>
      acc + selectedIds.includes(item.productId) ? item.quantity : 0,
    0
  );
};

const cartHelper = {
  addToCart,
  removeFromCart,
  clearCart,
  caculateSelectedItems,
};
export default cartHelper;
