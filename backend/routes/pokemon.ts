import express from "express";
import { pokemonController } from "../controllers/pokemonController";

const pokemonRouter = express.Router();

pokemonRouter.get("/", pokemonController.fetchPokemons);
pokemonRouter.post("/favorites", pokemonController.addFavorite);
pokemonRouter.get("/favorites", pokemonController.getFavorites);
pokemonRouter.delete("/favorites/:pokemonId", pokemonController.deleteFavorite);

export default pokemonRouter;
