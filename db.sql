USE hockey;

DROP TABLE IF EXISTS players;
CREATE TABLE players
(
  player_id CHAR(36),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  position CHAR(10),
  is_rookie BOOLEAN,
  team_id CHAR(36),
  PRIMARY KEY (player_id)
);

DROP TABLE IF EXISTS teams;
CREATE TABLE teams
(
  team_id CHAR(36),
  city VARCHAR(255),
  name VARCHAR(255),
  PRIMARY KEY (team_id)
);

DROP TABLE IF EXISTS stats;
CREATE TABLE stats
(
    player_id CHAR(36),
    games_played INT,
    goals INT,
    assists INT,
    penalties INT,
    penalty_minutes INT,
    shots INT,
    blocked_att INT,
    missed_shots INT,
    hits INT,
    giveaways INT,
    takeaways INT,
    blocked_shots INT,
    faceoff_won INT,
    faceoff_lost INT,
    winning_goals INT,
    plus_minus INT,
    games_scratched INT,
    games_started INT,
    faceoffs INT,
    minutes_played INT,

    powerplay_shots INT,
    powerplay_goals INT,
    powerplay_assists INT,

    shorthanded_shots INT,
    shorthanded_goals INT,
    shorthanded_assists INT,

    penalty_shots INT,
    penalty_goals INT,
    penalty_missed_shots INT,

    shootout_shots INT,
    shootout_missed_shots INT,
    shootout_goals INT,

    /* goalie stats */
    shots_against INT,
    goals_against INT,
    saves INT,
    shutouts INT,
    wins INT,
    losses INT,
    overtime_losses INT,
    shootout_saves INT,
    penalty_saves INT
);
