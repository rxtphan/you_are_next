var _ = require('lodash');
var rp = require('request-promise-native');
var db = require('../../../src/db');

// Set up DB connection
var connection = db.cx();
var getPlayersForTeam;

connection.query('SELECT team_id FROM teams', function (error, results, fields) {
  if (error) throw error;

  _.each(results, (team, i) => {
    setTimeout(() => {
      var opts = {
        uri: `https://api.sportradar.us/nhl-ot4/seasontd/2016/REG/teams/${team.team_id}/statistics.json`,
        qs: {
          api_key: 'ezc75gue66znbqunjt47cxgb'
        },
        json: true
      };
      rp(opts)
        .then((response) => {
          console.log(`>>>>>>>>>> adding ${response.name} players....`);
          getPlayersForTeam(response);
        })
        .catch((err) => {
          console.log('>>>>>>>>>> err: ', err);
        });
    }, i * 1100);
  });
});

function isGoalie(player) {
  return player.primary_position === 'G' && player.goaltending;
}

getPlayersForTeam = (team) => {
  _.each(team.players, (player) => {
    var playerData = {
      player_id: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
      position: player.primary_position,
      team_id: team.id
    };
    connection.query('INSERT INTO players SET ?', playerData, function (error, results, fields) {
      if (error) {
        console.log(`***** Already added player record for: ${player.full_name} on team ${team.name}`);
      }

      // Is there already a record for this player? If so merge the stats...
      connection.query(`SELECT * FROM stats where player_id = '${playerData.player_id}'`, function (error, results, fields) {
        if (error) throw error;

        var stats = player.statistics;
        var total = stats.total;
        var powerplay = stats.powerplay;
        var shorthanded = stats.shorthanded;
        var penalty = stats.penalty;
        var shootout = stats.shootout;

        if (results.length) {
          console.log(`<<<<<< updating entry for ${playerData.first_name} ${playerData.last_name}}:`);

          // update
          var qry = `
            UPDATE stats SET
              games_played = ?,
              goals = ?,
              assists = ?,
              penalties = ?,
              penalty_minutes = ?,
              shots = ?,
              blocked_att = ?,
              missed_shots = ?,
              hits = ?,
              giveaways = ?,
              takeaways = ?,
              blocked_shots = ?,
              faceoffs = ?,
              faceoffs_won = ?,
              faceoffs_lost = ?,
              winning_goals = ?,
              plus_minus = ?,
              games_scratched = ?,
              games_started = ?,
              minutes_played = ?,
              powerplay_shots = ?,
              powerplay_goals = ?,
              powerplay_assists = ?,
              shorthanded_shots = ?,
              shorthanded_goals = ?,
              shorthanded_assists = ?,
              penalty_shots = ?,
              penalty_goals = ?,
              penalty_missed_shots = ?,
              shootout_shots = ?,
              shootout_missed_shots = ?,
              shootout_goals = ?
          `;

          if (isGoalie(player)) {
            qry += `,
              wins = ?,
              losses = ?,
              shots_against = ?,
              goals_against = ?,
              saves = ?,
              shutouts = ?,
              overtime_losses = ?,
              penalty_saves = ?,
              shootout_saves = ?
            `;
          };

          qry += ' WHERE player_id = ?';

          var row = results[0];

          var updateData = [
            row.games_played + total.games_played,
            row.goals + total.goals,
            row.assists + total.assists,
            row.penalties + total.penalties,
            row.penalty_minutes + total.penalty_minutes,
            row.shots + total.shots,
            row.blocked_att + total.blocked_att,
            row.missed_shots + total.missed_shots,
            row.hits + total.hits,
            row.giveaways + total.giveaways,
            row.takeaways + total.takeaways,
            row.blocked_shots + total.blocked_shots,
            row.faceoffs + total.faceoffs,
            row.faceoffs_won + total.faceoffs_won,
            row.faceoffs_lost + total.faceoffs_lost,
            row.winning_goals + total.winning_goals,
            row.plus_minus + total.plus_minus,
            row.games_scratched + total.games_scratched,
            row.games_started + total.games_started,
            row.minutes_played + parseInt(_.get(player, 'time_on_ice.total.total', 0)),
            row.powerplay_shots + powerplay.shots,
            row.powerplay_goals + powerplay.goals,
            row.powerplay_assists + powerplay.assists,
            row.shorthanded_shots + shorthanded.shots,
            row.shorthanded_goals + shorthanded.goals,
            row.shorthanded_assists + shorthanded.assists,
            row.penalty_shots + penalty.shots,
            row.penalty_goals + penalty.goals,
            row.penalty_missed_shots + penalty.missed_shots,
            row.shootout_shots + shootout.shots,
            row.shootout_missed_shots + shootout.missed_shots,
            row.shootout_goals + shootout.goals
          ];

          if (isGoalie(player)) {
            var goaltending = player.goaltending;
            var totalGoaltending = goaltending.total;
            updateData = _.concat(updateData , [
              row.wins + totalGoaltending.wins,
              row.losses + totalGoaltending.losses,
              row.shots_against + totalGoaltending.shots_against,
              row.goals_against + totalGoaltending.goals_against,
              row.saves + totalGoaltending.saves,
              row.shutouts + totalGoaltending.shutouts,
              row.overtime_losses + totalGoaltending.overtime_losses,
              row.penalty_saves + goaltending.penalty.saves,
              row.shootout_saves + goaltending.shootout.saves
            ]);
          }

          updateData = _.concat(updateData, playerData.player_id);

          connection.query(qry, updateData, function (error, results, fields) {
            if (error) throw error;
          });
        } else {
          var statsData = {
            player_id: player.id,
            games_played: total.games_played,
            goals: total.goals,
            assists: total.assists,
            penalties: total.penalties,
            penalty_minutes: total.penalty_minutes,
            shots: total.shots,
            blocked_att: total.blocked_att,
            missed_shots: total.missed_shots,
            hits: total.hits,
            giveaways: total.giveaways,
            takeaways: total.takeaways,
            blocked_shots: total.blocked_shots,
            faceoffs: total.faceoffs,
            faceoffs_won: total.faceoffs_won,
            faceoffs_lost: total.faceoffs_lost,
            winning_goals: total.winning_goals,
            plus_minus: total.plus_minus,
            games_scratched: total.games_scratched,
            games_started: total.games_started,
            minutes_played: parseInt(_.get(player, 'time_on_ice.total.total', 0)),
            powerplay_shots: powerplay.shots,
            powerplay_goals: powerplay.goals,
            powerplay_assists: powerplay.assists,
            shorthanded_shots: shorthanded.shots,
            shorthanded_goals: shorthanded.goals,
            shorthanded_assists: shorthanded.assists,
            penalty_shots: penalty.shots,
            penalty_goals: penalty.goals,
            penalty_missed_shots: penalty.missed_shots,
            shootout_shots: shootout.shots,
            shootout_missed_shots: shootout.missed_shots,
            shootout_goals: shootout.goals
          };

          if (isGoalie(player)) {
            var goaltending = player.goaltending;
            var totalGoaltending = goaltending.total;
            var goalieStatsData = {
              wins: totalGoaltending.wins,
              losses: totalGoaltending.losses,
              shots_against: totalGoaltending.shots_against,
              goals_against: totalGoaltending.goals_against,
              saves: totalGoaltending.saves,
              shutouts: totalGoaltending.shutouts,
              overtime_losses: totalGoaltending.overtime_losses,
              penalty_saves: goaltending.penalty.saves,
              shootout_saves: goaltending.shootout.saves
            };
            _.extend(statsData, goalieStatsData);
          }

          //console.log(`>>>>>> adding new entry for ${statsData.player_id}:`);
          connection.query('INSERT INTO stats SET ?', statsData, function (error, results, fields) {
            if (error) throw error;
          });
        } // end add new player record
      });

    });
  }); // end each
}
