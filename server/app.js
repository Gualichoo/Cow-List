const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cowRoutes = require ('./api/cows');
const parser = require('body-parser');

app.use(parser.json());
mongoose.connect('mongodb+srv://Senese:riverplate@cluster0-6fbyr.mongodb.net/test?retryWrites=true' ,
  { useNewUrlParser: true }
)
mongoose.set('useCreateIndex', true);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Logging and parsing
app.use(morgan('dev'));


app.use('/cows', cowRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

 // //var db = require('./db');

// Set what we are listening on.


//
// app.use(morgan('dev'));
// app.use(parser.json());

// // Set up our routes
// app.use('/classes', router);

// // Serve the client files
// app.use(express.static(__dirname + '/../client'));

// // If we are being run directly, run the server.
// if (!module.parent) {
//   app.listen(app.get('port'));
//   console.log('Listening on', app.get('port'));
// }


// // Router
// var router = require('./routes.js');

