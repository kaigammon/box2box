const api = require('../../api');
const io = require('../../io');
const { leagues } = require('../config.json');

const populateLeague = async (apiKey, apiHost, id) => {
    if (!io.fileExists({ league: id }, id)) {
        const { response } = await api.getData('leagues', apiKey, apiHost, 'GET', { id });

        if (!response.length) {
            throw new Error('No records found')
        }

        const { league, country } = response[0];
        io.createFile({ league: id }, id, { league, country });
    } else {
        console.warn(`data already exists for league ${id} - skipping`);
    }
}

const populateLeagues = async (apiKey, apiHost, args) => {
    if (args.league) {
        await populateLeague(apiKey, apiHost, args.league);
    } else {
        for (let i = 0; i < Object.keys(leagues).length; i++) {
            const id = Object.keys(leagues)[i];
            await populateLeague(apiKey, apiHost, id);
        }
    }
};

module.exports = populateLeagues;