import { backtracking, simulatedAnnealing, generator, elements, gridFormatter, lineFormatter } from "./src/scripts/module.js";

let sudokuTable,
    isSubmit = false,
    lineGridInput = false,
    algorithmNum = 0,
    difficulty = 0;
const difficulties = ["Simple", "Easy", "Moderate", "Intermediate", "Expert"];

const applyResponse = function (data) {
    const sudokuArray = data ? data.split("") : sudokuTable.split("");
    elements.sudokuCells.forEach((cell, index) => {
        cell.value = sudokuArray[index] == 0 ? "" : sudokuArray[index];
    });
};

elements.difficultyForm.addEventListener("click", function (e) {
    const btnClick = e.target.closest(".difficulty__form__button");

    if (!btnClick) return;

    if (btnClick == elements.difficultyNextBtn) {
        if (difficulty < 4) {
            difficulty++;
            elements.difficultyText.textContent = difficulties[difficulty];
        }
    } else if (btnClick == elements.difficultyPreBtn) {
        if (difficulty > 0) {
            difficulty--;
            elements.difficultyText.textContent = difficulties[difficulty];
        }
    }

    if (elements.btnSwitch == btnClick && e.pointerId == -1) {
        elements.difficultySetterForm.classList.toggle("hidden");
        elements.inputLineInput.classList.toggle("hidden");
        lineGridInput = lineGridInput == false ? true : false;
        return;
    }

    if (elements.btnSubmit == btnClick) {
        setDefault();

        if (lineGridInput) {
            const grid = checkGridInput(elements.inputLineGridInput.value);
            elements.inputLineGridInput.value = "";
            grid ? (sudokuTable = grid) : "";
        } else {
            sudokuTable = generator(difficulty);
        }

        applyResponse();

        return;
    }
});

elements.algorithmForm.addEventListener("click", function (e) {
    const btnClick = e.target.closest(".algorithm__form__button");
    if (!btnClick) return;

    if (elements.btnSolve == btnClick) {
        if (isSubmit) return;
        isSubmit = true;
        solve();
        return;
    }

    if (elements.trashBtn == btnClick) {
        isSubmit = false;

        setDefault();
        applyResponse();

        return;
    }

    for (const t of elements.algorithmButtons) {
        if (t == btnClick) {
            t.classList.add("algorithm__button--active");
            setAlgorithm(t.title);
        } else {
            t.classList.remove("algorithm__button--active");
        }
    }
});

const TimeSpend = function (time) {
    elements.textTimeSpend.textContent = time.toFixed(1);
};

elements.settingForm.addEventListener("click", function (e) {
    const btnClick = e.target.closest(".setting__form__button");
    if (!btnClick) return;

    if (btnClick == elements.upTemp) {
        setSettingNumber(1);
    } else if (btnClick == elements.downTemp) {
        setSettingNumber(2);
    }

    if (btnClick == elements.upRate) {
        setSettingNumber(3);
    } else if (btnClick == elements.downRate) {
        setSettingNumber(4);
    }

    if (btnClick == elements.btnResetSetting) {
        setSettingNumber(6);
    }
});

const setSettingNumber = function (order) {
    if (order == 1) {
        elements.tempInput.value = Number(elements.tempInput.value).toFixed(3);
        if (elements.tempInput.value > 9.999) {
            elements.tempInput.value = (10).toFixed(3);
        } else if (elements.tempInput.value < 2.0) {
            elements.tempInput.value = (2).toFixed(3);
        } else {
            elements.tempInput.value = (Number(elements.tempInput.value) + 0.001).toFixed(3);
        }
    } else if (order == 2) {
        elements.tempInput.value = Number(elements.tempInput.value).toFixed(3);
        if (elements.tempInput.value < 2.001) {
            elements.tempInput.value = (2).toFixed(3);
        } else if (elements.tempInput.value > 10.0) {
            elements.tempInput.value = (10).toFixed(3);
        } else {
            elements.tempInput.value = (Number(elements.tempInput.value) - 0.001).toFixed(3);
        }
    } else if (order == 3) {
        elements.rateInput.value = Number(elements.rateInput.value).toFixed(3);
        if (elements.rateInput.value > 0.998) {
            elements.rateInput.value = (0.999).toFixed(3);
        } else if (elements.rateInput.value < 0.001) {
            elements.rateInput.value = (0.001).toFixed(3);
        } else {
            elements.rateInput.value = (Number(elements.rateInput.value) + 0.001).toFixed(3);
        }
    } else if (order == 4) {
        elements.rateInput.value = Number(elements.rateInput.value).toFixed(3);
        if (elements.rateInput.value < 0.002) {
            elements.rateInput.value = (0.001).toFixed(3);
        } else if (elements.rateInput.value > 0.999) {
            elements.rateInput.value = (0.999).toFixed(3);
        } else {
            elements.rateInput.value = (Number(elements.rateInput.value) - 0.001).toFixed(3);
        }
    } else if (order == 5) {
        elements.tempInput.value = Number(elements.tempInput.value).toFixed(3);
        if (elements.tempInput.value > 9.999) {
            elements.tempInput.value = (10).toFixed(3);
        } else if (elements.tempInput.value < 2.001) {
            elements.tempInput.value = (2).toFixed(3);
        }
        elements.rateInput.value = Number(elements.rateInput.value).toFixed(3);
        if (elements.rateInput.value > 0.998) {
            elements.rateInput.value = (0.999).toFixed(3);
        } else if (elements.rateInput.value < 0.002) {
            elements.rateInput.value = (0.001).toFixed(3);
        }
    } else if (order == 6) {
        elements.tempInput.value = (2).toFixed(3);
        elements.rateInput.value = (0.99).toFixed(3);
    }
};

const setAlgorithm = function (title) {
    if (title == "backtracking") {
        elements.settingForm.classList.add("hidden");
        elements.iterationsInfo.classList.add("hidden");
        algorithmNum = 0;
    } else if (title == "simulatedAnnealing") {
        setSettingNumber(6);
        elements.settingForm.classList.remove("hidden");
        elements.iterationsInfo.classList.remove("hidden");
        algorithmNum = 1;
    }
};

const solve = function () {
    if (algorithmNum == 0) {
        const startTime = performance.now();
        const solvedSudoku = backtracking(gridFormatter(sudokuTable));
        const endTime = performance.now();
        TimeSpend(endTime - startTime);
        if (solvedSudoku[1]) {
            applyResponse(lineFormatter(solvedSudoku[0]));
        } else {
            elements.sudokuCells.forEach((cell, index) => {
                lineFormatter(solvedSudoku[0])[index] == 0 ? cell.classList.add("invalid") : "";
            });
            elements.errorInfo.classList.remove("hidden");
            elements.iterationsInfo.classList.add("hidden");
            elements.timeInfo.classList.add("hidden");
            elements.textError.textContent = "The sudoku table cannot be solved";
        }
    } else if (algorithmNum == 1) {
        const coolingRate = elements.tempInput.value;
        const initialTemperature = elements.rateInput.value;
        const startTime = performance.now();
        const solvedSudoku = simulatedAnnealing(gridFormatter(sudokuTable), +coolingRate, +initialTemperature);
        const endTime = performance.now();
        TimeSpend(endTime - startTime);
        if (solvedSudoku[1]) {
            elements.textIterations.textContent = solvedSudoku[2];
            applyResponse(lineFormatter(solvedSudoku[0]));
        } else {
            elements.errorInfo.classList.remove("hidden");
            elements.iterationsInfo.classList.add("hidden");
            elements.timeInfo.classList.add("hidden");
            elements.textError.textContent = "The sudoku table was not solved After 100000 iterations";

            let num = 0;
            for (const t of elements.sudokuCells) {
                if (sudokuTable[num] == 0) {
                    t.classList.add("invalid");
                }
                num++;
            }
        }
    }
};

const checkGridInput = function (grid) {
    return grid.length === 81 && /^[1-9.]+$/.test(grid) ? grid.replace(/\./g, "0") : false;
};

const setDefault = function () {
    elements.textTimeSpend.textContent = ``;
    elements.textIterations.textContent = ``;

    elements.errorInfo.classList.add("hidden");
    elements.timeInfo.classList.remove("hidden");

    elements.sudokuCells.forEach((cell) => {
        cell.classList.remove("invalid");
    });
};

const init = function () {
    sudokuTable = generator(3);
    applyResponse();
};

init();
