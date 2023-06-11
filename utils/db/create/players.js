const api = require('../../api');
const io = require('../../io');
const path = require("path");
const glob = require('glob');
const config = require('../config.json');
const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const http = rateLimit(axios.create(), { ...config.rateLimit });

const populatePlayer = async (apiKey, apiHost, id, force) => {
  const path = glob.globSync(`**/leagues/*/teams/*/players/${id}/${id}.json`);
  const { league, team } = io.extractArgsFromFilePath(path);
  console.log(`populating player ${id}`);
  if (force || !io.fileExists(args, id)) {
    const { response } = await api.getData(http, "players", apiKey, apiHost, "GET", {
      id,
    });

    if (!response.length) {
      throw new Error("No records found");
    }

    for (let i = 0; i < response.length; i++) {
      const { player } = response[i];
      const playerId = player.id;

      // const { response: transferResponse } = await api.getData(http, "transfers", apiKey, apiHost, "GET", { player: playerId });
      // if (transferResponse.length) {
      //   const { transfers } = transferResponse[0];
      //   player.transfers = transfers;
      // }

      io.createFile({ league, team, player: playerId }, playerId, { player });
    }
  }
}

const populatePlayersForTeam = async (apiKey, apiHost, league, team, force = false) => {
  console.log(`populating players for team ${team}`);
  if (force || io.directoryIsEmpty({ league, team }, 'players')) {
    const { response } = await api.getData(http, "players", apiKey, apiHost, "GET", {
      team,
    });

    if (!response.length) {
      throw new Error("No records found");
    }

    for (let i = 0; i < response.length; i++) {
      const { player } = response[i];
      const playerId = player.id;

      // const { response: transferResponse } = await api.getData(http, "transfers", apiKey, apiHost, "GET", { player: playerId });
      // if (transferResponse.length) {
      //   const { transfers } = transferResponse[0];
      //   player.transfers = transfers;
      // }

      io.createFile({ league, team, player: playerId }, playerId, { player });
    }
  } else {
    console.warn(`data already exists for players for team ${team} in league ${league} - skipping`)
  }
};

const populatePlayers = async (apiKey, apiHost, args) => {
  if (args.player) {
    await populatePlayer(apiKey, apiHost, args.player, args.force);
  } else if (args.team) {
    const leaguePath = glob.globSync(`**/leagues/*/teams/${args.team}/${args.team}.json`);
    const { league } = io.extractArgsFromFilePath(leaguePath);
    await populatePlayersForTeam(apiKey, apiHost, league, args.team, args.force);
  } else if (args.league) {
    const teams = io.getDirectories(`./db/leagues/${args.league}/teams`);
    for (let j = 0; j < teams.length; j++) {
        const team = teams[j];
        await populatePlayersForTeam(apiKey, apiHost, args.league, team, args.force);
    }
  } else {
    const leagues = io.getDirectories(path.join(__dirname, "/leagues"));
    for (let i = 0; i < leagues.length; i++) {
      const league = leagues[i];
      const teams = io.getDirectories(path.join(__dirname, `/leagues/${league}/teams`));
      for (let j = 0; j < teams.length; j++) {
          const team = teams[j];
          await populatePlayersForTeam(apiKey, apiHost, league, team, args.force);
      }
    }
  }
};

module.exports = populatePlayers;
