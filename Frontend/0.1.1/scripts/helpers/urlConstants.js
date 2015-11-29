var constants = {
    baseApiUrl : 'http://localhost:3000/api/',
    baseApiTeamUrl : 'http://localhost:3000/api/team/',
    baseApiPlayerUrl : 'http://localhost:3000/api/player/',
    baseApiGameUrl : 'http://localhost:3000/api/game/',
    baseApiGameTodayUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate(),

    serverPrefix : 'NMCTBackFront/Frontend/0.1.1/public/#'
}

module.exports = constants;