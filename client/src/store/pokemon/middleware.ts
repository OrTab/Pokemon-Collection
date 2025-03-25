import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCurrentPage } from "./slice";
import { fetchPokemons } from "./thunks";

export const pageListenerMiddleware = createListenerMiddleware();

pageListenerMiddleware.startListening({
  actionCreator: setCurrentPage,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchPokemons());
  },
});
