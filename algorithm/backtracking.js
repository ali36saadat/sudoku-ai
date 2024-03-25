Array.prototype.MAP = function (callback) {
   const newArray = []
   for (let i = 0; i < this.length; i++) {
      newArray.push(callback(this[i], i, this))
   }
   return newArray
}

export const AB = function (grid) {
   if (solve1Sudoku(grid, 0, 0)) return grid
   else console.log("no solution exists ")
}

//////////////////////////////////

let colMatrix = []

export const sudokuSolver = function (matrix) {
   // initialMatrix(matrix)
   if (solveSudoku(matrix, 1, 1)) return matrix
   // console.log(colMatrix)
}

const solveSudoku = function (colMatrix, col, row) {
   if (col == 1 && row == 10) return true

   if (colMatrix[col - 1][row - 1] != 0) {
      return solveSudoku(
         colMatrix,
         col + 1 == 10 ? 1 : col + 1,
         col + 1 == 10 ? row + 1 : row
      )
   }
   for (let num = 1; num < 10; num++) {
      if (isSafe(colMatrix, col - 1, row - 1, num)) {
         colMatrix[col - 1][row - 1] = num

         // return solveSudoku(
         //    colMatrix,
         //    col + 1 == 10 ? 1 : col + 1,
         //    col + 1 == 10 ? row + 1 : row
         // )

         if (
            solveSudoku(
               colMatrix,
               col + 1 == 10 ? 1 : col + 1,
               col + 1 == 10 ? row + 1 : row
            )
         ) {
            return true
         }
      }

      colMatrix[col - 1][row - 1] = 0
      // rowMatrix[row - 1][col - 1] = 0
   }
   return false
}

function isSafe(grid, row, col, num) {
   // Check row and column for duplicates
   for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) return false
   }

   // Check 3x3 subgrid for duplicates
   let startRow = Math.floor(row / 3) * 3
   let startCol = Math.floor(col / 3) * 3

   for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
         if (grid[i][j] === num) return false
      }
   }

   return true
}

const cellSafe = function (colMatrix, col, row, num) {
   // console.log(colMatrix, rowMatrix, col, row, num)
   // if (colMatrix[row].includes(num)) return false

   for (let x = 0; x <= 8; x++) if (colMatrix[col][x] == num) return false

   for (let x = 0; x <= 8; x++) if (colMatrix[x][row] == num) return false

   let startRow = row - (row % 3),
      startCol = col - (col % 3)

   for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
         if (colMatrix[i + startRow][j + startCol] == num) return false

   return true
}

//////////////////

// Javascript program for above approach

// Javascript program for above approach

let N = 9

/* Takes a partially filled-in grid and attempts
    to assign values to all unassigned locations in
    such a way to meet the requirements for
    Sudoku solution (non-duplication across rows,
    columns, and boxes) */
export function solve1Sudoku(grid, row, col) {
   /* If we have reached the 8th
       row and 9th column (0
       indexed matrix) ,
       we are returning true to avoid further
       backtracking       */
   if (row == N - 1 && col == N) return true

   // Check if column value  becomes 9 ,
   // we move to next row
   // and column start from 0
   if (col == N) {
      row++
      col = 0
   }

   // Check if the current position
   // of the grid already
   // contains value >0, we iterate
   // for next column
   if (grid[row][col] != 0) return solve1Sudoku(grid, row, col + 1)

   for (let num = 1; num < 10; num++) {
      // Check if it is safe to place
      // the num (1-9)  in the given
      // row ,col ->we move to next column
      if (isSafe(grid, row, col, num)) {
         /*  assigning the num in the current
            (row,col)  position of the grid and
            assuming our assigned num in the position
            is correct */
         grid[row][col] = num
         // return solve1Sudoku(grid, row, col + 1)

         // Checking for next
         // possibility with next column
         if (solve1Sudoku(grid, row, col + 1)) return true
      }

      /* removing the assigned num , since our
           assumption was wrong , and we go for next
           assumption with diff num value   */
      grid[row][col] = 0
   }
   return false
}

/* A utility function to print grid */
function print(grid) {
   for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) document.write(grid[i][j] + " ")

      document.write("<br>")
   }
}

// Check whether it will be legal
// to assign num to the
// given row, col

// Driver Code

// This code is contributed by rag2127

// Driver Code
export const FCK = function (grid, row, col) {
   if (solve1Sudoku(grid, row, col)) return grid
}
// This code is contributed by rag2127
