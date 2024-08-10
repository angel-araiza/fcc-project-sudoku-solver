class SudokuSolver {

  validate(puzzleString) {
    //The validate function should take a given puzzle string
    // and check it to see if it has 81 valid characters for the input.
    const lengthChecker = (puzzleString.length ===81);
    const validString = (puzzleString)=>{
      const array = puzzleString.split("");
      array.forEach(element => {
        if (element === NaN || element !== ".") return false;
      });
    }
    if (lengthChecker && validString) return true;
    return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {
  //The check functions should be validating against the current state of the board.
  const board = [];

  //Loop through the string in steps of 9
  for (i=0; i<puzzleString; i +=9){
    //Slice out a subarray of 9 characters and push it to board array
    board.push(puzzleString.slice(i, i + 9).split(''));
  }
    //Check if the number is not in the current row
    for (let x=0; x <9; x++){
      if (board[row][x] ===value) return false;
    } 
  }

  checkColPlacement(puzzleString, row, column, value) {
    const board = [];

    //Loop through the string in steps of 9
    for (i=0; i<puzzleString; i +=9){
    //Slice out a subarray of 9 characters and push it to board array
    board.push(puzzleString.slice(i, i + 9).split(''));
    }

    //Check if the number is not in the current column
    for (let x =0; x <9; x ++){
      if (board[x][column] === value) return false;
    }

  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const board = [];

    //Loop through the string in steps of 9
    for (i=0; i<puzzleString; i +=9){
      //Slice out a subarray of 9 characters and push it to board array
      board.push(puzzleString.slice(i, i + 9).split(''));
    }

    //Check if the number is not in the current 3x3 box
    const startRow = Math.floor(row/3) * 3; //This allows us to find the right section
    // Whether that by top, middle, or bottom section
    const startCol = Math.floor(column/3) * 3;
    for (let i = 0; i <3; i ++){
      for (let j = 0; j<3; j ++){
        if (board[startRow + i][startCol + j] === value) return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    const board = [];

    //Loop through the string in steps of 9
    for (i=0; i<puzzleString; i +=9){
    //Slice out a subarray of 9 characters and push it to board array
    board.push(puzzleString.slice(i, i + 9).split(''));
    }

    //The solve function should handle solving any given valid puzzle string,
    // not just the test inputs and solutions. You are expected to write out the logic to solve this.
    const solveBoard = (board) => {
      for (let row = 0; row< 9; row ++){
        for(let column = 0; column<9; column ++){
          //I might need to push the sting into a board here
          if (board[row][column] === "."){
            for(let value = 1; value <=9; value++){
              const charValue = value.toString();
              if (this.validate(puzzleString) &&
                  this.checkRowPlacement(puzzleString, row, column, charValue) &&
                  checkColPlacement(puzzleString, row, column, charValue) && 
                  checkRegionPlacement(puzzleString, row, column, charValue)){

                board[row][column] = charValue;
  
                if (solveBoard(board)){
                  return true;
                }
  
                board[row][col] = ".";
              }
            }
            return false; //No number found, so backtrack
          }
        }
      }
      return true; //Solved
    }
    if (solve(board)){    
      return board.flat().join("");
    } else {
      throw new Error("No solution exists.");
    }
  }
    

}

module.exports = SudokuSolver;

