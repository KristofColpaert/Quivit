var indexedDb = (function() {
    'use strict';

    //Variables
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var indexedDBVersion = 6;
    var db;

    //Functions
    var initialize = function() {
        if(!indexedDB) {
            window.alert('Your browser doesn\'t support an offline mode.');
        }

        else {
            var request = indexedDB.open('Quivit', indexedDBVersion);

            request.onsuccess = function(event) {
                db = event.target.result;
            }

            request.onupgradeneeded = function(event) {
                db = event.target.result;

                if(!db.objectStoreNames.contains('games')) {
                    db.createObjectStore('games');
                }

                if(!db.objectStoreNames.contains('teams')) {
                    db.createObjectStore('teams');
                }

                if(!db.objectStoreNames.contains('players')) {
                    db.createObjectStore('players');
                }

                if(!db.objectStoreNames.contains('playerPositions')) {
                    db.createObjectStore('playerPositions');
                }

                if(!db.objectStoreNames.contains('estimoteLocations')) {
                    db.createObjectStore('estimoteLocations');
                }
            }

            request.onerror = function(event) {
                window.alert('Your browser doesn\'t support an offline mode.');
            }
        }
    };

    var init = function(callback) {
        if(!indexedDB) {
            window.alert('Your browser doesn\'t support an offline mode.');
        }

        else {
            var request = indexedDB.open('Quivit', indexedDBVersion);

            request.onsuccess = function(event) {
                callback(event.target.result);
            }

            request.onupgradeneeded = function(event) {
                var db = event.target.result;

                if(!db.objectStoreNames.contains('games')) {
                    db.createObjectStore('games');
                }

                if(!db.objectStoreNames.contains('teams')) {
                    db.createObjectStore('teams');
                }

                if(!db.objectStoreNames.contains('playerPositions')) {
                    db.createObjectStore('playerPositions');
                }

                if(!db.objectStoreNames.contains('estimoteLocations')) {
                    db.createObjectStore('estimoteLocations');
                }

                callback(db);
            }

            request.onerror = function(event) {
                window.alert('Your browser doesn\'t support an offline mode.');
            }
        }
    };

    var add = function(collection, data, callback) {
        var transaction = db.transaction(['games', 'teams', 'players', 'playerPositions', 'estimoteLocations'], 'readwrite');
        var store = transaction.objectStore(collection);
        var request = store.add(data, data._id);

        request.onerror = function(event) {
            if(event.target.error.name == 'ConstraintError') {
                callback('success');
            }
            else {
                alert('Quivit failed to synchronize the offline data.');
            }
        }

        request.onsuccess = function(event) {
            callback('success');
        };
    };

    var get = function(collection, callback) {
        init(function(db) {
            var transaction = db.transaction(['games', 'teams', 'players', 'playerPositions', 'estimoteLocations'], 'readonly');
            var store = transaction.objectStore(collection);
            var cursor = store.openCursor();
            var data = [];

            cursor.onerror = function(event) {
                alert('Quivit failed to synchronize the offline data.');
            }

            cursor.onsuccess = function(event) {
                var result = event.target.result;
                if(result) {
                    data.push(result.value);
                    result.continue();
                }

                else {
                    callback(data);
                }
            }
        });
    };

    var getByKey = function(collection, key, callback) {
        init(function(db) {
            var transaction = db.transaction(['games', 'teams', 'players', 'playerPositions', 'estimoteLocations'], 'readonly');
            var store = transaction.objectStore(collection);
            var cursor = store.openCursor();
            var data = [];

            cursor.onerror = function(event) {
                alert('Quivit failed to synchronize the offline data.');
            }

            cursor.onsuccess = function(event) {
                var result = event.target.result;
                if(result) {
                    if(result.key === key) {
                        data.push(result.value);
                        callback(data);
                    }
                    else {
                        result.continue();
                    }
                }
            }
        });
    };

    //Return
    return {
        initialize : initialize,
        add : add,
        get : get,
        getByKey : getByKey
    };
})();

module.exports = indexedDb;