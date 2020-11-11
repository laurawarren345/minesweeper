import { generateDummyGrid, setupGame } from "./setupGame/logic";
import { State } from "./state";

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
      return {
        ...state,
        cells: {
          ...state.cells,
          [action.cellKey]: {
            ...state.cells[action.cellKey],
            isUncovered: true,
          },
        },
      };
    default:
      return state;
  }
}
