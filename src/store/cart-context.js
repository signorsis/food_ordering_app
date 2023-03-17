import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item,flag) => {},
  removeItem: (id) => {}
});

export default CartContext;