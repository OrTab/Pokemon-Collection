import express from "express";
import { pokemonController } from "../controllers/pokemonController";
import { cacheMiddleware } from "../middlewares/cacheMiddleware";
import { CACHE_KEYS } from "../cache/constants";

const pokemonRouter = express.Router();

pokemonRouter.get("/", cacheMiddleware(), pokemonController.fetchPokemons);
pokemonRouter.post("/favorites", pokemonController.addFavorite);
pokemonRouter.get(
  "/favorites",
  cacheMiddleware({ key: CACHE_KEYS.FAVORITES }),
  pokemonController.getFavorites
);
pokemonRouter.delete("/favorites/:pokemonId", pokemonController.deleteFavorite);

export default pokemonRouter;
