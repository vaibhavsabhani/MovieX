import { configureStore } from "@reduxjs/toolkit";
import ApiSlice from "./Slices/ApiSlice";


const Store = configureStore({
   reducer:{
    [ApiSlice.reducerPath] : ApiSlice.reducer
   },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
})

export default Store;