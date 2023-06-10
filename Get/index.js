const db = require('../utils/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const league = (req.query.league || (req.body && req.body.league));
    const team = (req.query.team || (req.body && req.body.team));
    const player = (req.query.player || (req.body && req.body.player));
    const country = (req.query.country || (req.body && req.body.country));

    const retrievedPlayers = db.get.players.byQuery({ league, team, player, country }, context);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: retrievedPlayers,
    };
}