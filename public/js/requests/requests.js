const $ = require('jquery');

// TODO: figure out why it is returning (functionName) is not a function error for class methods.
class requests {
    _getTileByIdAsync(tileId) {
        const request = $.ajax({
            type: 'GET',
            url: '/api/tiles/' + tileId,
        });
        return request;
    }
    _getFinanceDataByIdAsync(tileId) {
        const request = $.ajax({
            type: 'GET',
            url: '/api/finances/' + tileId,
        });
        return request;
    }
}

module.exports = requests;
