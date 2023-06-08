let env = require('dotenv').config({ path: `.env.local`, override: true });
if (!env.parsed) {
    env = require('dotenv').config({ path: `.env` });
}

const { API_KEY, API_HOST } = process.env;

const leagueExtractor = require('./data/leagues');
const teamExtractor = require('./data/teams');
const playerExtractor = require('./data/players');

leagueExtractor(API_KEY, API_HOST).then(() => {
    teamExtractor(API_KEY, API_HOST).then(() => {
        playerExtractor(API_KEY, API_HOST);
    });
});
