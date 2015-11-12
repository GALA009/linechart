	var width = 1200,
	height = 700,
	margin = {left:100, top:100, right:100, bottom:100},
	g_width = width - margin.left - margin.right,
	g_height = height - margin.top - 50;

	//svg
	var svg = d3.select("#container").append("svg").attr("width",width).attr("height",height)

	var g = d3.select("svg").append("g").attr("transform", "translate(" + margin.left + ",100)")
	var gBatt = d3.select("svg").append("g").attr("transform", "translate(" + margin.left + ",350)")

	//线条数据
	var data1 = [1000,976,650,4700,848,4840,3000,2749,3241,3216,1254,3241,4131,1234,2541,2678,1951,1424,1300,1249,1642,1320,940,600,200]
	var data2 = [-674,-1087,-671,-524,-2400,-1590,-3489,-4079,-2541,-2678,-1951,-1424,-1300,-1249,-645,-749,-1200,-640,-3250,-4650,-4840,-3000,-2749,-1200,-640]
	var data3 = [2346,1543,3362,2572,1372,345,645,749,1200,640,3250,4650]

	//X轴
	var scale1_x = d3.scale.linear().domain([0, 24]).range([0, g_width])
	var scale2_x = d3.scale.linear().domain([0, 0]).range([-20, g_width])
	//左侧刻度
	var scale1_y = d3.scale.linear().domain([0, 5000]).range([250, 0])
	var scale2_y = d3.scale.linear().domain([0, 6000]).range([0, 300])

	//右侧刻度
	var scale_y_r1 = d3.scale.linear().domain([0, 100]).range([250, 0])
	var scale_y_r2 = d3.scale.linear().domain([40, 100]).range([0, 200])

	//可以的左右轴
	var move_l = d3.scale.linear().domain([0, 0]).range([500, 0])
	var move_r = d3.scale.linear().domain([0, 0]).range([500, 0])


	var line_generator = d3.svg.line().x(function(d,i){return scale1_x(i);}).y(function(d) {return scale1_y(d);}).interpolate("cardinal")

	d3.select("g").append("path").attr("d", line_generator(data1)).attr("stroke","red")
	d3.select("g").append("path").attr("d", line_generator(data2)).attr("stroke","blue")
	d3.select("g").append("path").attr("d", line_generator(data3)).attr("stroke","green")


	//添加XY轴标尺
	var x_axis = d3.svg.axis().scale(scale1_x).tickValues([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);					//时间轴
	var x2_axis = d3.svg.axis().scale(scale2_x).outerTickSize([0]);																				//0刻度线
	var y_axis = d3.svg.axis().scale(scale1_y).tickSize(0,0).tickPadding(30).tickValues([0,1000,2000,3000,4000,5000]).orient("left");			//左侧上部刻度
	var y2_axis = d3.svg.axis().scale(scale2_y).tickSize(0,0).tickPadding(30).tickValues([0,1000,2000,3000,4000,5000,6000]).orient("left");									//左侧下部刻度
	var y_axis_r1 = d3.svg.axis().scale(scale_y_r1).tickSize(0,0).tickValues([0,20,40,60,80,100]).orient("right");								//右测上部刻度
	var y_axis_r2 = d3.svg.axis().scale(scale_y_r2).tickSize(0,0).tickValues([55,70,85,100]).orient("right");									//右测下部刻度

	//可移动左右轴
	var moveL_axis = d3.svg.axis().scale(move_l).orient("left").outerTickSize([0]);																//左移动轴
	var moveR_axis = d3.svg.axis().scale(move_r).orient("left").outerTickSize([0]);																//右移动轴

	g.append("g").call(x_axis).attr("transform", "translate(0," + g_height +")").append("text").text("H").attr("transform", "translate(1010,30)")//时间轴
	g.append("g").call(y_axis)
	g.append("g").call(y_axis_r1).attr("transform", "translate(1030,0)")

	gBatt.append("g").call(x2_axis).append("text").text("40").attr("transform", "translate(1038,16)")		//0刻度线
	gBatt.append("g").call(y2_axis)
	gBatt.append("g").call(y_axis_r2).attr("transform", "translate(1030,0)")

//会绘制右侧箭头
var defs = svg.append("defs");

var arrowMarker = defs.append("marker")
						.attr("id","arrow")
						.attr("markerUnits","strokeWidth")
					    .attr("markerWidth","12")
                        .attr("markerHeight","12")
                        .attr("viewBox","0 0 12 12")
                        .attr("refX","6")
                        .attr("refY","6")
                        .attr("orient","auto");

var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

arrowMarker.append("path")
			.attr("d",arrow_path)
			.attr("fill","#000");

var line = svg.append("line")
			 .attr("x1",0)
			 .attr("y1",0)
			 .attr("x2",200)
			 .attr("y2",50)
			 .attr("stroke","red")
			 .attr("stroke-width",2)
			 .attr("marker-end","url(#arrow)");








	//曲线图背景直线
	var bglineY = 100;
	for (var i = 0; i < 11; i++) {
		svg.append("line")
			.attr("class", "bg-line")
			.attr("x1", 100)
			.attr("y1", bglineY)
			.attr("x2", 1100)
			.attr("y2", bglineY)
			.attr("stroke","rgb(230,230,230)")
			.attr("stroke-width",1);

			bglineY+=50;
	};

//绘制左右可移动轴
	var LeftPointX = 400;	//左侧圆点X Y坐标
	var LeftPointY = 650;
	var RightPointX = 800;	//右侧圆点X Y坐标
	var RightPointY = 650;

	//绘制左侧移动轴圆和直线
	var dragL = d3.behavior.drag().on("drag", dragmoveL);

	function dragmoveL(d) {
		if( d.cx >= 100 && d.cx <= 1100)
		{
			if( d3.event.x >=100 && d3.event.x <= 1100)
			{
				var X = document.getElementById("moveL").getAttribute("cx");			//圆点和直线圆点X坐标
				var popoverL = parseInt(X)- 286;

				d3.select(this)
				  .attr("cx", d.cx = d3.event.x )
				  .attr("cy", d.cy = 100 );
				d3.select("#lineL")
				.attr("x1", function () {var x1 = X; return x1; })
				.attr("x2", function () {var x2 = X; return x2; });
				d3.select("#popoverLeft")
				.attr("style", "top: 100px;" + "left:"+ popoverL +"px; " + "display: block; ")

			}
		}else if( d.cx < 100){
			d3.select(this)
			  .attr("cx", d.cx = 100 )
			  .attr("cy", d.cy = 100 );
		}else if(d.cx > 1100){
			d3.select(this)
			  .attr("cx", d.cx = 1100 )
			  .attr("cy", d.cy = 100 );
		}
	}

	var circlesL = [ { cx: 400, cy:100, r:5 },];
	//圆点设置
	svg.selectAll("circleL")
		.data(circlesL)
		.enter()
		.append("circle")
		.attr("id","moveL")
		.attr("cx",LeftPointX)
		.attr("cy",100)
		.attr("r",function(d){ return d.r; })	//圆点半径
		.attr("fill","#B3B3B3")
		.on("mouseover", function() {
				d3.select(this).transition().duration(200).attr('r', 7);
			})
		.on("mouseout", function() {
		 		d3.select(this).transition().duration(200).attr('r', 5);
			})
		.call(dragL);

	//绘制左轴直线
	svg.append("line")
		.attr("id", "lineL")
		.attr("x1", LeftPointX)
		.attr("y1", 100)
		.attr("x2", LeftPointX)
		.attr("y2", LeftPointY)
		.attr("stroke","#B3B3B3")
		.attr("stroke-width",1);




//绘制右侧移动轴圆和直线
	var dragR = d3.behavior.drag().on("drag", dragmoveR);

	function dragmoveR(d) {
		if( d.cx >= 100 && d.cx <= 1100)
		{
			if( d3.event.x >=100 && d3.event.x <= 1100)
			{
				var X = document.getElementById("moveR").getAttribute("cx");			//圆点和直线圆点X坐标
				var xR = parseInt(X)+ 10;

				d3.select(this)
				  .attr("cx", d.cx = d3.event.x )
				  .attr("cy", d.cy = 100 );
				d3.select("#lineR")
				.attr("x1", function () {var x = X; return x; })
				.attr("x2", function () {var x = X; return x; });

				d3.select("#popoverRight")
				.attr("style", "top: 100px;" + "left:"+ xR +"px; display: block; ")

			}
		}else if( d.cx < 100){
			d3.select(this)
			  .attr("cx", d.cx = 100 )
			  .attr("cy", d.cy = 100 );
		}else if(d.cx > 1100){
			d3.select(this)
			  .attr("cx", d.cx = 1100 )
			  .attr("cy", d.cy = 100 );
		}
	}

	var circlesR = [ { cx: 800, cy:100, r:5 },];
	//右轴圆点设置
	svg.selectAll("circleR")
		.data(circlesR)
		.enter()
		.append("circle")
		.attr("id","moveR")
		.attr("cx",RightPointX)
		.attr("cy",100)
		.attr("r",function(d){ return d.r; })	//圆点半径
		.attr("fill","#B3B3B3")
		.on("mouseover", function() {
				d3.select(this).transition().duration(200).attr('r', 7);
			})
		.on("mouseout", function() {
		 		d3.select(this).transition().duration(200).attr('r', 5);
			})
		.call(dragR);

	//绘制右轴直线
	svg.append("line")
		.attr("id", "lineR")
		.attr("x1", RightPointX)
		.attr("y1", 100)
		.attr("x2", RightPointX)
		.attr("y2", RightPointY)
		.attr("stroke","#B3B3B3")
		.attr("stroke-width",1);







