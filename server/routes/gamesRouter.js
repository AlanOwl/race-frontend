const Router = require('express')
const route = new Router()
const controller = require('../controller/controller.js')


route.get('/', controller.getListGames)
route.post('/:gameId', controller.startGame)

module.exports = route