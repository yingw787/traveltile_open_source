const React = require('react');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function MaterialUIThemeApplicationWrapper(props) {
    return (
        <MuiThemeProvider>
            {props.children}
        </MuiThemeProvider>
    );
}

module.exports = MaterialUIThemeApplicationWrapper;
