let gameDecisions = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
const setBoard = (gameDecisions) => {
  return (
    `
    ${gameDecisions[0][0]}|${gameDecisions[0][1]}|${gameDecisions[0][2]}
    -|-|-
    ${gameDecisions[1][0]}|${gameDecisions[1][1]}|${gameDecisions[1][2]}
    -|-|-
    ${gameDecisions[2][0]}|${gameDecisions[2][1]}|${gameDecisions[2][2]}
    `
  );
}
let board = setBoard(gameDecisions);

console.log(board);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


const checkRowConditions = (player) => {
  for (let i = 0; i < gameDecisions.length; i++) {
    let count = 0;
    for (let j = 0; j < gameDecisions[i].length; j++) {
      if(gameDecisions[i][j] === player) {
        count++;
      }
    }
    if(count === 3) {
      return true;
    }
  }
  return false;
}

const checkColConditions = (player) => {
  for (let i = 0; i < gameDecisions.length; i++) {
    let count = 0;
    for (let j = 0; j < gameDecisions[i].length; j++) {
      if(gameDecisions[j][i] === player) {
        count++;
      }
    }
    if(count === 3) {
      return true;
    }
  }
  return false;
}

const checkDiagonalConditions = (player) => {
  if ((gameDecisions[0][0] === player && gameDecisions[1][1] === player && gameDecisions[2][2] === player) 
      || (gameDecisions[0][2] === player && gameDecisions[1][1] === player && gameDecisions[2][0] === player)) {
        return true;
      }
  return false;
}

const checkWinConditions = (player) => {
  if (checkRowConditions(player) || checkColConditions(player) || checkDiagonalConditions(player)) {
    return false;
  }
  return true;
}

const validMove = (row, col) => {
  if(gameDecisions[row][col] === ' ') {
    return true;
  }
  return false;
}

const enterPlayerName = () => {
  return new Promise((resolve, reject) => {
    readline.question(`Player 1, please enter your name: `, (name) => {
      resolve(name);
    })
  });
}

const placeMove = (player, rowCol) => {
  return new Promise((resolve, reject) => {
    readline.question(`${player}, input ${rowCol} index (left and top most is 0): `, (row) => {
      resolve(row);
    });
  });
}

const main = async () =>  {
  let player1 = ['','X'];
  let player2 = ['','O'];
  player1[0] = await enterPlayerName();
  player2[0] = await enterPlayerName();
  let players = [player1, player2];
  let currPlayer = 0;
  console.log(`Hi ${player1[0]}! Your symbol is X`);
  console.log(`Hi ${player2[0]}! Your symbol is O`);

  let gameInProgress = true;
  let numMoves = 0;
  while (gameInProgress) {
    while(true) {
      console.log(`${players[currPlayer][0]}, please enter your move.`)
      let row = await placeMove(players[currPlayer][0], 'row');
      let col = await placeMove(players[currPlayer][0], 'col');
      
      if(validMove(row, col)) {
        numMoves++;
        gameDecisions[row][col] = players[currPlayer][1];
        break;
      }
      console.log('that is an invalid move.');
    }

    board = setBoard(gameDecisions);
    console.log(board);

    gameInProgress = checkWinConditions(players[currPlayer][1]);
    if(!gameInProgress || numMoves === 9) {
      if(numMoves === 9) {
        console.log('The game ended in a tie!');
      } else {
        console.log(`${players[currPlayer][0]} has won the game!`);
      }
      break;
    }

    // currPlayer === 1 ? 0 : 1;
    if (currPlayer) {
      currPlayer = 0;
    } else {
      currPlayer = 1;
    }
  }
  readline.close();
}

main();








