import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import authSlice from "./authSlice";
import vendorSlice from "./vendorSlice";
import categorySlice from "./categorySlice";
import sliderSlice from "./sliderSlice";
import areaSlice from "./areaSlice";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";
import complainSlice from "./complainSlice";
import vendorCategorySlice from "./vendorCategories";
import citySlice from "./citySlice";
import bannerSlice from "./bannerSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    vendor: vendorSlice.reducer,
    category: categorySlice.reducer,
    slider: sliderSlice.reducer,
    banner: bannerSlice.reducer,
    area: areaSlice.reducer,
    city: citySlice.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
    complain: complainSlice.reducer,
    vendorCategory: vendorCategorySlice.reducer,
  },
});

export default store;
