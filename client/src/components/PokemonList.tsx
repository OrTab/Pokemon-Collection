import { SimpleGrid, Box, Spinner } from "@chakra-ui/react";
import { CARD_HEIGHT, PokemonCard } from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { selectFilteredPokemons } from "../store/pokemon/selectors";
import { useVirtualizedGrid } from "../hooks/useVirtualizedGrid";
import { useBreakpointValue } from "@chakra-ui/react";
import { Pokemon } from "../../../shared/types";
import styled from "styled-components";

const POKEMON_LIST_DEFAULT_HEIGHT = 750;
export const POKEMON_LIST_COLUMNS = { base: 1, sm: 2, md: 3, lg: 4 };
const BUFFER_ROWS = 4;
const OBSERVATION_OFFSET = 5;

type PokemonListProps = {
  shouldShowLoading: boolean;
};

export const PokemonList = ({ shouldShowLoading }: PokemonListProps) => {
  const pokemons = useSelector(selectFilteredPokemons);
  const columnCount = useBreakpointValue(POKEMON_LIST_COLUMNS) || 1;
  const pokemonListHeight =
    useBreakpointValue({
      base: 620,
      sm: 620,
      md: 750,
      lg: 750,
    }) || POKEMON_LIST_DEFAULT_HEIGHT;

  const {
    containerRef,
    visibleItems: visiblePokemons,
    totalHeight,
    offsetTop,
    startIndex,
  } = useVirtualizedGrid<Pokemon>({
    itemHeight: CARD_HEIGHT,
    itemsPerRow: columnCount,
    containerHeight: pokemonListHeight,
    bufferRows: BUFFER_ROWS,
    items: pokemons,
  });

  return (
    <ScrollableContainer ref={containerRef} height={pokemonListHeight}>
      <Box height={totalHeight} position='relative'>
        <Box
          position='absolute'
          top={offsetTop}
          width='100%'
          display='flex'
          flexDirection='column'
          gap={12}
        >
          <SimpleGrid columns={columnCount} gap={6} paddingBottom='20px'>
            {visiblePokemons.map((pokemon, index) => {
              const absoluteIndex = startIndex + index;
              const shouldObserve =
                pokemons.length - absoluteIndex === OBSERVATION_OFFSET;

              return (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  cardShouldBeObserved={shouldObserve}
                />
              );
            })}
          </SimpleGrid>
          {shouldShowLoading && (
            <LoaderContainer>
              <Spinner size='lg' />
            </LoaderContainer>
          )}
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
`;
