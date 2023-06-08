const fs = require('fs');
const buildFilePathFromArgs = require('./buildFilePathFromArgs');

const directoryIsEmpty = (args, folder) => {
    const filePath = buildFilePathFromArgs(args);
    if (!fs.existsSync(`${filePath}/${folder}`)) {
        fs.mkdirSync(`${filePath}/${folder}`, { recursive: true });
    } 

    const files = fs.readdirSync(`${filePath}/${folder}`);
    return !files.length;
}

module.exports = directoryIsEmpty;