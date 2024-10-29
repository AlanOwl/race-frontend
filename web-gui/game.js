import { applyRootStyles } from './src/utils.js';
import { GameBoard } from './src/game-board.js';
import { rootStyles, keyCodes } from './src/config.js';

let baseURL = "https://race-backend.onrender.com"

applyRootStyles(rootStyles);
const gameBoard = new GameBoard(document.querySelector('#game-board'));
const btnStart = document.querySelector('.button-start')
let score = document.querySelector('.score')
let record = document.querySelector('.record')
let lvl = document.querySelector('.lvl')
let dataScore = 0
let dataLvl = 0

const timerResponce = async () => {
	let timerId = setInterval(async () => {
		const responce = await fetch(`${baseURL}/api/state`)
		const data = await responce.json()
		if (!data.go) {
			clearInterval(timerId)
			clearInterval(scoreId)

			for (let x = 0; x < data.board.length; x++) {
				for (let y = 0; y < data.board[x].length; y++) {
					data.board[x][y] = 0
					gameBoard.disableTile(y, x)
				}
			}
			btnStart.removeAttribute('disabled', '');
			return false
		}
		score.innerHTML = dataScore
		lvl.innerHTML = dataLvl
		for (let x = 0; x < data.board.length; x++) {
			for (let y = 0; y < data.board[x].length; y++) {
				if (data.board[x][y] !== 0) {
					gameBoard.enableTile(y, x)
				} else {
					gameBoard.disableTile(y, x)
				}
			}
		}

	}, 100);
	let scoreId = setInterval(async () => {
		dataScore += 1
		if (dataScore % 5 === 0 && dataScore <= 50) {
			dataLvl += 1
			fetch(`${baseURL}/api/config/lvl`)
		}
		// if (dataScore > dataForRecord) {
		// 	const res = await fetch(`${baseURL}/api/config/record`, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ points: dataScore }),
		// 	})
		// 	const newDataForRecord = await res.json()
		// 	record.innerHTML = newDataForRecord
		// }
	}, 1000)

}


window.onbeforeunload = async function () {
	dataScore = 0
	fetch(`${baseURL}/api/state/unload`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

btnStart.addEventListener('click', async function () {
	const response = await fetch(`${baseURL}/api/games/1`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		dataScore = 0
		dataLvl = 0
		// const res = await fetch(`${baseURL}/api/config/record`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({ points: 100 }),
		// })
		// const dataForRecord = await res.json()
		// record.innerHTML = dataForRecord
		timerResponce()
		btnStart.setAttribute('disabled', '');
	}

})


document.addEventListener('keyup', async function (event) {
	if (keyCodes.up.includes(event.code)) {
		fetch(`${baseURL}/api/actions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: 'up', hold: false }),
		});
	}
})
document.addEventListener('keydown', async function (event) {
	if (keyCodes.up.includes(event.code)) {
		fetch(`${baseURL}/api/actions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: 'up', hold: true }),
		});
	}
	if (keyCodes.right.includes(event.code)) {
		fetch(`${baseURL}/api/actions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: 'right' }),
		});
	}
	if (keyCodes.down.includes(event.code)) {
		fetch(`${baseURL}/api/actions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: 'down' }),
		});
	}
	if (keyCodes.left.includes(event.code)) {
		await fetch(`${baseURL}/api/actions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: 'left' }),
		});
	}
});
