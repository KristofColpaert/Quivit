var constants = {
    baseApiUrl : 'http://localhost:3000/api/',
    baseApiTeamUrl : 'http://localhost:3000/api/team/',
    baseApiPlayerUrl : 'http://localhost:3000/api/player/',
    baseApiGameUrl : 'http://localhost:3000/api/game/',
    baseApiGameTodayUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
}

module.exports = constants;