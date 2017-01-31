USE hockey;

DROP TABLE IF EXISTS players;
CREATE TABLE players
(
  player_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  birth_date DATE,
  birth_country VARCHAR(255),
  position VARCHAR(255),
  is_rookie BOOLEAN,
  source_id INT,
  team_id INT,
  PRIMARY KEY (player_id)
);

DROP TABLE IF EXISTS teams;
CREATE TABLE teams
(
  team_id INT NOT NULL AUTO_INCREMENT,
  city VARCHAR(255),
  name VARCHAR(255),
  source_id INT,
  PRIMARY KEY (team_id)
);

DROP TABLE IF EXISTS stats;
CREATE TABLE stats
(
    player_id INT,
    games_played INT,
    goals INT,
    assists INT,
    hat_tricks INT,
    plus_minus INT,
    shots INT,
    shot_on_net INT,
    penalties INT,
    penalty_minutes INT,
    powerplay_goals INT,
    powerplay_assists INT,
    shorthanded_goals INT,
    shorthanded_assists INT,
    game_winning_goals INT,
    game_tying_goals INT,
    hits INT,
    faceoffs INT,
    faceoff_wins INT,
    faceoff_losses INT,
    shootout_attempts INT,
    shootout_misses INT,
    shootout_goals INT,

    wins INT,
    losses INT,
    overtime_wins INT,
    overtime_losses INT,
    shootout_wins INT,
    shootout_losses INT,
    goals_against INT,
    shots_against INT,
    saves INT,
    shutouts INT,
    games_started INT,
    credit_for_game INT,
    shootout_defences INT,
    shootout_saves INT,
    minutes_played INT
);
