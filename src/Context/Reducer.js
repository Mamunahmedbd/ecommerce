const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem('cart', JSON.stringify(cart))
}



export const sumItems = cartItems => {
  storeCartItems(cartItems)
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: cartItems.reduce((total, prod) => total + (prod.price * prod.quantity), 0)
  }
}


const Reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!state.cartItems.find(item => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        })
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems)
      }
    case 'INCREASE':
      const findIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      state.cartItems[findIndex].quantity++;
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      }
    case 'DECREASE':
      const decreaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
      const product = state.cartItems[decreaseIndex];
      if (product.quantity > 0) {
        product.quantity--;
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems)
      }
    case 'REMOVE_ITEM':
      const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(state.cartItems)
      }
    case 'CLEAR':
      localStorage.removeItem('cart')
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      }
    default:
      return state;
  }
};
export default Reducer;
