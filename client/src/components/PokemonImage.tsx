import { Image } from "@chakra-ui/react";
import styled from "styled-components";
import { Pokemon } from "../../../shared/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { checkIsImageUrl } from "../utils";

type PokemonImageProps = {
  sprites: Pokemon["sprites"];
  className?: string;
};

const SPRITES_INTERVAL = 1000;

export const PokemonImage = ({ sprites, className }: PokemonImageProps) => {
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
    <ImagesContainer className={className}>
      {spritesValues.length ? (
        spritesValues.map((spriteUrl, index) => (
          <VisiblePokemonImage
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
