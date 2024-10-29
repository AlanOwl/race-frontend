const Router = require('express')
const router = new Router()

const actionsRouter = require('./actionsRouter')
const gamesRouter = require('./gamesRouter')
const stateRouter = require('./stateRouter')
const lvlRouter = require('./lvlRouter')



router.use('/actions', actionsRouter)
router.use('/games', gamesRouter)
router.use('/state', stateRouter)
router.use('/config', lvlRouter)


module.exports = router