import { useCallback, useEffect, useMemo, useState } from "react";
import { Pokemon } from "../../../shared/types";
import { Box, Heading, Badge, Image } from "@chakra-ui/react";
import { checkIsImageUrl } from "../utils";
import styled from "styled-components";

type PokemonCard = {
  pokemon: Pokemon;
};

const SPRITES_INTERVAL = 1000;

export const PokemonCard = ({ pokemon: { sprites, name } }: PokemonCard) => {
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

  const spritesValues: string[] = useMemo(
    () => Object.values(sprites).filter(checkIsImageUrl),
    [sprites]
  );

  const handleSpriteChange = useCallback(() => {
    setCurrentSpriteIndex(
      (prevIndex) => (prevIndex + 1) % spritesValues.length
    );
  }, [spritesValues]);

  useEffect(() => {
    const intervalId = setInterval(handleSpriteChange, SPRITES_INTERVAL);
    return () => clearInterval(intervalId);
  }, [handleSpriteChange]);

  return (
    <Box
      key={name}
      height='300px'
      borderRadius='lg'
      boxShadow='md'
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
      }}
      transition='all 0.3s ease'
      bg='white'
    >
      <ImagesContainer>
        {spritesValues.length ? (
          spritesValues.map((spriteUrl, index) => (
            <PokemonImage
              $shouldBeVisible={index === currentSpriteIndex}
              key={spriteUrl}
              src={spriteUrl}
              alt={`${name} image ${index}`}
            />
          ))
        ) : (
          <Image
            src='https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
            alt='default'
          />
        )}
      </ImagesContainer>

      {/* Details container - bottom section */}
      <Box p={4}>
        <Heading size='md' mb={2} color='gray.700'>
          {name}
        </Heading>
        <Badge
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
  );
};

const ImagesContainer = styled.div<{ height?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f9fafb;
  border-bottom: 1px solid rgb(226, 232, 240);
`;

const PokemonImage = styled(Image)<{ $shouldBeVisible: boolean }>`
  grid-column: 1;
  grid-row: 1;
  object-fit: contain;
  opacity: ${({ $shouldBeVisible }) => ($shouldBeVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
