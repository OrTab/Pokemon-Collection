import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PokemonState } from "./types";
import { fetchAllPokemons } from "../../controllers/pokemonController";
import { Pokemon } from "../../../../shared/types";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  (_, { getState }) => {
    const state = getState() as RootState;
    const currentPage = state.pokemon.currentPage;
    return fetchAllPokemons({ page: currentPage });
  }
);

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMoreToFetch: true,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemons.fulfilled,
        (state, action: PayloadAction<Pokemon[]>) => {
          state.loading = false;
          state.pokemons = [...state.pokemons, ...action.payload];
          state.hasMoreToFetch = action.payload.length > 0;
        }
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pokemons";
      });
  },
});

// Actions

export const { setCurrentPage } = pokemonSlice.actions;

// Reducer

export default pokemonSlice.reducer;

// Listeners

export const pageListenerMiddleware = createListenerMiddleware();

pageListenerMiddleware.startListening({
  actionCreator: setCurrentPage,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchPokemons());
  },
});
