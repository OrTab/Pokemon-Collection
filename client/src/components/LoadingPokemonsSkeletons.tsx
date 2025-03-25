import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";

export const LoadingPokemonsSkeletons = () => {
  return (
    <Container
      padding={12}
      maxW='container.xl'
      py={8}
      display='flex'
      flexDirection='column'
      gap={8}
    >
      <Heading as='h1' textAlign='center' color='blue.600'>
        Loading Pokémon...
      </Heading>
      <Skeleton height='73px' />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
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
