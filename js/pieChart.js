class PieChart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
      this.config = {
        parentElement: _config.parentElement || "piechart",
        containerWidth: _config.containerWidth || 600,
        containerHeight: _config.containerHeight || 600,
        lineColor: _config.lineColor || 'grey',
        label: _config.label || '',
        title: _config.title || '',
        margin: _config.margin || {top: 50, right: 50, bottom: 50, left: 50}
      };
      this.data = _data;
      this.initVis();
    }
    
    /**
     * Initialize scales/axes and append static chart elements
     */
    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
            .attr("width", vis.config.containerWidth)
            .attr("height", vis.config.containerHeight);

      }

  
    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
        let vis = this;
        
        vis.renderVis();
    };
  
    /**
     * This function contains the D3 code for binding data to visual elements
     * Important: the chart is not interactive yet and renderVis() is intended
     * to be called only once; otherwise new paths would be added on top
     */
    renderVis() {
      let vis = this;

      
    }
  }