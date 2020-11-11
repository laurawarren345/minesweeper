export interface Cells {
  [key: string]: CellsObject;
}

export interface CellsObject {
  isUncovered: boolean;
  value: CellValue;
  flag: boolean;
}

export type CellValue = "mine" | "flag" | number;
