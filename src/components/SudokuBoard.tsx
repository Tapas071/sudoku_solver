"use client"
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import solve from "@/utils/solve";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import isSolvable from "@/utils/isSolvable";

// Define the type for the Sudoku board
type SudokuBoardProps = {
  board: number[][];
  onChange: (row: number, col: number, value: number) => void;
  setBoard: (board: number[][]) => void;
};

const SudokuBoard: React.FC<SudokuBoardProps> = ({ board, onChange , setBoard }) => {
  const handleChange = (row: number, col: number, value: number) => {
    if (value >= 1 && value <= 9) {
      onChange(row, col, value);
    }
  };
  
  const router = useRouter();

  const onClickHanlderToSolve = async () => {
    console.log("clicked");
    if(!isSolvable(board)){
      console.log("not solvable");
      alert("This board is not solvable");
    } else {
      const isSolvable2 = solve(board);
      const solvedBoard =  solve(board);
      console.log(solvedBoard);
      setBoard(solvedBoard);
      router.refresh()
    }
  };
  
  const onClickHanlderToReset = () => {
    setBoard(Array.from({ length: 9 }, () => Array(9).fill(0)));
    router.refresh()
  };

  return (
    <>
      <div className="grid grid-cols-9 gap-1 p-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell || ""}
              onChange={(e) =>
                handleChange(rowIndex, colIndex, parseInt(e.target.value))
              }
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))
        )}
        <Button
          onClick={onClickHanlderToSolve}
          className="col-span-9"
        >
          Click Me to solve
        </Button>
        <Button
          onClick={onClickHanlderToReset}
          className="col-span-9"
        >
          Click to Reset
        </Button>
      </div>
    </>
  );
};

export default SudokuBoard;
