import { Request, Response } from "express";
import { fetchPokemons } from "../services/pokemonService";

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await fetchPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error in getPokemons:", error);
    res.status(500).json({ error: "Failed to fetch pokemons" });
  }
};
