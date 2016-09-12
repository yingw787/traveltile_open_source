const React = require('react');
const PropTypes = React.PropTypes;
const styles = require('../styles');

import {Dialog, FlatButton} from 'material-ui';

const SubcardDialogWrapper = React.createClass({
    propTypes: {
        onCloseDialog: PropTypes.func.isRequired,
        onUpdateAction: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
    },
    render() {
        const isBrowserVersion = this.props.isBrowserVersion;
        let actions;
        if (isBrowserVersion) {
            actions = (
                <FlatButton
                    label="Close"
                    primary={true}
                    onTouchTap={this.props.onCloseDialog}
                />);
        } else {
            actions = ([
                <FlatButton
                    label="Cancel"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.props.onCloseDialog}
                />,
                <FlatButton
                    label="Update"
                    primary={true}
                    onTouchTap={this.props.onUpdateAction}
                />,
            ]);
        }
        return (
            <div>
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={true}
                    autoScrollBodyContent={true}
                    bodyStyle={styles.traveltileSubcardDialogBodyStyle}
                    autoDetectWindowHeight={true}
                    onRequestClose={this.props.onCloseDialog}>
                    {this.props.children}
                </Dialog>
            </div>
        );
    },

});

module.exports = SubcardDialogWrapper;
