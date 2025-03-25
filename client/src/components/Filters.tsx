import { useDispatch, useSelector } from "react-redux";
import { Box, Input, Flex, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebaounce";
import { useCallback } from "react";
import { selectPokemonFilters } from "../store/pokemon/selectors";
import { setFilters } from "../store/pokemon/slice";

export const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectPokemonFilters);
  const { showFavorites } = filters;

  const setSearchQuery = useCallback(
    (value: string) => {
      dispatch(setFilters({ ...filters, search: value }));
    },
    [dispatch, filters]
  );

  const debouncedSearchQuery = useDebounce(setSearchQuery, 500);

  const handleToggleFavorites = () => {
    dispatch(setFilters({ ...filters, showFavorites: !filters.showFavorites }));
  };

  return (
    <Box p={4} borderWidth='1px' borderRadius='lg' shadow='sm' margin='0 12px'>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Flex flex={1} alignItems='center' gap={4}>
          <FaSearch color='gray.400' />

          <Input
            placeholder='Search Pokémon...'
            onChange={(e) => debouncedSearchQuery(e.target.value)}
          />
        </Flex>

        <Flex gap={2} justifyContent='center'>
          <Button
            colorScheme={showFavorites ? "pink" : "gray"}
            variant={showFavorites ? "solid" : "outline"}
            onClick={handleToggleFavorites}
          >
            {showFavorites ? "Showing Favorites" : "Show Favorites"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
