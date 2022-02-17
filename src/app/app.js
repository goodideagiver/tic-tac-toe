const gameGrid = document.getElementById('gameGrid');
const displayMoveCount = document.getElementById('moveCount');
const leaderboard = document.getElementById('leaderBoard');

// const USER_SELECTED_CHAR = prompt('Select your playing figure', 'X');
const USER_SELECTED_CHAR = 'X';
const COMPUTER_CHAR = 'O';
const LAST_MOVE_TYPE = {
	PLAYER: 'PLAYER',
	COMPUTER: 'COMPUTER',
};
const LEADERBOARD_DATA = {
	COMPUTER_WINS: 0,
	PLAYER_WINS: 0,
};

let LAST_MOVE;
let MOVE_COUNT = 0;

const updateMoveCount = () => {
	displayMoveCount.innerText = `Move count: ${MOVE_COUNT}`;
};

const resetMoveCount = () => {
	MOVE_COUNT = 0;
	updateMoveCount();
};

const generateGridButton = () => {
	const button = document.createElement('button');
	button.addEventListener('click', () => {
		if (button.innerText !== '') {
			return;
		}
		button.innerText = USER_SELECTED_CHAR;
		LAST_MOVE = LAST_MOVE_TYPE.PLAYER;
		MOVE_COUNT++;
		updateMoveCount();
		checkWinCondition();
	});
	return button;
};

const generateGrid = () => {
	gameGrid.innerHTML = '';
	for (let index = 0; index < 9; index++) {
		gameGrid.appendChild(generateGridButton());
	}
};

const updateLeaderboard = sign => {
	if (sign === USER_SELECTED_CHAR) {
		LEADERBOARD_DATA.PLAYER_WINS += 1;
	} else if (sign === COMPUTER_CHAR) {
		LEADERBOARD_DATA.COMPUTER_WINS += 1;
	}
	console.log(LEADERBOARD_DATA);
	leaderboard.innerHTML = `
    <p>Player wins: ${LEADERBOARD_DATA.PLAYER_WINS}</p>
    <p>Computer wins: ${LEADERBOARD_DATA.COMPUTER_WINS}</p>`;
};

const announceWinner = sign => alert(`The ${sign} wins the game!`);

const endGame = winner => {
	setTimeout(() => {
		if (winner === 'draw') {
			alert('Draw!');
		} else {
			announceWinner(winner);
		}
		setTimeout(() => {
			generateGrid();
			resetMoveCount();
			updateLeaderboard(winner);
		}, 100);
	}, 100);
};

const computerMove = () => {
	const playingFields = [...gameGrid.getElementsByTagName('button')];
	LAST_MOVE = LAST_MOVE_TYPE.COMPUTER;
	if (MOVE_COUNT < 4) {
		if (playingFields[4].innerText === '') {
			playingFields[4].innerText = COMPUTER_CHAR;
		} else {
			if (playingFields[0].innerText === '') {
				playingFields[0].innerText = COMPUTER_CHAR;
			} else if (playingFields[2].innerText === '') {
				playingFields[2].innerText = COMPUTER_CHAR;
			} else if (playingFields[6].innerText === '') {
				playingFields[6].innerText = COMPUTER_CHAR;
			} else if (playingFields[8].innerText === '') {
				playingFields[8].innerText = COMPUTER_CHAR;
			}
		}
	} else {
		const emptyFields = playingFields.filter(field => {
			return field.innerText === '';
		});
		const randomFieldNumber = (Math.random() * (emptyFields.length - 1)).toFixed(0);
		emptyFields[randomFieldNumber].innerText = COMPUTER_CHAR;
	}
	MOVE_COUNT += 1;
	updateMoveCount();
	checkWinCondition();
};

const checkWinCondition = () => {
	const playingFields = [...gameGrid.getElementsByTagName('button')];

	for (let i = 0; i < 7; i += 3) {
		if (
			playingFields[i].innerText !== '' &&
			playingFields[i].innerText === playingFields[i + 1].innerText &&
			playingFields[i + 1].innerText === playingFields[i + 2].innerText
		) {
			endGame(playingFields[i].innerText);
			return;
		}
	}
	for (let i = 0; i < 3; i++) {
		if (
			playingFields[i].innerText !== '' &&
			playingFields[i + 3].innerText === playingFields[i].innerText &&
			playingFields[i + 3].innerText === playingFields[i + 6].innerText
		) {
			endGame(playingFields[i].innerText);
			return;
		}
	}
	if (
		playingFields[0].innerText !== '' &&
		playingFields[4].innerText === playingFields[0].innerText &&
		playingFields[4].innerText === playingFields[8].innerText
	) {
		endGame(playingFields[0].innerText);
		return;
	}
	if (
		playingFields[2].innerText !== '' &&
		playingFields[4].innerText === playingFields[2].innerText &&
		playingFields[4].innerText === playingFields[6].innerText
	) {
		endGame(playingFields[2].innerText);
		return;
	}
	if (
		playingFields.filter(field => {
			return field.innerText === '';
		}).length === 0
	) {
		endGame('draw');
		return;
	}

	if (LAST_MOVE !== LAST_MOVE_TYPE.COMPUTER) {
		computerMove();
	}
};

generateGrid();
