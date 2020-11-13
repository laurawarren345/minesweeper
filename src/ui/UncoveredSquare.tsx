import React from "react";
import { useDispatch } from "react-redux";
import { CellValue } from "../redux/currentGame/state";
import style from "./square.module.css";
import mine from "../Bunny.jpg";

export default function UncoveredSquare({
  cellKey,
  cellValue,
}: UncoveredSquareProps) {
  const dispatch = useDispatch();

  const displayValue: JSX.Element | CellValue | null =
    cellValue === "mine" ? (
      <img src={mine} alt="mine" className="mine" />
    ) : cellValue === 0 ? null : (
      cellValue
    );

  return (
    <button
      className={style.uncoveredSquare}
      onClick={() =>
        dispatch({ type: "SET_CELL_AS_UNCOVERED", cellKey: cellKey })
      }
    >
      {displayValue}
    </button>
  );
}

interface UncoveredSquareProps {
  cellKey: string;
  cellValue: CellValue;
}
