module.exports = {
  positions: [
    {
      name: 'Forwards',
      color: 'panel-primary',
      stats: [
        { id: 'forwardGoals', name: 'Goals', max: 5, default: 1 },
        { id: 'forwardAssists', name: 'Assists', max: 5, default: 1 }
      ]
    },
    {
      name: "Defensemen",
      color: 'panel-success',
      stats: [
        { id: 'defensemanGoals', name: 'Goals', max: 5, default: 2 },
        { id: 'defensemanAssists', name: 'Assists', max: 5, default: 2 }
      ]
    },
    {
      name: "Goalies",
      color: 'panel-warning',
      stats: [
        { id: 'goalieWins', name: 'Wins', max: 5, default: 3 },
        { id: 'goalieOTLosses', name: 'OT Losses', max: 5, default: 1 },
        { id: 'goalieShootoutLosses', name: 'Shootout losses', max: 5, default: 1 },
        { id: 'goalieShutouts', name: 'Shutouts', max: 5, default: 2 },
        { id: 'goalieGoals', name: 'Goals', max: 10, default: 10 },
        { id: 'goalieAssists', name: 'Assists', max: 10, default: 5 }
      ]
    }
  ]
}
