const React = require('react');
const PropTypes = React.PropTypes;
const Slider = require('nuka-carousel');

import {FloatingActionButton} from 'material-ui';
import ContentClear from 'material-ui/svg-icons/content/clear';

const Gmaps = require('react-gmaps').Gmaps;
const apiKeys = require('../config/apiKeys');

const centralUSCoords = {
    lat: 23.6978,
    lng: 120.9605,
};

// TODO: responsiveness issue in MapsAndPhotosCarousel
const MapsAndPhotosCarousel = React.createClass({
    propTypes: {
        editorTilesModel: PropTypes.object.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
    },
    mixins: [Slider.ControllerMixin],
    getInitialState() {
        return {
            editorTilesModel: undefined,
            currentIndex: undefined,
            gmapsLatitude: undefined,
            gmapsLongitude: undefined,
            gmapsZoom: undefined,
        };
    },
    componentWillMount() {

        this.setState({
            editorTilesModel: this.props.editorTilesModel,
            currentIndex: 0,
            gmapsLatitude: Number(this.props.editorTilesModel._gmapsLatitude),
            gmapsLongitude: Number(this.props.editorTilesModel._gmapsLongitude),
            gmapsZoom: Number(this.props.editorTilesModel._gmapsZoom),
        });
    },
    _handleCreateMap(map) {
        map.setOptions({
            disableDefaultUI: true,
        });
    },
    _handleRemovePhoto: function(childIndex, e) {
        const newEditorTilesModel = this.state.editorTilesModel;
        let newArrayOfImageFileURLs = newEditorTilesModel._imageFileURLs;
        let newArrayOfImageFileObjects = newEditorTilesModel._imageFileObjects;

        newArrayOfImageFileURLs.splice(childIndex, 1);
        newArrayOfImageFileObjects.splice(childIndex, 1);

        newEditorTilesModel._setEditorTilesModelImageFileURLs(newArrayOfImageFileURLs);
        newEditorTilesModel._setEditorTilesModelImageFileObjects(newArrayOfImageFileObjects);

        let newCurrentIndex = newArrayOfImageFileURLs.length === 0 ? 0 : newArrayOfImageFileURLs.length;

        this.setState({
            currentIndex: newCurrentIndex,
            editorTilesModel: newEditorTilesModel,
        });
    },
    render() {
        const that = this;
        const Decorators = [
            {
                component: React.createClass({
                    propTypes: {
                        currentSlide: PropTypes.number.isRequired,
                        previousSlide: PropTypes.func.isRequired,
                    },
                    render() {
                        return (
                            <button
                                style={this.getButtonStyles(this.props.currentSlide === 0)}
                                onClick={this.props.previousSlide}>PREV</button>
                        );
                    },
                    getButtonStyles(disabled) {
                        return {
                            border: 0,
                            background: 'rgba(0,0,0,0.4)',
                            color: 'white',
                            padding: 10,
                            outline: 0,
                            opacity: disabled ? 0.3 : 1,
                            cursor: 'pointer',
                        };
                    },
                }),
                position: 'CenterLeft',
            },
            {
                component: React.createClass({
                    propTypes: {
                        currentSlide: PropTypes.number.isRequired,
                        nextSlide: PropTypes.func.isRequired,
                        slidesToScroll: PropTypes.number.isRequired,
                        slideCount: PropTypes.number.isRequired,
                    },
                    render() {
                        return (
                            <button
                                style={this.getButtonStyles(this.props.currentSlide === that.state.editorTilesModel._imageFileURLs.length)}
                                onClick={this.props.nextSlide}>NEXT</button>
                        );
                    },
                    getButtonStyles(disabled) {
                        return {
                            border: 0,
                            background: 'rgba(0,0,0,0.4)',
                            color: 'white',
                            padding: 10,
                            outline: 0,
                            opacity: disabled ? 0.3 : 1,
                            cursor: 'pointer',
                        };
                    },
                }),
                position: 'CenterRight',
            },
        ];
        const GMapsComponent = (
            <div>
                <Gmaps
                    width={'calc(100%)'}
                    height={'300px'}
                    lat={this.state.gmapsLatitude}
                    lng={this.state.gmapsLongitude}
                    zoom={this.state.gmapsZoom}
                    loadingMessage={'Be happy'}
                    params={{v: '3.exp', key: apiKeys.GOOGLE_MAPS_API_KEY}}
                    onMapCreated={this._handleCreateMap}
                />
            </div>
        );
        const containerStyle = {
            position: 'relative',
        };
        const buttonStyle = {
            position: 'absolute',
            float: 'right',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            top: 20,
            right: 20,
            zIndex: 1,
        };
        const imagePositioningStyle = {
            position: 'absolute',
            zIndex: -1,
        };
        const imageStyle = {
            maxWidth: 'calc(100%)',
            maxHeight: 'calc(100%)',
        };
        const arrayOfImages = this.state.editorTilesModel._imageFileURLs.map(function(childData, childIndex) {
            return (
                <div style={containerStyle} key={childIndex}>
                    <div>
                        {that.props.isBrowserVersion === false &&
                            <FloatingActionButton
                                backgroundColor={'rgba(0,0,0,0)'}
                                onTouchTap={that._handleRemovePhoto.bind(that, childIndex)}
                                style={buttonStyle}
                                mini={true}>
                                <ContentClear/>
                            </FloatingActionButton>
                        }
                    </div>
                    <div style={imagePositioningStyle}>
                        <img src={childData} style={imageStyle}/>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <Slider
                    dragging={false}
                    decorators={Decorators}
                    slideIndex={this.state.currentIndex}>
                    {GMapsComponent}
                    {arrayOfImages}
                </Slider>
            </div>
        );
    },
});

module.exports = MapsAndPhotosCarousel;
