const React = require('react');
const styles = require('../styles');
const PropTypes = React.PropTypes;
const dialogNames = require('../config/dialogNames');

import {Paper} from 'material-ui';

const SubcardFinance = React.createClass({
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
                style={styles.traveltileExpandedSizeViewSmallCardStyle}
                onClick={() => this.props.onOpenDialog(dialogNames.FINANCES)}>
                <p style={Object.assign(styles.traveltileExpandedSizeViewCardTitleStyle, styles.defaultFont)}>Finances</p>
                <div style={styles.traveltileSubcardBodyStyle}>
                    <div style={styles.traveltileSubcardBodyItineraryStyle}>{this.state.editorTilesModel._financeText}</div>
                </div>
            </Paper>
        );
    },
});

module.exports = SubcardFinance;
