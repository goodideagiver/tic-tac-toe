const gameGrid = document.getElementById('gameGrid');

// const USER_SELECTED_CHAR = prompt('Select your playing figure', 'X');
const USER_SELECTED_CHAR = 'X';

const generateGridButton = () => {
	const button = document.createElement('button');
	button.addEventListener('click', () => {
		button.innerText = USER_SELECTED_CHAR;
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

const checkWinCondition = () => {
	const playingFields = [...gameGrid.querySelectorAll('button')];

	for (let i = 0; i < 7; i += 3) {
		if (
			playingFields[i].innerText !== '' &&
			playingFields[i].innerText === playingFields[i + 1].innerText &&
			playingFields[i + 1].innerText === playingFields[i + 2].innerText
		) {
			announceWinner(playingFields[i].innerText);
			generateGrid();
			return;
		}
	}
	for (let i = 0; i < 3; i++) {
		if (
			playingFields[i].innerText !== '' &&
			playingFields[i + 3].innerText === playingFields[i].innerText &&
			playingFields[i + 3].innerText === playingFields[i + 6].innerText
		) {
			announceWinner(playingFields[i].innerText);
			generateGrid();
			return;
		}
	}
};

generateGrid();
