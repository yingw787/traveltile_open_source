const ReactDOM = require('react-dom');
const routes = require('./config/routes');

ReactDOM.render(
  routes,
  document.getElementsByClassName('app')[0]
);
