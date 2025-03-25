import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { POKEMON_LIST_COLUMNS } from "./PokemonList";

export const LoadingPokemonsSkeletons = () => {
  return (
    <Container
      maxW='container.xl'
      p={8}
      display='flex'
      flexDirection='column'
      gap={8}
    >
      <Heading as='h1' textAlign='center' color='blue.600'>
        Loading Pokémon...
      </Heading>
      <Skeleton height='73px' margin='0 12px' />
      <SimpleGrid columns={POKEMON_LIST_COLUMNS} gap={8} padding='12px'>
        {[...Array(8)].map((_, index) => (
          <Box key={index} height='300px' borderRadius='lg' boxShadow='md'>
            <Skeleton height='200px' />
            <Box p={4}>
              <Skeleton height='20px' width='80%' mb={2} />
              <Skeleton height='15px' width='40%' />
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};
