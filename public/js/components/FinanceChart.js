const React = require('react');
const PropTypes = React.PropTypes;
const _ = require('lodash');

const PieChart = require('react-d3-basic').PieChart;

const FinanceChart = React.createClass({
    propTypes: {
        chartFinanceData: PropTypes.array.isRequired,
        editorTilesModel: PropTypes.object.isRequired,
        chartData: PropTypes.array.isRequired,
        chartSeries: PropTypes.array.isRequired,
    },
    getInitialState() {
        return {
            chartFinanceData: undefined,
            editorTilesModel: undefined,
            chartData: undefined,
            chartSeries: undefined,
        };
    },
    componentWillMount() {
        this.setState({
            chartFinanceData: this.props.chartFinanceData,
            editorTilesModel: this.props.editorTilesModel,
        });
    },
    componentDidMount() {
        const newHeaderItems = _.map(this.state.editorTilesModel._financeData, 'categoryname');
        const chartData = _.zipObject(newHeaderItems, this.state.chartFinanceData);
        let generatedChartData = [];
        const formattedChartData = _.map(chartData, function(index, value) {
            return [value, index];
        });
        for (let i = 0; i < newHeaderItems.length; i++) {
            generatedChartData.push(_.zipObject(['category', 'amountUSDollars'], [formattedChartData[i][0], formattedChartData[i][1]]));
        }
        let generatedChartSeries = [];
        for (let i = 0; i < newHeaderItems.length; i++) {
            generatedChartSeries.push(_.zipObject(['field', 'name'], [newHeaderItems[i], newHeaderItems[i]]));
        }

        this.setState({
            chartData: generatedChartData,
            chartSeries: generatedChartSeries,
        });
    },
    _generateName() {
        return function(chartItem) {
            return chartItem.category;
        };
    },
    _generateValue() {
        return function(chartItem) {
            return chartItem.amountUSDollars;
        };
    },
    render() {
        const chartWidth = 700;
        const chartHeight = 500;
        const chartInnerRadius = 175;
        return (
            <div>
                {this.state.chartData !== undefined &&
                    <PieChart
                        data={JSON.stringify(this.props.chartData) !== JSON.stringify([]) ? this.props.chartData : this.state.chartData}
                        width={chartWidth}
                        height={chartHeight}
                        chartSeries={JSON.stringify(this.props.chartSeries) !== JSON.stringify([]) ? this.props.chartSeries : this.state.chartSeries}
                        value={this._generateValue()}
                        showLegend={false}
                        name={this._generateName()}
                        innerRadius={chartInnerRadius}
                    />
                }
            </div>
        );
    },
});

module.exports = FinanceChart;
