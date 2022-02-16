const gameGrid = document.getElementById('gameGrid');

// const USER_SELECTED_CHAR = prompt('Select your playing figure', 'X');
const USER_SELECTED_CHAR = 'X';
const LAST_MOVE_TYPE = {
	PLAYER: 'PLAYER',
	COMPUTER: 'COMPUTER',
};
let LAST_MOVE;

const generateGridButton = () => {
	const button = document.createElement('button');
	button.addEventListener('click', () => {
		button.innerText = USER_SELECTED_CHAR;
		LAST_MOVE = LAST_MOVE_TYPE.PLAYER;
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

const announceWinner = sign => alert(`The ${sign} wins the game!`);

const endGame = winner => {
	setTimeout(() => {
		announceWinner(winner);
		setTimeout(() => {
			generateGrid();
		}, 100);
	}, 100);
};

const computerMove = () => {
	const COMPUTER_CHAR = 'O';
	const playingFields = [...gameGrid.getElementsByTagName('button')];
	let moveDone = 0;
	LAST_MOVE = LAST_MOVE_TYPE.COMPUTER;
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
	if (LAST_MOVE !== LAST_MOVE_TYPE.COMPUTER) {
		computerMove();
	}
};

generateGrid();
