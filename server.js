var express = require("express"),
  exphbs  = require('express-handlebars'),
  mysql = require('mysql'),
  app  = express(),
  router = express.Router(),
  path = require("path"),
  port = 3000;

var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    times: function (n, halfPoints, block) {
      var accum = '';
      var max = halfPoints ? 2 * n : n;
      for(var i = 0; i <= max; ++i)
        accum += block.fn(halfPoints ? i/2 : i);
      return accum;
    },
    neg: function (num) {
      return -1 * num;
    },
    if_eq: function (a, b, opts) {
      if(a == b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('nhl', require('./config/nhl-setup'));
});

app.get('/rank', require('./src/rank'));

app.use(express.static(path.join(__dirname + '/src')));
app.use(express.static(path.join(__dirname + '/css')));

app.listen(port);

console.log("Running at Port 3000")
