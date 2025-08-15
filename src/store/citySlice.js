import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: [],
  },
  reducers: {
    setCities(state, action) {
      const rows = action.payload;
      state.cities = rows;
    },
  },
});

export const { setCities } = citySlice.actions;

export default citySlice;
