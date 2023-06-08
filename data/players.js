const getData = require("../utils/getData");
const createFile = require("../utils/io/createFile");
const getDirectories = require("../utils/io/getDirectories");
const directoryIsEmpty = require("../utils/io/directoryIsEmpty");
const path = require("path");

const populatePlayersForTeam = async (apiKey, apiHost, league, team) => {
  console.log(`populating players for team ${team}`);
  if (directoryIsEmpty({ league, team }, 'players')) {
    const { response } = await getData("players", apiKey, apiHost, "GET", {
      team,
    });

    if (!response.length) {
      throw new Error("No records found");
    }

    for (let i = 0; i < response.length; i++) {
      const { player } = response[i];
      const playerId = player.id;

      createFile({ league, team, player: playerId }, playerId, { player });
    }
  }
};

const populatePlayers = async (apiKey, apiHost) => {
  const leagues = getDirectories(path.join(__dirname, "/leagues"));
  for (let i = 0; i < 1; i++) { // leagues.length; i++) {
    const league = leagues[i];
    const teams = getDirectories(path.join(__dirname, `/leagues/${league}/teams`));
    for (let j = 0; j < 1; j++) { //teams.length; j++) {
        const team = teams[j];
        await populatePlayersForTeam(apiKey, apiHost, league, team);
    }
  }
};

module.exports = populatePlayers;
