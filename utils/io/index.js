const buildFilePathFromArgs = require('./buildFilePathFromArgs');
const createFile = require('./createFile');
const directoryIsEmpty = require('./directoryIsEmpty');
const fileExists = require('./fileExists');
const getDirectories = require('./getDirectories');
const extractArgsFromFilePath = require('./extractArgsFromFilePath');

module.exports = {
    buildFilePathFromArgs,
    createFile,
    directoryIsEmpty,
    fileExists,
    getDirectories,
    extractArgsFromFilePath,
}