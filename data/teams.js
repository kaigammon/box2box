const getData = require("../utils/getData");
const createFile = require("../utils/io/createFile");
const getDirectories = require("../utils/io/getDirectories");
const directoryIsEmpty = require("../utils/io/directoryIsEmpty");
const path = require("path");

const populateTeamsForLeague = async (apiKey, apiHost, league) => {
  console.log(`populating teams for league ${league}`);
  if (directoryIsEmpty({ league }, 'teams')) {
    const { response } = await getData("teams", apiKey, apiHost, "GET", {
      league,
    });

    if (!response.length) {
      throw new Error("No records found");
    }

    for (let i = 0; i < response.length; i++) {
      const { team } = response[i];
      const teamId = team.id;

      createFile({ league, team: teamId }, teamId, { team });
    }
  }
};

const populateTeams = async (apiKey, apiHost) => {
  const leagues = getDirectories(path.join(__dirname, "/leagues"));
  for (let i = 0; i < leagues.length; i++) {
    const league = leagues[i];
    await populateTeamsForLeague(apiKey, apiHost, league);
  }
};

module.exports = populateTeams;
