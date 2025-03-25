import { useCallback, useRef, useState } from "react";
import { Pokemon } from "../../../shared/types";
import { Box, Heading, Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { useIntersectionObserver } from "../hooks/useIntersactionObserver";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import React from "react";

import { PokemonDetails } from "./PokemonDetails";
import { FavoriteIcon } from "./FavoriteIcon";
import { PokemonImage } from "./PokemonImage";
import {
  selectPokemonFilters,
  selectPokemonHasMoreToFetch,
} from "../store/pokemon/selectors";
import { setCurrentPage } from "../store/pokemon/slice";

type PokemonCard = {
  pokemon: Pokemon;
  isLastCard: boolean;
};

export const CARD_HEIGHT = 300;

export const PokemonCard = React.memo(
  ({ pokemon, isLastCard }: PokemonCard) => {
    const dispatch = useDispatch<AppDispatch>();
    const hasMoreToFetch = useSelector(selectPokemonHasMoreToFetch);
    const filters = useSelector(selectPokemonFilters);
    const isFilterApplied = filters.showFavorites || filters.search;

    const [shouldShowDetails, setShouldShowDetails] = useState(false);
    const cardRef = useRef<HTMLElement>(null);

    const { name } = pokemon;
    const updatePagination = useCallback(() => {
      dispatch(setCurrentPage());
    }, [dispatch]);

    useIntersectionObserver({
      cb: updatePagination,
      element: cardRef,
      shouldBeObserved: isLastCard && !isFilterApplied,
      hasMore: hasMoreToFetch,
    });

    const handleViewDetails = useCallback(() => {
      setShouldShowDetails(true);
    }, []);

    return (
      <>
        <Box
          onClick={handleViewDetails}
          cursor='pointer'
          ref={cardRef}
          key={name}
          height={CARD_HEIGHT}
          borderRadius='lg'
          boxShadow='md'
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "xl",
          }}
          transition='all 0.3s ease'
          bg='white'
          position='relative'
        >
          <StyledFavoriteIcon pokemonId={pokemon.id} />
          <StyledPokemonImage sprites={pokemon.sprites} />
          {/* Details container - bottom section */}
          <Box p={4}>
            <Heading size='md' mb={2} color='gray.700'>
              {name}
            </Heading>
            <Badge
              onClick={handleViewDetails}
              colorScheme='blue'
              px={3}
              py={1}
              borderRadius='full'
              fontSize='xs'
              fontWeight='bold'
              cursor='pointer'
              _hover={{ bg: "blue.100" }}
            >
              View Details
            </Badge>
          </Box>
        </Box>
        {shouldShowDetails && (
          <PokemonDetails
            pokemon={pokemon}
            onClose={() => setShouldShowDetails(false)}
          />
        )}
      </>
    );
  }
);

const StyledFavoriteIcon = styled(FavoriteIcon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const StyledPokemonImage = styled(PokemonImage)`
  background-color: #f9fafb;
  border-bottom: 1px solid rgb(226, 232, 240);
`;
