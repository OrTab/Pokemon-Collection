import { Pokemon } from "../../../shared/types";
import { Dialog, Box, Badge, Flex, Button, Heading } from "@chakra-ui/react";
import { formatName, getTypeColor } from "../utils";
import { FavoriteIcon } from "./FavoriteIcon";
import { PokemonImage } from "./PokemonImage";

type PokemonDetailsProps = {
  pokemon: Pokemon;
  onClose: () => void;
};

export const PokemonDetails = ({ pokemon, onClose }: PokemonDetailsProps) => {
  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header alignItems='center'>
            <Dialog.Title>{pokemon.name}</Dialog.Title>
            <FavoriteIcon pokemonId={pokemon.id} />
            <Dialog.CloseTrigger onClick={onClose} />
          </Dialog.Header>
          <Dialog.Body>
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <Box width={{ base: "100%", md: "40%" }} textAlign='center'>
                <PokemonImage sprites={pokemon.sprites} />
              </Box>
              <Box width={{ base: "100%", md: "60%" }}>
                <Section title='Types' data={pokemon.types} />
                <Section title='Abilities' data={pokemon.abilities} />
                <Section title='Evolutions' data={pokemon.evolutions} />
              </Box>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

const Section = ({ title, data }: { title: string; data: string[] }) => {
  return (
    <Box mb={4}>
      <Heading size='sm' mb={2}>
        {title}
      </Heading>
      <Flex wrap='wrap' gap={2}>
        {data.map((item, index) => (
          <Badge
            px={2}
            py={1}
            borderRadius='md'
            key={index}
            color={title === "Types" ? getTypeColor(item) : undefined}
          >
            {formatName(item)}
          </Badge>
        ))}
      </Flex>
    </Box>
  );
};
