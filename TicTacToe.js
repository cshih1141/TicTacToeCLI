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


const checkWinConditions = () => {

  return true;
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
  while (gameInProgress) {
    console.log(`${players[currPlayer][0]}, please enter your move.`)
    let row = await placeMove(players[currPlayer][0], 'row');
    let col = await placeMove(players[currPlayer][0], 'col');
    gameDecisions[row][col] = players[currPlayer][1];

    board = setBoard(gameDecisions);
    console.log(board);

    gameInProgress = checkWinConditions();
    if(!gameInProgress) {
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








