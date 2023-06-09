const fs = require('fs');
const io = require('../../io');
const leagues = require('./leagues');
const glob = require('glob');

const byId = (id) => {
    const [file] = glob.globSync(`**/leagues/*/teams/${id}/${id}.json`);
    const { league } = io.extractArgsFromFilePath(file);
    return {
        team: JSON.parse(fs.readFileSync(file, { encoding: 'utf-8'})).team,
        league: leagues.byId(league).league,
    }
}

const byLeague = (league) => {
    const files = glob.globSync(`**/leagues/${league}/teams/*/*.json`);
    return files.map((file) => {
        const { team } = io.extractArgsFromFilePath(file);
        return byId(team);
    }).sort((a, b) => { return a.team.id - b.team.id });
}

const all = () => {
    const files = glob.globSync(`**/leagues/*/teams/*/*.json`);
    return files.map((file) => {
        const { team } = io.extractArgsFromFilePath(file);
        return byId(team);
    }).sort((a, b) => { return a.team.id - b.team.id });
}

module.exports = {
    byId,
    byLeague,
    all
}