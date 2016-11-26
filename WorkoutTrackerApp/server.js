
var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var home = require('./controllers/home');
var profile = require('./controllers/profile');

var port = process.env.PORT || 3545;
var app = express();


// set up view engine 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//serve files from ./content/
app.use(express.static(path.join(__dirname, 'content')));

// Use routing controllers for home and profile
app.use('/', home);
app.use('/profile', profile);
app.use('*', function(req, res){
  res.status(404).render('404');
})

app.listen(port, function () {
  console.log("== Listening on port", port);
});
