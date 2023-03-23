import { configureStore } from "@reduxjs/toolkit";
import sourcesSlice from "./sourcesSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        sources: sourcesSlice.reducer,
    }
});

export default store;

