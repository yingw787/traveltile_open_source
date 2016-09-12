const $ = require('jquery');

class BrowserTilesModel {
    constructor() {
        this._isLoading = true;
        this._tiles = undefined;
    }
    _getAllTilesAsync() {
        const request = $.ajax({
            type: 'GET',
            url: '/api/tiles',
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
    _getPhotosByIdAsync(tileId) {
        const request = $.ajax({
            type: 'GET',
            url: '/api/photos/' + tileId,
        });
        return request;
    }
    _getGMapsDataByIdAsync(tileId) {
        const request = $.ajax({
            type: 'GET',
            url: '/api/gmaps/' + tileId,
        });
        return request;
    }
    _deleteTileFromDatabaseByIdAsync(tileId) {
        const request = $.ajax({
            type: 'DELETE',
            url: '/api/tiles/' + tileId,
            success: function() {
                $.ajax({
                    type: 'DELETE',
                    url: '/api/finances/' + tileId,
                });
            },
        });
        return request;
    }
}

module.exports = BrowserTilesModel;
