import express, { Request, Response } from "express";

const pokemonRouter = express.Router();

pokemonRouter.get("/", (req, res) => {
  res.send([]);
});

export default pokemonRouter;
