import pokemon from "./pokemon";
import express from "express";

const router = express.Router();

router.use("/pokemons", pokemon);

export default router;
