exports.generationBoard = () => {
	const rows = 20;
	const cols = 10;
	const board = [];
	for (let i = 0; i < rows; i++) {
		const row = [];
		for (let j = 0; j < cols; j++) {
			row.push(0);
		}
		board.push(row);
	}
	return board
}

exports.getCoordinateCar = (board) => {
	let x = 0, y = 0, count = 0;
	for (; x < board.length; x++) {
		for (y = 0; y < board[x].length; y++) {
			if (board[x][y] === 1) {
				return {
					x: x,
					y: y
				}
			}
		}
		count++
	}
	if (count === 20) {
		return false
	}
}

exports.pointCar = (board, id) => {
	if (id) {
		for (let index = 0; index < 3; index += 2) {
			if (board[id.x + index][id.y] === 2 || board[id.x + index][id.y] === 3) {
				return false
			}
			board[id.x + index][id.y] = 1
			for (let j = -1; j < 2; j++) {
				if (board[id.x + index + 1][id.y + j] === 2 || board[id.x + index + 1][id.y + j] === 3) {
					return false
				}
				board[id.x + index + 1][id.y + j] = 1
			}
		}
	} else return false

	return true
}

exports.deleteCar = (board, id) => {
	for (let index = 0; index < 3; index += 2) {
		if (board[id.x + index][id.y] === 1) {
			board[id.x + index][id.y] = 0
		}

		for (let j = -1; j < 2; j++) {
			if (board[id.x + index + 1][id.y + j] === 1) {
				board[id.x + index + 1][id.y + j] = 0
			}

		}
	}
}

exports.move = (board, direction) => {
	let id = this.getCoordinateCar(board)
	let result = true
	if (id) {
		switch (direction) {
			case "up":
				if (id.x !== 0) {
					this.deleteCar(board, id)
					result = this.pointCar(board, id = {
						x: id.x - 1,
						y: id.y,
					})
				}
				break;
			case "right":
				if (id.y !== 8) {
					this.deleteCar(board, id)
					result = this.pointCar(board, id = {
						x: id.x,
						y: id.y + 1,
					})
				}
				break;
			case "down":
				if (id.x !== 16) {
					this.deleteCar(board, id)
					result = this.pointCar(board, id = {
						x: id.x + 1,
						y: id.y,
					})
				}
				break;
			case "left":
				if (id.y !== 1) {
					this.deleteCar(board, id)
					result = this.pointCar(board, id = {
						x: id.x,
						y: id.y - 1,
					})
				}

				break;
		}

	} else result = false
	return result
}

exports.getCoordinateCarRivals = (board) => {
	let x = 0, y = 0;
	let res = []
	for (; x < board.length; x++) {
		for (y = 0; y < board[x].length; y++) {
			if (board[x][y] === 3) {
				res.push({
					x: x,
					y: y,
				})
			}
		}
	}
	return res
}

exports.pointRivalsCars = (board, element) => {
	if (board[element.x][element.y] === 1) {
		return false
	}
	board[element.x][element.y] = 3
	for (let index = 0; index < 3; index += 2) {

		for (let j = -1; j < 2; j++) {
			if (board[element.x - index - 1][element.y + j] === 1) {
				return false
			}
			board[element.x - index - 1][element.y + j] = 2
		}
		board[element.x - index - 2][element.y] = 2
	}
	return true
}

exports.deleteRivalsCars = (board, element) => {
	board[element.x][element.y] = 0
	for (let index = 0; index < 3; index += 2) {

		for (let j = -1; j < 2; j++) {
			if (board[element.x - index - 1][element.y + j] === 2
				|| board[element.x - index - 1][element.y + j] === 3
			) {
				board[element.x - index - 1][element.y + j] = 0
			}

		}
		if (board[element.x - index - 2][element.y] === 2
			|| board[element.x - index - 2][element.y] === 3) {
			board[element.x - index - 2][element.y] = 0
		}

	}
}


exports.moveCarRivals = (board) => {
	let idCars = this.getCoordinateCarRivals(board)
	let result = true
	idCars.forEach(element => {
		this.deleteRivalsCars(board, element)
		if (element.x !== 19) {
			result = this.pointRivalsCars(board, idCars = {
				x: element.x + 1,
				y: element.y,
			})
		}
	});
	return result
}


exports.randomGeneration = (board) => {
	let x = 4
	let y = Math.floor(Math.random() * (10 - 2) + 1)
	board[x][y] = 3
}

exports.clearBoard = (board) => {
	for (let x = 0; x < board.length; x++) {
		for (let y = 0; y < board[x].length; y++) {
			board[x][y] = 0
		}
	}
	return board
}

exports.start = () => {
	let board = this.generationBoard()
	board[16][5] = 1
	let id = this.getCoordinateCar(board)
	this.pointCar(board, id)
	return board
}