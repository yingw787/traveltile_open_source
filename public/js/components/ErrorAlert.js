const React = require('react');
const PropTypes = React.PropTypes;

import {Dialog, FlatButton} from 'material-ui';

const ErrorAlert = React.createClass({
    propTypes: {
        onCloseDialog: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
    },
    render() {
        const actions = ([
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.onCloseDialog}
            />,
        ]);
        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={true}
                    onRequestClose={this.props.onCloseDialog}>
                    {this.props.text}
                </Dialog>
            </div>
        );
    },

});

module.exports = ErrorAlert;
