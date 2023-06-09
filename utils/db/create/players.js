const api = require('../../api');
const io = require('../../io');
const path = require("path");

const populatePlayersForTeam = async (apiKey, apiHost, league, team) => {
  console.log(`populating players for team ${team}`);
  if (io.directoryIsEmpty({ league, team }, 'players')) {
    const { response } = await api.getData("players", apiKey, apiHost, "GET", {
      team,
    });

    if (!response.length) {
      throw new Error("No records found");
    }

    for (let i = 0; i < response.length; i++) {
      const { player } = response[i];
      const playerId = player.id;

      io.createFile({ league, team, player: playerId }, playerId, { player });
    }
  } else {
    console.warn(`data already exists for players for team ${team} in league ${league} - skipping`)
  }
};

const populatePlayers = async (apiKey, apiHost) => {
  const leagues = io.getDirectories(path.join(__dirname, "/leagues"));
  for (let i = 0; i < leagues.length; i++) {
    const league = leagues[i];
    const teams = io.getDirectories(path.join(__dirname, `/leagues/${league}/teams`));
    for (let j = 0; j < teams.length; j++) {
        const team = teams[j];
        await populatePlayersForTeam(apiKey, apiHost, league, team);
    }
  }
};

module.exports = populatePlayers;