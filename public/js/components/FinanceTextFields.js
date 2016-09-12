const React = require('react');
const PropTypes = React.PropTypes;
const _ = require('lodash');

import {TextField, Divider} from 'material-ui';

const financeCategories = require('../config/financeCategories');

const FinanceTextFields = React.createClass({
    propTypes: {
        textFieldFinanceData: PropTypes.array.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
        editorTilesModel: PropTypes.object.isRequired,
    },
    getInitialState() {
        return {
            textFieldFinanceData: undefined,
            headerItems: undefined,
            isBrowserVersion: undefined,
            editorTilesModel: undefined,
        };
    },
    componentWillMount() {

        this.setState({
            textFieldFinanceData: this.props.textFieldFinanceData,
            headerItems: financeCategories,
            isBrowserVersion: this.props.isBrowserVersion,
            editorTilesModel: this.props.editorTilesModel,
        });
    },
    _handleTextFieldChange: function(childIndex, e) {
        let newTextFieldFinanceData = this.state.textFieldFinanceData;
        let financeData = newTextFieldFinanceData[childIndex];
        newTextFieldFinanceData.splice(childIndex, 1);
        financeData = e.target.value;
        newTextFieldFinanceData.splice(childIndex, 0, financeData);
        this.setState({
            textFieldFinanceData: newTextFieldFinanceData,
        });
    },
    render() {
        const that = this;
        const style = {
            marginLeft: 20,
        };
        const textFields = this.state.headerItems.map(function(childData, childIndex) {
            return (
                <div
                    key={childIndex}>
                    <TextField
                        id={childData}
                        hintText={childData + ': $USD'}
                        style={style}
                        disabled={that.state.isBrowserVersion}
                        underlineShow={false}
                        value={that.props.isBrowserVersion === true ? financeCategories[childIndex] + ': $' + that.state.textFieldFinanceData[childIndex] : that.state.textFieldFinanceData[childIndex]}
                        onChange={that._handleTextFieldChange.bind(that, childIndex)}
                    />
                    <Divider />
                </div>
            );
        });
        return (
            <div>
                {textFields}
            </div>
        );
    },
});

module.exports = FinanceTextFields;
