import { configureStore } from "@reduxjs/toolkit";
import bookFilterReducer from "./features/book/bookFilterSlice";
import { api } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    filterBooks: bookFilterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
