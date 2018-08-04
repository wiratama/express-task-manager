const express = require('express')
const logger = require('morgan')
const path = require('path')
const session = require('express-session')
const methodOverride = require('method-override')
const taskApp = express()

taskApp.get('/', (req, res) => res.send('Hello World!'))

taskApp.listen(3000, () => console.log('Example app listening on port 3000!'))