import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { LoadingPokemonsSkeletons } from "../components/LoadingPokemonsSkeletons";
import { PokemonList } from "../components/PokemonList";
import { Filters } from "../components/Filters";

import { usePokemons } from "../hooks/usePokemons";

export const Pokemons = () => {
  const { pokemons, loading, error } = usePokemons();

  const isInitialLoading = loading && pokemons.length === 0;

  if (isInitialLoading) {
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
    <Container
      maxW='container.xl'
      py={8}
      display='flex'
      flexDirection='column'
      gap={8}
    >
      <Heading as='h1' mb={8} textAlign='center' color='blue.600'>
        Pokémon Collection
      </Heading>
      <Filters />
      <PokemonList />
      {loading && (
        <Spinner
          size='xl'
          marginTop={15}
          marginLeft='auto'
          marginRight='auto'
        />
      )}
    </Container>
  );
};
