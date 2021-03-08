import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SquareData } from "./Container";

interface SquareProps {
  id: number;
  width: number;
  isMine: boolean;
  numberOfAdjacentMine: number | undefined;
  isDigged: boolean | undefined;
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
  console.log("render square");
  const {
    id,
    width,
    isMine,
    numberOfAdjacentMine,
    isDigged,
    handleSquareOnClick
  } = props;

  return (
    <Wrap
      width={width}
      isDigged={isDigged}
      onClick={() => handleSquareOnClick(id)}
    >
      {isMine ? "M" : ""}
      {numberOfAdjacentMine}
    </Wrap>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.numberOfAdjacentMine !== 0 &&
    prevProps.numberOfAdjacentMine === nextProps.numberOfAdjacentMine &&
    prevProps.isMine === nextProps.isMine &&
    prevProps.isDigged === nextProps.isDigged
  ) {
    return true;
  } else {
    return false;
  }
}

export default React.memo(Square, areEqual);
