'use strict';

const promise = require('bluebird');

const options = {
    promiseLib: promise,
};

const pgp = require('pg-promise')(options);
const applicationConfig = require('./config/applicationConfig');
const connectionString = applicationConfig.postgresDatabaseURL;
const db = pgp(connectionString);
const PS = require('pg-promise').PreparedStatement;
const _ = require('lodash');
const assert = require('assert');

module.exports = {
    getAllEntriesFromTable: function(tableName, done) {
        assert(_.isString(tableName));
        assert(_.isFunction(done));
        db.any('SELECT * FROM $1~', tableName)
            .then(function(data) {
                done(null, data);
            })
            .catch(function(err) {
                return done(err);
            });
    },
    getEntriesFromTable: function(tableName, id, done) {
        assert(_.isString(tableName));
        assert(_.isNumber(id));
        assert(_.isFunction(done));
        const idOrTileId = tableName === 'tile' ? 'id' : 'tileid';
        db.many('SELECT * FROM $1~ WHERE $2~ = $3', [tableName, idOrTileId, id])
            .then(function(data) {
                done(null, data);
            })
            .catch(function(err) {
                return done(err);
            });
    },
    insertEntryIntoTable: function(tableName, params, entryObj, done) {
        assert(_.isString(tableName));
        assert(_.isArray(params));
        // TODO: do assertion test for entryObj (but change in routes/index.js to be something other than req.body)
        assert(_.isFunction(done));
        const idOrTileId = tableName === 'tile' ? 'id' : 'tileId';
        let queryString = 'INSERT INTO ' + tableName + '(';
        for (let j = 0; j < params.length - 1; j++) {
            queryString += params[j] + ',';
        }
        queryString += params[params.length - 1];
        queryString += ')';
        queryString += 'VALUES(';
        for (let k = 0; k < params.length - 1; k++) {
            queryString += '${' + params[k] + '}, ';
        }
        queryString += '${' + params[params.length - 1] + '}) RETURNING ' + idOrTileId;

        // TODO: Sanitize inputs for insertEntryIntoTable

        db.any(queryString, entryObj) // TODO: db.any seems to be a bit loose; maybe db.one?
            .then(function(data) {
                done(null, data);
            })
            .catch(function(err) {
                return done(err);
            });
    },
    updateEntryInTable: function(tableName, params, paramValues, done) {
        assert(_.isString(tableName));
        assert(_.isArray(params));
        assert(_.isArray(paramValues));
        assert(_.isFunction(done));
        let queryString = 'UPDATE ' + tableName + ' SET ';
        for (let i = 0; i < params.length - 1; i++) {
            queryString += params[i] + '=$' + (i + 1) + ', ';
        }
        queryString = queryString.substring(0, queryString.length - 2);
        queryString += ' WHERE ' + params[params.length - 1] + '=$' + (params.length);

        // TODO: STILL VULNERABLE TO SQL INJECTION: http://stackoverflow.com/questions/1582161/how-does-a-preparedstatement-avoid-or-prevent-sql-injection, https://github.com/vitaly-t/pg-promise/wiki/Common-Mistakes#invalid-query-formatting-with-manual-string-concatenation-and-es6-template-strings
        // TODO: NEED TO FIGURE OUT A WAY TO BUILD QUERY WITHOUT STRING CONCATENATION
        db.none(queryString, paramValues)
            .then(function() {
                done();
            })
            .catch(function(err) {
                return done(err);
            });
    },
    deleteEntryInTable: function(tableName, paramID, paramIDValue, done) {
        assert(_.isString(tableName));
        assert(_.isString(paramID));
        assert(_.isNumber(paramIDValue));
        assert(_.isFunction(done));
        db.result('DELETE FROM $1~ WHERE $2~ = $3', [tableName, paramID, paramIDValue])
            .then(function(result) {
                done(null, result);
            })
            .catch(function(err) {
                return done(err);
            });
    },
};
