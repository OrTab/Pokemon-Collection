import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { LoadingPokemonsSkeletons } from "../components/LoadingPokemonsSkeletons";
import { useLoadAppData } from "../hooks/useLoadAppData";
import { PokemonList } from "../components/PokemonList";
import { Filters } from "../components/Filters";
import {
  selectPokemonError,
  selectPokemonLoading,
  selectPokemons,
} from "../store/pokemon/pokemonSlice";
import { useSelector } from "react-redux";

export const Pokemons = () => {
  const pokemons = useSelector(selectPokemons);
  const loading = useSelector(selectPokemonLoading);
  const error = useSelector(selectPokemonError);

  useLoadAppData();

  if (loading && pokemons.length === 0) {
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
    <Container maxW='container.xl' py={8} display='flex' flexDirection='column'>
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
