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
						.append("text").text("H")
						.attr("transform", "translate(1010,30)"); 				//时间轴

		g.append("g").call(yAxis);

	bars = svg.selectAll(".bar").data(data).enter();

	bars.append("rect")
		.attr("class", "bar1")
		.attr("x", function(d) { return x(d.date) + 100; })
		.attr("width", x.rangeBand()/4)
		.attr("y", function(d) { return y(d.yellow1) + 100; })
		.attr("height", function(d,i,j) { return g_height - y(d.yellow1); });

	bars.append("rect")
		.attr("class", "bar2")
		.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 100; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return y(d.yellow2) + 100; })
		.attr("height", function(d,i,j) { return g_height - y(d.yellow2); });

	bars.append("rect")
		.attr("class", "bar3")
		.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 132; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return y(d.yellow3) + 100; })
		.attr("height", function(d,i,j) { return g_height - y(d.yellow3); });

	bars.append("rect")
		.attr("class", "bar4")
		.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 164; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return y(d.green1) + 100; })
		.attr("height", function(d,i,j) { return g_height - y(d.green1); });


	});