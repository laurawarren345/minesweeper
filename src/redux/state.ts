import { Cells } from "./currentGame/state";

export interface State {
  readonly cells: Cells
  readonly gridSize: number
  readonly numberOfMines?: number
}



