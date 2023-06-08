const buildFilePathFromArgs = (args) => {
    const { league, team, player, fileName } = args;
    let filePath = `./data`;

    if (league) {
        filePath = `${filePath}/leagues/${league}`;
        if (team) {
            filePath = `${filePath}/teams/${team}`;
            if (player) {
                filePath = `${filePath}/players/${player}`;
            }
        }
    } else {
        throw new Error(`Invalid args: ${JSON.stringify(args)}`);
    }

    if (fileName) {
        filePath = `${filePath}/${fileName}.json`
    }

    return filePath;
}

module.exports = buildFilePathFromArgs;