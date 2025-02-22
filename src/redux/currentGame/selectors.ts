import { createSelector } from "reselect";
import { State } from "../state";
import { Cells } from "./state";

export type CellDisplayValue = number | "mine" | "covered" | "flag";

export const selectCells = createSelector(
  [(state: State) => state.cells, (state: State) => state.gridSize],
  (cells: Cells, gridSize: number) => {
    const rows: CellDisplayValue[][] = [];

    // Loop through using gridSize param to generate grid
    for (let j: number = 0; j < gridSize; j++) {
      const columnCells: CellDisplayValue[] = [];
      for (let i: number = 0; i < gridSize; i++) {
        const cellId = `${i + 1},${j + 1}`;

        const cell = cells[cellId];
        columnCells.push(
          !cell.isUncovered || cell.flag || cell.value === undefined
            ? (!cell.isUncovered && !cell.flag) || cell.value === undefined
              ? "covered"
              : "flag"
            : cell.value
        );
      }
      rows.push(columnCells);
    }

    return rows;
  }
);
