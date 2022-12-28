const express = require('express')
const {dbcon} = require('./config/conn')
const app = express()
const port = 4000
const cors = require('cors')
const corsOptions = require('./config/corsOptions')


app.use(cors('*'))
app.use(express.json())
dbcon()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', require('./routes/userRoute'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})