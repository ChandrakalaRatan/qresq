
 export default function drawBarChart(data, barchartselector)
 {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",data);
    var data =[
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
      
    var locYear='';                    
    var margin =  {top: 50, right: 10, bottom: 20, left: 40};
    var marginOverview = {top: 20, right: 30, bottom: 20, left: 10};
    var selectorHeight = 40;
    var width = 550 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom - selectorHeight;
    var heightOverview = 80 - marginOverview.top - marginOverview.bottom;
           
    var maxLength = d3.max(data.map(function(d){ return d.date.length}))
    var barWidth = maxLength * 3;
    var numBars = Math.round(width/barWidth);
    var isScrollDisplayed = barWidth * data.length > width;
           
    data.map(d=>{
        locYear = d.date.substring(0, 4);
        d.date = d.date.substring(5, 10);
    });

    console.log(isScrollDisplayed)
      

    var xscale = d3.scale.ordinal()
                        .domain(data.map(function(d) { return d.date; }))
                        .rangeRoundBands([0, width], .2);
    

    var yscale = d3.scale.linear()
                         .domain([0, d3.max(data, function (d) { return d.totalTweets; })+1000 ])
                         .range([height, 0]);
      
    var xAxis  = d3.svg.axis().scale(xscale).orient("bottom");
    var yAxis  = d3.svg.axis().scale(yscale).orient("left");
      
    var svg = d3.select(barchartselector).append("svg")
                .attr("width", width + margin.left + margin.right + 10 )
                .attr("height", height + margin.top + margin.bottom + selectorHeight)
                .attr("fill", "#36DBCA");
                
    var diagram = svg.append("g")
                     .attr("transform", "translate(" + (margin.left+20)+ "," + (margin.top-40) + ")");
      
    diagram.append("g")
           .attr("class", "x axis")
           .attr("fill", "white")
           .attr("transform", "translate(0, " + height + ")")
           .call(xAxis);
      
    diagram.append("g")
           .attr("class", "y axis")
           .attr("fill", "white")
           .call(yAxis);
      
    var bars = diagram.append("g");
      
    bars.selectAll("rect")
                .data(data, function (d) {return d.date; })
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return xscale(d.date); })
                .attr("y", function (d) { return yscale(d.totalTweets); })
                .attr("width", xscale.rangeBand())
                .attr("height", function (d) { return height - yscale(d.totalTweets); })
                .attr("fill", "#36DBCA");
    
      
    if (isScrollDisplayed)
    {
      var xOverview = d3.scale.ordinal()
                      .domain(data.map(function (d) { return d.date; }))
                      .rangeBands([0, width], .2);

      var yOverview = d3.scale.linear().range([heightOverview, 0]);
                    yOverview.domain(yscale.domain());
    
      var subBars = diagram.selectAll('subBar')
                            .data(data)
    
      subBars.enter().append("rect")
          .classed('subBar', true)
          .attr({
              height: function(d) {
                  return heightOverview - yOverview(d.totalTweets);
              },
              width: function(d) {
                  return xOverview.rangeBand()
              },
              x: function(d) {
    
                  return xOverview(d.date);
              },
              y: function(d) {
                  return height + heightOverview + yOverview(d.totalTweets)
              }
          })
          .attr("fill", "#90FEFB");
    
      var displayed = d3.scale.quantize()
                  .domain([0, width])
                  .range(d3.range(data.length));
    
      diagram.append("rect")
                  .attr("transform", "translate(0, " + (height + margin.bottom) + ")")
                  .attr("class", "mover")
                  .attr("x", 10)
                  .attr("y", 10)
                  .attr("height", selectorHeight)
                  .attr("width", Math.round(parseFloat(numBars * width)/data.length))
                  .attr("pointer-events", "all")
                  .attr("cursor", "ew-resize")
                  .call(d3.behavior.drag().on("drag", display))
                  .attr("fill", "#396f75");
    }
    function display () {
        var x = parseInt(d3.select(this).attr("x")),
            nx = x + d3.event.dx,
            w = parseInt(d3.select(this).attr("width")),
            f, nf, new_data, rects;
    
        if ( nx < 0 || nx + w > width ) return;
    
        d3.select(this).attr("x", nx);
    
        f = displayed(x);
        nf = displayed(nx);
    
        if ( f === nf ) return;
    
        new_data = data.slice(nf, nf + numBars);
    
        xscale.domain(new_data.map(function (d) { return d.date; }));
        diagram.select(".x.axis").call(xAxis);
    
        rects = bars.selectAll("rect")
          .data(new_data, function (d) {return d.date; });
    
        rects.attr("x", function (d) { return xscale(d.date); });
    
        rects.enter().append("rect")
          .attr("class", "bar")
          .attr("x", function (d) { return xscale(d.date); })
          .attr("y", function (d) { return yscale(d.totalTweets); })
          .attr("width", xscale.rangeBand())
          .attr("height", function (d) { return height - yscale(d.totalTweets); });
    
        rects.exit().remove();
    };
}
