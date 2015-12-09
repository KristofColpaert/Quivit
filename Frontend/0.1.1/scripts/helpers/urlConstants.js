var constants = {
    baseApiUrl : 'https://desolate-harbor-8851.herokuapp.com/api/',
    baseApiTeamUrl : 'https://desolate-harbor-8851.herokuapp.com/api/team/',
    baseApiPlayerUrl : 'https://desolate-harbor-8851.herokuapp.com/api/player/',
    baseApiGameUrl : 'https://desolate-harbor-8851.herokuapp.com/api/game/',
    baseApiGameTodayUrl : 'https://desolate-harbor-8851.herokuapp.com/api/game/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1)
        + '/' + ((new Date().getDate() < 10) ? ('0' + new Date().getDate()) : (new Date().getDate()))  + '/excluded',
    socketsUrl : 'https://desolate-harbor-8851.herokuapp.com'
}

module.exports = constants;