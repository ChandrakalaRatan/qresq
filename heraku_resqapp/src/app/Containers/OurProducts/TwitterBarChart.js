
 export default function drawBarChart(jsonData, barchartselector)
 {
     console.log("jsonData in twitterbarchart",jsonData);
     
   var jsonData =[
                    {date:"2015-12-01T00:00:00.000Z", totalTweets: 895 },
                    {date:"2015-12-02T00:00:00.000Z", totalTweets: 695 }, 
                    {date:"2015-12-03T00:00:00.000Z", totalTweets: 995 }, 
                    {date:"2015-12-04T00:00:00.000Z", totalTweets: 595 }, 
                    {date:"2015-12-05T00:00:00.000Z", totalTweets: 795 }, 
                    {date:"2015-12-06T00:00:00.000Z", totalTweets: 7046 }, 
                    {date:"2015-12-07T00:00:00.000Z", totalTweets: 595 }, 
                    {date:"2015-12-08T00:00:00.000Z", totalTweets: 795 }, 
                    {date:"2015-12-09T00:00:00.000Z", totalTweets: 8046 }, 
                    {date:"2015-12-10T00:00:00.000Z", totalTweets: 695 }, 
                    {date:"2015-12-11T00:00:00.000Z", totalTweets: 2360 }, 
                    {date:"2015-12-12T00:00:00.000Z", totalTweets: 7046 }, 
                    {date:"2015-12-13T00:00:00.000Z", totalTweets: 595 },
                    {date:"2015-12-14T00:00:00.000Z", totalTweets: 1046 },
                    {date:"2015-12-15T00:00:00.000Z", totalTweets: 4046 }, 
                    {date:"2015-12-16T00:00:00.000Z", totalTweets: 5046 }, 
                    {date:"2015-12-17T00:00:00.000Z", totalTweets: 3046 }, 
                    {date:"2015-12-18T00:00:00.000Z", totalTweets: 2046 }, 
                    {date:"2015-12-19T00:00:00.000Z", totalTweets: 6046 }, 
                    {date:"2015-12-20T00:00:00.000Z", totalTweets: 595 }, 
                    {date:"2015-12-21T00:00:00.000Z", totalTweets: 995 }, 
                    {date:"2015-12-22T00:00:00.000Z", totalTweets: 8046 }, 
                    {date:"2015-12-23T00:00:00.000Z", totalTweets: 6046 }, 
                    {date:"2015-12-24T00:00:00.000Z", totalTweets: 2360 }, 
                    {date:"2015-12-25T00:00:00.000Z", totalTweets: 8046 }, 
                    {date:"2015-12-26T00:00:00.000Z", totalTweets: 795 },
                    {date:"2015-12-27T00:00:00.000Z", totalTweets: 8046 }, 
                    {date:"2015-12-28T00:00:00.000Z", totalTweets: 995 },
                    {date:"2015-12-29T00:00:00.000Z", totalTweets: 8046 }, 
                    {date:"2015-12-30T00:00:00.000Z", totalTweets: 895 }
                ];

    var svgWidth = 350;
    var svgHeight = 350;
    var heightPad = 30;
    var widthPad = 50;
    var locYear='';
    var svg = d3.select(barchartselector)
                .append("svg")
                .attr("width", svgWidth + (widthPad * 2))
                .attr("height", svgHeight + (heightPad * 3))
                .append("g")
                .attr("transform", "translate(" + widthPad + "," + heightPad + ")")
                .attr("overflow-y", 'scroll')
                .attr("overflow-x", 'hidden');

    var firstItem = jsonData[0].date.substring(0, 10);
    var lastItem = jsonData[jsonData.length-1].date.substring(0, 10);
    console.log("firstItem",firstItem,'lastItem',lastItem);
    
    jsonData.map(d=>{
        locYear = d.date.substring(0, 4);
        d.date = d.date.substring(5, 10);
    });

    //Set up X scales
    var xScale = d3.scale.ordinal()
                         .domain(jsonData.map(function(d) { return d.date; }))
                         .rangeRoundBands([0, svgWidth], 0.1);
    //Set up Y scales
    var yScale = d3.scale.linear()
                         .domain([0, d3.max(jsonData, function(d) { return d.totalTweets; })+1000])
                         .range([svgHeight,0]);
    
    // Create bars
     svg.selectAll("rect")
        .data(jsonData)
        .enter().append("rect")
        .attr("x", function (d) { return xScale(d.date) + widthPad; })
        .attr("y", function (d) { return yScale(d.totalTweets); })
        .attr("height", function (d) { return svgHeight - yScale(d.totalTweets); })
        .attr("width", xScale.rangeBand())
        .attr("fill", "blue");

    // Y axis
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left");

    svg.append("g")
       .attr("class", "axis")
       .style("font-size","10px")
       .attr("transform", "translate(" + widthPad + ",0)")
       .call(yAxis)
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -90)
       .attr("y", -40)
       .style("font-size","15px")
       .style("color","blue")
       .style("text-anchor", "end")
       .text("Number of tweets");

    // X axis
    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")

     svg.append("g")
        .attr("class", "axis")
        .style("font-size","13px")
        .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
        .call(xAxis)
        .selectAll("text")	
       // .style("text-anchor", "end" ,"red")
        .style("font-size","13px")
        .style("color","red")

        .attr("width", xScale.rangeBand())
        .attr("height", heightPad)
        .attr("x", svgWidth /60 - widthPad)
        .attr("y", 0)
        .attr("transform","rotate(-65)") 
    
    svg.append("g")
        .append("text")
        // .attr("transform", "translate( 20, 40)")
        .style("text-anchor", "end")
        .attr("width", xScale.rangeBand())
        .attr("height", heightPad/2)
        .attr("x", svgWidth/1.5)
        .attr("y", svgHeight + heightPad*2 )
        .style("font-size","13px","red")
        .text(" Days of Tweets ( " + locYear + " )");
}