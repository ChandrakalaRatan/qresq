  import './cloud';
  
  export default function drawWordCloud(jsonData,selector)
  {
    // var color = d3.scale.category20();

    console.log("colorcodes",color);
    var color = d3.scale.linear()
    .range(["#9AC0CD","#50A6C2","#ADD8E6","#B2DFEE","#00688B","#009ACD","#0099CC",
            "#00B2EE","#BFEFFF","#33A1C9","#507786","#87CEEB","#38B0DE","#0BB5FF",
            "#42C0FB","#6996AD","#539DC2","#236B8E","#3299CC","#0198E1","#33A1DE",
            "#607B8B","#35586C","#5D92B1","#8DB6CD","#325C74","#A4D3EE","#82CFFD",
            "#67C8FF","#B0E2FF","#87CEFA","#6CA6CD"])

    //var fill = d3.scaleOrdinal(d3.schemeCategory20);

    d3.layout.cloud().size([500, 600])
            .words(jsonData)
            .padding(1)
            .font("Impact")
            //.rotate(function() { return ~~(Math.random() * 2) * 90; })
            .rotate(function(d) { return 0; })
            .text(function(d) { return d.text; })
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();
 
    function draw(jsonData) {
        console.log("i am in draw function",jsonData); 
        d3.select(selector).append("svg")
                .attr("width", 500)
                .attr("height", 700)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                //.attr("transform", "translate(320,200)")
                .attr("transform", "translate(150,220)")
                .style("fill-opacity", 1)
                .selectAll("text")
                .data(jsonData)
                .enter().append("text")
                .attr('font-family', 'Impact')
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }
  }
 