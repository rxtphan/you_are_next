var mysql = require('mysql');
var _ = require('lodash');
var data = require('./cumulative_player_stats.json');

// Set up DB connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'hockey'
});

var players = data.cumulativeplayerstats.playerstatsentry;
var teamsAdded = {};

console.log(`>>>>>> Processing ${players.length} players...`);
_.each(players, function (p) {
  var player = p.player,
    team = p.team,
    gamesPlayed = p.stats.GamesPlayed['#text']

  console.log(`>>>> Processing: ${player.FirstName} ${player.LastName}`);
  var playerData = {
    first_name: player.FirstName,
    last_name: player.LastName,
    birth_date: player.BirthDate,
    birth_country: player.BirthCountry,
    position: player.Position,
    is_rookie: player.IsRookie === "true",
    source_id: parseInt(player.ID),
  };
  connection.query('INSERT INTO players SET ?', playerData, function (error, results, fields) {
    if (error) throw error;

    // Add stats
    var stats = p.stats.stats
    var shots = stats.Shots ? stats.Shots['#text'] : 0;
    var shotPercentage = stats.ShotPercentage ? stats.ShotPercentage['#text'] : 0;
    var statsData = {
      player_id: results.insertId,
      games_played: gamesPlayed,
      goals: stats.Goals['#text'],
      assists: stats.Assists['#text'],
      hat_tricks: stats.HatTricks['#text'],
      plus_minus: stats.PlusMinus ? stats.PlusMinus['#text'] : 0,
      shots: shots,
      shot_on_net: Math.floor(parseInt(shots) * parseFloat(shotPercentage)),
      penalties: stats.Penalties['#text'],
      penalty_minutes: stats.PenaltyMinutes['#text'],
      powerplay_goals: stats.PowerplayGoals['#text'],
      powerplay_assists: stats.PowerplayAssists['#text'],
      shorthanded_goals: stats.ShorthandedGoals['#text'],
      shorthanded_assists: stats.ShorthandedAssists['#text'],
      game_winning_goals: stats.GameWinningGoals['#text'],
      game_tying_goals: stats.GameTyingGoals['#text'],
      hits: stats.Hits ? stats.Hits['#text'] : 0,
      faceoffs: stats.Faceoffs ? stats.Faceoffs['#text'] : 0,
      faceoff_wins: stats.FaceoffWins ? stats.FaceoffWins['#text'] : 0,
      faceoff_losses: stats.FaceoffLosses ? stats.FaceoffLosses['#text'] : 0,
      shootout_attempts: stats.ShootoutAttempts['#text'],
      shootout_misses: stats.ShootoutMisses['#text'],
      shootout_goals: stats.ShootoutGoals['#text'],

      wins: stats.Wins ? stats.Wins['#text'] : 0,
      losses: stats.Losses ? stats.Losses['#text'] : 0,
      overtime_wins: stats.OvertimeWins ? stats.OvertimeWins['#text'] : 0,
      overtime_losses: stats.OvertimeLosses ? stats.OvertimeLosses['#text'] : 0,
      shootout_wins: stats.ShootoutWins ? stats.ShootoutWins['#text'] : 0,
      shootout_losses: stats.ShootoutLosses ? stats.ShootoutLosses['#text'] : 0,
      goals_against: stats.GoalsAgainst ? stats.GoalsAgainst['#text'] : 0,
      shots_against: stats.ShotsAgainst ? stats.ShotsAgainst['#text'] : 0,
      saves: stats.Saves ? stats.Saves['#text'] : 0,
      shutouts: stats.Shutouts ? stats.Shutouts['#text'] : 0,
      games_started: stats.GamesStarted ? stats.GamesStarted['#text'] : 0,
      credit_for_game: stats.CreditForGame ? stats.CreditForGame['#text'] : 0,
      shootout_defences: stats.ShootoutDefences ? stats.ShootoutDefences['#text'] : 0,
      shootout_saves: stats.ShootoutSaves ? stats.ShootoutSaves['#text'] : 0,
      minutes_played: stats.MinutesPlayed ? stats.MinutesPlayed['#text'] : 0
    };
    console.log('===== about to add stats: ', statsData);
    connection.query('INSERT INTO stats SET ?', statsData, function (error, results, fields) {
      if (error) {
        console.log(`Error: ${error}`);
        throw error;
      }
      console.log(`*** Added stats for ${playerData.last_name}`);
    });
  });

  if (!teamsAdded[team.ID]) {
    var teamData = {
      city: team.City,
      name: team.Name,
      source_id: team.ID
    };
    teamsAdded[team.ID] = true;

    connection.query('INSERT INTO teams SET ?', teamData, function (error, results, fields) {
      if (error) throw error;
      console.log(`>>>> Added team: ${team.Name}`);
    });
  }
});

//connection.end();
