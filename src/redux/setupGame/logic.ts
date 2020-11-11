import { Cells } from "../currentGame/state";

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
      console.log(newCells[cellKey].value);
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
  let newCells: Cells = { ...cells };
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
  let newCells: Cells = { ...cells };
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
  //For each mine, increment the surrounding cells by 1
  allMineKeys.forEach(([i, j]) => {
    if (
      newCells[`${i - 1},${j - 1}`] &&
      newCells[`${i - 1},${j - 1}`].value !== "mine"
    ) {
      newCells[`${i - 1},${j - 1}`]["value"] =
        <number>newCells[`${i - 1},${j - 1}`]["value"] + 1;
    }
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
