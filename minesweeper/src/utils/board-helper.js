export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function saveGame(board) {
  // Convert the board to a JSON string and save it in localStorage
  localStorage.setItem('savedGame', JSON.stringify(board));
}

export function loadGame() {
  // Load the saved game from localStorage and parse it from JSON
  const savedGame = localStorage.getItem('savedGame');
  return savedGame ? JSON.parse(savedGame) : null;
}

export function shuffle(array) {
  const shuffledArray = [...array]; // Создаем копию массива
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray; // Возвращаем перетасованный массив
}

export function getAdjacentCells(row, col, numRows, numCols) {
  const adjacentCells = [];

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i !== 0 || j !== 0) { // Пропускаем центральную клетку
        const adjRow = row + i;
        const adjCol = col + j;
        // Проверяем, что клетка находится внутри игрового поля
        if (adjRow >= 0 && adjRow < numRows && adjCol >= 0 && adjCol < numCols) {
          adjacentCells.push([adjRow, adjCol]);
        }
      }
    }
  }

  return adjacentCells;
}

export function adjacentMinesCounter(array) {
  const newArray = JSON.parse(JSON.stringify(array)); // Создаем глубокую копию массива

  const numRows = newArray.length;
  const numCols = newArray[0].length;

  for (let row = 0; row < numRows; row += 1) {
    for (let col = 0; col < numCols; col += 1) {
      if (!newArray[row][col].mine) { // Проверяем, что текущая клетка не является миной
        let counter = 0;

        const adjacentCells = getAdjacentCells(row, col, numRows, numCols);

        adjacentCells.forEach(([adjRow, adjCol]) => {
          if (newArray[adjRow][adjCol].mine) {
            counter += 1;
          }
        });

        newArray[row][col].counter = counter; // Устанавливаем счетчик мин для текущей клетки
      }
    }
  }

  return newArray;
}
