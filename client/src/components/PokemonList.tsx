import { SimpleGrid } from "@chakra-ui/react";
import { PokemonCard } from "../components/PokemonCard";
import { selectFilteredPokemons } from "../store/pokemon/pokemonSlice";
import { useSelector } from "react-redux";

export const PokemonList = () => {
  const pokemons = useSelector(selectFilteredPokemons);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isLastCard={index === pokemons.length - 1}
        />
      ))}
    </SimpleGrid>
  );
};
