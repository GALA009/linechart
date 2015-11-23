	var width = 1200,
		height = 700,
		margin = { left: 100, top: 100, right: 100, bottom: 100 },
		g_width = width - margin.left - margin.right,
		g_height = height - margin.top - 50;

	var parsedtg = d3.time.format("%Y-%m-%d").parse;
	//svg
	var svg = d3.select("#stacked").append("svg").attr("width", width).attr("height", height);

	var g = d3.select("#stacked svg").append("g").attr("transform", "translate(" + margin.left + ",100)");

	var x = d3.scale.linear().domain([1, 7]).range([0, g_width]);
	var y = d3.scale.linear().domain([10, 70]).range([550, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickValues([1, 2, 3, 4, 5, 6, 7])
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .tickSize(0, 0)
	    .tickValues([10, 20, 30, 40, 50, 60])
	    .tickFormat(function(d) { return d + "K"; })
	    .orient("left");

	d3.csv("stacked.csv", function(error, data) {
		if (error) console.log(error);

		data.forEach(function(d) {
			d.date = parsedtg(d.date);
		});


		var scale_x = d3.scale.linear().domain(d3.extent(function (d) { return d.date; })).range([0, g_width]);
		var scale_y = d3.scale.linear().domain([10, 70]).range([550, 0]);

		var x_axis = d3.svg.axis().scale(scale_x)
			.tickValues([1, 2, 3, 4, 5, 6, 7]); 					//日期轴

		// var y_axis = d3.svg.axis().scale(scale_y)
		// 	.tickSize(0, 0)
		// 	.tickPadding(30)
		// 	.tickValues([10, 20, 30, 40, 50, 60])
		// 	.tickFormat(function(d) { return d + "K"; })
		// 	.orient("left"); 													//左侧上部刻度

		//绘制显示
		g.append("g").call(xAxis)
						.attr("transform", "translate(0," + g_height + ")")
						.append("text").text("H")
						.attr("transform", "translate(1010,30)"); 				//时间轴

		g.append("g").call(yAxis);

	});