
var dataTime = d3.range(0, 42).map(function(d) {
    return new Date(1980 + d, 1, 1);
  });

//var parseTime2 = d3.timeParse("%Y");

class BarChart {
    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     * @function
     */
    constructor(_config, _data, _xValue, _yValue, _state, _county) {
        // Configuration object with defaults
        // Important: depending on your vis and the type of interactivity you need
        // you might want to use getter and setter methods for individual attributes
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 700,
            containerHeight: _config.containerHeight || 1000,
            ylabel: _config.ylabel,
            title: _config.title,
            side: _config.side,
            margin: _config.margin || {top: 100, right: 100, bottom: 145, left: 100}
        }
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.allData = _data;
        this.selected_state = _state;
        this.selected_county = _county;
        this.initVis();

    }

    initVis() {
        let vis = this;

        // vis.selected_county = 'Hamilton';
        // vis.selected_state = 'Ohio';
        vis.selected_year = '2021';

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
    
        // Initialize scales
        vis.xScale = d3.scaleBand()
            .range([0, vis.width])
            .paddingInner(0.2);
    
        vis.yScale = d3.scaleLinear()
            .domain([0,366])
            .range([vis.height,0]);
            

        vis.sliderTime = d3
        .sliderBottom()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        .step(1000 * 60 * 60 * 24 * 365)
        .width(600)
        .ticks(10)
        .tickValues([new Date(1980, 1, 1).getTime(), new Date(1990, 1, 1), new Date(2000, 1, 1), new Date(2010,1 ,1), new Date(2021,1,1).getTime()])
        .tickFormat(d3.timeFormat('%Y'))
        .default(new Date(2021, 1, 1))
        .on('onchange', val => {
          vis.selected_year = d3.timeFormat('%Y')(val);
        //   console.log(vis.selected_year);
          d3.select('p#value-time')
          .text(d3.timeFormat('%Y')(val));
          
          vis.updateVis();
          vis.gTime;
        });

        console.log(vis.selected_year);

        vis.selected_year = d3.timeFormat('%Y')(vis.sliderTime.value());

        vis.gTime = d3.select(`div#slider-time-${vis.config.side}`).append('svg')
        .attr('class', `slider-${vis.config.side}`)
        .attr('width', vis.config.containerWidth)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(100,30)')
        .call(vis.sliderTime);

        vis.timeValue =  d3
            .select(`p#value-time-${vis.config.side}`)
            .text(d3.timeFormat('%Y')(vis.sliderTime.value()));


        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            .ticks(6)
            .tickSizeOuter(0);
    
        vis.yAxis = d3.axisLeft(vis.yScale)
            .tickSizeOuter(0);
    
        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);
    

        vis.vis4div = d3.select('#vis4div');
       
        // Append group element that will contain our actual chart 
        // and position it according to the given margin config
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
    
        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);
        
        // Append y-axis group 
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .attr('transform', `translate(0,0)`);
    
        // Append titles, legends and other static elements here
        // ...

        vis.yAxisLabelG = vis.chart.append('g')
            .attr('class', 'axis y-axis-label')
            .append('text')
            .attr('transform', `translate(-50, ${(vis.height/2)})rotate(-90)`)
            .text(vis.config.ylabel);

        vis.title = vis.chart.join('g')
            .attr('class', 'vis4-title')
            .append('text')
            .attr('transform', `translate(${vis.config.margin.left - 50}, -20)`)
            .text(`Number of days in ${vis.selected_year} of each Air Quailty Type for ${vis.selected_county}, ${vis.selected_state}`);

        
       // var selected_year = '2021';

        console.log(d3.timeFormat('%Y')(vis.sliderTime.value()));

        vis.data = [];
  
        vis.allData.forEach(d => {

        if (d.County == vis.selected_county && d.State == vis.selected_state && d.Year == vis.selected_year){

            d.DayswithAQI = parseInt(d.DayswithAQI);
            d.GoodDays =  parseInt(d.GoodDays);
            vis.data.push({name: "Good Days", value: d.GoodDays});
            d.ModerateDays = parseInt(d.ModerateDays);
            vis.data.push({name: "Moderate Days", value: d.ModerateDays});
            d.UnhealthyforSensitiveGroupsDays = parseInt(d.UnhealthyforSensitiveGroupsDays);
            vis.data.push({name: "Unhealthy for Sensitive Group Days", value: d.UnhealthyforSensitiveGroupsDays});
            d.UnhealthyDays = parseInt(d.UnhealthyDays);
            vis.data.push({name: "Unhealthy Days", value: d.UnhealthyDays});
            d.VeryUnhealthyDays = parseInt(d.VeryUnhealthyDays);
            vis.data.push({name: "Very Unhealthy Days", value: d.VeryUnhealthyDays});
            d.HazardousDays = parseInt(d.HazardousDays);
            vis.data.push({name: "Hazardous Days", value: d.HazardousDays});
        } 
        });

        vis.updateVis();
    }
  
    /**
     * This function contains all the code to prepare the data before we render it.
     * In some cases, you may not need this function but when you create more complex visualizations
     * you will probably want to organize your code in multiple functions.
     */
    updateVis() {
        let vis = this;
        vis.data = [];

        vis.allData.forEach(d => {

        if (d.County == vis.selected_county && d.State == vis.selected_state && d.Year == vis.selected_year){

            d.DayswithAQI = parseInt(d.DayswithAQI);
            d.GoodDays =  parseInt(d.GoodDays);
            vis.data.push({name: "Good Days", value: d.GoodDays});
            d.ModerateDays = parseInt(d.ModerateDays);
            vis.data.push({name: "Moderate Days", value: d.ModerateDays});
            d.UnhealthyforSensitiveGroupsDays = parseInt(d.UnhealthyforSensitiveGroupsDays);
            vis.data.push({name: "Unhealthy for Sensitive Group Days", value: d.UnhealthyforSensitiveGroupsDays});
            d.UnhealthyDays = parseInt(d.UnhealthyDays);
            vis.data.push({name: "Unhealthy Days", value: d.UnhealthyDays});
            d.VeryUnhealthyDays = parseInt(d.VeryUnhealthyDays);
            vis.data.push({name: "Very Unhealthy Days", value: d.VeryUnhealthyDays});
            d.HazardousDays = parseInt(d.HazardousDays);
            vis.data.push({name: "Hazardous Days", value: d.HazardousDays});
        } 

        });

        

        // Set the scale input domains
        vis.xScale.domain(vis.data.map(vis.xValue));

        //vis.gTime.call(vis.sliderTime);
        //vis.vis4div.append('input').attr('type', 'text').attr('name', 'vis4state').attr('value', 'Enter_State');
        vis.renderVis();
    }

    
  
    /**
     * This function contains the D3 code for binding data to visual elements.
     * We call this function every time the data or configurations change 
     * (i.e., user selects a different year)
     */
    renderVis() {
        let vis = this;
        
        // Add rectangles
        //console.log(vis.data);
        vis.chart.selectAll('.bar')
            .data(vis.data)
            .join('rect')
            .attr('class', `bar vis4-${vis.config.side}`)
            .attr('width', vis.xScale.bandwidth())
            .attr('height', d => {
                //console.log(d);
                return vis.height - vis.yScale(vis.yValue(d));
            })
            .attr('y', d => vis.yScale(vis.yValue(d)))
            .attr('x', d => vis.xScale(vis.xValue(d)));
        
        // Update the axes because the underlying scales might have changed
        vis.xAxisG.call(vis.xAxis).selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "0em")
            .attr("transform", "rotate(-35)");

        vis.title.join('text')
            .attr('class', `vis4-title-${vis.config.side}`)
            .attr('transform', `translate(${vis.config.margin.left - 50}, -20)`)
            .text(`Number of days in ${vis.selected_year} of each Air Quailty Type for ${vis.selected_county}, ${vis.selected_state}`);

        vis.yAxisG.call(vis.yAxis);
        vis.gTime.call(vis.sliderTime);

        
    }
  }