const ConnectToMongodb=require('./db')
const express = require('express')
const app = express()
var cors=require('cors')
ConnectToMongodb()
const port = 5000
app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotify backend listening at http://localhost:${port}`)
})
