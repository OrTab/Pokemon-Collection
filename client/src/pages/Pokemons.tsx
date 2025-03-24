import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchPokemons } from "../store/pokemon/pokemonSlice";
import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { PokemonCard } from "../components/PokemonCard";
import { LoadingPokemonsSkeletons } from "../components/LoadingPokemonsSkeletons";

export const Pokemons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemons, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );
  console.log(pokemons);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (loading) {
    return <LoadingPokemonsSkeletons />;
  }

  if (error)
    return (
      <Container maxW='container.xl' py={8}>
        <Heading as='h1' mb={4} textAlign='center' color='red.500'>
          Error
        </Heading>
        <Text textAlign='center' fontSize='xl'>
          {error}
        </Text>
      </Container>
    );

  return (
    <Container maxW='container.xl' py={8}>
      <Heading as='h1' mb={8} textAlign='center' color='blue.600'>
        Pokémon Collection
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
