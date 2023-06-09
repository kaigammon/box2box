const fs = require('fs');
const buildFilePathFromArgs = require('./buildFilePathFromArgs');

const fileExists = (args, fileName) => {
    const filePath = buildFilePathFromArgs({ ...args, fileName });
    return fs.existsSync(filePath);
}

module.exports = fileExists;