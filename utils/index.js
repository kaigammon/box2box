const getData = require('./api/getData');
const buildFilePathFromArgs = require('./io/buildFilePathFromArgs');
const createFile = require('./io/createFile');
const directoryIsEmpty = require('./io/directoryIsEmpty');
const fileExists = require('./io/fileExists');
const getDirectories = require('./io/getDirectories');
const createLeagues = require('./db/leagues');
const createTeams = require('./db/teams');
const createPlayers = require('./db/players');

module.exports = {
    api: {
        getData
    },
    io: {
        buildFilePathFromArgs,
        createFile,
        directoryIsEmpty,
        fileExists,
        getDirectories
    },
    db: {
        createLeagues,
        createTeams,
        createPlayers,
    }
}