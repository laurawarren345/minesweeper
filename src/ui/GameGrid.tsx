import React from "react";
import style from "./GameGrid.module.css";
import EmptySquare from './EmptySquare';

export default function GameGrid() {
  return(
    <div className={style.grid}>
      <div className={style.row}>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
      </div>
      <div className={style.row}>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
      </div>
      <div className={style.row}>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
      </div>
      <div className={style.row}>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
      </div>
      <div className={style.row}>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
        <div className={style.col}><EmptySquare /></div>
      </div>
    </div>
  )
}