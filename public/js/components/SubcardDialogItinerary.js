const React = require('react');
const PropTypes = React.PropTypes;
const moment = require('moment');

const ErrorAlert = require('./ErrorAlert');
const styles = require('../styles');
const TiledEventsCalendar = require('./TiledEventsCalendar');
const SubcardDialogWrapper = require('./SubcardDialogWrapper');

const SubcardDialogItinerary = React.createClass({
    propTypes: {
        editorTilesModel: PropTypes.object.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
        onCloseDialog: PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            arrayOfDates: undefined,
            editorTilesModel: undefined,
            open: false,
            errorAlertText: undefined,
        };
    },
    componentWillMount() {
        const arrayOfDates = this.props.editorTilesModel._itineraryDates;
        let newArrayOfDates = [];
        const dateRegExp = new RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/);
        for (let i = 0; i < arrayOfDates.length; i++) {
            if (dateRegExp.test(arrayOfDates[i])) {
                newArrayOfDates.push(moment(arrayOfDates[i], 'MM/DD/YYYY').format('MM/DD/YYYY'));
            } else {
                newArrayOfDates.push(moment(arrayOfDates[i]).format('MM/DD/YYYY'));
            }
        }
        this.setState({
            arrayOfDates: newArrayOfDates,
            editorTilesModel: this.props.editorTilesModel,
        });
    },
    _closeErrorAlert() {
        this.setState({
            open: false,
        });
    },
    _handleUpdateAction() {
        let allValidDates = true;
        const dateRegExp = new RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/);
        const arrayOfDates = this.state.arrayOfDates;
        for (let i = 0; i < arrayOfDates.length; i++) {
            if (!dateRegExp.test(arrayOfDates[i])) {
                allValidDates = false;
            }
        }
        if (allValidDates) {
            let newEditorTilesModel = this.state.editorTilesModel;
            newEditorTilesModel._setEditorTilesModelItineraryDates(this.state.arrayOfDates);

            const numDates = this.state.arrayOfDates.length;
            const dayOrDays = numDates === 1 ? ' day' : ' days';
            const text = 'This trip took ' + numDates + dayOrDays;
            newEditorTilesModel._setEditorTilesModelItineraryDatesText(text);

            this.setState({
                editorTilesModel: newEditorTilesModel,
            });
            this.props.onCloseDialog();
        } else {
            this.setState({
                open: true,
                errorAlertText: 'Make sure all dates are valid MM/DD/YYYY format!',
            });
        }
    },
    render() {
        return (
            <div>
                <SubcardDialogWrapper
                    title={'Itinerary'}
                    onCloseDialog={this.props.onCloseDialog}
                    onUpdateAction={this._handleUpdateAction}
                    isBrowserVersion={this.props.isBrowserVersion}>
                    <div style={styles.SubcardDialogItineraryWrapperStyle}>
                        <TiledEventsCalendar
                            arrayOfDates={this.state.arrayOfDates}
                            isBrowserVersion={this.props.isBrowserVersion}
                        />
                    </div>
                </SubcardDialogWrapper>
                <div>
                    {this.state.open === true &&
                        <ErrorAlert
                            onCloseDialog={this._closeErrorAlert}
                            text={this.state.errorAlertText}
                        />
                    }
                </div>
            </div>
        );
    },
});

module.exports = SubcardDialogItinerary;
