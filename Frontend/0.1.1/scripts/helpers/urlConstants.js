var constants = {
    baseApiUrl : 'http://localhost:3000/api/',
    baseApiTeamUrl : 'http://localhost:3000/api/team/',
    baseApiPlayerUrl : 'http://localhost:3000/api/player/',
    baseApiGameUrl : 'http://localhost:3000/api/game/',
    baseApiGameTodayUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1)
        + '/' + ((new Date().getDate() < 10) ? ('0' + new Date().getDate()) : (new Date().getDate()))  + '/excluded',
    baseApiGamePastUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear()
        + '/' + ((new Date().getMonth() < 9) ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth()))
        + '/' + ((new Date().getDate() < 10) ? ('0' + new Date().getDate()) : (new Date().getDate()))  + '/past',
    baseApiEstimoteLocationUrl : 'http://localhost:3000/api/estimoteLocation/',
    baseApiUserUrl : 'http://localhost:3000/api/user/',
    baseApiPlayerPositionUrl : 'http://localhost:3000/api/playerPosition/',
    socketsUrl : 'http://localhost:3000',
    authenticationUrl : 'http://localhost:3000/authenticate',
    gameImageUrl : 'http://localhost:3000/images/game.png'
};

module.exports = constants;