import { setSudokuGrid } from "./algorithm/backtracking.js"

///////////////////////////////

const algorithmForm = document.querySelector(".algorithm__buttons")
const difficultyForm = document.querySelector(".difficulty__buttons")
const difficultyButtons = document.querySelectorAll(".difficulty__button")
const algorithmButtons = document.querySelectorAll(".algorithm__button")
const btnSubmit = document.querySelector(".submit__button")
const btnSolve = document.querySelector(".solve__button")
const sudokuTable = document.querySelector(".sudoku__table")
const sudokuCells = document.querySelectorAll(".sudoku__cell")
let sudokuCellsValue = [
   [8, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 3, 6, 0, 0, 0, 0, 0],
   [0, 7, 0, 0, 9, 0, 2, 0, 0],
   [0, 5, 0, 0, 0, 7, 0, 0, 0],
   [0, 0, 0, 0, 4, 5, 7, 0, 0],
   [0, 0, 0, 1, 0, 0, 0, 3, 0],
   [0, 0, 1, 0, 0, 0, 0, 6, 8],
   [0, 0, 8, 5, 0, 0, 0, 1, 0],
   [0, 9, 0, 0, 0, 0, 4, 0, 0],
]

////////////////

//////////

// Define the Sudoku API endpoint
let sudokuApiUrl = `https://sugoku.onrender.com/board?difficulty=easy`
// Fetch a new Sudoku puzzle

////////////////

const applyResponse = function () {
   const sudokuArray = sudokuCellsValue.flat()
   sudokuCells.forEach((cell, index) => {
      cell.value = sudokuArray[index] == 0 ? "" : sudokuArray[index]
   })
}

////////////////////////////////////////////////////

difficultyForm.addEventListener("click", function (e) {
   const btnClick = e.target.closest(".difficulty__form__button")

   if (!btnClick) return

   if (btnSubmit == btnClick) {
      fetch(sudokuApiUrl)
         .then((response) => {
            // Check for successful response
            if (!response.ok) {
               throw new Error("Failed to fetch Sudoku puzzle")
            }

            // Parse the response as JSON
            return response.json()
         })
         .then((data) => {
            // Handle the fetched Sudoku data (puzzle and solution)
            // console.log("Fetched Sudoku puzzle:", data)
            sudokuCellsValue = data.board
            console.log(data.board)
            // console.log(sudokuCellsValue)
            applyResponse()
            // You can now process the data.data (puzzle) and data.solution for your application's needs.
         })
         .catch((error) => {
            // Handle errors during the fetch process
            console.error("Error fetching Sudoku puzzle:", error)
         })
      return
   }

   sudokuApiUrl = `https://sugoku.onrender.com/board?difficulty=${btnClick.title}`

   difficultyButtons.forEach((t) =>
      t == btnClick
         ? t.classList.add("difficulty__button--active")
         : t.classList.remove("difficulty__button--active")
   )
})

algorithmForm.addEventListener("click", function (e) {
   const btnClick = e.target.closest(".algorithm__form__button")

   if (!btnClick) return

   if (btnSolve == btnClick) {
      setSudokuGrid(sudokuCellsValue)
      applyResponse()
      return
   }

   algorithmButtons.forEach((t) =>
      t == btnClick
         ? t.classList.add("algorithm__button--active")
         : t.classList.remove("algorithm__button--active")
   )
})

applyResponse(sudokuCellsValue.flat())

//////////////////////////

document.querySelector(".alibutton").addEventListener("click", function () {
   if (!navigator.clipboard) {
      console.log("محتوایی برای چاپ وجود ندارد!")
      return
   }

   // دریافت محتوای کپی شده
   navigator.clipboard.read().then((data) => {
      // بررسی نوع محتوای کپی شده
      console.log(data)
   })
})

const lineToGrid = function (line) {
   const gridArray = []
   const lineArray = line.split("").map((c) => (c == "." ? 0 : Number(c)))
   for (let row = 0; row < 9; row++) {
      let rowArray = []
      for (let col = 0; col < 9; col++) {
         rowArray.push(lineArray.shift())
      }
      gridArray.push(rowArray)
   }
   sudokuCellsValue = gridArray
   applyResponse()
}

// lineToGrid(
//    "...916.8....2.5.......7.....284..9....1...26..96....1..17.94..6....2..9..5...81.."
// )
