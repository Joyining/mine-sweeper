interface NeighborCheckerInput {
  neighborId: number;
  id: number;
  numberOfSquares: number;
  numberOfColumns: number;
}

export const neighborChecker = (input: NeighborCheckerInput) => {
  const { neighborId, id, numberOfSquares, numberOfColumns } = input;
  let result =
    neighborId >= 0 && neighborId <= numberOfSquares - 1 && neighborId !== id;
  if (
    neighborId % numberOfColumns === numberOfColumns - 1 &&
    id % numberOfColumns === 0
  ) {
    result = false;
  }
  if (
    neighborId % numberOfColumns === 0 &&
    id % numberOfColumns === numberOfColumns - 1
  ) {
    result = false;
  }
  return result;
};
