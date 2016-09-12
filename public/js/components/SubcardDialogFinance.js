const React = require('react');
const PropTypes = React.PropTypes;
const _ = require('lodash');

import {RaisedButton} from 'material-ui';

const styles = require('../styles');
const SubcardDialogWrapper = require('./SubcardDialogWrapper');
const FinanceChart = require('./FinanceChart');
const FinanceTextFields = require('./FinanceTextFields');
const ErrorAlert = require('./ErrorAlert');
const financeCategories = require('../config/financeCategories');

const SubcardDialogFinance = React.createClass({
    propTypes: {
        editorTilesModel: PropTypes.object.isRequired,
        isBrowserVersion: PropTypes.bool.isRequired,
        onCloseDialog: PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            chartFinanceData: undefined,
            textFieldFinanceData: undefined,
            editorTilesModel: undefined,
            open: false,
            errorAlertText: undefined,
            chartData: undefined,
            chartSeries: undefined,
        };
    },
    componentWillMount() {
        let savedFinanceData = this.props.editorTilesModel._financeData;
        savedFinanceData = savedFinanceData.sort(function(a, b) {
            return financeCategories.indexOf(a.categoryname) > financeCategories.indexOf(b.categoryname);
        });

        let oldArrayOfFinanceData, newArrayOfFinanceData;
        if (savedFinanceData === undefined) {
            oldArrayOfFinanceData = [0, 0, 0, 0, 0];
        } else {
            oldArrayOfFinanceData = _.map(savedFinanceData, 'amountincents');
        }
        newArrayOfFinanceData = _.map(oldArrayOfFinanceData, function(data) {
            return String(parseFloat(Math.round(Number(data / 100) * 100) / 100).toFixed(2));
        });
        if (JSON.stringify(newArrayOfFinanceData) === JSON.stringify([])) {
            newArrayOfFinanceData = ['', '', '', '', ''];
        }

        this.setState({
            chartFinanceData: newArrayOfFinanceData,
            textFieldFinanceData: newArrayOfFinanceData,
            editorTilesModel: this.props.editorTilesModel,
        });
    },
    _closeErrorAlert() {
        this.setState({
            open: false,
        });
    },
    _updateChartFinanceData() {
        let canUpdate = true;
        const newTextFieldFinanceData = this.state.textFieldFinanceData;
        for (let i = 0; i < newTextFieldFinanceData.length; i++) {
            if (isNaN(Number(newTextFieldFinanceData[i]))) {
                canUpdate = false;
                break;
            }
        }
        if (canUpdate) {
            let newChartFinanceData = this.state.chartFinanceData;
            for (let i = 0; i < newTextFieldFinanceData.length; i++) {
                newChartFinanceData[i] = newTextFieldFinanceData[i];
            }

            const newHeaderItems = financeCategories;
            let formattedNewChartFinanceData = [];
            let formattedNewHeaderItems = [];
            for (let i = 0; i < newChartFinanceData.length; i++) {
                if (Number(newChartFinanceData[i]) !== 0) {
                    formattedNewChartFinanceData.push(newChartFinanceData[i]);
                    formattedNewHeaderItems.push(newHeaderItems[i]);
                }
            }

            const chartData = _.zipObject(formattedNewHeaderItems, formattedNewChartFinanceData);
            let generatedChartData = [];
            const formattedChartData = _.map(chartData, function(index, value) {
                return [value, index];
            });
            for (let i = 0; i < formattedNewHeaderItems.length; i++) {
                generatedChartData.push(_.zipObject(['category', 'amountUSDollars'], [formattedChartData[i][0], formattedChartData[i][1]]));
            }
            let generatedChartSeries = [];
            for (let i = 0; i < formattedNewHeaderItems.length; i++) {
                generatedChartSeries.push(_.zipObject(['field', 'name'], [formattedNewHeaderItems[i], formattedNewHeaderItems[i]]));
            }

            this.setState({
                chartFinanceData: formattedNewChartFinanceData,
                chartData: generatedChartData,
                chartSeries: generatedChartSeries,
            });
        } else {
            this.setState({
                open: true,
                errorAlertText: 'Please format all text fields as numbers!',
            });
        }
    },
    _handleUpdateAction() {
        const chartDataArrayAsNumbers = _.map(_.map(this.state.chartData, 'amountUSDollars'), function(n) {
            return Number(n);
        });
        const textFieldFinanceDataAsNumbers = _.map(this.state.textFieldFinanceData, function(n) {
            return Number(n);
        });
        let lengthsAreDifferent = chartDataArrayAsNumbers.length !== textFieldFinanceDataAsNumbers.length;

        if (this.state.chartData === undefined) {
            this.setState({
                open: true,
                errorAlertText: "Please update the chart using the Update Chart button. If you haven't updated the chart, please press cancel to close the dialog.",
            });
        } else if (JSON.stringify(chartDataArrayAsNumbers) !== JSON.stringify(textFieldFinanceDataAsNumbers) && !lengthsAreDifferent) {
            this.setState({
                open: true,
                errorAlertText: 'Please update the chart using the Update Chart button to see your chart.',
            });
        } else if (lengthsAreDifferent) {
            this.setState({
                open: true,
                errorAlertText: "Please don't leave any blanks!",
            });
        } else {
            let newEditorTilesModel = this.state.editorTilesModel;
            let newFinanceData = newEditorTilesModel._financeData;

            if (JSON.stringify(newFinanceData) === JSON.stringify([])) {
                for (let i = 0; i < textFieldFinanceDataAsNumbers.length; i++) {
                    let object = {};
                    object.amountincents = textFieldFinanceDataAsNumbers[i] * 100;
                    object.categoryname = financeCategories[i];
                    if (object.amountincents > 0) {
                        newFinanceData.push(object);
                    }
                }
                newEditorTilesModel._setEditorTilesModelFinanceData(newFinanceData);
            } else {
                for (let i = 0; i < newFinanceData.length; i++) {
                    if (newFinanceData[i].categoryname === financeCategories[i]) {
                        newFinanceData[i].amountincents = textFieldFinanceDataAsNumbers[i] * 100;
                    } else {
                        let object = {};
                        object.amountincents = textFieldFinanceDataAsNumbers[i] * 100;
                        object.categoryname = financeCategories[i];
                        newFinanceData.splice(i, 0, object);
                    }
                }

                newEditorTilesModel._setEditorTilesModelFinanceData(newFinanceData);
            }

            const amount = _.reduce(this.state.textFieldFinanceData, function(sum, value) {
                return sum + Number(value);
            }, 0);
            const text = 'This trip cost $' + String(parseFloat(Math.round(Number(amount) * 100) / 100).toFixed(2));
            newEditorTilesModel._setEditorTilesModelFinanceText(text);

            this.setState({
                editorTilesModel: newEditorTilesModel,
            });

            this.props.onCloseDialog();
        }

    },
    render() {
        return (
            <div>
                <div>
                    <SubcardDialogWrapper
                        title={"Finances"}
                        onCloseDialog={this.props.onCloseDialog}
                        onUpdateAction={this._handleUpdateAction}
                        isBrowserVersion={this.props.isBrowserVersion}>
                        <div style={styles.traveltileSubcardDialogFinanceTableStyle}>
                            <FinanceChart
                                chartFinanceData={this.state.chartFinanceData}
                                editorTilesModel={this.state.editorTilesModel}
                                chartData={this.state.chartData !== undefined ? this.state.chartData : []}
                                chartSeries={this.state.chartSeries !== undefined ? this.state.chartSeries : []}
                            />
                            <FinanceTextFields
                                textFieldFinanceData={this.state.textFieldFinanceData}
                                isBrowserVersion={this.props.isBrowserVersion}
                                editorTilesModel={this.state.editorTilesModel}
                            />
                            {this.props.isBrowserVersion === false &&
                                <div style={styles.alignElementInCenter}>
                                    <RaisedButton style={styles.raisedButtonStyle} label="Update fields" onTouchTap={this._updateChartFinanceData}/>
                                </div>
                            }
                        </div>
                    </SubcardDialogWrapper>
                </div>
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

module.exports = SubcardDialogFinance;
