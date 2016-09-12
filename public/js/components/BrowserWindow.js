const React = require('react');
const Link = require('react-router').Link;
const Slider = require('react-slick');
const _ = require('lodash');
const Loader = require('react-loader');

import {RaisedButton} from 'material-ui';

const TileExpandedSize = require('../components/TileExpandedSize');
const styles = require('../styles');
const DeleteTileAlert = require('./DeleteTileAlert');
const ErrorAlert = require('./ErrorAlert');
const EditorTilesModel = require('../models/EditorTilesModel');

// TODO: When there are no tiles available from the server, make sure to create some placeholder text or something so that the form doesn't change!
// TODO: routing appears to be taking in the wrong tileIds sometimes, leading to wrong tile being edited; figure out what's going on
const BrowserWindow = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    propTypes: {
        route: React.PropTypes.object.isRequired,
    },
    getInitialState() {
        return {
            open: false,
            error: false,
            errorAlertText: undefined,
            allTilesLoaded: false,
            arrayOfTileIds: undefined,
            arrayOfTileModels: undefined,
            arrayOfTiles: undefined,
            currentTileIndex: undefined,
        };
    },
    componentWillMount() {
        const browserTilesModel = this.props.route.browserTilesModel;
        const getAllTilesPromise = browserTilesModel._getAllTilesAsync();
        const that = this;

        getAllTilesPromise.done(function(data, textStatus, jqXHR) {
            const newArrayOfTileIds = _.map(data, 'id');
            that.setState({
                arrayOfTileIds: newArrayOfTileIds,
            });

            let newArrayOfTileModels = [];

            let asyncCounterStack = [];
            for (let j = 0; j < newArrayOfTileIds.length; j++) {
                asyncCounterStack.push('0');
            }

            for (let i = 0; i < newArrayOfTileIds.length; i++) {
                let currentEditorTilesModel = new EditorTilesModel();
                let currentData = data[i];

                currentEditorTilesModel._setEditorTilesModelId(newArrayOfTileIds[i]);
                currentEditorTilesModel._setEditorTilesModelNotesText(decodeURI(currentData.notes));
                currentEditorTilesModel._setEditorTilesModelItineraryDates(currentData.itinerary);

                const dayOrDays = currentData.itinerary.length === 1 ? ' day' : ' days';
                const newItineraryDatesText = currentData.itinerary.length === 0 ? 'No itinerary available.' : 'This trip took ' + currentData.itinerary.length + dayOrDays;
                currentEditorTilesModel._setEditorTilesModelItineraryDatesText(newItineraryDatesText);

                const financeDataPromise = browserTilesModel._getFinanceDataByIdAsync(newArrayOfTileIds[i]);
                financeDataPromise.done(function(financeData, financeTextStatus, financejqXHR) {
                    currentEditorTilesModel._setEditorTilesModelFinanceData(financeData);

                    const financeSumDollars = _.reduce(_.map(financeData, 'amountincents'), function(sum, value) {
                        return sum + value / 100;
                    }, 0);
                    const financeSumDollarsText = String(parseFloat(Math.round(Number(financeSumDollars) * 100) / 100).toFixed(2));
                    const financeText = financeSumDollars < 0 ? 'No finances available.' : 'This trip cost $' + financeSumDollarsText;
                    currentEditorTilesModel._setEditorTilesModelFinanceText(financeText);

                    const photosPromise = browserTilesModel._getPhotosByIdAsync(newArrayOfTileIds[i]);
                    photosPromise.done(function(photosData, photosTextStatus, photosjqXHR) {
                        let newArrayOfImageFileURLs = [];

                        for (let k = 0; k < photosData.length; k++) {
                            newArrayOfImageFileURLs.push(photosData[k].url);
                        }

                        currentEditorTilesModel._setEditorTilesModelImageFileURLs(newArrayOfImageFileURLs);


                        const gmapsPromise = browserTilesModel._getGMapsDataByIdAsync(newArrayOfTileIds[i]);
                        gmapsPromise.done(function(gmapsData, gmapsTextStatus, gmapsjqXHR) {

                            currentEditorTilesModel._setEditorTilesModelGmapsLatitude(gmapsData[0].latitude);
                            currentEditorTilesModel._setEditorTilesModelGmapsLongitude(gmapsData[0].longitude);
                            currentEditorTilesModel._setEditorTilesModelGmapsZoom(gmapsData[0].zoom);

                            newArrayOfTileModels.push(currentEditorTilesModel);

                            asyncCounterStack.pop();
                            if (asyncCounterStack.length === 0) {
                                const newArrayOfTiles = _.map(newArrayOfTileModels, function(tileModel, index) {
                                    return (
                                        <div style={styles.browserVerticallyCenterElement} key={index}>
                                            <TileExpandedSize
                                                editorTilesModel={tileModel}
                                                isBrowserVersion={true}
                                            />
                                        </div>
                                    );
                                });
                                that.setState({
                                    allTilesLoaded: true,
                                    arrayOfTileModels: newArrayOfTileModels,
                                    arrayOfTiles: newArrayOfTiles,
                                    currentTileIndex: 0,
                                });
                            }
                        });
                    });
                });
            }
        });
    },
    handleEditCurrentTile() {
        this.setState({
            error: true,
            errorAlertText: 'Thanks for trying out the Traveltile browser! This content is for display use only and cannot be edited. Please contact Ying Wang at yingw787@gmail.com for more details.',
        });

        // this.context.router.push({
        //     pathname: 'editor',
        //     query: {
        //         tileId: this.state.arrayOfTileIds[this.state.currentTileIndex],
        //     },
        // });
    },
    _closeErrorAlert() {
        this.setState({
            error: false,
        });
    },
    _openDeleteTileAlert() {
        this.setState({
            open: true,
        });
    },
    _closeDeleteTileAlert() {
        this.setState({
            open: false,
        });
    },
    _handleDeleteTile() {
        this.setState({
            error: true,
            errorAlertText: 'Thanks for trying out the Traveltile browser! This content is for display use only and cannot be edited. Please contact Ying Wang at yingw787@gmail.com for more details.',
        });

        // const currentTileIndex = this.state.currentTileIndex;
        // let newArrayOfTiles = this.state.arrayOfTiles;
        // newArrayOfTiles.splice(currentTileIndex, 1);
        //
        // let newArrayOfTileModels = this.state.arrayOfTileModels;
        // let toBeDeletedTileModel = newArrayOfTileModels[currentTileIndex];
        // newArrayOfTileModels.splice(currentTileIndex, 1);
        //
        // toBeDeletedTileModel._deleteTileFromDatabaseByIdAsync(toBeDeletedTileModel._id);
        //
        // this.setState({
        //     arrayOfTiles: newArrayOfTiles,
        //     arrayOfTileModels: newArrayOfTileModels,
        //     currentTileIndex: newArrayOfTiles.length === 0 ? 0 : currentTileIndex - 1,
        // });

        this._closeDeleteTileAlert();
    },
    render() {
        const that = this;
        const settings = {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            draggable: false,
            slidesToShow: 2,
            initialSlide: 0,
            centerMode: false,
            slidesToScroll: 1,
            afterChange: function(index) {
                that.setState({
                    currentTileIndex: index,
                });
            },
        };
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
                {this.state.allTilesLoaded === false &&
                    <div>
                        <Loader
                            loaded={false}
                            options={loaderOptions}
                        />
                    </div>
                }
                {this.state.allTilesLoaded === true &&
                    <div>
                        <Slider {...settings}>
                            {this.state.arrayOfTiles}
                        </Slider>
                        <div style={styles.editorHorizontallyCenterFooterElement}>
                            <Link to="/">
                                <RaisedButton style={styles.raisedButtonStyle} label="Go back to the home page" />
                            </Link>
                            <RaisedButton style={styles.raisedButtonStyle} label="Delete selected tile" onTouchTap={this._openDeleteTileAlert} />
                            <RaisedButton style={styles.raisedButtonStyle} label="Edit selected tile" onTouchTap={that.handleEditCurrentTile}/>
                        </div>
                    </div>
                }
                {this.state.open === true &&
                    <div>
                        <DeleteTileAlert
                            onCloseDialog={this._closeDeleteTileAlert}
                            onDeleteTile={this._handleDeleteTile}
                        />
                    </div>
                }
                {this.state.error === true &&
                    <ErrorAlert
                        onCloseDialog={this._closeErrorAlert}
                        text={this.state.errorAlertText}
                    />
                }
            </div>
        );
    },
});

module.exports = BrowserWindow;
