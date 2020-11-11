import { useDispatch } from "react-redux";
import React from "react";
import style from "./square.module.css";
import flagPic from "../Flag.png";

export default function CoveredSquare({ cellKey, flag }: CoveredSquareProps) {
  const dispatch = useDispatch();

  return (
    <button
      className={style.coveredSquare}
      onClick={() =>
        dispatch({ type: "SET_CELL_AS_UNCOVERED", cellKey: cellKey })
      }
      onMouseUp={(event) => {
        if (event.button === 2) {
          event.preventDefault();
          dispatch({ type: "SET_CELL_AS_FLAG", cellKey: cellKey });
        }
      }}
    >
      {flag ? <img src={flagPic} alt="flag" className="flag" /> : null}
    </button>
  );
}

export interface CoveredSquareProps {
  cellKey: string;
  flag: boolean;
}
