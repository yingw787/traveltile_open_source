const React = require('react');
const PropTypes = React.PropTypes;

import {Dialog, FlatButton} from 'material-ui';

const DeleteTileAlert = React.createClass({
    propTypes: {
        onCloseDialog: PropTypes.func.isRequired,
        onDeleteTile: PropTypes.func.isRequired,
    },
    render() {
        const actions = ([
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.onCloseDialog}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.props.onDeleteTile}
            />,
        ]);
        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={true}
                    onRequestClose={this.props.onCloseDialog}>
                    Delete Traveltile Forever?
                </Dialog>
            </div>
        );
    },

});

module.exports = DeleteTileAlert;
