import { setSudokuGrid } from "./algorithm/backtracking.js"
import { setSudokuGrid2 } from "./algorithm/simulatedAnnealing.js"
// import { generateSudokuGrid } from "./generator/generator.js"

const algorithmForm = document.querySelector(".algorithm__buttons")
const settingForm = document.querySelector(".setting__buttons")
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
const inputLineInput = document.querySelector(".line__input")
const btnSwitch = document.querySelector(".switch__button")
const difficultyNextBtn = document.querySelector(".difficulty__set__next")
const difficultyPreBtn = document.querySelector(".difficulty__set__pre")
const difficultyText = document.querySelector(".difficulty__set")
const difficultySetterForm = document.querySelector(".difficulty__setter")
const trashBtn = document.querySelector(".trash__button")
const textTimeSpend = document.querySelector(".time__spend")
const upTemp = document.querySelector(".up__temp")
const downTemp = document.querySelector(".down__temp")
const upRate = document.querySelector(".up__rate")
const downRate = document.querySelector(".down__rate")
const tempInput = document.querySelector(".input__temp")
const rateInput = document.querySelector(".input__rate")
const btnResetSetting = document.querySelector(".reset__button")
const textIterations = document.querySelector(".iterations__container")
const textError = document.querySelector(".error__text")
const iterationsInfo = document.querySelector(".iterations__info")
const errorInfo = document.querySelector(".error__info")
const timeInfo = document.querySelector(".time__info")
let sudokuCellsValue = [
      [0, 0, 0, 5, 0, 9, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 8, 0, 0],
      [0, 6, 0, 0, 0, 0, 0, 0, 0],
      [4, 0, 9, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 0],
      [8, 0, 0, 0, 0, 0, 9, 0, 5],
      [0, 0, 0, 2, 0, 0, 4, 0, 0],
      [0, 0, 0, 7, 6, 0, 0, 0, 0],
   ],
   lineGridInput = false,
   algorithmNum = 0,
   btnSolveActive = true

////////////////

//////////

// Fetch a new Sudoku puzzle
let speedValue = 0

var copySudoku = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [2, 0, 0, 0, 4, 0, 0, 8, 0],
   [0, 3, 9, 7, 0, 0, 0, 2, 0],
   [1, 0, 8, 0, 9, 0, 0, 0, 0],
   [0, 2, 0, 0, 0, 0, 0, 4, 0],
   [0, 0, 6, 0, 7, 0, 2, 0, 1],
   [0, 0, 0, 0, 0, 0, 7, 6, 0],
   [0, 6, 0, 9, 3, 0, 0, 1, 0],
   [3, 7, 3, 0, 2, 8, 1, 0, 0],
]

let difficulty = 0
const difficultyTexts = ["Simple", "Easy", "Moderate", "Intermediate", "Expert"]
let randomRemoveList = [0, 10, 20, 35, 50, 55]
////////////////

const applyResponse = function () {
   const sudokuArray = sudokuCellsValue.flat()
   console.log(...sudokuCellsValue.flat())
   sudokuCells.forEach((cell, index) => {
      cell.value = sudokuArray[index] == 0 ? "" : sudokuArray[index]
   })
}

difficultyForm.addEventListener("click", function (e) {
   const btnClick = e.target.closest(".difficulty__form__button")

   if (!btnClick) return

   if (btnClick == difficultyNextBtn) {
      if (difficulty < 4) {
         difficulty++
         difficultyText.textContent = difficultyTexts[difficulty]
      }
   } else if (btnClick == difficultyPreBtn) {
      if (difficulty > 0) {
         difficulty--
         difficultyText.textContent = difficultyTexts[difficulty]
      }
   }

   if (btnSwitch == btnClick && e.pointerId == 1) {
      difficultySetterForm.classList.toggle("hidden")
      inputLineInput.classList.toggle("hidden")
      lineGridInput = lineGridInput == false ? true : false
      return
   }

   if (btnSubmit == btnClick) {
      sudokuCells.forEach((cell, index) => {
         cell.classList.remove("invalid")
      })
      textTimeSpend.textContent = ``
      textIterations.textContent = ``

      errorInfo.classList.add("hidden")
      if (algorithmNum == 1) {
         iterationsInfo.classList.remove("hidden")
      }
      timeInfo.classList.remove("hidden")

      btnSolveActive = true

      if (lineGridInput) {
         lineToGrid(inputLineGridInput.value)

         inputLineGridInput.value = ""
      } else {
         const randomNum = randomRemoveNumber(difficulty)
         let sudokuApiUrl = `https://ali36saadat-sudoku.liara.run/api/?delete=${randomNum}`
         fetch(sudokuApiUrl)
            .then((response) => response.text())
            .then((data) => {
               sudokuCellsValue = JSON.parse(data)
               copyFunc(sudokuCellsValue)
               applyResponse()
            })
            .catch((error) => {
               console.error("Error:", error)
            })
         return
      }

      return
   }
})

algorithmForm.addEventListener("click", function (e) {
   const btnClick = e.target.closest(".algorithm__form__button")
   const btnSpeed = e.target.closest(".speed__button")

   if (!btnClick) return

   if (btnSolve == btnClick) {
      if (!btnSolveActive) return
      btnSolveActive = false
      algorithmSolver()
      return
   }
   // else if (btnSpeed == btnIncreaseSpeed) {
   //    if (speedValue < 2) {
   //       btnDecreaseSpeed.disabled = false
   //       speedValue++
   //       inputSpeedCounter.value = speedValue
   //    } else if (speedValue == 2) {
   //       btnIncreaseSpeed.disabled = true
   //       speedValue++
   //       inputSpeedCounter.value = speedValue
   //    }
   //    return
   // } else if (btnSpeed == btnDecreaseSpeed) {
   //    if (speedValue > 1) {
   //       btnIncreaseSpeed.disabled = false
   //       speedValue--
   //       inputSpeedCounter.value = speedValue
   //    } else if (speedValue == 1) {
   //       btnDecreaseSpeed.disabled = true
   //       speedValue--
   //       inputSpeedCounter.value = speedValue
   //    }

   //    return
   // }

   if (btnClick == trashBtn) {
      errorInfo.classList.add("hidden")
      if (algorithmNum == 1) {
         iterationsInfo.classList.remove("hidden")
      }
      timeInfo.classList.remove("hidden")
      sudokuCellsValue = JSON.parse(JSON.stringify(copySudoku))
      applyResponse()
      textTimeSpend.textContent = ``
      textIterations.textContent = ``
      sudokuCells.forEach((cell, index) => {
         cell.classList.remove("invalid")
      })
      btnSolveActive = true
      return
   }

   // console.log(algorithmButtons)
   for (const t of algorithmButtons) {
      if (t == btnClick) {
         t.classList.add("algorithm__button--active")
         setAlgorithm(t.title)
      } else {
         t.classList.remove("algorithm__button--active")
      }
   }
   // algorithmButtons.forEach((t) =>
   //    t == btnClick
   //       ? t.classList.add("algorithm__button--active")
   //       : t.classList.remove("algorithm__button--active")
   // )
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
      copyFunc(sudokuCellsValue)
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

// generateSudokuGrid(9, 30)

const randomRemoveNumber = function (num) {
   return Math.floor(
      Math.random() * (randomRemoveList[num + 1] - randomRemoveList[num]) +
         randomRemoveList[num] +
         1
   )
}

const copyFunc = function (array) {
   copySudoku = JSON.parse(JSON.stringify(array))
}

const TimeSpend = function (time) {
   textTimeSpend.textContent = time.toFixed(1)
}

settingForm.addEventListener("click", function (e) {
   const btnClick = e.target.closest(".setting__form__button")
   if (!btnClick) return

   if (btnClick == upTemp) {
      setSettingNumber(1)
   } else if (btnClick == downTemp) {
      setSettingNumber(2)
   }

   if (btnClick == upRate) {
      setSettingNumber(3)
   } else if (btnClick == downRate) {
      setSettingNumber(4)
   }

   if (btnClick == btnResetSetting) {
      setSettingNumber(6)
   }
})

const setSettingNumber = function (order) {
   if (order == 1) {
      tempInput.value = Number(tempInput.value).toFixed(3)
      if (tempInput.value > 9.999) {
         tempInput.value = (10).toFixed(3)
      } else if (tempInput.value < 2.0) {
         tempInput.value = (2).toFixed(3)
      } else {
         tempInput.value = (Number(tempInput.value) + 0.001).toFixed(3)
      }
   } else if (order == 2) {
      tempInput.value = Number(tempInput.value).toFixed(3)
      if (tempInput.value < 2.001) {
         tempInput.value = (2).toFixed(3)
      } else if (tempInput.value > 10.0) {
         tempInput.value = (10).toFixed(3)
      } else {
         tempInput.value = (Number(tempInput.value) - 0.001).toFixed(3)
      }
   } else if (order == 3) {
      rateInput.value = Number(rateInput.value).toFixed(3)
      if (rateInput.value > 0.998) {
         rateInput.value = (0.999).toFixed(3)
      } else if (rateInput.value < 0.001) {
         rateInput.value = (0.001).toFixed(3)
      } else {
         rateInput.value = (Number(rateInput.value) + 0.001).toFixed(3)
      }
   } else if (order == 4) {
      rateInput.value = Number(rateInput.value).toFixed(3)
      if (rateInput.value < 0.002) {
         rateInput.value = (0.001).toFixed(3)
      } else if (rateInput.value > 0.999) {
         rateInput.value = (0.999).toFixed(3)
      } else {
         rateInput.value = (Number(rateInput.value) - 0.001).toFixed(3)
      }
   }

   if (order == 5) {
      tempInput.value = Number(tempInput.value).toFixed(3)
      if (tempInput.value > 9.999) {
         tempInput.value = (10).toFixed(3)
      } else if (tempInput.value < 2.001) {
         tempInput.value = (2).toFixed(3)
      }

      rateInput.value = Number(rateInput.value).toFixed(3)
      if (rateInput.value > 0.998) {
         rateInput.value = (0.999).toFixed(3)
      } else if (rateInput.value < 0.002) {
         rateInput.value = (0.001).toFixed(3)
      }
   }

   if (order == 6) {
      tempInput.value = (2).toFixed(3)
      rateInput.value = (0.9).toFixed(3)
   }
}

const setAlgorithm = function (title) {
   if (title == "backtracking") {
      settingForm.classList.add("hidden")
      iterationsInfo.classList.add("hidden")
      algorithmNum = 0
   } else if (title == "simulatedAnnealing") {
      setSettingNumber(6)
      settingForm.classList.remove("hidden")
      iterationsInfo.classList.remove("hidden")
      algorithmNum = 1
   }
}

const algorithmSolver = function () {
   if (algorithmNum == 0) {
      const startTime = performance.now()
      const completeSudoku = setSudokuGrid(sudokuCellsValue)
      const endTime = performance.now()
      TimeSpend(endTime - startTime)
      if (completeSudoku[1]) {
         sudokuCellsValue = completeSudoku[0]
         applyResponse()
      } else {
         const sudokuArray = sudokuCellsValue.flat()
         sudokuCells.forEach((cell, index) => {
            sudokuArray[index] == 0 ? cell.classList.add("invalid") : ""
         })
         errorInfo.classList.remove("hidden")
         iterationsInfo.classList.add("hidden")
         timeInfo.classList.add("hidden")
         textError.textContent = "The sudoku table cannot be solved"
      }
   } else if (algorithmNum == 1) {
      let tekrar = 0
      const startTime = performance.now()
      const completeSudoku = setSudokuGrid2(sudokuCellsValue)
      // let completeSudoku = {}
      // do {
      //    tekrar++
      //    completeSudoku = setSudokuGrid2(sudokuCellsValue)
      // } while (tekrar == 10 || setSudokuGrid2(sudokuCellsValue[1]))
      const endTime = performance.now()
      TimeSpend(endTime - startTime)
      if (completeSudoku[1]) {
         sudokuCellsValue = completeSudoku[0]
         textIterations.textContent = completeSudoku[2]
         applyResponse()
      } else {
         sudokuCellsValue = completeSudoku[0]
         applyResponse()

         errorInfo.classList.remove("hidden")
         iterationsInfo.classList.add("hidden")
         timeInfo.classList.add("hidden")
         textError.textContent =
            "The sudoku table was not solved After 100000 iterations"

         let num = 0
         for (const t of sudokuCells) {
            if (invalidSearch(num)) {
               t.classList.add("invalid")
            }
            num++
         }
      }
   }
}

const invalidSearch = function (n) {
   const col = Math.floor(n / 9)
   const row = n % 9
   const num = sudokuCellsValue[col][row]

   for (let i = 0; i <= 8; i++) {
      if (i != row) {
         if (sudokuCellsValue[col][i] == num) {
            return true
         }
      }

      if (i != col) {
         if (sudokuCellsValue[i][row] == num) {
            return true
         }
      }
   }

   let subgridRow = row % 3,
      subgridCol = col % 3,
      startRow = row - subgridRow,
      startCol = col - subgridCol

   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         if (i != subgridCol && j != subgridRow) {
            if (sudokuCellsValue[i + startCol][j + startRow] == num) {
               return true
            }
         }
      }
   }

   return false
}

// let text =
//    "..6...4..7.3............15..6.1.92.42.1..69..5..32....1.....6...7964.5.2...2....."
// let result = text.replace(/\./g, "0")
// console.log(result)
