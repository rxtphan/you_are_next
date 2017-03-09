var mysql = require('mysql');
var _ = require('lodash');
var data = require('./teams.json');

// Set up DB connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'hockey'
});

_.each(data.conferences, (conference) => {
  _.each(conference.divisions, (division) => {
    _.each(division.teams, (team) => {
      var teamData = {
        city: team.market,
        name: team.name,
        team_id: team.id
      };
      connection.query('INSERT INTO teams SET ?', teamData, function (error, results, fields) {
        if (error) throw error;
        console.log(`>>>> Added team: ${team.name}`);
      });

    });
  });
})
