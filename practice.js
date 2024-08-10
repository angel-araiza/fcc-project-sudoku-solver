const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
function isValid(board,row,col, num){
  //Check if the number is not in the current row
  for (let x = 0; x < 9; x ++){
    if( board[row][x] === num) return false;
  }

  //Check if the number is not in the current column
  for (let x = 0; x <9; x++){
    if (board[x][col] ==num)return false;
  }
  
  //Check if the number is not in the current 3x3 box
  const startRow = Math.floor(row/3) * 3;
  const startCol = Math.floor(col/3) * 3;
  for (let i = 0; i < 3; i++){
    for (let j =0; j < 3; j++){
      if (board[startRow + i][startCol +j] ===num) return false;
    }
  }
  
  return true;
}

function solveSudoku(board){
  for (let row = 0;row<9; row++){
    for (let col = 0; col<9; col++){
      if (board[row][col] ===0){
        for (let num =1; num <=9; num++){
          if (isValid(board, row, col, num)){
            board[row][col] = num;
            
            if (solveSudoku(board)){
              return true;
            }

            board[row][col] = 0; //Reset cell and backtrack
          }
        }
        return false; //No number found, so backtrack
      }
    }
  }
  return true; //Solved
}

if (solveSudoku(board)) {
  console.log("Solved board:");
  console.log(board);
} else {
  console.log("No solution exists!");
}