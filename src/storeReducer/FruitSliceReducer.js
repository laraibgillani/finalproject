import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orders: [],
  isOpen: false,
  isDrop: false,
  okIsOpen: false,
  fruits: [
    { id: 1, fname: "apple", fprice: 100, season: "Winter", quantity: 1 },
    { id: 2, fname: "orange", fprice: 150, season: "Winter", quantity: 1 },
    { id: 3, fname: "banana", fprice: 200, season: "Winter", quantity: 1 },
    { id: 4, fname: "strawbery", fprice: 250, season: "Winter", quantity: 1 },
    { id: 5, fname: "pears", fprice: 170, season: "Winter", quantity: 1 },

    { id: 6, fname: "pineapple", fprice: 400, season: "Spring", quantity: 1 },
    { id: 7, fname: "Avocado", fprice: 190, season: "Spring", quantity: 1 },
    { id: 8, fname: "carrots", fprice: 170, season: "Spring", quantity: 1 },
    { id: 9, fname: "Bluberries", fprice: 350, season: "Spring", quantity: 1 },
    {
      id: 10,
      fname: "honeydew melons",
      fprice: 200,
      season: "Spring",
      quantity: 1,
    },

    { id: 11, fname: "Cherry", fprice: 200, season: "Summer", quantity: 1 },
    { id: 12, fname: "Mango", fprice: 100, season: "Summer", quantity: 1 },
    { id: 13, fname: "Watermelo", fprice: 100, season: "Summer", quantity: 1 },
    { id: 14, fname: "apricot", fprice: 300, season: "Summer", quantity: 1 },
    { id: 15, fname: "plum", fprice: 250, season: "Summer", quantity: 1 },

    { id: 16, fname: "Grapes", fprice: 200, season: "Autumn", quantity: 1 },
    {
      id: 17,
      fname: "Pomegrantes",
      fprice: 400,
      season: "Autumn",
      quantity: 1,
    },
    { id: 18, fname: "Blackberry", fprice: 350, season: "Autumn", quantity: 1 },
    { id: 19, fname: "figs", fprice: 200, season: "Autumn", quantity: 1 },
    { id: 20, fname: "kiwi", fprice: 250, season: "Autumn", quantity: 1 },
  ],
  selectedFruits: [],
  selectedSeason: "",
  totalValue: 0,
  itemsList: [],
  totalQuantity: 0,
};
const FruitSlice = createSlice({
  name: "fruits",
  initialState,
  reducers: {
    setSeasoSelection: (state, action) => {
      state.totalValue = 0;
      state.selectedSeason = action.payload;
    },
    incrementQuantity: (state, action) => {
      const { fruitId } = action.payload;
      const fruit = state.fruits.find((fruit) => fruit.id === fruitId);
      if (fruit.quantity >= 1) {
        fruit.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { fruitId } = action.payload;
      const fruit = state.fruits.find((fruit) => fruit.id === fruitId);
      if (fruit.quantity > 1) {
        fruit.quantity--;
      }
    },

    checkBoxUpdate: (state, action) => {
      const { fruitId } = action.payload;
      const fruit = state.fruits.find((fruit) => fruit.id === fruitId);
      if (fruit) {
        fruit.isChecked = !fruit.isChecked;
        if (fruit.isChecked) {
          state.selectedFruits.push(fruitId);
        } else {
          const index = state.selectedFruits.indexOf(fruitId);
          if (index !== -1) {
            state.selectedFruits.splice(index, 1);
          }
        }
        state.totalValue = state.fruits.reduce((total, currFruit) => {
          if (
            state.selectedFruits.includes(currFruit.id) &&
            currFruit.season === state.selectedSeason
          ) {
            return total + currFruit.fprice * currFruit.quantity;
          }
          return total;
        }, 0);
      }
    },
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },

    okModalOpen: (state, action) => {
      state.okIsOpen = true;
    },
    okModalClose: (state, action) => {
      state.okIsOpen = false;
    },
    clearData: (state, action) => {
      state.selectedFruits = [];
      state.selectedSeason = "";
      state.totalValue = 0;
      state.itemsList = [];
      state.totalQuantity = 0;
    },
    // removeOrder: (state, action) => {
    //   const orderIdToRemove = action.payload;
    //   state.orders = state.orders.filter((item) => item.id !== orderIdToRemove);
    // },
  },
});
export const {
  clearData,
  // removeOrder,
  okModalOpen,
  okModalClose,
  screenBackDropOn,
  screenBackDropOff,
  openModal,
  closeModal,
  setSeasoSelection,
  decrementQuantity,
  incrementQuantity,
  checkBoxUpdate,
  totalValueUpdation,
  addToCart,
} = FruitSlice.actions;
export const selectSelectedFruits = (state) => state.fruits.selectedFruits;

export default FruitSlice.reducer;
