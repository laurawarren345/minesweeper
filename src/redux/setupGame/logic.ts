import * as R from "ramda";
import { Cells, CellsObject } from "../currentGame/state";

function calculateNumberOfMines(gridSize: number) {
  const x: number = gridSize * gridSize;

  return Math.max(Math.floor(0.0002 * x * x + 0.0938 * x + 0.8937), 4);
}

export function generateDummyGrid(gridSize: number): Cells {
  const newCells: Cells = {};
  for (let j: number = 0; j < gridSize; j++) {
    for (let i: number = 0; i < gridSize; i++) {
      const cellKey: string = `${i + 1},${j + 1}`;
      newCells[cellKey] = {
        isUncovered: false,
        value: 0,
        flag: false,
      };
    }
  }
  return newCells;
}

export function setupGame(cells: Cells, gridSize: number): Cells {
  //Calculate number of mines needed
  let newCells: Cells = populateRandomMines(cells, gridSize);
  newCells = populateCellNumberValues(newCells, gridSize);
  return newCells;
}

export function populateRandomMines(cells: Cells, gridSize: number): Cells {
  const numberOfMines: number = calculateNumberOfMines(gridSize);
  const mineLocations: number[] = generateUniqueRandomNumbers(
    gridSize * gridSize,
    numberOfMines
  );

  // populate the nth Cell with a mine, for each 'n' in the random number array
  let newCells: Cells = R.clone(cells);
  mineLocations.forEach((mineLocation: number) => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 1; j <= gridSize; j++) {
        if (gridSize * i + j === mineLocation) {
          newCells = {
            ...newCells,
            [`${i + 1},${j}`]: {
              ...newCells[`${i + 1},${j}`],
              value: "mine",
              flag: false,
            },
          };
        }
      }
    }
  });
  return newCells;
}

export function populateCellNumberValues(
  cells: Cells,
  gridSize: number
): Cells {
  let newCells: Cells = R.clone(cells);
  const allMineKeys: mineLocation[] = [];

  //Populate all non-mines with 0 and store mines;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cellKey: string = `${i + 1},${j + 1}`;

      if (newCells[cellKey]["value"] === "mine") {
        allMineKeys.push([i + 1, j + 1]);
      } else {
        newCells[cellKey]["value"] = 0;
      }
    }
  }

  const incrementIfNotMine = (c: CellsObject | undefined) => {
    if (!c) return;
    if (c.value === "mine") return;
    if (c.value === "flag") return;

    c.value++;
  };

  //For each mine, increment the surrounding cells by 1
  allMineKeys.forEach(([i, j]) => {
    incrementIfNotMine(newCells[`${i - 1},${j - 1}`]);

    if (
      newCells[`${i},${j - 1}`] &&
      newCells[`${i},${j - 1}`].value !== "mine"
    ) {
      newCells[`${i},${j - 1}`]["value"] =
        <number>newCells[`${i},${j - 1}`]["value"] + 1;
    }
    if (
      newCells[`${i + 1},${j - 1}`] &&
      newCells[`${i + 1},${j - 1}`].value !== "mine"
    ) {
      newCells[`${i + 1},${j - 1}`]["value"] =
        <number>newCells[`${i + 1},${j - 1}`]["value"] + 1;
    }
    if (
      newCells[`${i - 1},${j}`] &&
      newCells[`${i - 1},${j}`].value !== "mine"
    ) {
      newCells[`${i - 1},${j}`]["value"] =
        <number>newCells[`${i - 1},${j}`]["value"] + 1;
    }
    if (
      newCells[`${i + 1},${j}`] &&
      newCells[`${i + 1},${j}`].value !== "mine"
    ) {
      newCells[`${i + 1},${j}`]["value"] =
        <number>newCells[`${i + 1},${j}`]["value"] + 1;
    }
    if (
      newCells[`${i - 1},${j + 1}`] &&
      newCells[`${i - 1},${j + 1}`].value !== "mine"
    ) {
      newCells[`${i - 1},${j + 1}`]["value"] =
        <number>newCells[`${i - 1},${j + 1}`]["value"] + 1;
    }
    if (
      newCells[`${i},${j + 1}`] &&
      newCells[`${i},${j + 1}`].value !== "mine"
    ) {
      newCells[`${i},${j + 1}`]["value"] =
        <number>newCells[`${i},${j + 1}`]["value"] + 1;
    }
    if (
      newCells[`${i + 1},${j + 1}`] &&
      newCells[`${i + 1},${j + 1}`].value !== "mine"
    ) {
      newCells[`${i + 1},${j + 1}`]["value"] =
        <number>newCells[`${i + 1},${j + 1}`]["value"] + 1;
    }
  });
  return newCells;
}

function generateUniqueRandomNumbers(maxValue: number, quantity: number) {
  let arr = [];
  while (arr.length < quantity) {
    const r = Math.floor(Math.random() * maxValue) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

type mineLocation = [number, number];

export function toggleFlag(toggleCell: CellsObject): CellsObject {
  return {
    ...toggleCell,
    flag: !toggleCell.flag,
  };
}

export function determineCellsAdjacentToZero(
  gridSize: number,
  cellKey: string,
  cells: Cells,
  cellsToUncover: Set<string>
): void {
  // Break the cellKey into its constituent numbers
  const parsedKey = /^(.*),(.*)/.exec(cellKey);

  if (!parsedKey) throw new Error(`Couldn't parse ${cellKey}`);

  const i: number = parseInt(parsedKey[1], 10);
  const j: number = parseInt(parsedKey[2], 10);

  // Determine (potential) adjacent cells
  const adjacentCellsArray: [number, number][] = [
    [i - 1, j - 1],
    [i, j - 1],
    [i + 1, j - 1],
    [i - 1, j],
    [i + 1, j],
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1],
  ];

  adjacentCellsArray
    // Filter out any non-viable cell references
    .filter(([a, b]) => a > 0 && a <= gridSize && b > 0 && b <= gridSize)
    // Map numeric duples back to cellKey strings
    .map(([a, b]) => `${a},${b}`)
    // For each of these new cells, check if the value === 0
    // and if so call this functon recursively to determine
    // any further cells that need to be uncovered
    .forEach((key) => {
      // Filter out cells already on the "uncover" list
      if (cellsToUncover.has(key)) return;

      cellsToUncover.add(key);

      if (cells[key].value === 0) {
        determineCellsAdjacentToZero(gridSize, key, cells, cellsToUncover);
      }
    });

  //Add these cells to the list of cells to uncover
  // cellsToUncover = cellsToUncover.concat(adjacentCellKeys);
}
