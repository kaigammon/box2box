const fs = require('fs');
const glob = require('glob');
const io = require('../../io');

const byId = (id) => {
    const [file] = glob.globSync(`**/leagues/${id}/${id}.json`);
    const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8'}));

    return data;
}

const all = () => {
    const files = glob.globSync(`**/leagues/*/*.json`);
    return files.map((file) => {
        const { league } = io.extractArgsFromFilePath(file);
        return byId(league);
    }).sort((a, b) => { return a.league.id - b.league.id });
}

module.exports = {
    byId,
    all
}