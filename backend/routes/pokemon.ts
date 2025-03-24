import express from "express";
import {
  addFavoritePokemon,
  deleteFavoritePokemon,
  getFavoritesPokemons,
  getPokemons,
} from "../controllers/pokemonController";

const pokemonRouter = express.Router();

pokemonRouter.get("/", getPokemons);
pokemonRouter.post("/favorite", addFavoritePokemon);
pokemonRouter.get("/favorites", getFavoritesPokemons);
pokemonRouter.delete("/favorite/:id", deleteFavoritePokemon);

export default pokemonRouter;
