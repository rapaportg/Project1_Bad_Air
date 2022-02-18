class LineChart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     * @param {Function}
     */
    constructor(_config, _data, _yValue, _yMin, _yMax, _count, _state, _county, _title) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 700,
        containerHeight: _config.containerHeight || 600,
        lineColor: _config.lineColor || 'grey',
        label: _config.label,
        legend: _config.legend,
        title: _config.title,
        side: _config.side,
        margin: _config.margin || {top: 100, right: 200, bottom: 50, left: 75}
      }
      this.data = _data;
      this.yValue = _yValue;
      this.yMin = _yMin;
      this.yMax = _yMax;
      this.count = _count;
      this.state = _state;
      this.county = _county;
      this.title = _title;
      this.initVis();
    }
    
    /**
     * Initialize scales/axes and append static chart elements
     */
    initVis() {
      let vis = this;

      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
      vis.xScale = d3.scaleTime()
        .range([0, vis.width]);

      vis.yScale = d3.scaleLinear()
        .range([vis.height, 0])
        .nice();
  
      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale);
  
      vis.yAxis = d3.axisLeft(vis.yScale)
  
      // Define size of SVG drawing area
      vis.svg = d3.select(vis.config.parentElement)
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight);
  
      // Append group element that will contain our actual chart (see margin convention)
      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top +10})`);
    
      vis.chartTitle = vis.svg.join('g')
          .append('text')
          .attr('class', `chart-title-${vis.config.side}`)
          .attr('transform', `translate(${50}, 70)`)
          .text(vis.title[0] + `\n${vis.county}, ${vis.state} ` + vis.title[1]);

     

    //   vis.chart = vis.svg.append('text')
    //         .attr('x', vis.config.margin.left)
    //         .attr('y', vis.config.containerHeight / 2)
    //         .attr("transform", "rotate(-90)")
    //         .text(vis.config.label);

  
      // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
        .attr('class', `axis-${vis.config.side} x-axis`)
        .attr('transform', `translate(0,${vis.height})`);

    vis.yAxisLabelG = vis.chart.append('g')
        .attr('class', `axis-${vis.config.side} x-axis-label`)
        .append('text')
            .attr('transform', `translate(${(vis.width/2)}, ${(vis.height + 40)})`)
            .text('Year');
    
      
      // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
        .attr('class', `axis-${vis.config.side} y-axis`);


    var strlen = vis.config.label.length;

    vis.yAxisLabelG = vis.chart.append('g')
      .attr('class', `axis-${vis.config.side} y-axis-label`)
      .append('text')
        .attr('transform', `translate(-50, ${(vis.height/2 + strlen*2)})rotate(-90)`)
        .text(vis.config.label);

    if (vis.config.legend != " "){
      console.log(vis.config.title);
      vis.legend = vis.svg.select('g')
          .attr('class', 'linechart linechart-legend')
          .append('circle')
              .attr('transform', `translate(${vis.width + 40 }, ${(vis.height/3) + (25*vis.count)})`)
              .attr('r', 8)
              .style('fill', vis.config.lineColor);
      
      vis.legendLabel = vis.svg.select('g')
          .attr('class', 'linechart linechart-legend-label')
          .append('text')
              .attr('transform', `translate(${vis.width + 60 }, ${((vis.height/3)+4) + (25*vis.count)})`)
              .attr('r', 7)
              .style('fill', vis.config.lineColor)
              .text(vis.config.legend);
      }


      

    
    }
  
    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
      let vis = this;
      
      vis.xValue = d => d.x;
      //vis.yValue = d => vis.yValue(d);
  
      // Initialize area generator
      vis.line = d3.line()
          .x(d => vis.xScale(vis.xValue(d)))
          .y(d => vis.yScale(vis.yValue(d)));
  
      // Set the scale input domains
      vis.xScale.domain(d3.extent(vis.data, vis.xValue));
      vis.yScale.domain([vis.yMin, vis.yMax]);
  
      vis.renderVis();
    }
  
    /**
     * This function contains the D3 code for binding data to visual elements
     * Important: the chart is not interactive yet and renderVis() is intended
     * to be called only once; otherwise new paths would be added on top
     */
    renderVis() {
      let vis = this;
  
      // Add line path
      
      vis.chart.append('path')
          .data([vis.data])
          .attr('stroke', vis.config.lineColor)
          .attr('class', `chart-line-${vis.config.side}` )
          .attr('d', vis.line);


      
      // Update the axes
      vis.xAxisG.call(vis.xAxis);
      vis.yAxisG.call(vis.yAxis);
    }
  }