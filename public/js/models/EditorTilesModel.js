const $ = require('jquery');
const filepickerLibrary = require('filepicker-js');

class EditorTilesModel {
    constructor() {
        this._financeData = [];
        this._itineraryDates = [];
        this._notesText = '';
        this._itineraryDatesText = '';
        this._financeText = '';
        this._imageFileURLs = [];
        this._imageFileObjects = [];
        this._gmapsLatitude = undefined,
        this._gmapsLongitude = undefined,
        this._gmapsZoom = undefined,
        this._id = undefined;
    }
    _clearAll() {
        this._financeData = {};
        this._itineraryDates = [];
        this._notesText = '';
        this._itineraryDatesText = '';
        this._financeText = '';
        this._imageFileURLs = [];
        this._imageFileObjects = [];
        this._gmapsLatitude = undefined,
        this._gmapsLongitude = undefined,
        this._gmapsZoom = undefined,
        this._id = undefined;
    }
    _handleUpdateNotesText(newNotesText) {
        this._notesText = newNotesText;
    }
    _setEditorTilesModelId(id) {
        this._id = Number(id);
    }
    _setEditorTilesModelNotesText(text) {
        this._notesText = text;
    }
    _setEditorTilesModelItineraryDates(dates) {
        this._itineraryDates = dates;
    }
    _setEditorTilesModelFinanceData(financeData) {
        this._financeData = financeData;
    }
    _setEditorTilesModelItineraryDatesText(dateText) {
        this._itineraryDatesText = dateText;
    }
    _setEditorTilesModelFinanceText(financeText) {
        this._financeText = financeText;
    }
    _setEditorTilesModelImageFileURLs(imageFileURLs) {
        this._imageFileURLs = imageFileURLs;
    }
    _setEditorTilesModelImageFileObjects(imageFileObjects) {
        this._imageFileObjects = imageFileObjects;
    }
    _setEditorTilesModelGmapsLatitude(latitude) {
        this._gmapsLatitude = latitude;
    }
    _setEditorTilesModelGmapsLongitude(longitude) {
        this._gmapsLongitude = longitude;
    }
    _setEditorTilesModelGmapsZoom(zoom) {
        this._gmapsZoom = zoom;
    }
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
    _postTileAsync(newData) {
        const request = $.ajax({
            type: 'POST',
            url: '/api/tiles/',
            data: newData,
        });
        return request;
    }
    _postFinanceDataAsync(newData) {
        const request = $.ajax({
            type: 'POST',
            url: '/api/finances/',
            data: newData,
        });
        return request;
    }
    _putTileAsync(newData, tileId) {
        const request = $.ajax({
            type: 'PUT',
            url: '/api/tiles/' + tileId,
            data: newData,
        });
        return request;
    }
    _putFinanceDataAsync(newData, id) {
        const request = $.ajax({
            type: 'PUT',
            url: '/api/finances/' + id,
            data: newData,
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
                    success: function() {
                        $.ajax({
                            type: 'DELETE',
                            url: '/api/photos/' + tileId,
                        });
                    },
                });
            },
        });
        return request;
    }
    _deletePhotosFromDatabaseByTileIdAsync(tileId) {
        const request = $.ajax({
            type: 'DELETE',
            url: '/api/photos/' + tileId,
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
    _rewritePhotoURLToDatabase(tileId, imageFileURL) {
        const photoData = 'tileId=' + tileId + '&url=' + imageFileURL;

        $.ajax({
            type: 'POST',
            url: '/api/photos/',
            data: photoData,
        });
    }
    _sendFileToFileStackAndRecordInDatabase(tileId, imageFileObject, i) {
        filepickerLibrary.setKey('YOUR FILESTACK API KEY HERE');

        filepickerLibrary.store(
            imageFileObject,
            {filename: 'traveltile-' + String(tileId) + '-' + String(i) + imageFileObject.type.substring(6)},
            function(Blob) {
                let photoData = 'tileId=' + tileId + '&url=' + Blob.url;
                $.ajax({
                    type: 'POST',
                    url: '/api/photos/',
                    data: photoData,
                });
            }
        );
    }
}

module.exports = EditorTilesModel;
