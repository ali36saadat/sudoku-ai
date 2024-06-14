// //Simulated Annealing Algorithm Sudoku Solver Class
// class SudokuSolver {
//    //CONSTRUCTOR
//    constructor() {
//       this.maxIteration = this.initialTemperature
//       this.coolingRate
//       this.reheatTo
//       this.reheatAfterX
//       this.emptyCells
//       this.initialBoard
//    }

//    _setSudoku(
//       board,
//       maxIteration,
//       initialTemperature,
//       coolingRate,
//       reheatTo,
//       reheatAfterX
//    ) {
//       this.maxIteration = maxIteration
//       this.initialTemperature = initialTemperature
//       this.coolingRate = coolingRate
//       this.reheatTo = reheatTo
//       this.reheatAfterX = reheatAfterX
//       this.emptyCells = this._getEmptyCells(board)
//       this.initialBoard = this._initializeBoard(board)
//    }
//    _getEmptyCells(board) {
//       const emptyCells = []

//       for (let row = 0; row < board.length; row++) {
//          for (let col = 0; col < board[row].length; col++) {
//             if (!board[row][col]) emptyCells.push([row, col])
//          }
//       }
//       // console.log(emptyCells)
//       return emptyCells
//    }

//    _initializeBoard(board) {
//       const newBoard = board.map((row) => [...row])

//       board.forEach((row, y) => {
//          let numbers = []

//          row.forEach((col) => {
//             if (col !== 0) numbers.push(col)
//          })

//          row.forEach((col, x) => {
//             if (col === 0) {
//                while (true) {
//                   let candidate = randomNumber(1, 9)
//                   if (!numbers.includes(candidate)) {
//                      newBoard[y][x] = candidate
//                      numbers.push(candidate)

//                      break
//                   }
//                }
//             }
//          })
//       })

//       console.log("Board initialization complete.")
//       return newBoard
//    }

//    _getListCost(arr) {
//       let cost = 0

//       // Increment cost by 1, if there's a repeated element
//       for (let i = 0; i < arr.length; i++) {
//          for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] === arr[j]) cost += 1
//          }
//       }

//       return cost
//    }

//    _getSudokuCost(board) {
//       let cost = 0

//       // Iterate over each row in the board.
//       for (let y = 0; y < 9; y++) {
//          cost += this._getListCost(board[y])
//       }

//       // Iterate over each column in the board.
//       for (let x = 0; x < 9; x++) {
//          const col = board.map((row) => row[x])
//          cost += this._getListCost(col)
//       }

//       // Iterate over each sub-grid in the board.
//       for (let i = 0; i < 3; i++) {
//          for (let j = 0; j < 3; j++) {
//             const subgrid = []
//             for (let y = i * 3; y < (i + 1) * 3; y++) {
//                for (let x = j * 3; x < (j + 1) * 3; x++) {
//                   subgrid.push(board[y][x])
//                }
//             }
//             cost += this._getListCost(subgrid)
//          }
//       }

//       return cost
//    }

//    generateNeighbor(board) {
//       const newBoard = board.map((row) => [...row])
//       let cell1, cell2

//       // Randomly choose two cells that can be switched (this.emptyCells)
//       while (true) {
//          cell1 = sample(this.emptyCells)
//          cell2 = sample(this.emptyCells)

//          if (cell1 && cell2 && (cell1[0] !== cell2[0] || cell1[1] !== cell2[1]))
//             break
//       }

//       // Switch the values of the two cells
//       if (cell1 && cell2) {
//          const temp = newBoard[cell1[0]][cell1[1]]

//          newBoard[cell1[0]][cell1[1]] = newBoard[cell2[0]][cell2[1]]
//          newBoard[cell2[0]][cell2[1]] = temp
//       }

//       return newBoard
//    }

//    _solveSudoku() {
//       let current_state = this.initialBoard.map((row) => [...row])

//       let current_cost = this._getSudokuCost(current_state)

//       let current_temperature = this.initialTemperature
//       let iteration = 0

//       while (iteration < 1000000) {
//          // Sudoku is solved if the current cost is 0
//          if (current_cost === 0) {
//             return [current_state, true, iteration]
//          }

//          // Reheat the annealer
//          if (iteration % this.reheatAfterX === 0)
//             current_temperature = this.reheatTo

//          const new_state = this.generateNeighbor(current_state)
//          const new_cost = this._getSudokuCost(new_state)
//          const delta_cost = new_cost - current_cost

//          if (delta_cost < 0) {
//             current_state = [...new_state]
//             current_cost = new_cost
//          } else {
//             const acceptance_probability = Math.exp(
//                -delta_cost / current_temperature
//             )

//             if (Math.random() < acceptance_probability) {
//                current_state = new_state.map((row) => [...row])
//                current_cost = new_cost
//             }
//          }

//          iteration++
//          current_temperature *= this.coolingRate
//       }

//       console.log(
//          `Can't solve sudoku after ${iteration} iterations.\nSudoku board may be invalid or there's is something wrong with my parameters or you can just try to solve it again.`
//       )

//       return [current_state, false, iteration]
//    }
// }

// // export default SudokuSolver

// function randomNumber(min, max) {
//    min = Math.ceil(min)
//    max = Math.floor(max)
//    return Math.floor(Math.random() * (max - min + 1)) + min
// }

// function sample(array) {
//    const randomIndex = Math.floor(Math.random() * array.length)
//    return array[randomIndex]
// }

// const sudokuGrid = new SudokuSolver()

// export const setSudokuGrid2 = function (grid, temp, rate) {
//    sudokuGrid._setSudoku(grid, 500000, 0.85, 0.999, 0.65, 5000)
//    return sudokuGrid._solveSudoku()
// }

class SudokuSolver {
   constructor() {
      this.maxIteration
      this.coolingRate
      this.reheatTo
      this.reheatAfterX
      this.emptyCells
      this.initialBoard
   }

   _setSudoku(
      board,
      maxIteration = 18000000,
      initialTemperature = null,
      coolingRate = 0.999,
      reheatTo = null,
      reheatAfterX = 30000
   ) {
      this.maxIteration = maxIteration
      this.coolingRate = coolingRate
      this.reheatAfterX = reheatAfterX
      this.emptyCells = this._getEmptyCells(board)
      this.initialBoard = this._initializeBoard(board)

      if (initialTemperature === null) {
         this.initialTemperature = this._calculateInitialTemperature(board)
         this.reheatTo = this.initialTemperature * 0.8
      } else {
         this.initialTemperature = initialTemperature
         this.reheatTo = this.initialTemperature * 0.8
      }
   }

   _getEmptyCells(board) {
      const emptyCells = []
      for (let row = 0; row < board.length; row++) {
         for (let col = 0; col < board[row].length; col++) {
            if (!board[row][col]) emptyCells.push([row, col])
         }
      }
      return emptyCells
   }

   _initializeBoard(board) {
      const newBoard = board.map((row) => [...row])
      board.forEach((row, y) => {
         let numbers = []
         row.forEach((col) => {
            if (col !== 0) numbers.push(col)
         })
         row.forEach((col, x) => {
            if (col === 0) {
               while (true) {
                  let candidate = randomNumber(1, 9)
                  if (!numbers.includes(candidate)) {
                     newBoard[y][x] = candidate
                     numbers.push(candidate)
                     break
                  }
               }
            }
         })
      })
      return newBoard
   }

   _getListCost(arr) {
      let cost = 0
      const counts = new Array(10).fill(0)
      for (const num of arr) {
         if (num !== 0) counts[num]++
      }
      for (const count of counts) {
         if (count > 1) cost += count - 1
      }
      return cost
   }

   _getSudokuCost(board) {
      let cost = 0
      for (let y = 0; y < 9; y++) {
         cost += this._getListCost(board[y])
      }
      for (let x = 0; x < 9; x++) {
         const col = board.map((row) => row[x])
         cost += this._getListCost(col)
      }
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            const subgrid = []
            for (let y = i * 3; y < (i + 1) * 3; y++) {
               for (let x = j * 3; x < (j + 1) * 3; x++) {
                  subgrid.push(board[y][x])
               }
            }
            cost += this._getListCost(subgrid)
         }
      }
      return cost
   }

   generateNeighbor(board) {
      const newBoard = board.map((row) => [...row])
      let cell1, cell2
      while (true) {
         cell1 = sample(this.emptyCells)
         cell2 = sample(this.emptyCells)
         if (cell1 && cell2 && (cell1[0] !== cell2[0] || cell1[1] !== cell2[1]))
            break
      }
      if (cell1 && cell2) {
         const temp = newBoard[cell1[0]][cell1[1]]
         newBoard[cell1[0]][cell1[1]] = newBoard[cell2[0]][cell2[1]]
         newBoard[cell2[0]][cell2[1]] = temp
      }
      return newBoard
   }

   _calculateInitialTemperature(board) {
      let initial_state = this._initializeBoard(board)
      let initial_cost = this._getSudokuCost(initial_state)
      let cost_differences = []

      for (let i = 0; i < 100; i++) {
         const neighbor = this.generateNeighbor(initial_state)
         const neighbor_cost = this._getSudokuCost(neighbor)
         const delta_cost = Math.abs(neighbor_cost - initial_cost)
         cost_differences.push(delta_cost)
      }

      const avg_delta_cost =
         cost_differences.reduce((a, b) => a + b, 0) / cost_differences.length
      return avg_delta_cost
   }

   _solveSudoku() {
      let current_state = this.initialBoard.map((row) => [...row])
      let current_cost = this._getSudokuCost(current_state)
      let current_temperature = this.initialTemperature
      let iteration = 0

      while (iteration < this.maxIteration) {
         if (current_cost === 0) {
            return [current_state, true, iteration]
         }
         if (iteration % this.reheatAfterX === 0)
            current_temperature = this.reheatTo

         const new_state = this.generateNeighbor(current_state)
         const new_cost = this._getSudokuCost(new_state)
         const delta_cost = new_cost - current_cost

         if (
            delta_cost < 0 ||
            Math.random() < Math.exp(-delta_cost / current_temperature)
         ) {
            current_state = new_state.map((row) => [...row])
            current_cost = new_cost
         }

         iteration++
         current_temperature *= this.coolingRate
      }

      console.log(`Can't solve sudoku after ${iteration} iterations.`)
      return [current_state, false, iteration]
   }
}

function randomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

function sample(array) {
   return array[Math.floor(Math.random() * array.length)]
}

const sudokuGrid = new SudokuSolver()

export const setSudokuGrid2 = function (grid) {
   sudokuGrid._setSudoku(grid)
   return sudokuGrid._solveSudoku()
}
