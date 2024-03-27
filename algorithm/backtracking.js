export class SudokuSolver {
   constructor() {
      this.grid = []
   }

   _setSudoku(grid, speed) {
      this.grid = grid
      this.speed = speed
   }

   _findEmptyCell(rowLoc, colLoc) {
      let row = rowLoc,
         col = colLoc

      if (col == 9) {
         row++
         col = 0
      }

      if (row == 9) {
         // همه‌ی خانه‌ها بررسی شده و هیچ خانه‌ای خالی پیدا نشده است
         return false
      }

      if (this.grid[row][col] == 0) {
         return { row, col }
      }

      return this._findEmptyCell(row, col + 1)
   }

   _isValid(row, col, num) {
      for (let j = 0; j < 9; j++) {
         if (this.grid[j][col] == num || this.grid[row][j] == num) return false
      }

      let startRow = row - (row % 3),
         startCol = col - (col % 3)

      for (let i = 0; i < 3; i++)
         for (let j = 0; j < 3; j++)
            if (this.grid[i + startRow][j + startCol] == num) return false

      return true
   }

   _solve(rowLoc, colLoc) {
      let emptyCell = this._findEmptyCell(rowLoc, colLoc)

      if (!emptyCell) return true

      let { row, col } = emptyCell

      for (let num = 1; num < 10; num++) {
         if (this._isValid(row, col, num)) {
            this.grid[row][col] = num
            if (this._solve(row, col)) return true
            this.grid[row][col] = 0
         }
      }
      return false
   }

   _run() {
      return this._solve(0, 0) ? this.grid : false
   }
}

export const setSudokuGrid = function (grid, speed) {
   sudokuGrid._setSudoku(grid, 0)
   return sudokuGrid._run(grid)
}

const sudokuGrid = new SudokuSolver()

// export const sudokuSolver = function (grid) {
// const findEmptyCell = function (rowLoc) {
//    for (let row = rowLoc; row < 9; row++) {
//       for (let col = 0; col < 9; col++) {
//          // if (!grid[i][j]) return { i, j }
//          if (!grid[row][col]) return { row, col }
//       }
//    }
//    return false
// }

//    const isValid = function (row, col, num) {
//       for (let j = 0; j < 9; j++) {
//          if (grid[j][col] == num || grid[row][j] == num) return false
//       }
//       return isValidSubgrid(row, col, num)
//    }

//    const isValidSubgrid = function (row, col, num) {
//       let startRow = row - (row % 3),
//          startCol = col - (col % 3)

//       for (let i = 0; i < 3; i++)
//          for (let j = 0; j < 3; j++)
//             if (grid[i + startRow][j + startCol] == num) return false

//       return true
//    }

//    const solve = function (rowLoc) {
//       let emptyCell = findEmptyCell(rowLoc)

//       if (!emptyCell) return true

//       let { row, col } = emptyCell

//       for (let num = 1; num < 10; num++) {
//          if (isValid(row, col, num)) {
//             grid[row][col] = num
//             if (solve(row)) return true
//             grid[row][col] = 0
//          }
//       }
//       return false
//    }

//    return solve(0) ? grid : false
// }
