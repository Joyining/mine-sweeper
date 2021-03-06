import React from "react";
import styled from "styled-components";
import { SquareData } from "./Container";
import FlagIcon from "../icons/FlagIcon";

interface SquareProps {
  id: number;
  width: number;
  isMine: boolean;
  numberOfAdjacentMine: number | undefined;
  isDigged: boolean | undefined;
  isFlagged: boolean | undefined;
  isSelected: boolean;
  handleSquareOnClick: (id: number) => void;
}

const Wrap = styled.div<{
  width: number;
  showGreyBackground?: boolean;
  isSelected?: boolean;
}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  background-color: ${(props) =>
    props.showGreyBackground ? "DarkGrey" : "DarkSeaGreen"};
  border: 1px solid ${(props) => (props.isSelected ? "GoldenRod" : "Green")};
  box-sizing: border-box;
  flex-shrink: 0;
  text-align: center;
  line-height: ${(props) => `${props.width}px`};
`;

function Square(props: SquareProps) {
  const {
    id,
    width,
    isMine,
    numberOfAdjacentMine,
    isDigged,
    isFlagged,
    isSelected,
    handleSquareOnClick
  } = props;

  return (
    <Wrap
      width={width}
      isSelected={isSelected}
      showGreyBackground={isDigged && !isFlagged}
      onClick={() => handleSquareOnClick(id)}
    >
      {isMine && isDigged ? "X" : ""}
      {isDigged && !isFlagged && !isMine && numberOfAdjacentMine
        ? numberOfAdjacentMine
        : ""}
      {isFlagged && <FlagIcon size={width * 0.6} />}
    </Wrap>
  );
}

function areEqual(prevProps: SquareData, nextProps: SquareData) {
  if (
    prevProps.numberOfAdjacentMine !== 0 &&
    prevProps.numberOfAdjacentMine === nextProps.numberOfAdjacentMine &&
    prevProps.isMine === nextProps.isMine &&
    prevProps.isDigged === nextProps.isDigged &&
    prevProps.isFlagged === nextProps.isFlagged &&
    prevProps.isSelected === nextProps.isSelected
  ) {
    return true;
  } else {
    return false;
  }
}

export default React.memo(Square, areEqual);
