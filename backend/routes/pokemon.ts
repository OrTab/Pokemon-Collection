import express from "express";
import { getPokemons } from "../controllers/pokemonController";

const pokemonRouter = express.Router();

pokemonRouter.get("/", getPokemons);

export default pokemonRouter;
