const React = require('react');
const PropTypes = React.PropTypes;
const Link = require('react-router').Link;
const Loader = require('react-loader');
const _ = require('lodash');

import {RaisedButton} from 'material-ui';

const styles = require('../styles');
const ErrorAlert = require('./ErrorAlert');
const TileExpandedSize = require('../components/TileExpandedSize');

const EditorWindow = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    propTypes: {
        location: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
    },
    getInitialState() {
        return {
            firstButtonText: undefined,
            secondButtonText: undefined,
            editorTilesModel: undefined,
            loaded: false,
            error: false,
            errorAlertText: undefined,
        };
    },
    componentWillMount() {
        let editorTilesModel = this.props.routes[1].editorTilesModel;
        const tileId = this.props.location.query.tileId;
        if (tileId === 'fromNew') {
            editorTilesModel._setEditorTilesModelId('-1');
            editorTilesModel._setEditorTilesModelItineraryDatesText('How long was your trip?');
            editorTilesModel._setEditorTilesModelFinanceText('How much did your trip cost?');

            editorTilesModel._setEditorTilesModelGmapsLatitude('39.50');
            editorTilesModel._setEditorTilesModelGmapsLongitude('-98.35');
            editorTilesModel._setEditorTilesModelGmapsZoom(3);

            this.setState({
                editorTilesModel: editorTilesModel,
            });
        } else {
            editorTilesModel._setEditorTilesModelId(tileId);
            this.setState({
                editorTilesModel: editorTilesModel,
            });

            const that = this;
            const tilePromise = editorTilesModel._getTileByIdAsync(tileId);
            tilePromise.done(function(data) {
                editorTilesModel._setEditorTilesModelId(data[0].id);
                editorTilesModel._setEditorTilesModelNotesText(data[0].notes);
                editorTilesModel._setEditorTilesModelItineraryDates(data[0].itinerary);

                const numDates = data[0].itinerary.length;
                const dayOrDays = numDates === 1 ? ' day' : ' days';
                const text = 'This trip took ' + numDates + dayOrDays;
                editorTilesModel._setEditorTilesModelItineraryDatesText(text);

                that.setState({
                    editorTilesModel: editorTilesModel,
                });
            });

            const financesPromise = editorTilesModel._getFinanceDataByIdAsync(tileId);
            financesPromise.done(function(data) {
                editorTilesModel._setEditorTilesModelFinanceData(data);

                const financeSumDollars = _.reduce(_.map(data, 'amountincents'), function(sum, value) {
                    return sum + value / 100;
                }, 0);
                const financeSumDollarsText = String(parseFloat(Math.round(Number(financeSumDollars) * 100) / 100).toFixed(2));
                const financeText = financeSumDollars < 0 ? 'How much did this trip cost?' : 'This trip cost $' + financeSumDollarsText;
                editorTilesModel._setEditorTilesModelFinanceText(financeText);

                that.setState({
                    editorTilesModel: editorTilesModel,
                });
            });

            const photosPromise = editorTilesModel._getPhotosByIdAsync(tileId);
            photosPromise.done(function(data) {
                let newArrayOfImageFileURLs = [];
                for (let i = 0; i < data.length; i++) {
                    newArrayOfImageFileURLs.push(data[i].url);
                }

                editorTilesModel._setEditorTilesModelImageFileURLs(newArrayOfImageFileURLs);

                that.setState({
                    editorTilesModel: editorTilesModel,
                });
            });
        }
    },
    componentDidMount() {
        this._generateEditorWindowButtonLabels();
        this.setState({
            loaded: true,
        });
    },
    _createTraveltileOrUpdateTraveltile() {
        this.setState({
            error: true,
            errorAlertText: 'Thanks for trying out the Traveltile editor! Due to resource contraints on our end, we are unable to provide write access to global users. Please contact Ying Wang at yingw787@gmail.com for more details.',
        });

        // WORKING CODE BELOW; COMMENTED OUT BECAUSE OF DEMO MODE
        // const newEditorTilesModel = this.state.editorTilesModel;
        //
        // const arrayOfImageFileObjects = newEditorTilesModel._imageFileObjects;
        //
        // let notesText = 'notes=';
        // const editorTilesModelNotesText = this.state.editorTilesModel._notesText;
        // if (JSON.stringify(editorTilesModelNotesText) !== JSON.stringify('')) {
        //     notesText += editorTilesModelNotesText;
        // }
        //
        // let itineraryDates = '&itinerary=';
        // const editorTilesModelItineraryDates = this.state.editorTilesModel._itineraryDates;
        // if (editorTilesModelItineraryDates.length > 0) {
        //     itineraryDates += '{';
        //     for (let i = 0; i < editorTilesModelItineraryDates.length - 1; i++) {
        //         itineraryDates += editorTilesModelItineraryDates[i] + ',';
        //     }
        //     itineraryDates += editorTilesModelItineraryDates[editorTilesModelItineraryDates.length - 1] + '}';
        // }
        //
        // let newData = notesText + itineraryDates;
        //
        // if (newEditorTilesModel._imageFileURLs.length === 0) {
        //     this.setState({
        //         error: true,
        //         errorAlertText: 'Upload some photos to remember your trip!',
        //     });
        // } else {
        //     if (this.state.editorTilesModel._id === -1) {
        //         const tilePromise = this.state.editorTilesModel._postTileAsync(newData);
        //         const that = this;
        //         tilePromise.done(function(data) {
        //             const editorTilesModelFinanceData = that.state.editorTilesModel._financeData;
        //             const tileId = data[0].id;
        //             for (let i = 0; i < editorTilesModelFinanceData.length; i++) {
        //                 let financeData = 'tileId=' + tileId + '&categoryname=' + editorTilesModelFinanceData[i].categoryname + '&amountincents=' + editorTilesModelFinanceData[i].amountincents;
        //                 that.state.editorTilesModel._postFinanceDataAsync(financeData);
        //             }
        //
        //             // TODO;
        //             for (let i = 0; i < arrayOfImageFileObjects.length; i++) {
        //                 newEditorTilesModel._sendFileToFileStackAndRecordInDatabase(tileId, arrayOfImageFileObjects[i], i);
        //             }
        //         });
        //     } else {
        //         const tileId = this.state.editorTilesModel._id;
        //         newData += '&id=' + tileId;
        //         this.state.editorTilesModel._putTileAsync(newData, tileId);
        //
        //         const editorTilesModelFinanceData = this.state.editorTilesModel._financeData;
        //         for (let i = 0; i < editorTilesModelFinanceData.length; i++) {
        //             let financeData = 'tileId=' + tileId + '&categoryname=' + editorTilesModelFinanceData[i].categoryname + '&amountincents=' + editorTilesModelFinanceData[i].amountincents + '&id=' + tileId;
        //             this.state.editorTilesModel._putFinanceDataAsync(financeData, editorTilesModelFinanceData[i].id);
        //         }
        //
        //         const deletePhotosRequest = newEditorTilesModel._deletePhotosFromDatabaseByTileIdAsync(tileId);
        //         deletePhotosRequest.done(() => {
        //             let arrayOfImageFileURLs = newEditorTilesModel._imageFileURLs;
        //             for (let i = 0; i < arrayOfImageFileObjects.length; i++) {
        //                 arrayOfImageFileURLs.pop();
        //             }
        //             for (let i = 0; i < arrayOfImageFileURLs.length; i++) {
        //                 newEditorTilesModel._rewritePhotoURLToDatabase(tileId, arrayOfImageFileURLs[i]);
        //             }
        //             for (let i = 0; i < arrayOfImageFileObjects.length; i++) {
        //                 newEditorTilesModel._sendFileToFileStackAndRecordInDatabase(tileId, arrayOfImageFileObjects[i], i);
        //             }
        //         });
        //
        //         this.context.router.push({
        //             pathname: 'browse',
        //         });
        //     }
        // }
    },
    _closeErrorAlert() {
        this.setState({
            error: false,
        });
    },
    _generateEditorWindowButtonLabels() {
        if (this.state.editorTilesModel._id === -1) {
            this.setState({
                firstButtonText: 'Discard Draft',
                secondButtonText: 'Create Traveltile',
            });
        } else {
            this.setState({
                firstButtonText: 'Cancel Changes',
                secondButtonText: 'Update Traveltile',
            });
        }
    },
    // <Link to="/browse">
    // </Link>
    render() {
        const that = this;
        const loaderOptions = {
            lines: 13,
            length: 20,
            width: 2,
            radius: 30,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: '#000',
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: false,
            zIndex: 2e9,
            top: '50%',
            left: '50%',
            scale: 1.00,
        };
        return (
            <div>
                {this.state.loaded === false &&
                    <div>
                        <Loader
                            loaded={false}
                            options={loaderOptions}
                        />
                    </div>
                }
                {this.state.loaded === true &&
                    <div>
                        <div style={styles.editorVerticallyCenterElement}>
                            <div>
                                <div style={styles.editorHorizontallyCenterElement}>
                                    {that.state.editorTilesModel._id !== undefined &&
                                        <TileExpandedSize
                                            editorTilesModel={this.state.editorTilesModel}
                                            isBrowserVersion={false}
                                        />}
                                </div>
                            </div>
                            <div style={styles.editorHorizontallyCenterFooterElement}>
                                <Link to="/">
                                    <RaisedButton style={styles.raisedButtonStyle} label={String(that.state.firstButtonText)}/>
                                </Link>
                                <RaisedButton style={styles.raisedButtonStyle} label={String(that.state.secondButtonText)} onTouchTap={this._createTraveltileOrUpdateTraveltile}/>
                            </div>
                        </div>
                        <div>
                            {this.state.error === true &&
                                <ErrorAlert
                                    onCloseDialog={this._closeErrorAlert}
                                    text={this.state.errorAlertText}
                                />
                            }
                        </div>
                    </div>
                }
            </div>
        );
    },
});

module.exports = EditorWindow;
