import { Action } from "../rootReducer";

export function setupCells(): Action {
  return {type: "SET_UP_CELLS"}
}

export function setupGame(): Action {
  return {type: "SET_UP_GAME"}
}