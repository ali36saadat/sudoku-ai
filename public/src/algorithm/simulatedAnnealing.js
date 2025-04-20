//Simulated Annealing Algorithm Sudoku Solver Class
class SimulatedAnnealingSudokuSolver {
    //CONSTRUCTOR
    constructor() {
        this.maxIteration;
        this.coolingRate;
        this.reheatTemperature;
        this.reheatNumber;
        this.emptyCells;
        this.initialGrid;
    }

    //UPDATE THE GRID AND PARAMETERS
    _setSudoku(
        grid,
        coolingRate = 0.99,
        initialTemperature = null,
        maxIteration = 45000000,
        reheatNumber = 50000,
        reheatPercent = 0.9
    ) {
        this.maxIteration = maxIteration;
        this.coolingRate = coolingRate;
        this.reheatNumber = reheatNumber;
        this.emptyCells = this._findEmptyCell(grid);
        this.initialGrid = this._initializeGrid(grid);

        //CALCULATE INITIAL TEMPERATURE
        if (initialTemperature === null) {
            this.initialTemperature = this._calculateInitialTemperature(grid);
            console.log(this.initialTemperature);
            this.reheatTemperature = this.initialTemperature * reheatPercent;
        } else {
            this.initialTemperature = initialTemperature;
            this.reheatTemperature = this.initialTemperature * reheatPercent;
        }
    }

    //FIND EMPTY CELLS
    _findEmptyCell(grid) {
        const emptyCells = [];
        for (let row = 0; row <= 8; row++) {
            for (let col = 0; col <= 8; col++) {
                if (!grid[row][col]) {
                    emptyCells.push([row, col]);
                }
            }
        }
        return emptyCells; // Return the array of empty cells in the grid
    }

    _initializeGrid(grid) {
        const newGrid = grid.map((row) => [...row]);
        grid.forEach((row, y) => {
            let numbers = [];
            row.forEach((col) => {
                if (col !== 0) numbers.push(col);
            });
            row.forEach((col, x) => {
                if (col === 0) {
                    while (true) {
                        let candidate = this._randomNumber(1, 9);
                        if (!numbers.includes(candidate)) {
                            newGrid[y][x] = candidate;
                            numbers.push(candidate);
                            break;
                        }
                    }
                }
            });
        });
        return newGrid; // Return the initialized grid with filled empty cells
    }

    //CALCULATE THE COST OF THE ARRAY
    _getListCost(arr) {
        let cost = 0;
        const counts = new Array(10).fill(0);
        for (const num of arr) {
            if (num !== 0) counts[num]++;
        }

        for (const count of counts) {
            if (count > 1) cost += count - 1;
        }

        return cost; //Return the count of duplicate elements in an array
    }

    //CALCULATE THE COST OF THE GRID
    _getSudokuCost(grid) {
        let totalCost = 0;
        for (let y = 0; y < 9; y++) {
            totalCost += this._getListCost(grid[y]);
        }

        for (let x = 0; x < 9; x++) {
            const col = grid.map((row) => row[x]);
            totalCost += this._getListCost(col);
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const subgrid = [];
                for (let y = i * 3; y < (i + 1) * 3; y++) {
                    for (let x = j * 3; x < (j + 1) * 3; x++) {
                        subgrid.push(grid[y][x]);
                    }
                }
                totalCost += this._getListCost(subgrid);
            }
        }
        return totalCost; //Return the total cost of the grid
    }

    //CALCULATE INITIAL TEMPERATURE
    _calculateInitialTemperature(grid) {
        let initial_state = this._initializeGrid(grid);
        let initial_cost = this._getSudokuCost(initial_state);
        let cost_differences = [];

        for (let i = 0; i < 100; i++) {
            const neighbor = this._generateNeighbor(initial_state);
            const neighbor_cost = this._getSudokuCost(neighbor);
            const delta_cost = Math.abs(neighbor_cost - initial_cost);
            cost_differences.push(delta_cost);
        }

        const avg_delta_cost =
            cost_differences.reduce((a, b) => a + b, 0) /
            cost_differences.length;
        return avg_delta_cost;
    }

    //GENERATE NEIGHBOR
    _generateNeighbor(grid) {
        const newGrid = grid.map((row) => [...row]);
        let cell1, cell2;
        while (true) {
            cell1 = this._sample(this.emptyCells);
            cell2 = this._sample(this.emptyCells);
            if (
                cell1 &&
                cell2 &&
                (cell1[0] !== cell2[0] || cell1[1] !== cell2[1])
            )
                break;
        }
        if (cell1 && cell2) {
            const temp = newGrid[cell1[0]][cell1[1]];
            newGrid[cell1[0]][cell1[1]] = newGrid[cell2[0]][cell2[1]];
            newGrid[cell2[0]][cell2[1]] = temp;
        }
        return newGrid; //Return the new grid where two elements have been swapped
    }

    //CHOICE RANDOM NUMBER
    _randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        //Return a random number within a range
    }

    //CHOICE RANDOM ELEMENT
    _sample(array) {
        return array[Math.floor(Math.random() * array.length)];
        //Return a random selection of an element from an array
    }

    //SOLVE GRID
    _solve() {
        let current_state = this.initialGrid.map((row) => [...row]);
        let current_cost = this._getSudokuCost(current_state);
        let current_temperature = this.initialTemperature;
        let iteration = 0;

        while (iteration < this.maxIteration) {
            if (current_cost === 0) {
                //The cost is zero, so the grid has been resolved
                return [current_state, true, iteration];
            }
            if (iteration % this.reheatNumber === 0)
                current_temperature = this.reheatTemperature;

            const new_state = this._generateNeighbor(current_state);
            const new_cost = this._getSudokuCost(new_state);
            const delta_cost = new_cost - current_cost;

            if (
                delta_cost < 0 ||
                Math.random() < Math.exp(-delta_cost / current_temperature)
            ) {
                current_state = new_state.map((row) => [...row]);
                current_cost = new_cost;
            }

            iteration++;
            current_temperature *= this.coolingRate;
        }

        return [current_state, false, iteration];
        //After maximum iterations, the cost has not become zero
        //So, it is likely that the table cannot be solved
    }
}

const sudokuGrid = new SimulatedAnnealingSudokuSolver();

export const simulatedAnnealing = function (
    grid,
    coolingRate,
    initialTemperature
) {
    sudokuGrid._setSudoku(grid, initialTemperature, coolingRate);
    return sudokuGrid._solve();
};
