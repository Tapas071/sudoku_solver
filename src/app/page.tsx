"use client"
import { useState } from "react";
import SudokuBoard from "../components/SudokuBoard";
import Image from "next/image";

export default function Home() {
  const initialBoard: number[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(0)
  );
  const [board, setBoard] = useState<number[][]>(initialBoard);

  const handleChange = (row: number, col: number, value: number) => {
    const newBoard = board.map((row) => row.slice()); // Create a copy of the board
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <SudokuBoard board={board} onChange={handleChange} setBoard = {setBoard} />
      </div>
    </>
  );
}




// const Home: React.FC = () => {
//   const [board, setBoard] = useState<number[][]>(initialBoard);

//   const handleChange = (row: number, col: number, value: number) => {
//     const newBoard = board.map((row) => row.slice()); // Create a copy of the board
//     newBoard[row][col] = value;
//     setBoard(newBoard);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <SudokuBoard board={board} onChange={handleChange} />
//     </div>
//   );
// };

// export default Home;