import { EvolutionChain } from "./types/types";

export const extractEvolutionNames = (
  chain: EvolutionChain,
  evolutionNames: string[] = []
): string[] => {
  if (chain.evolves_to.length > 0) {
    const nextChain = chain.evolves_to[0];
    const { name: evolutionName } = chain.species;
    evolutionNames.push(evolutionName);
    return extractEvolutionNames(nextChain, evolutionNames);
  } else {
    return evolutionNames;
  }
};

export const getAllSettledValues = async <T>(
  promises: Promise<T>[]
): Promise<{
  fulfilledResults: T[];
  rejectedResults: any[];
}> => {
  const results = await Promise.allSettled(promises);
  const fulfilledResults = results
    .filter(
      (result): result is PromiseFulfilledResult<Awaited<T>> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);

  const rejectedResults = results
    .filter(
      (result): result is PromiseRejectedResult => result.status === "rejected"
    )
    .map((result) => result.reason);

  return {
    fulfilledResults,
    rejectedResults,
  };
};

export const checkIsImageUrl = (url: string) => {
  return (
    Boolean(url) &&
    typeof url === "string" &&
    (url.endsWith(".jpg") ||
      url.endsWith(".png") ||
      url.endsWith(".gif") ||
      url.endsWith(".bmp") ||
      url.endsWith(".jpeg"))
  );
};
