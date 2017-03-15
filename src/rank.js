var mysql = require('mysql');

module.exports = function(req, res) {
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
      CASE
        WHEN position = 'LW' || position = 'RW' || position = 'C' THEN
          ${getRule('forwardGoals')} * goals +
          ${getRule('forwardAssists')} * assists +
          ${getRule('forwardPenalties')} * penalties +
          ${getRule('forwardPenaltyMinutes')} * penalty_minutes +
          ${getRule('forwardShots')} * shots +
          ${getRule('forwardHits')} * hits +
          ${getRule('forwardTakeaways')} * takeaways +
          ${getRule('forwardBlockedShots')} * blocked_shots +
          ${getRule('forwardFaceoffsWon')} * faceoffs_won +
          ${getRule('forwardWinningGoals')} * winning_goals +
          ${getRule('forwardPlusMinus')} * plus_minus +
          ${getRule('forwardGamesStarted')} * games_started +
          ${getRule('forwardMinutesPlayed')} * minutes_played +
          ${getRule('forwardPowerplayGoals')} * powerplay_goals +
          ${getRule('forwardPowerplayAssists')} * powerplay_assists +
          ${getRule('forwardShorthandedGoals')} * shorthanded_goals +
          ${getRule('forwardShorthandedAssists')} * shorthanded_assists +
          ${getRule('forwardPenaltyGoals')} * penalty_goals +
          ${getRule('forwardShootoutGoals')} * shootout_goals
        WHEN position = 'D' THEN
          ${getRule('defensemanGoals')} * goals +
          ${getRule('defensemanAssists')} * assists +
          ${getRule('defensemanPenalties')} * penalties +
          ${getRule('defensemanPenaltyMinutes')} * penalty_minutes +
          ${getRule('defensemanShots')} * shots +
          ${getRule('defensemanHits')} * hits +
          ${getRule('defensemanTakeaways')} * takeaways +
          ${getRule('defensemanBlockedShots')} * blocked_shots +
          ${getRule('defensemanFaceoffsWon')} * faceoffs_won +
          ${getRule('defensemanWinningGoals')} * winning_goals +
          ${getRule('defensemanPlusMinus')} * plus_minus +
          ${getRule('defensemanGamesStarted')} * games_started +
          ${getRule('defensemanMinutesPlayed')} * minutes_played +
          ${getRule('defensemanPowerplayGoals')} * powerplay_goals +
          ${getRule('defensemanPowerplayAssists')} * powerplay_assists +
          ${getRule('defensemanShorthandedGoals')} * shorthanded_goals +
          ${getRule('defensemanShorthandedAssists')} * shorthanded_assists +
          ${getRule('defensemanPenaltyGoals')} * penalty_goals +
          ${getRule('defensemanShootoutGoals')} * shootout_goals
        WHEN position = 'G' THEN
          ${getRule('goalieWins')} * wins +
          ${getRule('goalieOTLosses')} * overtime_losses +
          ${getRule('goalieSaves')} * saves +
          ${getRule('goalieShutouts')} * shutouts +
          ${getRule('goalieGoals')} * goals +
          ${getRule('goalieAssists')} * assists +
          ${getRule('goaliePenaltySaves')} * penalty_saves +
          ${getRule('goalieShootoutSaves')} * shootout_saves
      END as score
    FROM players p, stats s
    WHERE p.player_id = s.player_id
    ORDER BY score DESC
    LIMIT 300;`;

  cx.query(qry, function (err, results, fields) {
    if (err) throw err;

    res.end(JSON.stringify(results));
  });

};
