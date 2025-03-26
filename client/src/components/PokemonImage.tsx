import { Image } from "@chakra-ui/react";
import styled from "styled-components";
import { Pokemon } from "../../../shared/types";
import { useCallback, useEffect, useState } from "react";

type PokemonImageProps = {
  sprites: Pokemon["sprites"];
  className?: string;
};

const SPRITES_INTERVAL = 1000;

export const PokemonImage = ({ sprites, className }: PokemonImageProps) => {
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

  const handleSpriteChange = useCallback(() => {
    setCurrentSpriteIndex((prevIndex) => (prevIndex + 1) % sprites.length);
  }, [sprites]);

  useEffect(() => {
    if (sprites.length) {
      const intervalId = setInterval(handleSpriteChange, SPRITES_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [handleSpriteChange, sprites]);

  return (
    <ImagesContainer className={className}>
      {sprites.length ? (
        sprites.map((spriteUrl, index) => (
          <VisiblePokemonImage
            $shouldBeVisible={index === currentSpriteIndex}
            key={spriteUrl}
            src={spriteUrl}
            alt={`${name} image ${index}`}
          />
        ))
      ) : (
        <Image
          height='100%'
          src='https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
          alt='default'
        />
      )}
    </ImagesContainer>
  );
};

const ImagesContainer = styled.div<{ height?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  width: 100%;
  height: 200px;
`;

const VisiblePokemonImage = styled(Image)<{ $shouldBeVisible: boolean }>`
  grid-column: 1;
  grid-row: 1;
  object-fit: contain;
  opacity: ${({ $shouldBeVisible }) => ($shouldBeVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
