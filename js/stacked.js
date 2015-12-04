	var width = 1200,
		height = 700,
		margin = { left: 100, top: 100, right: 100, bottom: 100 },
		g_width = width - margin.left - margin.right,
		g_height = height - margin.top - 50;

	//svg
	var svg = d3.select("#stacked").append("svg").attr("width", width).attr("height", height);

	var g = d3.select("#stacked svg").append("g").attr("transform", "translate(" + margin.left + ",100)");

	var x = d3.scale.ordinal().rangeRoundBands([0, g_width], .1);
	var y = d3.scale.linear().range([550, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.tickSize(0, 0)
		.tickValues([10, 20, 30, 40, 50, 60])
		.tickFormat(function(d) { return d + "K"; })
		.orient("left");

	d3.csv("stacked.csv", function(error, data) {
		if (error) console.log(error);

		x.domain(data.map(function(d) { return d.date; }));
		y.domain([10, 70]);

		//绘制显示
		g.append("g").call(xAxis)
						.attr("transform", "translate(0," + g_height + ")")
						.append("text").text("Day")
						.attr("fill", "gray")
						.attr("font-size", "18")
						.attr("transform", "translate(1010,0)"); 				//时间轴

		g.append("g").call(yAxis);


		var bar = d3.select(".bar-chart");

		bar.select(".item-one .bg-color-white")
			.style("height", function(d) { return parseInt(g_height - y(40)) + "px"; });

		bar.select(".item-two .bg-color-white")
			.style("height", function(d) { return parseInt(g_height - y(50)) + "px"; });

		bar.select(".item-three .bg-color-white")
			.style("height", function(d) { return parseInt(g_height - y(30)) + "px"; });

		bar.select(".item-four .bg-color-white")
			.style("height", function(d) { return parseInt(g_height - y(45)) + "px"; });






	// bars = svg.selectAll(".bar").data(data).enter();

	// bars.append("rect")
	// 	.attr("class", "fill-white")
	// 	.attr("x", function(d) { return x(d.date) + 100; })
	// 	.attr("width", parseInt(x.rangeBand()/4 ))
	// 	.attr("y", function(d) { return parseInt(y(d.yellow1) + 99); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.yellow1)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date) + 100; })
	// 		.attr("y", function(d) { return parseInt(y(d.yellow1) + 99); })
	// 		.attr("dx", "8")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.yellow1 + "KWH"; })


	// bars.append("rect")
	// 	.attr("class", "fill-gray")
	// 	.attr("x", function(d) { return x(d.date)  + 100; })
	// 	.attr("width", parseInt(x.rangeBand() / 4 ))
	// 	.attr("y", function(d) { return parseInt(y(d.yellow2) + 99); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.yellow2)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date) + 100; })
	// 		.attr("y", function(d) { return parseInt(y(d.yellow2) + 99); })
	// 		.attr("dx", "8")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.yellow2; })


	// bars.append("rect")
	// 	.attr("class", "fill-yellow")
	// 	.attr("x", function(d) { return x(d.date) + 100; })
	// 	.attr("width", parseInt(x.rangeBand() / 4))
	// 	.attr("y", function(d) { return parseInt(y(d.yellow3) + 99); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.yellow3)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date) + 100; })
	// 		.attr("y", function(d) { return parseInt(y(d.yellow3) + 99); })
	// 		.attr("dx", "8")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.yellow3; })


	// bars.append("rect")
	// 	.attr("class", "fill-white")
	// 	.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 100; })
	// 	.attr("width", parseInt(x.rangeBand() / 4))
	// 	.attr("y", function(d) { return parseInt(y(d.green1) + 100); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.green1)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 100; })
	// 		.attr("y", function(d) { return parseInt(y(d.green1) + 99); })
	// 		.attr("dx", "8")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.green1; })

	// bars.append("rect")
	// 	.attr("class", "fill-green")
	// 	.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 100; })
	// 	.attr("width", parseInt(x.rangeBand() / 4))
	// 	.attr("y", function(d) { return parseInt(y(d.green2) + 100); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.green2)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 100; })
	// 		.attr("y", function(d) { return parseInt(y(d.green2) + 99); })
	// 		.attr("dx", "8")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.green2; })

	// bars.append("rect")
	// 	.attr("class", "fill-white")
	// 	.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 132; })
	// 	.attr("width", parseInt(x.rangeBand() / 4))
	// 	.attr("y", function(d) { return parseInt(y(d.blue1) + 100); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.blue1)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 132; })
	// 		.attr("y", function(d) { return parseInt(y(d.blue1) + 99); })
	// 		.attr("dx", "3")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.blue1 + "%"; })

	// bars.append("rect")
	// 	.attr("class", "fill-blue")
	// 	.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 132; })
	// 	.attr("width", parseInt(x.rangeBand() / 4))
	// 	.attr("y", function(d) { return parseInt(y(d.blue2) + 100); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.blue2)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 132; })
	// 		.attr("y", function(d) { return parseInt(y(d.blue2) + 99); })
	// 		.attr("dx", "3")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.blue2 + "%"; })

	// bars.append("rect")
	// 	.attr("class", "fill-white")
	// 	.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 164; })
	// 	.attr("width", parseInt(x.rangeBand() / 4))
	// 	.attr("y", function(d) { return parseInt(y(d.red1) + 99); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.red1)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 164; })
	// 		.attr("y", function(d) { return parseInt(y(d.red1) + 99); })
	// 		.attr("dx", "8")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.red1; })

	// bars.append("rect")
	// 	.attr("class", "fill-red")
	// 	.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 164; })
	// 	.attr("width", parseInt(x.rangeBand() / 4))
	// 	.attr("y", function(d) { return parseInt(y(d.red2) + 99); })
	// 	.attr("height", function(d,i,j) { return parseInt(g_height - y(d.red2)); });
	// svg.selectAll("rect text")
	// 		.data(data)
	// 		.enter()
	// 		.append("text")
	// 		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 164; })
	// 		.attr("y", function(d) { return parseInt(y(d.red2) + 99); })
	// 		.attr("dx", "8")
	// 		.attr("dy", "18")
	// 		.attr("fill", "block")
	// 		.text(function(d) { return d.red2; })


	});