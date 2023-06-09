let env = require('dotenv').config({ path: `.env.local`, override: true });
if (!env.parsed) {
    env = require('dotenv').config({ path: `.env` });
}

const { API_KEY, API_HOST } = process.env;

const db = require('./utils/db');

db.create.leagues(API_KEY, API_HOST).then(() => {
    db.create.teams(API_KEY, API_HOST).then(() => {
        db.create.players(API_KEY, API_HOST);
    });
});
