const initialState = [
]

export function getLocal() {
    if (localStorage.cartLocalStorage) {
      let cartStr = JSON.parse(localStorage.cartLocalStorage);
      return cartStr;
    }
}

function setLocal(data) {
  if (typeof (Storage) !== "undefined") {
    data = JSON.stringify(data)
    localStorage.setItem("cartLocalStorage", data);
  } else {
    alert("此瀏覽器不支援Web Storage");
  }
}

const cart = (state = initialState, action) => {
  const { cart } = action;
  switch (action.type) {
    case 'ADD_TO_CART':
      setLocal([...state, cart]);
      return [...state, cart];
    case 'REMOVE_FROM_CART':
      state.splice(action, 1);
      setLocal([...state]);
      return [...state];
    case 'CLEAN_CART':
      localStorage.setItem("cartLocalStorage", []);
      return [];
    default:
      return state
  }
};

export function getProduct(state) {
  console.log('getProduct', state);
}

export default cart;