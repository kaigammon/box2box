const getData = require('../utils/getData');
const { leagues } = require('./config.json');
const createFile = require('../utils/io/createFile');
const fileExists = require('../utils/io/fileExists');

const populateLeagues = async (apiKey, apiHost) => {
    console.log(`populating leagues`);
    for (let i = 0; i < Object.keys(leagues).length; i++) {
        const id = Object.keys(leagues)[i];
        if (!fileExists({ league: id }, id)) {
            const { response } = await getData('leagues', apiKey, apiHost, 'GET', { id });
    
            if (!response.length) {
                throw new Error('No records found')
            }
    
            const { league, country } = response[0];
            createFile({ league: id }, id, { league, country });
        } else {
            console.warn(`League ID ${id} data already exists - skipping`);
        }
    }
};

module.exports = populateLeagues;