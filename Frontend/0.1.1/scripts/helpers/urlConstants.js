var currentMonth = function() {
    return ((new Date().getMonth() + 1) < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1));
};

var currentDate = function() {
    return ((new Date().getDate()) < 10 ? ('0' + (new Date().getDate())) : (new Date().getDate()));
};

var constants = {
    baseApiUrl : 'http://localhost:3000/api/',
    baseApiTeamUrl : 'http://localhost:3000/api/team/',
    baseApiPlayerUrl : 'http://localhost:3000/api/player/',
    baseApiGameUrl : 'http://localhost:3000/api/game/',
    baseApiGameTodayUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear()
        + '/' + currentMonth() + '/' + currentDate() + '/excluded',
    baseApiGamePastUrl : 'http://localhost:3000/api/game/' + new Date().getFullYear()
        + '/' + currentMonth() + '/' + currentDate() + '/past',
    baseApiEstimoteLocationUrl : 'http://localhost:3000/api/estimoteLocation/',
    baseApiUserUrl : 'http://localhost:3000/api/user/',
    baseApiPlayerPositionUrl : 'http://localhost:3000/api/playerPosition/',
    socketsUrl : 'http://localhost:3000',
    authenticationUrl : 'http://localhost:3000/authenticate',
    gameImageUrl : 'http://localhost:3000/images/game.png'
};

module.exports = constants;