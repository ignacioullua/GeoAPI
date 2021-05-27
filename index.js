
var express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const morgan = require("morgan")
const router = require("./Router/routes")
const app = express()

const port = 5000

app.listen(port, () => {
    console.log("Listening at http://localhost:" + port)
  })

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())
  app.use('/', router);

  app.use(morgan("dev"));           //DEBUG PURPOSES
  mongoose.set('debug', true);      //DEBUG PURPOSES
  
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/geoDB', {useNewUrlParser: true,  useUnifiedTopology: true });