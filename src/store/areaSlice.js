import { createSlice } from "@reduxjs/toolkit";

const areaSlice = createSlice({
  name: "area",
  initialState: {
    areas: [],
  },
  reducers: {
    setAreas(state, action) {
      const rows = action.payload;
      state.areas = rows;
    },
  },
});

export const { setAreas } = areaSlice.actions;

export default areaSlice;
