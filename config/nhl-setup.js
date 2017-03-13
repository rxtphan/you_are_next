module.exports = {
  positions: [
    {
      name: 'Forwards',
      color: 'panel-primary',
      stats: {
        visible: [
          { id: 'forwardGoals', name: 'Goals', max: 5, default: 1 },
          { id: 'forwardAssists', name: 'Assists', max: 5, default: 1 },
          { id: 'forwardHits', name: 'Hits', max: 5, default: 0 },
          { id: 'forwardBlockedShots', name: 'Blocked shots', max: 5, default: 0 },
          { id: 'forwardFaceoffsWon', name: 'Faceoffs won', max: 5, default: 0 },
          { id: 'forwardPlusMinus', name: 'Plus-minus', max: 5, default: 0 }
        ],
        hidden: [
          { id: 'forwardGamesStarted', name: 'Games started', max: 5, default: 0 },
          { id: 'forwardShots', name: 'Shots', max: 5, default: 0 },
          { id: 'forwardTakeaways', name: 'Takeaways', max: 5, default: 0 },
          { id: 'forwardMinutesPlayed', name: 'Minutes played', max: 5, default: 0 },
          { id: 'forwardWinningGoals', name: 'Winning goals', max: 5, default: 0 },
          { id: 'forwardPowerplayGoals', name: 'Powerplay goals', max: 5, default: 0 },
          { id: 'forwardPowerplayAssists', name: 'Powerplay assists', max: 5, default: 0 },
          { id: 'forwardShorthandedGoals', name: 'Shorthanded goals', max: 5, default: 0 },
          { id: 'forwardShorthandedAssists', name: 'Shorthanded assists', max: 5, default: 0 },
          { id: 'forwardPenaltyGoals', name: 'Penalty goals', max: 5, default: 0 },
          { id: 'forwardPenalties', name: 'Penalties', max: 5, default: 0 },
          { id: 'forwardPenaltyMinutes', name: 'Penalty minutes', max: 5, default: 0 },
          { id: 'forwardShootoutGoals', name: 'Shootout goals', max: 5, default: 0 }
        ]
      }
    },
    {
      name: "Defensemen",
      color: 'panel-success',
      stats: {
        visible: [
          { id: 'defensemanGoals', name: 'Goals', max: 5, default: 1 },
          { id: 'defensemanAssists', name: 'Assists', max: 5, default: 1 },
          { id: 'defensemanHits', name: 'Hits', max: 5, default: 0 },
          { id: 'defensemanBlockedShots', name: 'Blocked shots', max: 5, default: 0 },
          { id: 'defensemanFaceoffsWon', name: 'Faceoffs won', max: 5, default: 0 },
          { id: 'defensemanPlusMinus', name: 'Plus-minus', max: 5, default: 0 }
        ],
        hidden: [
          { id: 'defensemanGamesStarted', name: 'Games started', max: 5, default: 0 },
          { id: 'defensemanShots', name: 'Shots', max: 5, default: 0 },
          { id: 'defensemanTakeaways', name: 'Takeaways', max: 5, default: 0 },
          { id: 'defensemanMinutesPlayed', name: 'Minutes played', max: 5, default: 0 },
          { id: 'defensemanWinningGoals', name: 'Winning goals', max: 5, default: 0 },
          { id: 'defensemanPowerplayGoals', name: 'Powerplay goals', max: 5, default: 0 },
          { id: 'defensemanPowerplayAssists', name: 'Powerplay assists', max: 5, default: 0 },
          { id: 'defensemanShorthandedGoals', name: 'Shorthanded goals', max: 5, default: 0 },
          { id: 'defensemanShorthandedAssists', name: 'Shorthanded assists', max: 5, default: 0 },
          { id: 'defensemanPenaltyGoals', name: 'Penalty goals', max: 5, default: 0 },
          { id: 'defensemanPenalties', name: 'Penalties', max: 5, default: 0 },
          { id: 'defensemanPenaltyMinutes', name: 'Penalty minutes', max: 5, default: 0 },
          { id: 'defensemanShootoutGoals', name: 'Shootout goals', max: 5, default: 0 }
        ]
      }
    },
    {
      name: "Goalies",
      color: 'panel-warning',
      stats: {
        visible: [
          { id: 'goalieWins', name: 'Wins', max: 5, default: 1 },
          { id: 'goalieOTLosses', name: 'OT Losses', max: 5, default: 0 },
          { id: 'goalieSaves', name: 'Saves', max: 5, default: 0 },
          { id: 'goalieShutouts', name: 'Shutouts', max: 5, default: 0 }
        ],
        hidden: [
          { id: 'goalieGoals', name: 'Goals', max: 10, default: 0 },
          { id: 'goalieAssists', name: 'Assists', max: 10, default: 0 },
          { id: 'goaliePenaltySaves', name: 'Penalty saves', max: 5, default: 0 },
          { id: 'goalieShootoutSaves', name: 'Shootout saves', max: 5, default: 0 }
        ]
      }
    }
  ]
}
