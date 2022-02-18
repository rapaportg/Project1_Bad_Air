class StackedBarChart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     * @param {Array}
     * @param {Array}
     */
    constructor(_config, _data, _key, _years) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 1000,
        containerHeight: _config.containerHeight || 600,
        lineColor: _config.lineColor || 'grey',
        label: _config.label,
        title: _config.title,
        margin: _config.margin || {top: 100, right: 150, bottom: 200, left: 75}
      };
      this.data = _data;
      this.keys = _key;
      this.domain = _years;
      this.initVis();
    }
    
    /**
     * Initialize scales/axes and append static chart elements
     */
    initVis() {
    console.log('hit 2');
    let vis = this;
  
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
    vis.xScale = d3.scaleBand()
        .range([0, vis.width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]);
  
      // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale);
  
    vis.yAxis = d3.axisLeft(vis.yScale);
  
      // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);
  
      // Append group element that will contain our actual chart (see margin convention)
    vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top +10})`);

    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`);

      
      // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis');

    vis.stack = d3.stack()
        .keys(vis.keys);
    

    }
  
    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
        let vis = this;

        console.log('hit 3');
        console.log(vis.keys);

        vis.xScale.domain(vis.domain);
        vis.yScale.domain([0,366]);
    
        // Call stack generator on the dataset
        vis.stackedData = vis.stack(vis.data);

      vis.renderVis();
    }
  
    /**
     * This function contains the D3 code for binding data to visual elements
     * Important: the chart is not interactive yet and renderVis() is intended
     * to be called only once; otherwise new paths would be added on top
     */
    renderVis() {
      let vis = this;
      console.log(vis.stackedData);
      console.log(vis.stackedData[[3]][0][1]);

      vis.chart.selectAll('category')
        .data(vis.stackedData)
      .join('g')
        .attr('class', d => `category cat-${d.key}`)
      .selectAll('rect')
        .data(d => { 
            return d;
        })
      .join('rect')
        .attr('x', d => vis.xScale(d.data.Year))
        .attr('y', d => vis.yScale(d[1]))
        .attr('height', d => {
            return vis.yScale(d[0]) - vis.yScale(d[1]); 
        })
        .attr('width', vis.xScale.bandwidth());

    // Update the axes
        vis.xAxisG.call(vis.xAxis).selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    
        vis.yAxisG.call(vis.yAxis);

    }
  }