const axios = require('axios');
const config = require('../data/config.json');
const baseUrl = 'https://api-football-v1.p.rapidapi.com/v3';

const getData = async (endpoint, apiKey, apiHost, method, params, body) => {
    const options = {
        method,
        url: `${baseUrl}/${endpoint}`,
        params: {
            ...params,
            season: config.season,
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost,
        },
        body
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = getData;
