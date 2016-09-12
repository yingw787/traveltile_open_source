'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const db = require('../queries');

// Google Maps API
router.get('/api/gmaps/:tileId', function(req, res, done) {
    const tileID = _.parseInt(req.params.tileId);
    db.getEntriesFromTable('gmaps', tileID, function(err, results) {
        if (err) {done(err); return; }
        res.status(200).json(results);
    });
});

// tile table API
router.get('/api/tiles', function(req, res, done) {
    db.getAllEntriesFromTable('tile', function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.get('/api/tiles/:id', function(req, res, done) {
    const tileID = _.parseInt(req.params.id);
    db.getEntriesFromTable('tile', tileID, function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.post('/api/tiles', function(req, res, done) {
    db.insertEntryIntoTable('tile', ['notes', 'itinerary'], req.body, function(err, results) { // TODO: req.body
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.put('/api/tiles/:id', function(req, res, done) {
    const entryObj = [req.body.notes, req.body.itinerary, _.parseInt(req.params.id)];
    db.updateEntryInTable('tile', ['notes', 'itinerary', 'id'], entryObj, function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.delete('/api/tiles/:id', function(req, res, done) {
    db.deleteEntryInTable('tile', 'id', _.parseInt(req.params.id), function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

// photos table API
router.get('/api/photos', function(req, res, done) {
    db.getAllEntriesFromTable('photos', function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.get('/api/photos/:tileid', function(req, res, done) {
    const tileID = _.parseInt(req.params.tileid);
    db.getEntriesFromTable('photos', tileID, function(err, results) {
        if (err) {
            if (err.message === 'No data returned from the query.') {
                res.status(404).send();
                return;
            } else {
                done(err);
                return;
            }
        }
        res.status(200).json(results);
    });
});

router.post('/api/photos', function(req, res, done) {
    req.body.tileId = _.parseInt(req.body.tileId); // TODO: Check insertEntryIntoTable to replace with parmas not req.body
    db.insertEntryIntoTable('photos', ['tileId', 'url'], req.body, function(err, results) { // TODO
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.put('/api/photos/:id', function(req, res, done) {
    const entryObj = [_.parseInt(req.body.tileId), req.body.url, _.parseInt(req.params.id)];
    db.updateEntryInTable('photos', ['tileid', 'url', 'id'], entryObj, function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.delete('/api/photos/:tileid', function(req, res, done) {
    db.deleteEntryInTable('photos', 'tileid', _.parseInt(req.params.tileid), function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

// finances table API
router.get('/api/finances', function(req, res, done) {
    db.getAllEntriesFromTable('finances', function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.get('/api/finances/:tileid', function(req, res, done) {
    const tileID = _.parseInt(req.params.tileid);
    db.getEntriesFromTable('finances', tileID, function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.post('/api/finances', function(req, res, done) {
    req.body.tileId = _.parseInt(req.body.tileId);
    req.body.amountincents = _.parseInt(req.body.amountincents);
    db.insertEntryIntoTable('finances', ['tileId', 'categoryname', 'amountincents'], req.body, function(err, results) { // TODO
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.put('/api/finances/:id', function(req, res, done) {
    const entryObj = [_.parseInt(req.body.tileId), req.body.categoryname, _.parseInt(req.body.amountincents), _.parseInt(req.params.id)];
    db.updateEntryInTable('finances', ['tileid', 'categoryname', 'amountincents', 'id'], entryObj, function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

router.delete('/api/finances/:tileid', function(req, res, done) {
    db.deleteEntryInTable('finances', 'tileid', _.parseInt(req.params.tileid), function(err, results) {
        if (err) { done(err); return; }
        res.status(200).json(results);
    });
});

module.exports = router;
