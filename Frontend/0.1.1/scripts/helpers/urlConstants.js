var constants = {
    baseApiUrl : 'http://localhost:3000/api/',
    baseApiTeamUrl : 'http://localhost:3000/api/team/',
    baseApiPlayerUrl : 'http://localhost:3000/api/player/',
    baseApiGameUrl : 'http://localhost:3000/api/game/',
    baseApiGameTodayUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1)
        + '/' + ((new Date().getDate() < 10) ? ('0' + new Date().getDate()) : (new Date().getDate()))  + '/excluded',
    baseApiGamePastUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1)
    + '/' + ((new Date().getDate() < 10) ? ('0' + new Date().getDate()) : (new Date().getDate()))  + '/past',
    socketsUrl : 'http://localhost:3000',
    baseApiEstimoteLocationUrl : 'http://localhost:3000/api/estimoteLocation/'
}

module.exports = constants;