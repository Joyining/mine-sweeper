import styled from "styled-components";
import { useEffect, useState } from "react";
import { GameConfig } from "./App";
import Square from "./Square";

interface ContainerProps {
  level: GameConfig;
}

export interface SquareData {
  id: number;
  isMine: boolean;
  numberOfAdjacentMine?: number | undefined;
  isDigged?: boolean;
}

const Wrap = styled.div`
  border: 1px solid black;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
`;

const Actions = styled.div<{
  selectedSquareId?: number | null;
}>`
  visibility: ${(props) =>
    props.selectedSquareId !== null ? "visible" : "hidden"};
  display: flex;
  p {
    cursor: pointer;
    text-align: center;
    padding: 8px;
    margin: 2px;
    color: white;
    &.flag {
      background-color: Crimson;
    }
    &.unflag {
      background-color: DimGrey;
    }
    &.dig {
      background-color: ForestGreen;
    }
    &.cancel {
      background-color: Silver;
    }
  }
`;

export default function Container(props: ContainerProps) {
  console.log("render container");
  const { level } = props;
  const { numberOfColumns, numberOfRows, numberOfMines } = level;
  const numberOfSquares = numberOfColumns * numberOfRows;
  const [selectedSquareId, setSelectedSquareId] = useState<number | null>(null);

  let unInitialzedSquares = [];
  for (let i = 0; i < numberOfSquares; i++) {
    unInitialzedSquares.push({
      id: i,
      isMine: false,
      numberOfAdjacentMine: 0,
      isDigged: false
    });
  }
  const [squares, setSquares] = useState(unInitialzedSquares);
  const [gameInitialized, setGameInitialized] = useState(false);

  const neighborChecker = (neighborId: number, id: number) => {
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

  const initializeGame = (firstClickedId: number) => {
    //  setup mines
    let mineIds: number[] = [];
    while (mineIds.length < numberOfMines) {
      const r = Math.floor(Math.random() * numberOfSquares) + 1;
      if (mineIds.indexOf(r) === -1 && r !== firstClickedId) {
        mineIds.push(r);
      }
    }
    // update squares
    const getNumberOfAdjacentMine = (id: number) => {
      let result = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const neighborId = id + numberOfColumns * i + j;
          const isNeighbor = neighborChecker(neighborId, id);
          if (isNeighbor && mineIds.indexOf(neighborId) !== -1) {
            result++;
          }
        }
      }
      return result;
    };

    for (let i = 0; i < numberOfSquares; i++) {
      let newSquares = [...squares];
      const isMine = mineIds.indexOf(i) !== -1;
      const numberOfAdjacentMine = getNumberOfAdjacentMine(i);
      newSquares[i].isMine = isMine;
      newSquares[i].numberOfAdjacentMine = numberOfAdjacentMine;
      setSquares(newSquares);
    }

    setGameInitialized(true);
  };

  const dig = (input: SquareData) => {
    const { id, isMine, numberOfAdjacentMine } = input;
    let newSquares = [...squares];
    newSquares[id].isDigged = true;
    setSquares(newSquares);
    setSelectedSquareId(null);
    if (isMine) {
      console.log("GAME OVER !!!!");
      return;
    }

    if (numberOfAdjacentMine === 0) {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const neighborId = id + numberOfColumns * i + j;
          const isNeighbor = neighborChecker(neighborId, id);
          if (isNeighbor && squares[neighborId]?.isDigged === false) {
            dig(squares[neighborId]);
          }
        }
      }
    }
  };

  const handleSquareOnClick = (id: number) => {
    const squareData = squares[id];
    if (!gameInitialized) {
      initializeGame(id);
      dig(squareData);
    } else {
      setSelectedSquareId(id);
    }
  };

  return (
    <>
      <Actions selectedSquareId={selectedSquareId}>
        <p className="flag">Flag</p>
        <p className="unflag">Unflag</p>
        <p
          className="dig"
          onClick={() => dig(squares[selectedSquareId as number])}
        >
          Dig
        </p>
        <p className="cancel" onClick={() => setSelectedSquareId(null)}>
          Cancel
        </p>
      </Actions>
      <Wrap>
        {squares.map((square: SquareData) => {
          return (
            <Square
              key={square.id}
              id={square.id}
              width={300 / numberOfColumns}
              isMine={square.isMine}
              numberOfAdjacentMine={square.numberOfAdjacentMine}
              isDigged={square.isDigged}
              handleSquareOnClick={handleSquareOnClick}
            />
          );
        })}
      </Wrap>
    </>
  );
}
