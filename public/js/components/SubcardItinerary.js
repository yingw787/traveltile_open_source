const React = require('react');
const PropTypes = React.PropTypes;
const dialogNames = require('../config/dialogNames');

import {Paper} from 'material-ui';

const styles = require('../styles');

const SubcardItinerary = React.createClass({
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
    render() {
        return (
            <Paper
                style={styles.traveltileExpandedSizeViewSmallCardStyle}
                onClick={() => this.props.onOpenDialog(dialogNames.ITINERARY)}>
                <p style={Object.assign(styles.traveltileExpandedSizeViewCardTitleStyle, styles.defaultFont)}>Itinerary</p>
                <div style={styles.traveltileSubcardBodyStyle}>
                    <div style={styles.traveltileSubcardBodyItineraryStyle}>{this.state.editorTilesModel._itineraryDatesText}</div>
                </div>
            </Paper>
        );
    },
});

module.exports = SubcardItinerary;
