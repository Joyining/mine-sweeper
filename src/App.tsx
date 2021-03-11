import "./styles.css";
import Container from "./components/Container";

export interface GameConfig {
  numberOfColumns: number;
  numberOfRows: number;
  numberOfMines: number;
}

const levels = {
  easy: {
    numberOfColumns: 6,
    numberOfRows: 12,
    numberOfMines: 10
  },
  medium: {
    numberOfColumns: 10,
    numberOfRows: 20,
    numberOfMines: 35
  },
  difficult: {
    numberOfColumns: 13,
    numberOfRows: 27,
    numberOfMines: 75
  }
};

export default function App() {
  return <Container level={levels.medium} />;
}
