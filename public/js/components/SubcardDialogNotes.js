const React = require('react');
const SubcardDialogWrapper = require('./SubcardDialogWrapper');
const PropTypes = React.PropTypes;
const styles = require('../styles');

import {TextField} from 'material-ui';

const SubcardDialogNotes = React.createClass({
    propTypes: {
        editorTilesModel: PropTypes.object.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
        onCloseDialog: PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            editorTilesModel: undefined,
            text: '',
        };
    },
    componentWillMount() {
        this.setState({
            editorTilesModel: this.props.editorTilesModel,
        });
    },
    componentDidMount() {
        this.setState({
            text: this.state.editorTilesModel._notesText,
        });
    },
    _handleTextFieldChange: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    _handleUpdateAction() {
        this.state.editorTilesModel._handleUpdateNotesText(this.state.text);
        this.props.onCloseDialog();
    },
    render() {
        const notesField = (
            <div style={styles.traveltileSubcardDialogNotesDisplayStyle}>
                <TextField
                    hintText="What do you want to remember?"
                    fullWidth={true}
                    multiLine={true}
                    rowsMax={18}
                    disabled={this.props.isBrowserVersion}
                    underlineShow={false}
                    onChange={this._handleTextFieldChange.bind(this, 'text')}
                    value={this.state.text}
                />
            </div>
        );
        return (
            <SubcardDialogWrapper
                title={"Notes"}
                onCloseDialog={this.props.onCloseDialog}
                onUpdateAction={this._handleUpdateAction}
                isBrowserVersion={this.props.isBrowserVersion}>
                {notesField}
            </SubcardDialogWrapper>
        );
    },
});

module.exports = SubcardDialogNotes;
