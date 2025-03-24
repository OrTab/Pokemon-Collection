import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon, PokemonState } from "./types";
import { fetchAllPokemons } from "../../controllers/pokemonController";

// Async thunk that calls the controller
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  fetchAllPokemons
);

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
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
          state.pokemons = action.payload;
        }
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pokemons";
      });
  },
});

export default pokemonSlice.reducer;
