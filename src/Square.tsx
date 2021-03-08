import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SquareData } from "./Container";
import FlagIcon from "./icon/FlagIcon";

interface SquareProps {
  id: number;
  width: number;
  isMine: boolean;
  numberOfAdjacentMine: number | undefined;
  isDigged: boolean | undefined;
  isFlagged: boolean | undefined;
  handleSquareOnClick: (id: number) => void;
}

const Wrap = styled.div<{
  width: number;
  isDigged?: boolean;
}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  background-color: ${(props) =>
    props.isDigged ? "DarkGrey" : "DarkSeaGreen"};
  border: 1px solid green;
  box-sizing: border-box;
  flex-shrink: 0;
`;

function Square(props: SquareProps) {
  const {
    id,
    width,
    isMine,
    numberOfAdjacentMine,
    isDigged,
    isFlagged,
    handleSquareOnClick
  } = props;

  return (
    <Wrap
      width={width}
      isDigged={isDigged}
      onClick={() => handleSquareOnClick(id)}
    >
      {isMine ? "M" : ""}
      {isDigged && numberOfAdjacentMine ? numberOfAdjacentMine : ""}
      {isFlagged && <FlagIcon size={width * 0.6} />}
    </Wrap>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.numberOfAdjacentMine !== 0 &&
    prevProps.numberOfAdjacentMine === nextProps.numberOfAdjacentMine &&
    prevProps.isMine === nextProps.isMine &&
    prevProps.isDigged === nextProps.isDigged &&
    prevProps.isFlagged === nextProps.isFlagged
  ) {
    return true;
  } else {
    return false;
  }
}

export default React.memo(Square, areEqual);
