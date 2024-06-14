//FIND AN EMPTY CELL IN THE GRID
_findEmptyCell(rowLoc, colLoc) {
      let row = rowLoc
      let col = colLoc

      if (col == 9) {
         row++
         col = 0
      }

      if (row == 9) return false 

    if (this.grid[row][col] == 0) return { row, col }

  return this._findEmptyCell(row, col + 1) 
}