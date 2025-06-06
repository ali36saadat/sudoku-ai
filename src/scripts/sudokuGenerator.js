const generateSudokuLine = function (visibleCount) {
    const shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const isValid = (grid, row, col, num) =>
        ![...Array(9)].some(
            (_, i) =>
                grid[row][i] === num || grid[i][col] === num || grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === num
        );

    const createGrid = () => {
        const grid = Array(9)
            .fill()
            .map(() => Array(9).fill(0));
        const solve = () => {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (grid[row][col] === 0) {
                        for (let num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
                            if (isValid(grid, row, col, num)) {
                                grid[row][col] = num;
                                if (solve()) return true;
                                grid[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        };
        return solve() ? grid : createGrid();
    };

    const flatGrid = createGrid().flat();
    visibleCount = Math.min(Math.max(visibleCount, 0), 81);
    const indices = new Set();

    while (indices.size < visibleCount) {
        indices.add(Math.floor(Math.random() * 81));
    }

    return flatGrid.map((num, index) => (indices.has(index) ? num : 0)).join("");
};

const randomRemoveNumber = function (num) {
    const randomRemoveList = [0, 10, 20, 35, 50, 55];
    return Math.floor(Math.random() * (randomRemoveList[num + 1] - randomRemoveList[num]) + randomRemoveList[num] + 1);
};

export const sudokuSingleLineFunc = function (num) {
    const removeNumber = randomRemoveNumber(num);
    const sudokuLine = generateSudokuLine(81 - removeNumber);
    return sudokuLine;
};
