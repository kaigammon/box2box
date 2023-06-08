const { getData, io } = require("../utils");
const path = require("path");

const populateTeamsForLeague = async (apiKey, apiHost, league) => {
  console.log(`populating teams for league ${league}`);
  if (io.directoryIsEmpty({ league }, 'teams')) {
    const { response } = await getData("teams", apiKey, apiHost, "GET", {
      league,
    });

    if (!response.length) {
      throw new Error("No records found");
    }

    for (let i = 0; i < response.length; i++) {
      const { team } = response[i];
      const teamId = team.id;

      io.createFile({ league, team: teamId }, teamId, { team });
    }
  } else {
    console.warn(`data already exists for teams in league ${league} - skipping`)
  }
};

const populateTeams = async (apiKey, apiHost) => {
  const leagues = io.getDirectories(path.join(__dirname, "/leagues"));
  for (let i = 0; i < leagues.length; i++) {
    const league = leagues[i];
    await populateTeamsForLeague(apiKey, apiHost, league);
  }
};

module.exports = populateTeams;
