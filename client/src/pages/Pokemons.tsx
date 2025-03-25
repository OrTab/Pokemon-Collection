import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { PokemonCard } from "../components/PokemonCard";
import { LoadingPokemonsSkeletons } from "../components/LoadingPokemonsSkeletons";
import { useLoadAppData } from "../hooks/useLoadAppData";

export const Pokemons = () => {
  const { pokemons, loading, error, favorites } = useSelector(
    (state: RootState) => state.pokemon
  );

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

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isLastCard={index === pokemons.length - 1}
            isFavorite={!!favorites[pokemon.id]}
          />
        ))}
      </SimpleGrid>
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
