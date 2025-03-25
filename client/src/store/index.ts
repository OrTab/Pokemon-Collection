import { configureStore } from "@reduxjs/toolkit";
import { pageListenerMiddleware } from "./pokemon/middleware";
import { pokemonReducer } from "./pokemon/slice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(pageListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
