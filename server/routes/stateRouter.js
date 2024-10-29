const Router = require('express')
const route = new Router()
const controller = require('../controller/controller.js')


route.get('/', controller.getState)
route.post('/unload', controller.unload)


module.exports = route