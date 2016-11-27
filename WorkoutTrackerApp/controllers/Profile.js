var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var staticDir = path.join(__dirname, '..', 'views');

var profile = fs.readFileSync(path.join(staticDir, 'profile.handlebars'), 'utf8');

router.get('/', function (req, res) {
    res.status(200).render(path.join(staticDir, 'profile.handlebars'));
});

module.exports = router;