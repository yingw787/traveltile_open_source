const React = require('react');
const PropTypes = React.PropTypes;

const styles = require('../styles');
const SubcardFinance = require('./SubcardFinance');
const SubcardItinerary = require('./SubcardItinerary');
const SubcardNotes = require('./SubcardNotes');
const MapsAndPhotosCarousel = require('./MapsAndPhotosCarousel');

import {Paper, RaisedButton} from 'material-ui';

const TileExpandedSizeView = React.createClass({
    propTypes: {
        editorTilesModel: PropTypes.object.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
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
    _handleUploadPhotos: function() {
        const newEditorTilesModel = this.state.editorTilesModel;
        const arrayOfImageFileObjects = this.refs.UploadImageFiles.files;

        let newArrayOfImageFileURLs = this.state.editorTilesModel._imageFileURLs;
        let newArrayOfImageFileObjects = newEditorTilesModel._imageFileObjects;
        for (let i = 0; i < arrayOfImageFileObjects.length; i++) {
            newArrayOfImageFileURLs.push(URL.createObjectURL(arrayOfImageFileObjects[i]));
            newArrayOfImageFileObjects.push(arrayOfImageFileObjects[i]);
        }

        newEditorTilesModel._setEditorTilesModelImageFileObjects(newArrayOfImageFileObjects);
        newEditorTilesModel._setEditorTilesModelImageFileURLs(newArrayOfImageFileURLs);
        this.setState({
            editorTilesModel: newEditorTilesModel,
        });
    },
    render() {
        let uploadPhotosButton;
        let isBrowserVersion = this.props.isBrowserVersion;
        if (!isBrowserVersion) {
            uploadPhotosButton = (
                <RaisedButton
                    fullWidth={true}
                    labelPosition="before"
                    label="Upload Photos">
                    <input type="file" ref="UploadImageFiles" multiple={true} size={50} style={styles.ImageInput} onChange={this._handleUploadPhotos}/>
                </RaisedButton>
            );
        }
        const that = this;
        return (
            <div>
                <Paper zDepth={2}>
                    <div>
                        <MapsAndPhotosCarousel
                            editorTilesModel={this.props.editorTilesModel}
                            isBrowserVersion={this.props.isBrowserVersion}
                        />
                    </div>
                    <div style={styles.traveltileExpandedSizeViewFooterStyle}>
                        {uploadPhotosButton}
                        <SubcardFinance
                            editorTilesModel={that.state.editorTilesModel}
                            onOpenDialog={that.props.onOpenDialog}
                        />
                        <SubcardItinerary
                            editorTilesModel={that.state.editorTilesModel}
                            onOpenDialog={that.props.onOpenDialog}
                        />
                        <SubcardNotes
                            editorTilesModel={that.state.editorTilesModel}
                            onOpenDialog={that.props.onOpenDialog}
                        />
                    </div>
                </Paper>
            </div>
        );
    },
});

module.exports = TileExpandedSizeView;
