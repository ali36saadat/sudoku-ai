//Backtracking Algorithm Sudoku Solver Class
class BacktrackingSudokuSolver {
   //CONSTRUCTOR
   constructor() {
      this.grid = []
   }

   //UPDATE THE GRID
   _setSudoku(grid) {
      this.grid = grid
   }

   //FIND AN EMPTY CELL IN THE GRID
   _findEmptyCell(rowLoc, colLoc) {
      let row = rowLoc
      let col = colLoc

      if (col == 9) {
         row++
         col = 0
      }

      if (row == 9) return false // If any of the cells are empty, return false

      if (this.grid[row][col] == 0) return { row, col } // If the current cell is empty, return its row and column coordinates

      return this._findEmptyCell(row, col + 1) // If the current cell is not empty, continues to search
   }

   //VALIDATE CELL
   _isValid(row, col, num) {
      for (let j = 0; j < 9; j++) {
         if (this.grid[j][col] == num || this.grid[row][j] == num) return false // If the number already exists in the current row or column, return false
      }

      let startRow = row - (row % 3),
         startCol = col - (col % 3)

      for (let i = 0; i < 3; i++)
         for (let j = 0; j < 3; j++)
            if (this.grid[i + startRow][j + startCol] == num) return false // If the number already exists in the current subgrid, return false

      return true // If the number doesn't exist in the current row, col and subgrid, return true
   }

   //SOLVE BACKTRACKING
   _solve(rowLoc, colLoc) {
      let emptyCell = this._findEmptyCell(rowLoc, colLoc)

      if (!emptyCell) return true // there are no more empty cells, return true

      let { row, col } = emptyCell

      for (let num = 1; num < 10; num++) {
         if (this._isValid(row, col, num)) {
            this.grid[row][col] = num
            if (this._solve(row, col)) return true // After placing a number, continue solving the Sudoku, if it leads to a solution, return true

            this.grid[row][col] = 0
         }
      }
      return false // If placing any number does not lead to a solution, return false
   }
}

const sudokuGrid = new BacktrackingSudokuSolver()

export const setSudokuGrid = function (grid) {
   sudokuGrid._setSudoku(grid, 0)
   return sudokuGrid._solve(0, 0) ? [grid, true] : [grid, false]
}
