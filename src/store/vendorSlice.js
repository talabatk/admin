import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    pages: 1,
    size: 10,
    currentPage: 1,
    vendors: [],
    currentPageData: [],
    rows: [],
  },
  reducers: {
    setPage(state, action) {
      const page = action.payload;
      state.currentPage = page;
      const currentPageStartRows = (page - 1) * state.size;
      const currentPageEndRows = state.currentPage * state.size;
      state.currentPageData = state.vendors.slice(
        currentPageStartRows,
        currentPageEndRows
      );
    },

    setVendors(state, action) {
      const rows = action.payload;
      state.vendors = rows;
      state.rows = rows;
      let pagesNum = Math.ceil(rows.length / state.size);
      state.pages = pagesNum;

      const currentPageStartRows = (state.currentPage - 1) * state.size;
      const currentPageEndRows = state.currentPage * state.size;

      state.currentPageData = rows.slice(
        currentPageStartRows,
        currentPageEndRows
      );

      if (state.currentPageData.length === 0 && state.currentPage > 1) {
        --state.currentPage;
        const currentPageStartRows = (state.currentPage - 1) * state.size;
        const currentPageEndRows = state.currentPage * state.size;

        state.currentPageData = state.vendors.slice(
          currentPageStartRows,
          currentPageEndRows
        );
      }
    },
    filterDateByName(state, action) {
      const value = action.payload;
      const filteredVendors = state.vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(value.toLowerCase())
      );
      let pagesNum = Math.ceil(filteredVendors.length / state.size);
      state.pages = pagesNum;
      state.currentPage = 1;
      const currentPageStartRows = (state.currentPage - 1) * state.size;
      const currentPageEndRows = state.currentPage * state.size;

      state.currentPageData = filteredVendors.slice(
        currentPageStartRows,
        currentPageEndRows
      );
    },
    filterDateByCity(state, action) {
      const value = action.payload;

      const filteredVendors = state.vendors.filter(
        (vendor) => +vendor.cityId === +value
      );

      let pagesNum = Math.ceil(filteredVendors.length / state.size);
      state.pages = pagesNum;
      state.currentPage = 1;
      const currentPageStartRows = (state.currentPage - 1) * state.size;
      const currentPageEndRows = state.currentPage * state.size;

      state.currentPageData = filteredVendors.slice(
        currentPageStartRows,
        currentPageEndRows
      );
    },
  },
});

export const { setPage, setVendors, filterDateByName, filterDateByCity } =
  vendorSlice.actions;

export default vendorSlice;
