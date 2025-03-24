import pokemonRouter from "./pokemon";
import express from "express";

const router = express.Router();

router.use("/pokemons", pokemonRouter);

export default router;
