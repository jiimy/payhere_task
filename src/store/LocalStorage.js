import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urlList: localStorage.getItem("urlList") || [],
};

export const localStorageSlice = createSlice({
  name: "localStorage",
  initialState: {
    urlList: localStorage.getItem("urlList") || [],
  },
  reducers: {
    updateData: (state, action) => {
      state.urlList = action.payload.urlList;
    },
  },
  // name: "myData",
  // initialState: localStorage.getItem("myData") || "",
  // reducers: {
  //   updateData: (state, action) => {
  //     state = action.payload;
  //   },
  // },
});

export const { updateData } = localStorageSlice.actions;

export default localStorageSlice.reducer;
