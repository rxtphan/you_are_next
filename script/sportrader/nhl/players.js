var mysql = require('mysql');
var _ = require('lodash');
var data = require('./canucks.json');

// Set up DB connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'hockey'
});

var teamId = data.id;

_.each(data.players, (player) => {
  var playerData = {
    player_id: player.id,
    first_name: player.first_name,
    last_name: player.last_name,
    position: player.primary_position,
    team_id: teamId
  };
  connection.query('INSERT INTO players SET ?', playerData, function (error, results, fields) {
    if (error) throw error;
    console.log(`>>>> Added: ${player.full_name}`);

    var stats = player.statistics;
    var total = stats.total;
    var powerplay = stats.powerplay;
    var shorthanded = stats.shorthanded;
    var penalty = stats.penalty;
    var shootout = stats.shootout;
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

    if (player.primary_position === 'G' && player.goaltending) {
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

    console.log('>>>>> statsData: ', statsData);

    connection.query('INSERT INTO stats SET ?', statsData, function (error, results, fields) {
      if (error) throw error;
      console.log(`>>>> Added stats for ${player.full_name}`);
    });

  });
});
