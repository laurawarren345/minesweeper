import {
  generateDummyGrid,
  setupGame,
  toggleFlag,
  determineCellsAdjacentToZero,
} from "./setupGame/logic";
import * as R from "ramda";
import { State } from "./state";
import { CellsObject } from "./currentGame/state";
import { gridSize } from "../params";

export interface Action {
  readonly type: string;
  [payloadItem: string]: any;
}

const defaultState: State = {
  cells: {},
  gridSize: 10,
};

export default function rootReducer(
  state: State = defaultState,
  action: Action
): State {
  let newState: State = R.clone(state);

  switch (action.type) {
    case "SET_UP_CELLS":
      return {
        ...state,
        cells: generateDummyGrid(state.gridSize),
      };
    case "SET_UP_GAME":
      return {
        ...state,
        cells: setupGame(state.cells, state.gridSize),
      };
    case "SET_CELL_AS_UNCOVERED":
      // newState.cells[action.cellKey].isUncovered = true;
      let cellsToUncover: string[] = [<string>(<unknown>action.cellKey)];
      if (newState.cells[action.cellKey].value === 0) {
        cellsToUncover = determineCellsAdjacentToZero(
          state.gridSize,
          <string>(<unknown>[action.cellKey]),
          state.cells,
          cellsToUncover
        );
      }
      console.log(`line 50 (rootReducer)`);
      console.log(cellsToUncover);
      cellsToUncover.forEach((key) => {
        newState.cells[key].isUncovered = true;
      });
      return newState;
    case "TOGGLE_FLAG":
      const newCell: CellsObject = toggleFlag(state.cells[action.cellKey]);
      newState.cells[action.cellKey] = newCell;
      return newState;
    default:
      return state;
  }
}

// function dealWithUncoveringZero (cells: Cells, cellKey: string): Cells {
//   return {
//     ...state,
//     cells: {
//       ...state.cells,
//       [action.cellKey]: {
//         ...state.cells[action.cellKey],
//         isUncovered: true,
//       },
//     },
//   };
// }
