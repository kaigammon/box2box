const { getData, io } = require('..');
const { leagues } = require('./config.json');

const populateLeagues = async (apiKey, apiHost) => {
    console.log(`populating leagues`);
    for (let i = 0; i < Object.keys(leagues).length; i++) {
        const id = Object.keys(leagues)[i];
        if (!io.fileExists({ league: id }, id)) {
            const { response } = await getData('leagues', apiKey, apiHost, 'GET', { id });
    
            if (!response.length) {
                throw new Error('No records found')
            }
    
            const { league, country } = response[0];
            io.createFile({ league: id }, id, { league, country });
        } else {
            console.warn(`data already exists for league ${id} - skipping`);
        }
    }
};

module.exports = populateLeagues;