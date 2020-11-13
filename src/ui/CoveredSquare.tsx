import { useDispatch } from "react-redux";
import React from "react";
import style from "./square.module.css";
import flagPic from "../Flag.png";

export default function CoveredSquare({ cellKey, flag }: CoveredSquareProps) {
  const dispatch = useDispatch();

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  const displayValue: JSX.Element | null = flag ? (
    <img src={flagPic} alt="flag" className="flag" />
  ) : null;

  return (
    <button
      className={style.coveredSquare}
      onClick={() => {
        if (!flag) {
          dispatch({ type: "SET_CELL_AS_UNCOVERED", cellKey: cellKey });
        }
      }}
      onMouseUp={(event) => {
        if (event.button === 2) {
          dispatch({ type: "TOGGLE_FLAG", cellKey: cellKey });
        }
      }}
    >
      {displayValue}
    </button>
  );
}

export interface CoveredSquareProps {
  cellKey: string;
  flag: boolean;
}
