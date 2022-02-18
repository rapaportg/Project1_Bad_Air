class LineChart {

    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 500,
            margin: {top: 10, right: 50, bottom: 40, left: 50}
        }
    this.data = _data;
    this.initVis();
    }

    initVis() {
        // setting up the chart. not affected by user action
        console.log("Let's draw a line chart");
        console.log(d3.extent(vis.data.Year));

        let vis = this;

        // Width and height as the inner dimensions of the chart area- as before
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
        
        vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight)

        vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);

        // Initialize linear and ordinal scales (input domain and output range)
        vis.xScale = d3.scaleTime()
            .domain(d3.extent(vis.data, d => d3.timeParse("%Y")(d.Year)))
            .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
            .domain(d3.extent(vis.data, d => d.MedianAQI)) 
            .range([0,vis.height]);
        
        // Initialize axes
        vis.yAxis = d3.axisLeft(vis.yScale);
        vis.xAxis = d3.axisBottom(vis.xScale);

        // Draw the axis
        vis.yAxisG = vis.chart.append('g')
         .attr('class', 'axis y-axis')
         .call(vis.yAxis);


        console.log("hit 1");

        vis.xAxisG = vis.chart.append('g')
         .attr('class', 'axis x-axis')
         .attr("transform", "translate(0," + vis.height + ")")
         .call(vis.xAxis);

    
        console.log('hit 2');

        // vis.xLabel = vis.chart.append("text")
        //  .attr("text-anchor", "end")
        //  .attr("x", width)
        //  .attr("y", height + margin.top + 20)
        //  .text("X axis title");

       
     // Y axis label:
        // vis.yLabel = vis.chart.append("text")
        //  .attr("text-anchor", "end")
        //  .attr("transform", "rotate(-90)")
        //  .attr("y", -margin.left+20)
        //  .attr("x", -margin.top)
        //  .text("Y axis title")

        console.log('hit 3');

        // vis.xValue = d => d.Year;
        // vis.yValue = d => d.MedianAQI;

        // vis.line = d3.line()
        //     .x(d => vis.xScale(vis.xValue(d)))
        //     .y(d => vis.yScale(vis.yValue(d)));

        
            
        vis.updateVis();

    }
    
    updateVis() {
        console.log('hit 4');

        let vis = this;
    
        vis.xValue = d => {
            console.log(d.Year);
            return d3.timeParse("%Y")(d.Year);
        }
        vis.yValue = d => {
            console.log(d.MedianAQI);
            return d.MedianAQI;
        }

        console.log('hit 5');
    
        // Initialize area generator

        vis.line = d3.line()
            .x(d => vis.xValue(d))
            .y(d => vis.yValue(d));


        console.log('hit 6');
    
        // Set the scale input domains
        vis.xScale.domain(d3.extent(vis.data, vis.xValue));
        vis.yScale.domain(d3.extent(vis.data, vis.yValue));

        console.log('hit 7');
    
        vis.renderVis();
    }

    renderVis() {
        let vis = this;
    
        // Add line path
        vis.chart.append('path')
            .data([vis.data])
            .attr('class', vis.parentElement)
            .attr('d', vis.line);

        console.log('hit 8');
        
        // Update the axes
        // vis.xAxisG.call(vis.xAxis);
        // vis.yAxisG.call(vis.yAxis);

        console.log('hit 9');
    }

}