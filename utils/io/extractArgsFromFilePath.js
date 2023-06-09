const extractArgsFromFilePath = (filePath) => {
    const args = {};
    if (!filePath) {
        return args;
    }

    const parts = filePath.split('/');
    parts.forEach((part, i) => {
        switch(part) {
            case 'leagues': {
                args.league = parts[i+1];
            }
            case 'teams': {
                args.team = parts[i+1];
            }
            case 'players': {
                args.player = parts[i+1];
            }
        }
    });

    return args;
}

module.exports = extractArgsFromFilePath;