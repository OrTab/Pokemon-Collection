import { Container, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { LoadingPokemonsSkeletons } from "../components/LoadingPokemonsSkeletons";
import { PokemonList } from "../components/PokemonList";
import { Filters } from "../components/Filters";
import { IoReload } from "react-icons/io5";
import { usePokemons } from "../hooks/usePokemons";

export const Pokemons = () => {
  const { pokemons, loading, error } = usePokemons();

  const isInitialLoading = loading && pokemons.length === 0;

  if (isInitialLoading) {
    return <LoadingPokemonsSkeletons />;
  }

  if (error && !pokemons.length) {
    return <ErrorMessage />;
  }

  return (
    <Container
      maxW='container.xl'
      py={8}
      display='flex'
      flexDirection='column'
      gap={8}
    >
      <Heading as='h1' textAlign='center' color='blue.600'>
        Pokémon Collection
      </Heading>
      <Filters />
      <PokemonList shouldShowLoading={loading} />
    </Container>
  );
};

const ErrorMessage = () => {
  return (
    <Container maxW='container.xl' py={16}>
      <VStack gap={6}>
        <Heading as='h1' color='red.500' textAlign='center' size='xl'>
          Oops! Something went wrong
        </Heading>
        <Text textAlign='center' fontSize='lg' color='gray.600'>
          Please try refreshing the page
        </Text>
        <Button
          onClick={() => window.location.reload()}
          colorScheme='red'
          size='lg'
          mt={4}
        >
          <IoReload /> Reload Page
        </Button>
      </VStack>
    </Container>
  );
};
