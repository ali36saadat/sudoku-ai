import { backtrackingAlgorithm } from "./backtracking.js";
import { simulatedAnnealingAlgorithm } from "./simulatedAnnealing.js";
import { sudokuSingleLineFunc } from "./sudokuGenerator.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const DomElements = {
    algorithmForm: $(".algorithm__buttons"),
    settingForm: $(".setting__buttons"),
    difficultyForm: $(".difficulty__buttons"),
    algorithmButtons: $$(".algorithm__button"),
    btnSubmit: $(".submit__button"),
    btnSolve: $(".solve__button"),
    btnSwitch: $(".switch__button"),
    difficultyNextBtn: $(".difficulty__set__next"),
    difficultyPreBtn: $(".difficulty__set__pre"),
    difficultyText: $(".difficulty__set"),
    difficultySetterForm: $(".difficulty__setter"),
    trashBtn: $(".trash__button"),
    textTimeSpend: $(".time__spend"),
    upTemp: $(".up__temp"),
    downTemp: $(".down__temp"),
    upRate: $(".up__rate"),
    downRate: $(".down__rate"),
    tempInput: $(".input__temp"),
    rateInput: $(".input__rate"),
    btnResetSetting: $(".reset__button"),
    textIterations: $(".iterations__container"),
    textError: $(".error__text"),
    iterationsInfo: $(".iterations__info"),
    errorInfo: $(".error__info"),
    timeInfo: $(".time__info"),
    inputLineGridInput: $(".line__grid__input"),
    inputLineInput: $(".line__input"),
    sudokuCells: $$(".sudoku__cell"),
};

const ClassificationSudokuLine = function (line) {
    const chunkedArrays = [];
    for (let i = 0; i < line.length; i += 9) {
        chunkedArrays.push(
            line
                .slice(i, i + 9)
                .split("")
                .map(Number)
        );
    }

    return chunkedArrays;
};

const lineToGrid = function (line) {
    const gridArray = [];
    const lineArray = line.split("").map((c) => (c == "." ? 0 : Number(c)));

    if (lineArray.filter((cell) => (typeof cell !== Number && cell >= 0) || cell < 10).length == 81) {
        for (let row = 0; row < 9; row++) {
            let rowArray = [];
            for (let col = 0; col < 9; col++) {
                rowArray.push(lineArray.shift());
            }
            gridArray.push(rowArray);
        }
        return gridArray;
    }
};

const gridToline = function (grid) {
    return grid.flat().join("");
};

export {
    backtrackingAlgorithm as backtracking,
    simulatedAnnealingAlgorithm as simulatedAnnealing,
    sudokuSingleLineFunc as generator,
    ClassificationSudokuLine as classification,
    DomElements as elements,
    lineToGrid as gridFormatter,
    gridToline as lineFormatter,
};
