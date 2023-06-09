const fs = require('fs');
const glob = require('glob');
const io = require('../../io');
const teams = require('./teams');
const leagues = require('./leagues');

const byId = (id) => {
    const [file] = glob.globSync(`**/leagues/*/teams/*/players/${id}/${id}.json`);
    const { league, team } = io.extractArgsFromFilePath(file);
    return {
        player: JSON.parse(fs.readFileSync(file, { encoding: 'utf-8'})).player,
        team: teams.byId(team).team,
        league: leagues.byId(league).league,
    }
}

const byLeague = (league) => {
    const files = glob.globSync(`**/leagues/${league}/teams/*/players/*/*.json`);
    return files.map((file) => {
        const { player } = io.extractArgsFromFilePath(file);
        return byId(player);
    }).sort((a, b) => { return a.player.id - b.player.id });
}

const byTeam = (team) => {
    const files = glob.globSync(`**/leagues/*/teams/${team}/players/*/*.json`);
    return files.map((file) => {
        const { player } = io.extractArgsFromFilePath(file);
        return byId(player);
    }).sort((a, b) => { return a.player.id - b.player.id });
}

const byCountry = (country) => {
    const files = glob.globSync(`**/players/*/*.json`);
    return files.map((file) => {
        const { player } = io.extractArgsFromFilePath(file);
        return byId(player);
    }).filter(({ player }) => {
        return player.nationality === country;
    }).sort((a, b) => { return a.player.id - b.player.id });
}

const byQuery = (query) => {
    const { league, team, player, country } = query;
    const globPath = `**/leagues/${league || '*'}/teams/${team || '*'}/players/${player || '*'}/${player || '*'}.json`;
    const files = glob.globSync(globPath);
    return files.map((file) => {
        const { player } = io.extractArgsFromFilePath(file);
        return byId(player);
    }).filter(({ player }) => {
        return country ? player.nationality === country : true;
    }).sort((a, b) => { return a.player.id - b.player.id });
}

const all = () => {
    const files = glob.globSync(`**/leagues/*/teams/*/players/*/*.json`);
    return files.map((file) => {
        const { player } = io.extractArgsFromFilePath(file);
        return byId(player);
    }).sort((a, b) => { return a.player.id - b.player.id });
}

module.exports = {
    byId,
    byLeague,
    byTeam,
    byCountry,
    byQuery,
    all
}