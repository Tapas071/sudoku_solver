const isSolvable = (board: number[][]) => {
    // Function to check if placing a number is valid
    const isValid = (row: number, col: number, value: number, testBoard: number[][]) => {
        for (let i = 0; i < 9; i++) {
            if (testBoard[row][i] === value || testBoard[i][col] === value) {
                return false;
            }
        }
        
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (testBoard[i][j] === value) {
                    return false;
                }
            }
        }

        return true;
    };

    // Backtracking solver on a copy of the board
    const solveSudoku = (testBoard: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (testBoard[row][col] === 0) {
                    for (let value = 1; value <= 9; value++) {
                        if (isValid(row, col, value, testBoard)) {
                            testBoard[row][col] = value;
                            if (solveSudoku(testBoard)) {
                                return true;
                            }
                            testBoard[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    // Create a deep copy of the board
    const boardCopy = board.map(row => [...row]);
    return solveSudoku(boardCopy);
};

export default isSolvable;
