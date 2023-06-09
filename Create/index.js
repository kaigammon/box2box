require('dotenv').config();
const db = require('../utils/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const { API_KEY, API_HOST } = process.env;

    const leagues = (req.query.leagues || (req.body && req.body.leagues));
    const teams = (req.query.teams || (req.body && req.body.teams));
    const players = (req.query.players || (req.body && req.body.players));

    if (leagues) {
        await db.create.leagues(API_KEY, API_HOST);
    }
    if (teams) {
        await db.create.teams(API_KEY, API_HOST);
    }
    if (players) {
        await db.create.players(API_KEY, API_HOST);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: retrievedPlayers,
    };
}