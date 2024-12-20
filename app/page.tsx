"use client";

import { useState } from 'react';

function Square({value, onSquareClick}: {value: string, onSquareClick: () => void}) {
  return <button className="border border-black w-20 h-20 text-[32px] flex items-center justify-center" onClick={onSquareClick}>{ value }</button>
}
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [steps, setSteps] = useState<number[]>([]);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    steps.push(i);
    if (steps.length > 6) {
      let delSquare = steps.shift();
      
      if (delSquare !== undefined) {
        nextSquares[delSquare] = null;
      }
    }
    setSteps(steps);
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares: Array<string | null>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <main className="flex flex-col items-center">
        <div className="mb-2 text-xl">{status}</div>
        <div className="flex flex-col space-y-0">
          <div className="flex space-x-0">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="flex space-x-0">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="flex space-x-0">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
      </main>
    </div>
  );
}
