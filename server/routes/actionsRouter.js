const Router = require('express')
const route = new Router()
const controller = require('../controller/controller.js')


route.post('/', controller.actionGamer)

module.exports = route