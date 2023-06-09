require('dotenv').config();
const db = require('../utils/db');

const executeCreate = async (fn, args, apiKey, apiHost) => {
    if (args === 'all') {
        await fn(apiKey, apiHost)
    } else {
        const splitArgs = args.split('|');
        for (let i = 0; i < splitArgs.length; i++) {
            await fn(apiKey, apiHost, splitArgs[i]);
        }
    }
    
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const { API_KEY, API_HOST } = process.env;

    const leagues = (req.query.leagues || (req.body && req.body.leagues));
    const teams = (req.query.teams || (req.body && req.body.teams));
    const players = (req.query.players || (req.body && req.body.players));

    if (leagues) {
        await executeCreate(db.create.leagues, leagues, API_KEY, API_HOST);
    }
    if (teams) {
        await executeCreate(db.create.teams, leagues, API_KEY, API_HOST);
    }
    if (players) {
        await executeCreate(db.create.players, leagues, API_KEY, API_HOST);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: retrievedPlayers,
    };
}