import { SimpleGrid, Box } from "@chakra-ui/react";
import { CARD_HEIGHT, PokemonCard } from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { selectFilteredPokemons } from "../store/pokemon/selectors";
import { useVirtualizedGrid } from "../hooks/useVirtualizedGrid";
import { useBreakpointValue } from "@chakra-ui/react";
import { Pokemon } from "../../../shared/types";

const POKEMON_LIST_HEIGHT = 650;

export const PokemonList = () => {
  const pokemons = useSelector(selectFilteredPokemons);
  const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 }) || 1;

  const {
    containerRef,
    visibleItems: visiblePokemons,
    totalHeight,
    offsetTop,
  } = useVirtualizedGrid<Pokemon>({
    itemHeight: CARD_HEIGHT,
    itemsPerRow: columnCount,
    containerHeight: POKEMON_LIST_HEIGHT,
    bufferRows: 2,
    items: pokemons,
  });

  return (
    <Box height={POKEMON_LIST_HEIGHT} overflowY='auto' ref={containerRef}>
      <Box height={`${totalHeight}px`} position='relative'>
        <Box position='absolute' top={`${offsetTop}px`} width='100%'>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {visiblePokemons.map((pokemon, index) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isLastCard={index === visiblePokemons.length - 1}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
