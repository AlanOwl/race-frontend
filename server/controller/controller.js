const game = require('../../race/board.js')
const { User } = require('../models/index.js');

let board = []
let flagStart = false
let go = true
let delay = 1100
let baseSpeed = 1100
const games = {
	race: 1,
	tetris: 2
}
let startGame = {
	game: 0
}

const start = async () => {
	startGame.game = 1
	if (!flagStart) {
		setTimeout(function run() {
			if (go) {
				go = game.moveCarRivals(board)
			}
			let timer2MoveId = setTimeout(run, delay);
			if (!go) {
				clearTimeout(timer2MoveId)
				clearInterval(timerGenerationId)
			}
		}, 700);

		let timerGenerationId = setInterval(() => {
			game.randomGeneration(board)

		}, 8000);
	}
}

exports.getState = async (req, res) => {
	if (startGame.game === 0) {
		return res.status(400).json({ error: 'Пользователь не запустил игру' });
	}
	try {
		return res.status(200).json({ board, go });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: 'Ошибка сервера' });
	}

};


exports.startGame = async (req, res) => {
	let { gameId } = req.params
	let findGame = false
	for (const key in games) {
		if (Number(gameId) === games[key]) {
			findGame = true
			break
		} else findGame = false
	}
	if (!findGame) {
		return res.status(404).json({ error: 'Игра с заданным идентификатором не найдена' });
	}

	if (Number(gameId) !== startGame.game && startGame.game !== 0) {
		return res.status(409).json({ error: 'Пользователь уже запустил другую игру' });
	}
	delay = 1100
	baseSpeed = 1100
	board = game.start()
	flagStart = false
	go = true
	game.randomGeneration(board)
	start()
	flagStart = true
	try {
		return res.status(200).json(board)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Ошибка сервера' });
	}
};

exports.actionGamer = async (req, res) => {
	let action = req.body.action
	let hold = req.body.hold
	if (startGame.game === 0 || !action) {
		return res.status(400).json({ error: 'Ошибка в теле запроса или пользователь не запустил игру' });
	}

	if (hold) {
		delay = 100
	} else {
		delay = baseSpeed
	}
	try {
		if (hold !== false) {
			go = game.move(board, action)
		}

		return res.status(200).json(board)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Ошибка сервера' });
	}
}

exports.getListGames = async (req, res) => {

	try {
		return res.status(200).json(games);
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: 'Ошибка сервера' });
	}
}

exports.unload = async () => {
	go = false
	startGame.game = 0
}

exports.newLvl = async (req, res) => {
	if (delay > 200) {
		delay -= 100
		baseSpeed -= 100
	}

	try {
		return res.status(200).json({ message: "new lvl" });;
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: 'Ошибка сервера' });
	}
}

exports.getRecord = async (req, res) => {
	const newPoints = req.body.points
	const record = await User.findOne()
	if (newPoints > record.points) {
		record.points = newPoints
		await record.save();
	}
	try {
		return res.status(200).json(record.points);;
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: 'Ошибка сервера' });
	}
}
