import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChartAnalytics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [34, 12, 41, 22],
			options: {
				chart: {
					height: 250,
					type: "donut",
				},
				
				dataLabels:{
					enabled: false
				},
				stroke: {
				  width: 0,
				},
				colors:['#2BC155', '#FF7A30', '#FFEF5F', '#6418C3'],
				legend: {
					position: 'bottom',
					show:false
				},
				responsive: [{
					breakpoint: 768,
					options: {
						chart: {
						  height:200
						},
					}
				}]
			},
		};
	}
	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="donut"
				  height={250}
				/>
			</div>
		);
	}
}

export default PieChartAnalytics;