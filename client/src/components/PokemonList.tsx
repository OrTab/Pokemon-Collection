import { SimpleGrid, Box } from "@chakra-ui/react";
import { CARD_HEIGHT, PokemonCard } from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { selectFilteredPokemons } from "../store/pokemon/selectors";
import { useVirtualizedGrid } from "../hooks/useVirtualizedGrid";
import { useBreakpointValue } from "@chakra-ui/react";
import { Pokemon } from "../../../shared/types";
import styled from "styled-components";

const POKEMON_LIST_DEFAULT_HEIGHT = 690;
const POKEMON_LIST_COLUMNS = { base: 1, sm: 2, md: 3, lg: 4 };
const BUFFER_ROWS = 4;

export const PokemonList = () => {
  const pokemons = useSelector(selectFilteredPokemons);
  const columnCount = useBreakpointValue(POKEMON_LIST_COLUMNS) || 1;
  const pokemonListHeight =
    useBreakpointValue({
      base: 620,
      sm: 620,
      md: 690,
      lg: 690,
    }) || POKEMON_LIST_DEFAULT_HEIGHT;

  const {
    containerRef,
    visibleItems: visiblePokemons,
    totalHeight,
    offsetTop,
  } = useVirtualizedGrid<Pokemon>({
    itemHeight: CARD_HEIGHT,
    itemsPerRow: columnCount,
    containerHeight: pokemonListHeight,
    bufferRows: BUFFER_ROWS,
    items: pokemons,
  });

  return (
    <ScrollableContainer ref={containerRef} height={pokemonListHeight}>
      <Box
        height={`${totalHeight}px`}
        position='relative'
        style={{ willChange: "transform" }}
      >
        <Box
          position='absolute'
          top={`${offsetTop}px`}
          width='100%'
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <SimpleGrid columns={columnCount} gap={6}>
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
    </ScrollableContainer>
  );
};

const ScrollableContainer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 12px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;
