const React = require('react');
const TileExpandedSizeView = require('../components/TileExpandedSizeView');
const SubcardDialogFinance = require('../components/SubcardDialogFinance');
const SubcardDialogItinerary = require('../components/SubcardDialogItinerary');
const SubcardDialogNotes = require('../components/SubcardDialogNotes');
const styles = require('../styles');
const utils = require('../utils');
const dialogNames = require('../config/dialogNames');
const _ = require('lodash');
const PropTypes = React.PropTypes;

const TileExpandedSize = React.createClass({
    propTypes: {
        editorTilesModel: PropTypes.object.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
    },
    getInitialState() {
        return {
            currentDialogName: dialogNames.NONE,
            tileId: this.props.editorTilesModel._id,
            closingDialog: true,
        };
    },
    _handleOpenDialog(dialogName) {
        utils.assert(_.includes(dialogNames, dialogName), `unrecognized dialogName: ${dialogName}`);
        if (dialogName in dialogNames) {
            this.setState({
                currentDialogName: dialogName,
                closingDialog: false,
            });
        }
    },
    _handleCloseDialog() {
        this.setState({
            currentDialogName: dialogNames.NONE,
            closingDialog: true,
        });
    },
    render() {
        return (
            <div style={styles.traveltileExpandedSizeStyle}>
                <TileExpandedSizeView
                    editorTilesModel={this.props.editorTilesModel}
                    isBrowserVersion={this.props.isBrowserVersion}
                    onOpenDialog={this._handleOpenDialog}
                />
                {this.state.currentDialogName === dialogNames.FINANCES &&
                    <SubcardDialogFinance
                        editorTilesModel={this.props.editorTilesModel}
                        isBrowserVersion={this.props.isBrowserVersion}
                        onCloseDialog={this._handleCloseDialog}
                    />
                }
                {this.state.currentDialogName === dialogNames.ITINERARY &&
                    <SubcardDialogItinerary
                        editorTilesModel={this.props.editorTilesModel}
                        isBrowserVersion={this.props.isBrowserVersion}
                        onCloseDialog={this._handleCloseDialog}
                    />
                }
                {this.state.currentDialogName === dialogNames.NOTES &&
                    <SubcardDialogNotes
                        editorTilesModel={this.props.editorTilesModel}
                        isBrowserVersion={this.props.isBrowserVersion}
                        onCloseDialog={this._handleCloseDialog}
                    />
                }
            </div>
        );
    },
});

module.exports = TileExpandedSize;
