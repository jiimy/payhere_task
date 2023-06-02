import { configureStore } from "@reduxjs/toolkit";
import localStorageReducer, { updateData } from "./LocalStorage";

const store = configureStore({
  reducer: {
    localStorage: localStorageReducer,
  },
});



// window.addEventListener("storage", () => {
//   const updatedData = localStorage.getItem("urlList");
//   console.log('dd');
//   store.dispatch(updateData(updatedData));
// });

export default store;
