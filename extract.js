let env = require('dotenv').config({ path: `.env.local`, override: true });
if (!env.parsed) {
    env = require('dotenv').config({ path: `.env` });
}

const { API_KEY, API_HOST } = process.env;

const { db } = require('./utils');

db.createLeagues(API_KEY, API_HOST).then(() => {
    db.createTeams(API_KEY, API_HOST).then(() => {
        db.createPlayers(API_KEY, API_HOST);
    });
});
