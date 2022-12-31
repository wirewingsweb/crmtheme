const express = require('express')
const {dbcon} = require('./config/conn')
const app = express()
const port = 4000
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')


app.use(express.json())
app.use(credentials);
app.use(cors(corsOptions))

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'localhost');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
dbcon()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', require('./routes/userRoute'))
app.use('/user', require('./routes/loginRoute'))
app.use('/customer', require('./routes/customerRoute'))
app.use('/desposition', require('./routes/despositionRoute'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})