import './cloud';
  
export default function drawWordCloud(jsonData,selector)
{
        var myWordCloud = wordCloud(selector);
        
        showNewWords(myWordCloud);

        function showNewWords(vis, i) {
                i = i || 0;
                vis.update(jsonData)
                setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
        }

        function wordCloud(selector) 
        {
                var color = d3.scale.linear()
                        .range([ "#8FD8D8","#66CCCC","#ADEAEA","#70DBDB","#AEEEEE","#AFEEEE","#8DEEEE",
                                "#37FDFC","#008080","#008B8B","#00CDCD","#00EEEE","#00FFFF","#00FFFF",
                                "#97FFFF","#BBFFFF","#E0FFFF","#F0FFFF","#00CED1","#5F9EA0","#00868B",
                                "#00C5CD","#00E5EE","#00F5FF","#67E6EC","#4A777A","#05EDFF","#53868B",
                                "#73B1B7","#05E9FF","#7AC5CD","#8EE5EE","#05B8CC","#98F5FF","#B0E0E6",
                                "#C1F0F6","#39B7CD","#65909A","#0EBFE9","#C3E4ED","#68838B","#63D1F4",
                                "#9AC0CD","#50A6C2","#ADD8E6","#B2DFEE","#00688B","#009ACD","#0099CC",
                                "#00B2EE","#00BFFF","#BFEFFF","#33A1C9","507786","#87CEEB","#38B0DE",
                                "#0BB5FF","#42C0FB","#6996AD","#539DC2","#236B8E","#3299CC","#0198E1",
                                "#0198E1","#67C8FF","#7EC0EE","#9BC4E2","#C3E4ED","#B2DFEE","#BFEFFF",
                                "#87CEEB","#42C0FB","#ADD8E6","#63D1F4","#00BFFF","#0BB5FF","#38B0DE",
                                "#67E6EC","#98F5FF","#39B7CD","#00E5EE","#05EDFF","#00F5FF","#05E9FF",
                                "#C1F0F6","#BBFFFF","#8DEEEE","#70DBDB","#8FD8D8","#AEEEEE","#37FDFC",
                                "#A4D3EE","#B0E2FF","#87CEFF","#42C0FB","#82CFFD","#87CEFA","#9BC4E2",
                                "#00FFFF","#E0FFFF","#AFEEEE","#ADEAEA","#D1EEEE",])

                var fill = color;

                //Construct the word cloud's SVG element
                var svg = d3.select(selector).append("svg")
                .attr("width", 500)
                .attr("height", 600)
                .append("g")
                .attr("transform", "translate(150,200)");

                //Draw the word cloud
                function draw(words) 
                {
                        var cloud = svg.selectAll("g text")
                                        .data(words, function(d) { return d.text; })

                        //Entering words
                        cloud.enter()
                                .append("text")
                                .style("font-family", "Impact")
                                .style("fill", function(d, i) { return fill(i); })
                                .attr("text-anchor", "middle")
                                .attr('font-size', 1)
                                .text(function(d) { return d.text; });

                        //Entering and existing words
                        cloud
                                .transition()
                                .duration(600)
                                .style("font-size", function(d) { return d.size + "px"; })
                                .attr("transform", function(d) {
                                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                })
                                .style("fill-opacity", 1);

                        //Exiting words
                        cloud.exit()
                                .transition()
                                .duration(200)
                                .style('fill-opacity', 1e-6)
                                .attr('font-size', 1)
                                .remove();
                }
                return {
                        update: function(words) {
                                d3.layout.cloud().size([500, 600])
                                .words(words)
                                .padding(5)
                                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                                .font("Impact")
                                .fontSize(function(d) { return d.size; })
                                .on("end", draw)
                                .start();
                        }
                }
        }
}