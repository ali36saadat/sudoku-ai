// METHOD

Array.prototype.MAP = function (callback) {
   const newArray = []
   for (let i = 0; i < this.length; i++) {
      newArray.push(callback(this[i], i, this))
   }
   return newArray
}

// Javascript program for above approach

// N is the size of the 2D matrix N*N
let N = 9

/* Takes a partially filled-in grid and attempts
	to assign values to all unassigned locations in
	such a way to meet the requirements for
	Sudoku solution (non-duplication across rows,
	columns, and boxes) */
function solve1Sudoku(grid, row, col) {
   /* If we have reached the 8th
	row and 9th column (0
	indexed matrix) ,
	we are returning true to avoid further
	backtracking	 */
   if (row == N - 1 && col == N) return true

   // Check if column value becomes 9 ,
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
      // the num (1-9) in the given
      // row ,col ->we move to next column
      if (isSafe(grid, row, col, num)) {
         /* assigning the num in the current
			(row,col) position of the grid and
			assuming our assigned num in the position
			is correct */
         grid[row][col] = num

         // Checking for next
         // possibility with next column
         if (solve1Sudoku(grid, row, col + 1)) return true
      }

      /* removing the assigned num , since our
		assumption was wrong , and we go for next
		assumption with diff num value */
      grid[row][col] = 0
   }
   return false
}

// Check whether it will be legal
// to assign num to the
// given row, col
function isSafe(grid, row, col, num) {
   // Check if we find the same num
   // in the similar row , we
   // return false
   for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false

   // Check if we find the same num
   // in the similar column ,
   // we return false
   for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false

   // Check if we find the same num
   // in the particular 3*3
   // matrix, we return false
   let startRow = row - (row % 3),
      startCol = col - (col % 3)

   for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
         if (grid[i + startRow][j + startCol] == num) return false

   return true
}

export const AB = function (grid) {
   if (solve1Sudoku(grid, 0, 0)) return grid
   else console.log("no solution exists ")
}

////////////////////////////////////

let colMatrix = [],
   rowMatrix = [],
   gridMatrix = [],
   S = 1

////////////////////////////////////
export const sudokuSolver = function (matrix) {
   initialMatrix(matrix)
   // console.log(rowMatrix)
   // console.log(gridMatrix)
}

const initialMatrix = function (matrix) {
   colMatrix = matrix
   rowMatrix = matrix.MAP((row, i) => row.MAP((_, j) => matrix[j][i]))

   for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
         const subGrid = []
         for (let k = i; k < i + 3; k++) {
            for (let l = j; l < j + 3; l++) {
               subGrid.push(matrix[k][l])
            }
         }
         gridMatrix.push(subGrid)
      }
   }

   console.log(solveSudoku(colMatrix, rowMatrix, gridMatrix, 1, 1))
}

const solveSudoku = function (colMatrix, rowMatrix, gridMatrix, col, row) {
   if (col == 1 && row == 10) return colMatrix
   if (colMatrix[col - 1][row - 1] != 0) {
      if (
         [
            ...new Set(
               colMatrix[row - 1],
               rowMatrix[col - 1],
               gridMatrix[
                  Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1
               ]
            ),
         ].includes(10) === false
      ) {
         solveSudoku(
            colMatrix,
            rowMatrix,
            gridMatrix,
            col + 1 == 10 ? 1 : col + 1,
            col + 1 == 10 ? row + 1 : row
         )
      }
   } else {
      if (
         [
            ...new Set(
               colMatrix[row - 1],
               rowMatrix[col - 1],
               gridMatrix[
                  Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1
               ]
            ),
         ].includes(10) == false
      ) {
         colMatrix[col - 1][row - 1] = "#"
         solveSudoku(
            colMatrix,
            rowMatrix,
            gridMatrix,
            col + 1 == 10 ? 1 : col + 1,
            col + 1 == 10 ? row + 1 : row
         )
      }
   }

   // console.log(`response ${col} ${row}`)
   /*if (colMatrix[col - 1][row - 1] != 0) {
      console.log(
         [
            ...new Set(
               colMatrix[row - 1],
               rowMatrix[col - 1],
               gridMatrix[
                  Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1
               ]
            ),
         ].includes(1)
      )
      // console.log([
      //    ...new Set[
      //       (colMatrix[row - 1],
      //       rowMatrix[col - 1],
      //       gridMatrix[
      //          Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1
      //       ]).flat()
      //    ](),
      // ])

      return solveSudoku(
         colMatrix,
         rowMatrix,
         gridMatrix,
         col + 1 == 10 ? 1 : col + 1,
         col + 1 == 10 ? row + 1 : row
      )

      // return solveSudoku(
      //    (colMatrix, col + 1 == 10 ? 1 : col, col + 1 == 10 ? row + 1 : row)
      // )
   } else {
      console.log(
         [
            ...new Set(
               colMatrix[row - 1],
               rowMatrix[col - 1],
               gridMatrix[
                  Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1
               ]
            ),
         ].includes(1)
      )

      // console.log(
      //    `matrix ${col} ${row}`,
      //    Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1
      // )
      // console.log(
      //    `ELSE`,
      //    col + 1 == 10 ? 1 : col + 1,
      //    col + 1 == 10 ? row + 1 : row
      // )

      colMatrix[col - 1][row - 1] = 0

      return solveSudoku(
         colMatrix,
         rowMatrix,
         gridMatrix,
         col + 1 == 10 ? 1 : col + 1,
         col + 1 == 10 ? row + 1 : row
      )

      // return solveSudoku(
      //    (colMatrix, col + 1 == 10 ? 1 : col, col + 1 == 10 ? row + 1 : row)
      // )
   }*/
   // // for (let i = 1; i < 10; i++) {

   // // }
   // colMatrix[col][row] = "#"
   // console.log(colMatrix)
   // if (col != 9 || row != 9) {
   //    solveSudoku(
   //       (colMatrix, col + 1 == 10 ? 1 : col, col + 1 == 10 ? row + 1 : row)
   //    )
   //    return
   // }
}
