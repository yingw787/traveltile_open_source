const React = require('react');
const PropTypes = React.PropTypes;

import {FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = require('../styles');
const CalendarTile = require('./CalendarTile');

const TiledEventsCalendar = React.createClass({
    propTypes: {
        arrayOfDates: PropTypes.array.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
    },
    getInitialState() {
        return {
            arrayOfDates: undefined,
        };
    },
    componentWillMount() {
        this.setState({
            arrayOfDates: this.props.arrayOfDates,
        });
    },
    _handleGenerateCalendarTile() {
        let newArrayOfDates = this.state.arrayOfDates;
        newArrayOfDates.push('');
        this.setState({
            arrayOfDates: newArrayOfDates,
        });
    },
    _handleDeleteCalendarTile: function(childIndex, e) {
        let newArrayOfDates = this.state.arrayOfDates;
        newArrayOfDates.splice(childIndex, 1);
        this.setState({
            arrayOfDates: newArrayOfDates,
        });
    },
    _handleTextFieldChange: function(childIndex, e) {
        let newArrayOfDates = this.state.arrayOfDates;
        let date = newArrayOfDates[childIndex];
        newArrayOfDates.splice(childIndex, 1);
        date = e.target.value;
        newArrayOfDates.splice(childIndex, 0, date);
        this.setState({
            arrayOfDates: newArrayOfDates,
        });
    },
    render() {
        const that = this;
        const children = this.state.arrayOfDates.map(function(childData, childIndex) {
            return (
                <CalendarTile
                    text={childData}
                    isBrowserVersion={that.props.isBrowserVersion}
                    onDeleteCalendarTile={that._handleDeleteCalendarTile.bind(that, childIndex)}
                    onTextFieldChange={that._handleTextFieldChange.bind(that, childIndex)}
                    key={childIndex}
                />
            );
        });
        return (
            <div style={styles.TiledCalendarStyle}>
                {children}
                {this.props.isBrowserVersion === false &&
                    <div style={styles.tiledEventsCalendarStyle}>
                        <FloatingActionButton
                            onTouchTap={this._handleGenerateCalendarTile}>
                            <ContentAdd/>
                        </FloatingActionButton>
                    </div>
                }
            </div>
        );
    },
});

module.exports = TiledEventsCalendar;
