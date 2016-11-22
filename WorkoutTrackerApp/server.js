
var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var home = require('./controllers/home');
var profile = require('./controllers/home');

var port = process.env.PORT || 3545;
var app = express();




app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'Content')));


app.use('/', home);
app.use('/profile', profile);

app.listen(port, function () {
  console.log("== Listening on port", port);
});
