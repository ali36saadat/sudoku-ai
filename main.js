import { setSudokuGrid } from "./algorithm/backtracking.js"

const algorithmForm = document.querySelector(".algorithm__buttons")
const difficultyForm = document.querySelector(".difficulty__buttons")
const difficultyButtons = document.querySelectorAll(".difficulty__button")
const algorithmButtons = document.querySelectorAll(".algorithm__button")
const btnSubmit = document.querySelector(".submit__button")
const btnSolve = document.querySelector(".solve__button")
const btnIncreaseSpeed = document.querySelector(".increase__button")
const btnDecreaseSpeed = document.querySelector(".decrease__button")
const sudokuTable = document.querySelector(".sudoku__table")
const sudokuCells = document.querySelectorAll(".sudoku__cell")
const inputSpeedCounter = document.querySelector(".speed__counter")
const inputLineGridInput = document.querySelector(".line__grid__input")
const btnSwitch = document.querySelector(".switch__button")
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
   ],
   lineGridInput = false

////////////////

//////////

// Define the Sudoku API endpoint
let sudokuApiUrl = `https://sugoku.onrender.com/board?difficulty=easy`
// Fetch a new Sudoku puzzle
let speedValue = 0
////////////////

const applyResponse = function () {
   const sudokuArray = sudokuCellsValue.flat()
   sudokuCells.forEach((cell, index) => {
      cell.value = sudokuArray[index] == 0 ? "" : sudokuArray[index]
   })
}

difficultyForm.addEventListener("click", function (e) {
   const btnClick = e.target.closest(".difficulty__form__button")

   if (!btnClick) return

   if (btnSwitch == btnClick && e.pointerId == 1) {
      difficultyButtons.forEach((btn, index) =>
         btn != index ? btn.classList.toggle("hidden") : ""
      )
      lineGridInput = lineGridInput == false ? true : false
      return
   }

   if (btnSubmit == btnClick) {
      if (lineGridInput) {
         lineToGrid(inputLineGridInput.value)
         inputLineGridInput.value = ""
      } else {
         fetch(sudokuApiUrl)
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Failed to fetch")
               }

               return response.json()
            })
            .then((data) => {
               sudokuCellsValue = data.board
               applyResponse()
            })
            .catch((error) => {
               console.error("Error fetching ", error)
            })
      }

      return
   }

   difficultyButtons.forEach((t) => {
      if (t == btnClick && t != btnSwitch) {
         t.classList.add("difficulty__button--active")
      } else {
         t.classList.remove("difficulty__button--active")
      }
   })

   sudokuApiUrl = `https://sugoku.onrender.com/board?difficulty=${btnClick.title}`
})

algorithmForm.addEventListener("click", function (e) {
   const btnClick = e.target.closest(".algorithm__form__button")
   const btnSpeed = e.target.closest(".speed__button")

   if (!btnClick) return

   if (btnSolve == btnClick) {
      console.time("Time")
      setSudokuGrid(sudokuCellsValue)
      console.timeEnd("Time")
      applyResponse()
      return
   } else if (btnSpeed == btnIncreaseSpeed) {
      if (speedValue < 2) {
         btnDecreaseSpeed.disabled = false
         speedValue++
         inputSpeedCounter.value = speedValue
      } else if (speedValue == 2) {
         btnIncreaseSpeed.disabled = true
         speedValue++
         inputSpeedCounter.value = speedValue
      }
      return
   } else if (btnSpeed == btnDecreaseSpeed) {
      if (speedValue > 1) {
         btnIncreaseSpeed.disabled = false
         speedValue--
         inputSpeedCounter.value = speedValue
      } else if (speedValue == 1) {
         btnDecreaseSpeed.disabled = true
         speedValue--
         inputSpeedCounter.value = speedValue
      }
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

const lineToGrid = function (line) {
   const gridArray = []
   const lineArray = line.split("").map((c) => (c == "." ? 0 : Number(c)))

   if (
      lineArray.filter(
         (cell) => (typeof cell !== Number && cell >= 0) || cell < 10
      ).length == 81
   ) {
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
}
