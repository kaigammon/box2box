const fs = require('fs');
const glob = require('glob');

const byId = (id) => {
    const [file] = glob.globSync(`**/leagues/*/teams/${id}/${id}.json`);
    const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8'}));

    return data;
}

const byLeague = (league) => {
    const files = glob.globSync(`**/leagues/${league}/teams/*/*.json`);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    }).sort((a, b) => { return a.team.id - b.team.id });
}

const all = () => {
    const files = glob.globSync(`**/leagues/*/teams/*/*.json`);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    }).sort((a, b) => { return a.team.id - b.team.id });
}

module.exports = {
    byId,
    byLeague,
    all
}