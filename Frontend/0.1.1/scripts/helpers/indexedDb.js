var indexedDb = (function() {
    'use strict';

    //Variables
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var db;

    //Functions
    var init = function() {
        if(!indexedDB) {
            window.alert('Your browser doesn\'t support an offline mode.');
        }

        else {
            var request = indexedDB.open('Quivit', 4);
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

    var add = function(collection, data, callback) {
        var transaction = db.transaction(['games', 'teams', 'playerPositions', 'estimoteLocations'], 'readwrite');
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

    //Return
    return {
        init : init,
        add : add
    };
})();

module.exports = indexedDb;