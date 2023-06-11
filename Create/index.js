require('dotenv').config();
const db = require('../utils/db');

const { API_KEY, API_HOST } = process.env;

const executeCreate = async (fn, args, force) => {
    const { leagueIds, teamIds, playerIds } = args;
    if (!leagueIds && !teamIds && !playerIds) {
        await fn(API_KEY, API_HOST, { force })
    } else if (playerIds) {
        for (let i = 0; i < playerIds.length; i++) {
            await fn(API_KEY, API_HOST, { player: playerIds[i], force });
        }
    } else if (teamIds) {
        for (let i = 0; i < teamIds.length; i++) {
            await fn(API_KEY, API_HOST, { team: teamIds[i], force });
        }
    } else if (leagueIds) {
        for (let i = 0; i < leagueIds.length; i++) {
            await fn(API_KEY, API_HOST, { league: leagueIds[i], force });
        }
    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const { leagues, teams, players, force = false } = req.query;
    const { leagueIds, teamIds, playerIds } = req.body;

    if (leagues) {
        await executeCreate(db.create.leagues, { leagueIds }, force);
    }
    if (teams) {
        await executeCreate(db.create.teams, { leagueIds, teamIds }, force);
    }
    if (players) {
        await executeCreate(db.create.players, { leagueIds, teamIds, playerIds }, force);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: retrievedPlayers,
    };
}