const React = require('react');
const PropTypes = React.PropTypes;

import {Paper, TextField, FlatButton} from 'material-ui';

const styles = require('../styles');

const CalendarTile = React.createClass({
    propTypes: {
        text: PropTypes.string.isRequired,
        onDeleteCalendarTile: PropTypes.func.isRequired,
        onTextFieldChange: PropTypes.func.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
    },
    getInitialState() {
        return {
            text: undefined,
        };
    },
    componentWillMount() {
        this.setState({
            text: this.props.text,
        });
    },
    render() {
        const that = this;
        const dateEntryText = (that.props.isBrowserVersion) ? 'Date' : 'Date: format MM/DD/YYYY';
        return (
            <div>
                <Paper
                    style={styles.CalendarTileStyle}
                    zDepth={1}>
                    <div>
                        <TextField
                            hintText={dateEntryText}
                            fullWidth={true}
                            underlineShow={!this.props.isBrowserVersion}
                            value={this.props.text}
                            onChange={this.props.onTextFieldChange}
                            disabled={this.props.isBrowserVersion}
                        />
                    </div>
                    <div style={styles.SubcardDialogItineraryWrapperStyle}>
                        <TextField
                            hintText="I'm sorry, but I don't have the time to add in additional features to this CalendarTile. Please submit a PR to this project to integrate your own components!"
                            fullWidth={true}
                            underlineShow={false}
                            disabled={true}
                        />
                    </div>
                    {this.props.isBrowserVersion === false &&
                        <div style={Object.assign(styles.alignElementInCenter, styles.CalendarTileDeleteButtonStyle)}>
                            <FlatButton
                                label="Delete"
                                onTouchTap={this.props.onDeleteCalendarTile.bind(this)}
                            />
                        </div>
                    }
                </Paper>
            </div>
        );
    },
});

module.exports = CalendarTile;
