"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import solve from "@/utils/solve";
import { useRouter } from "next/navigation";

// Define the type for the Sudoku board
type SudokuBoardProps = {
  board: number[][];
  onChange: (row: number, col: number, value: number) => void;
  setBoard: (board: number[][]) => void;
};

const SudokuBoard: React.FC<SudokuBoardProps> = ({ board, onChange, setBoard }) => {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const router = useRouter();

  // Inline isSolvable function
  const isSolvable = (board: number[][]): boolean => {
    const isValidPlacement = (board: number[][], row: number, col: number, num: number): boolean => {
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
      }
      for (let y = 0; y < 9; y++) {
        if (board[y][col] === num) return false;
      }
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) return false;
        }
      }
      return true;
    };

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num !== 0) {
          board[row][col] = 0;
          if (!isValidPlacement(board, row, col, num)) {
            return false;
          }
          board[row][col] = num;
        }
      }
    }

    return true;
  };

  const handleChange = (row: number, col: number, value: number) => {
    if (value >= 1 && value <= 9) {
      onChange(row, col, value);
      setStatusMessage("");
    }
  };

  const onClickHandlerToSolve = () => {
    if (!isSolvable(board)) {
      setStatusMessage("This board is not solvable.");
    } else {
      const solvedBoard = solve(board);
      if (solvedBoard) {
        setBoard(solvedBoard);
        setStatusMessage("Solved!");
      } else {
        setStatusMessage("No solution found.");
      }
      router.refresh();
    }
  };

  const onClickHandlerToReset = () => {
    setBoard(Array.from({ length: 9 }, () => Array(9).fill(0)));
    setStatusMessage("Unsolved");
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-center text-lg font-bold mb-4">{statusMessage}</h2>
      <div className="grid grid-cols-9 gap-1 p-4 bg-gray-800 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell || ""}
              onChange={(e) => handleChange(rowIndex, colIndex, parseInt(e.target.value))}
              className={`w-12 h-12 text-center border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                cell !== 0 ? "bg-blue-900 text-blue-300" : "bg-gray-700 text-white"
              }`}
            />
          ))
        )}
      </div>
      <Button
        onClick={onClickHandlerToSolve}
        className="w-full bg-green-500 hover:bg-green-700 text-white mt-4"
      >
        Solve Sudoku
      </Button>
      <Button
        onClick={onClickHandlerToReset}
        className="w-full bg-red-500 hover:bg-red-700 text-white mt-2"
      >
        Reset Board
      </Button>
    </div>
  );
};

export default SudokuBoard;
