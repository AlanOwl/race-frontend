require('dotenv').config()
const express = require('express')

const cors = require('cors')
const router = require('./routes/routes.js')


const path = require('path')
const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static((path.resolve(__dirname, 'static'))))
app.use('/api', router)


const start = async () => {
	try {
		app.listen(PORT, () => console.log(`Server started ${PORT}`))
	} catch (e) {
		console.log(e)
	}

}

start()