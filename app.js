
/**
 * Module dependencies.
 */


var path = require('path');
var express = require('express');
var webRouter = require('./web_router');

// 静态文件目录
var staticDir = path.join(__dirname, 'public');

var app = express();

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));


// routes
app.get('/', webRouter.index);
app.get('/game', webRouter.game);


// custom middleware
app.use('/public', express.static(staticDir));


app.listen(3001, function () {
  console.log("start with port:3001");
});


module.exports = app;
