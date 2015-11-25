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

		var stack = d3.layout.stack()
						.values(function(d){ return d.sales; })
						.x(function(d){ return d.date; })
						.y(function(d){ return d.profit; });

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

	bars = svg.selectAll(".bar").data(data).enter();

	bars.append("rect")
		.attr("class", "fill-gray")
		.attr("x", function(d) { return x(d.date) + 100; })
		.attr("width", x.rangeBand()/4)
		.attr("y", function(d) { return parseInt(y(d.yellow1) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.yellow1)); });

	bars.append("rect")
		.attr("class", "fill-black")
		.attr("x", function(d) { return x(d.date)  + 100; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.yellow2) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.yellow2)); });

	bars.append("rect")
		.attr("class", "fill-yellow")
		.attr("x", function(d) { return x(d.date) + 100; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.yellow3) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.yellow3)); });

	bars.append("rect")
		.attr("class", "fill-gray")
		.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 101; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.green1) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.green1)); });

	bars.append("rect")
		.attr("class", "fill-green")
		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 101; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.green2) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.green2)); });

	bars.append("rect")
		.attr("class", "fill-gray")
		.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 134; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.blue1) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.blue1)); });

	bars.append("rect")
		.attr("class", "fill-steelblue")
		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 134; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.blue2) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.blue2)); });

	bars.append("rect")
		.attr("class", "fill-gray")
		.attr("x", function(d) { return x(d.date) + x.rangeBand()/4 + 167; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.red1) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.red1)); });

	bars.append("rect")
		.attr("class", "fill-red")
		.attr("x", function(d) { return x(d.date)  + x.rangeBand()/4 + 167; })
		.attr("width", x.rangeBand() / 4)
		.attr("y", function(d) { return parseInt(y(d.red2) + 100); })
		.attr("height", function(d,i,j) { return parseInt(g_height - y(d.red2)); });

		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.attr("x", function(d, i) { return d.red1; })
			.attr("y", function(d, i) { return i; })
			.attr("dx", "5")
			.attr("dy", "18")
			.attr("fill", "white")
			.text("asdf")

	});