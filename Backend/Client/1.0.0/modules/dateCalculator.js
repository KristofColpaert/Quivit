var dateCalculator = (function(){
    'use strict';

    //Functions
    var addMonths = function(date, value) {
        var now = date.getDate();
        date.setDate(1);
        date.setMonth(date.getMonth() + value);
        date.setDate(Math.min(now, getDaysInMonth(date.getFullYear(), date.getMonth())));
        return date;
    };

    var getDaysInMonth = function(year, month) {
        return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };

    var isLeapYear = function(year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    };

    //Return
    return {
        addMonths : addMonths
    }
})();

module.exports = dateCalculator;