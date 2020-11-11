import { Action } from "../rootReducer";

export function setCellAsUncovered(cellKey: string): Action {
  return {type: "SET_CELL_AS_UNCOVERED", cellKey: cellKey }
}