export default function drawPieChart(pieChartJsonData, pieChartSelector){       
 
    // set the dimensions and margins of the graph
        var width = 450
        var height = 450
        var margin = 110
    
    // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin/2
    
    // append the svg object to the div called 'my_dataviz'
        var svg = d3.select(pieChartSelector)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2.2 + ")");
                
    // create  data_set
        //var data={Twitter:90, Blog: 100, News:40, Forum:88}
    
    // set the color scale
        var color = d3.scale.ordinal()
                .domain(["Twitter", "Blog", "News", "Forum"])
                .range(['#98b7e6','#dd8181','#eceb96','#a4ebaa']);
    
    // Compute the position of each group on the pie:
        var pie = d3.layout.pie()
                  .value(function(d) {return d.value; })

        var data_ready = pie(d3.entries(pieChartJsonData))
        
    // Generate the arcs
        var arc = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(radius);
        
        var label1 = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(radius-100);
        
        var label2 = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(radius+60);
                    
    // map to data
        var vis = svg.selectAll(".arc")
                   .data(data_ready)
                   .enter().append("g")
                   .attr("class", "arc");
    
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        vis.append('path')
                .attr('d', arc)
                .attr('fill', function(d){ return(color(d.data.key)) });

        vis.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label1.centroid(d) + ")"; 
                })
               .text(function(d) { return d.data.key; })
               .attr("fill","white")
               .attr('stroke', 'white')
               .attr("text-anchor", "middle")
               .style("font-size", "14px");
        
        vis.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label2.centroid(d) + ")"; 
                })
               .text(function(d) { return d.data.value+"%"; })
               .style("font-size", "20px")
               .attr("font-family", "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif")
               .attr("text-anchor", "middle")
               .attr("fill","a79696")
               .attr('stroke', 'white');
   
}