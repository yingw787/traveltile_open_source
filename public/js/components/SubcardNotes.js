const React = require('react');
const styles = require('../styles');
const PropTypes = React.PropTypes;
const dialogNames = require('../config/dialogNames');

import {Paper} from 'material-ui';

const SubcardNotes = React.createClass({
    propTypes: {
        editorTilesModel: PropTypes.object.isRequired,
        onOpenDialog: PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            editorTilesModel: undefined,
        };
    },
    componentWillMount() {
        this.setState({
            editorTilesModel: this.props.editorTilesModel,
        });
    },
    render: function() {
        return (
            <Paper
                style={styles.traveltileExpandedSizeViewLargeCardStyle}
                onClick={() => this.props.onOpenDialog(dialogNames.NOTES)}>
                <p style={Object.assign(styles.traveltileExpandedSizeViewCardTitleStyle, styles.defaultFont)}>Notes</p>
                <div style={styles.traveltileSubcardBodyStyle}>
                    <p style={styles.traveltileSubcardNotesStyle}>{this.state.editorTilesModel._notesText}</p>
                </div>
            </Paper>
        );
    },
});

module.exports = SubcardNotes;
