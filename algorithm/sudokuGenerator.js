const generateSudokuLine=  function (visibleCount = 3) {
    const shuffle = arr => { 
      for (let i = arr.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
      } 
      return arr; 
    };
  
    const isValid = (grid, row, col, num) => 
      ![...Array(9)].some((_, i) => 
        grid[row][i] === num || 
        grid[i][col] === num || 
        grid[3*Math.floor(row/3)+Math.floor(i/3)][3*Math.floor(col/3)+i%3] === num
      );
  
    const createGrid = () => {
      const grid = Array(9).fill().map(() => Array(9).fill(0));
      const solve = () => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
              for (let num of shuffle([1,2,3,4,5,6,7,8,9])) {
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
    visibleCount = Math.min(Math.max(visibleCount, 0), 81); // محدودیت ۰-۸۱
    const indices = new Set();
    
    while (indices.size < visibleCount) {
      indices.add(Math.floor(Math.random() * 81));
    }
  
    return flatGrid.map((num, index) => indices.has(index) ? num : '.').join('');
  }

  export default generateSudokuLine

export const sudokuSingleLineFunc = function (type) {

   sudokuGrid._setSudoku(grid)
   return sudokuGrid._solve()
}
