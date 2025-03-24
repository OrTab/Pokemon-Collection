import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon, PokemonState } from "./types";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (): Promise<Pokemon[]> => {
    const response = await fetch("http://localhost:3000/api/pokemons");
    if (!response.ok) {
      throw new Error("Failed to fetch pokemons");
    }
    const data = await response.json();
    return data;
  }
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
