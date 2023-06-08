const fs = require('fs');
const buildFilePathFromArgs = require('./buildFilePathFromArgs');

const createFile = (args, fileName, content) => {
    const filePath = buildFilePathFromArgs(args);
    fs.mkdirSync(filePath, { recursive: true });
    fs.writeFileSync(`${filePath}/${fileName}.json`, JSON.stringify(content, null, 3), { encoding: 'utf-8' });
}

module.exports = createFile;