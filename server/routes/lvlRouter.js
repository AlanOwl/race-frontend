const Router = require('express')
const route = new Router()
const controller = require('../controller/controller.js')

route.get('/lvl', controller.newLvl)
route.post('/record', controller.getRecord)

module.exports = route