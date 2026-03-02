import React from "react";
import '../App.css'

export const Box = ({symbol, onPress, isHightLight, winner }) => {
  const isDraw = winner === 'NONE';
  
  return (
    <button className={`box ${isDraw ? 'draw': ''}`} onClick={onPress} id={isHightLight ? "high" : "low"}>
      <h1>{symbol}</h1>
    </button>
  )
}