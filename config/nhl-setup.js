module.exports = {
  positions: [
    {
      name: 'Forwards',
      color: 'panel-primary',
      stats: {
        visible: [
          { id: 'forwardGoals', name: 'Goals', max: 10, default: 1 },
          { id: 'forwardAssists', name: 'Assists', max: 10, default: 1 },
          { id: 'forwardHits', name: 'Hits', max: 5, default: 0, halfPoints: true },
          { id: 'forwardBlockedShots', name: 'Blocked shots', max: 10, default: 0 },
          { id: 'forwardFaceoffsWon', name: 'Faceoffs won', max: 5, default: 0, halfPoints: true },
          { id: 'forwardPlusMinus', name: 'Plus-minus', max: 5, default: 0 }
        ],
        hidden: [
          { id: 'forwardGamesStarted', name: 'Games started', max: 5, default: 0, halfPoints: true },
          { id: 'forwardShots', name: 'Shots on goal', max: 5, default: 0, halfPoints: true },
          { id: 'forwardTakeaways', name: 'Takeaways', max: 10, default: 0 },
          { id: 'forwardMinutesPlayed', name: 'Minutes played', max: 5, default: 0, halfPoints: true },
          { id: 'forwardWinningGoals', name: 'Game winning goals', max: 5, default: 0, halfPoints: true },
          { id: 'forwardShootoutGoals', name: 'Shootout goals', max: 5, default: 0, halfPoints: true },
          { id: 'forwardPowerplayGoals', name: 'Powerplay goals', max: 5, default: 0, halfPoints: true },
          { id: 'forwardPowerplayAssists', name: 'Powerplay assists', max: 5, default: 0, halfPoints: true },
          { id: 'forwardShorthandedGoals', name: 'Shorthanded goals', max: 5, default: 0, halfPoints: true },
          { id: 'forwardShorthandedAssists', name: 'Shorthanded assists', max: 5, default: 0, halfPoints: true },
          { id: 'forwardPenaltyGoals', name: 'Penalty shot goals', max: 5, default: 0, halfPoints: true },
          { id: 'forwardPenaltyMinutes', name: 'Penalty minutes', max: 5, default: 0, halfPoints: true }
        ]
      }
    },
    {
      name: "Defensemen",
      color: 'panel-success',
      stats: {
        visible: [
          { id: 'defensemanGoals', name: 'Goals', max: 10, default: 1 },
          { id: 'defensemanAssists', name: 'Assists', max: 10, default: 1 },
          { id: 'defensemanHits', name: 'Hits', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanBlockedShots', name: 'Blocked shots', max: 10, default: 0 },
          { id: 'defensemanFaceoffsWon', name: 'Faceoffs won', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanPlusMinus', name: 'Plus-minus', max: 5, default: 0 }
        ],
        hidden: [
          { id: 'defensemanGamesStarted', name: 'Games started', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanShots', name: 'Shots on goal', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanTakeaways', name: 'Takeaways', max: 10, default: 0 },
          { id: 'defensemanMinutesPlayed', name: 'Minutes played', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanWinningGoals', name: 'Game winning goals', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanShootoutGoals', name: 'Shootout goals', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanPowerplayGoals', name: 'Powerplay goals', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanPowerplayAssists', name: 'Powerplay assists', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanShorthandedGoals', name: 'Shorthanded goals', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanShorthandedAssists', name: 'Shorthanded assists', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanPenaltyGoals', name: 'Penalty shot goals', max: 5, default: 0, halfPoints: true },
          { id: 'defensemanPenaltyMinutes', name: 'Penalty minutes', max: 5, default: 0, halfPoints: true }
        ]
      }
    },
    {
      name: "Goalies",
      color: 'panel-warning',
      stats: {
        visible: [
          { id: 'goalieWins', name: 'Wins', max: 10, default: 1 },
          { id: 'goalieShutouts', name: 'Shutouts', max: 10, default: 1 },
          { id: 'goalieOTLosses', name: 'OT Losses', max: 5, default: 0, halfPoints: true },
          { id: 'goalieSaves', name: 'Saves', max: 5, default: 0, halfPoints: true },
        ],
        hidden: [
          { id: 'goalieGoals', name: 'Goals', max: 25, default: 0 },
          { id: 'goalieAssists', name: 'Assists', max: 10, default: 0 },
          { id: 'goaliePenaltySaves', name: 'Penalty shot saves', max: 5, default: 0, halfPoints: true },
          { id: 'goalieShootoutSaves', name: 'Shootout saves', max: 5, default: 0, halfPoints: true },
          { id: 'goaliePenaltyMinutes', name: 'Penalty minutes', max: 10, default: 0 }
        ]
      }
    }
  ]
}
