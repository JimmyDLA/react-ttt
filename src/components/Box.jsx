import React from "react";
import '../App.css'

export const Box = ({ symbol, onPress, isHightLight, winner }) => {
  const isDraw = winner === 'NONE';
  const symbolClass = symbol === 'X' ? 'x' : symbol === 'O' ? 'o' : '';

  return (
    <button className={`box ${isDraw ? 'draw' : ''} ${symbolClass}`} onClick={onPress} id={isHightLight ? "high" : "low"}>
      <h1>{symbol}</h1>
    </button>
  )
}