const solve =  (board: number[][]) => {
    const isValid = (row: number, col: number, value: number) => {
        for (let i = 0; i < 9; i++) {
        if (board[row][i] === value || board[i][col] === value) {
            return false;
        }
        }
    
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
    
        for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === value) {
            return false;
            }
        }
        }
    
        return true;
    };
    
    const solveSudoku = () => {
        for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
            for (let value = 1; value <= 9; value++) {
                if (isValid(row, col, value)) {
                board[row][col] = value;
                if (solveSudoku()) {
                    return true;
                }
                board[row][col] = 0;
                }
            }
            return false;
            }
        }
        }
        return true;
    };
    
    solveSudoku();
    return board;
};
export default solve;