var express = require("express"),
  exphbs  = require('express-handlebars'),
  hbs = exphbs.create({}),
  mysql = require('mysql'),
  app  = express(),
  router = express.Router(),
  path = require("path"),
  port = 3000;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/home', function (req, res) {
    res.render('home');
});

app.get('/rank', function (req, res) {
  var cx = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'hockey'
  });

  var rules = req.query;
  function getRule(name) {
    return rules[name] || 0;
  }

  var qry = `
    SELECT CONCAT(first_name, ' ', last_name) as name, position,
      CASE position
        WHEN 'LW' THEN ${getRule('forwardGoals')} * goals + ${getRule('forwardAssists')} * assists
        WHEN 'C' THEN ${getRule('forwardGoals')} * goals + ${getRule('forwardAssists')} * assists
        WHEN 'RW' THEN ${getRule('forwardGoals')} * goals + ${getRule('forwardAssists')} * assists
        WHEN 'D' THEN ${getRule('defensemanGoals')} * goals + ${getRule('defensemanAssists')} * assists
        WHEN 'G' THEN
          ${getRule('goalieWins')} * wins +
          ${getRule('goalieOTLosses')} * overtime_losses +
          ${getRule('goalieShootoutLosses')} * shootout_losses +
          ${getRule('goalieShutouts')} * shutouts +
          ${getRule('goalieGoals')} * goals +
          ${getRule('goalieAssists')} * assists
      END as score
    FROM players p, stats s
    WHERE p.player_id = s.player_id
    ORDER BY score DESC
    LIMIT 100;`;

  cx.query(qry, function (err, results, fields) {
    if (err) throw err;

    res.end(JSON.stringify(results));
  });
});

app.use(express.static(path.join(__dirname + '/src')));
app.use(express.static(path.join(__dirname + '/css')));

app.listen(port);

console.log("Running at Port 3000")
