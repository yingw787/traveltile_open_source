const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const injectTapEventPlugin = require('react-tap-event-plugin');

const MaterialUIThemeApplicationWrapper = require('../components/MaterialUIThemeApplicationWrapper');
const HomePageWindow = require('../components/HomePageWindow');
const EditorWindow = require('../components/EditorWindow');
const BrowserWindow = require('../components/BrowserWindow');
const BrowserTilesModel = require('../models/BrowserTilesModel');
const EditorTilesModel = require('../models/EditorTilesModel');

injectTapEventPlugin();
const browserTilesModel = new BrowserTilesModel();
const editorTilesModel = new EditorTilesModel();

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={MaterialUIThemeApplicationWrapper}>
            <IndexRoute component={HomePageWindow} />
            <Route path="browse" header="Browse" component={BrowserWindow} browserTilesModel={browserTilesModel}/>
            <Route path="/editor" header="Edit" component={EditorWindow} editorTilesModel={editorTilesModel}/>
        </Route>
    </Router>
);

module.exports = routes;
