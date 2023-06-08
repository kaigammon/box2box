const getData = require('./getData');
const buildFilePathFromArgs = require('./io/buildFilePathFromArgs');
const createFile = require('./io/createFile');
const directoryIsEmpty = require('./io/directoryIsEmpty');
const fileExists = require('./io/fileExists');
const getDirectories = require('./io/getDirectories');

module.exports = {
    getData,
    io: {
        buildFilePathFromArgs,
        createFile,
        directoryIsEmpty,
        fileExists,
        getDirectories
    },
}