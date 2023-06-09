const fs = require('fs');
const glob = require('glob');

const byId = (id) => {
    const [file] = glob.globSync(`**/leagues/*/teams/*/players/${id}/${id}.json`);
    const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8'}));

    return data;
}

const byLeague = (league) => {
    const files = glob.globSync(`**/leagues/${league}/teams/*/players/*/*.json`);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    }).sort((a, b) => { return a.team.id - b.team.id });
}

const byTeam = (team) => {
    const files = glob.globSync(`**/leagues/*/teams/${team}/players/*/*.json`);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    }).sort((a, b) => { return a.player.id - b.player.id });
}

const byCountry = (country) => {
    const files = glob.globSync(`**/players/*/*.json`);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    }).filter(({ player }) => {
        return player.nationality === country;
    }).sort((a, b) => { return a.player.id - b.player.id });
}

const byQuery = (query) => {
    const { league, team, country } = query;
    const files = glob.globSync(`**/leagues/${league || '*'}/teams/${team || '*'}/players/*/*.json`);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    }).filter(({ player }) => {
        return country ? player.nationality === country : true;
    }).sort((a, b) => { return a.team.id - b.team.id });
}

const all = () => {
    const files = glob.globSync(`**/leagues/*/teams/*/players/*/*.json`);
    return files.map((file) => {
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    }).sort((a, b) => { return a.team.id - b.team.id });
}

module.exports = {
    byId,
    byLeague,
    byTeam,
    byCountry,
    byQuery,
    all
}