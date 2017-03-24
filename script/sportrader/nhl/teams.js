var _ = require('lodash');
var data = require('./teams.json');
var db = require('../../../src/db');

// Set up DB connection
var connection = db.cx();

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
