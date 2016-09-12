const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const errorHandlerMiddleware = require('./middleware/error_handler_middleware');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const isDeveloping = process.env.NODE_ENV !== 'production';
if (isDeveloping) {
    const config = require('./webpack.config.js');
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('/', function(req, res, done) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/public/js/dist/index.html')));
        res.end();
    });
} else {
    app.get('/', function(req, res, done) {
        res.sendFile(path.join(__dirname, '/public/js/dist/index.html'));
    });
}

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    errorHandlerMiddleware(err, req, res, next);
});

app.use(errorHandlerMiddleware);

module.exports = app;
