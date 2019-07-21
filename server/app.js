if(process.env.NODE_ENV == 'development') {
  require('dotenv').config()
  console.log('on development')
}
const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const url = process.env.MONGO_ATLAS_URL || 'mongodb://localhost:27017/mini-wp3'
const cors = require('cors')
const port = process.env.PORT || 3000

mongoose.connect(url, {useNewUrlParser: true}, (err) => {
  if(err) console.log('error connecting mongoose')
  else {
    if(process.env.MONGO_ATLAS_URL) {
      console.log('connected to mongooose deploy')
    } else {
      console.log('connected to mongoose local')
    }
  }
});

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api', routes)

app.use((err, req, res, next) => {
  console.log(err)
  let status = err.status || 500
	let message = err.message
	res.status(status).json({
    message: message
	})
})

app.listen(port, () => { console.log('Listening to port ', port) })
