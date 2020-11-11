import React from "react";
import { useSelector } from "react-redux";

import { CellDisplayValue, selectCells } from "../redux/currentGame/selectors";
import style from "./GameGrid.module.css";
import CoveredSquare from "./CoveredSquare";
import UncoveredSquare from "./UncoveredSquare";

export default function GameGrid() {
  const rows: CellDisplayValue[][] = useSelector(selectCells);

  return (
    <div className={style.grid}>
      {rows.map((row, j) => (
        <div className={style.row} key={j}>
          {row.map((cell, i) => (
            <div className={style.col} key={i}>
              {cell === "covered" || cell === "flag" ? (
                <CoveredSquare
                  cellKey={`${i + 1},${j + 1}`}
                  flag={cell === "flag"}
                />
              ) : (
                <UncoveredSquare
                  cellKey={`${i + 1},${j + 1}`}
                  cellValue={cell}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
