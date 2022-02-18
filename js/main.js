
console.log("Hello world");
let data;
var dataset = ['Alabama', 'Jackson'];
var stackKeys = ["DaysCO","DaysNO2","DaysOzone","DaysSO2","DaysPM25","DaysPM10"];

const parseTime = d3.timeParse("%Y-%m-%d");

var geoData;
var countyData;

var visObjLeft;
var visObjRight

var map;

var saveVisLeftInputs = function(_state, _county){
  console.log("HIT: saveVis4Inputs")
  var state = _state;//document.getElementById("visleftstate").value;
  var county = _county; //document.getElementById("visleftcounty").value;
  console.log(state + ', ' + county);
  dataset = [_state, _county];
  if (visObjLeft != NaN){
    d3.select("div#slider-time-left g").remove();
    d3.selectAll('p#value-time-left').remove();
    d3.selectAll("rect.vis4-left").remove();
    d3.select('text.vis4-title-left').remove();
    d3.select('svg.slider-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.select('path.chart-line-left').remove();
    d3.selectAll('path').remove();
    d3.select('.vis1-title-left').remove();
    d3.select('.vis1-title-left').remove();
    d3.select('.vis1-title-left').remove();
    d3.selectAll('.axis-left').remove();
    d3.selectAll('.chart-title-left').remove();
    //d3.selectAll('svg.g').remove();
  }
  vis1('#linechartleft', 'left');
  vis2('#linechart2left', 'left');
  vis3('#linechart3left', 'left');
  visObjLeft = vis4('#barchartleft', 'left');
  
  choroplethMap = new ChoroplethMap({ 
    parentElement: '#map'
  }, geoData);
}


var saveVisRightInputs = function(_state, _county){
  console.log("HIT: saveVis4Inputs")
  var state = _state;  //document.getElementById("visrightstate").value;
  var county = _county; //document.getElementById("visrightcounty").value;
  console.log(state + ', ' + county);
  dataset = [state, county];
  if (visObjRight != NaN){
    d3.select("div#slider-time-right g").remove();
    d3.selectAll('p#value-time-right').remove();
    d3.selectAll("rect.vis4-right").remove();
    d3.select('text.vis4-title-right').remove();
    d3.select('svg.slider-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();
    d3.select('path.chart-line-right').remove();

    d3.select('.vis1-title-right').remove();
    d3.select('.vis1-title-right').remove();
    d3.select('.vis1-title-right').remove();
    d3.select('.vis4-title-right').remove();
    d3.selectAll('.axis-right').remove();
    d3.selectAll('.chart-title-right').remove();

  }
  vis1('#linechartright', 'right');
  vis2('#linechart2right', 'right');
  vis3('#linechart3right', 'right');
  visObjRight = vis4('#barchartright', 'right');

  choroplethMap = new ChoroplethMap({ 
    parentElement: '#map'
  }, geoData);
  
}

var vis1 = function(name, side) {
  d3.csv('data/data.csv')
    .then(_data => {
      console.log('Data loading complete. Work with dataset.');
      data = _data;

      var lst = [];

      data.forEach(d => {
        if (d.State == dataset[0] && d.County == dataset[1]){
          d.Year = d.Year + '-01-01';
          d.MedianAQI = parseInt(d.MedianAQI);  // Convert string to Int
          d.MaxAQI = parseInt(d.MaxAQI);
          d.NintyPercentileAQI = parseInt(d.NintyPercentileAQI);  // Convert string to Int
          d.x = parseTime(d.Year);
          //console.log(d);
          lst.push(d);
        }
      });

      //console.log(lst);

      var minArr = [];
      minArr.push(d3.min(lst, d => d.MedianAQI));
      minArr.push(d3.min(lst, d => d.MaxAQI));
      minArr.push(d3.min(lst, d => d.NintyPercentileAQI));
      let yMin = d3.min(minArr);

      var maxArr = [];
      maxArr.push(d3.max(lst, d => d.MedianAQI));
      maxArr.push(d3.max(lst, d => d.MaxAQI));
      maxArr.push(d3.max(lst, d => d.NintyPercentileAQI));
      let yMax = d3.max(maxArr);

      //console.log(data);


      const lineChart1 = new LineChart({
        'parentElement'   :  name,
        'lineColor' : '#8fbc8f',
        'label' : 'Air Quality Index',
        'legend': "Median AQI",
        'title': `vis1-title-${side}`,
        'side': side,
      }, lst, (d)=>d.MedianAQI, yMin, yMax, 3, dataset[0], dataset[1], ["Air Quality Index Of ","From 1980 - 2021"]);

      
      lineChart1.updateVis();

      const lineChart2 = new LineChart({
        'parentElement'   :  name,
        'lineColor': '#9370db',
        'label' : "",
        'legend' : 'Max AQI',
        'title': `vis1-title-${side}`,
        'side': side,
      }, lst, (d)=>d.MaxAQI, yMin, yMax, 1, dataset[0], dataset[1],["Air Quality Index Of ","From 1980 - 2021"]);

      lineChart2.updateVis();


      const lineChart3 = new LineChart({
        'parentElement'   :  name,
        'lineColor': '#d2691e',
        'label' : "",
        'legend': "90th Percentile AQI",
        'title': `vis1-title-${side}`,
        'side': side,
      }, lst, (d)=>d.NintyPercentileAQI, yMin, yMax, 2, dataset[0], dataset[1],["Air Quality Index Of ","From 1980 - 2021"]);

      lineChart3.updateVis();
  })
  .catch(error => {
      console.error('Error loading the data');
  });
}

var vis2 = function(name, side) {
  d3.csv('data/data.csv')
    .then(_data => {
      console.log('Hamilton.csv Data loading complete. Work with dataset.');
      data = _data;
      var lst = [];

      data.forEach(d => {
        if (dataset[0] == d.State && dataset[1] == d.County)
        {
          d.Year = d.Year + '-01-01';
          d.x = parseTime(d.Year);
          d.DaysCO = parseInt(d.DaysCO);
          d.DaysNO2 = parseInt(d.DaysNO2);
          d.DaysOzone = parseInt(d.DaysOzone);
          d.DaysSO2 = parseInt(d.DaysSO2);
          d.DaysPM25 = parseInt(d.DaysPM25);
          d.DaysPM10 = parseInt(d.DaysPM10);
          lst.push(d);
        }
      });

      console.log(lst);

      var minArr = [];
      minArr.push(d3.min(lst, d => d.DaysCO));
      minArr.push(d3.min(lst, d => d.DaysNO2));
      minArr.push(d3.min(lst, d => d.DaysOzone));
      minArr.push(d3.min(lst, d => d.DaysSO2));
      minArr.push(d3.min(lst, d => d.DaysPM25));
      minArr.push(d3.min(lst, d => d.DaysPM10));
      let yMin = d3.min(minArr);

      var maxArr = [];
      maxArr.push(d3.max(lst, d => d.DaysCO));
      maxArr.push(d3.max(lst, d => d.DaysNO2));
      maxArr.push(d3.max(lst, d => d.DaysOzone));
      maxArr.push(d3.max(lst, d => d.DaysSO2));
      maxArr.push(d3.max(lst, d => d.DaysPM25));
      maxArr.push(d3.max(lst, d => d.DaysPM10));
      let yMax = d3.max(maxArr);

      

      // const lineChart1 = new LineChart({
      //   'parentElement'   :  '#linechart',
      //   'lineColor' : '#8fbc8f',
      //   'label' : 'Air Quality Index',
      //   'title' : "Air Quality Index Of Hamilton County From 1980 - 2021",
      //   'legend': "Median AQI",
      // }, data, (d)=>d.MedianAQI, yMin, yMax, 3);

      console.log(yMin);
      console.log(yMax);


      const lineChartDaysCO = new LineChart({
        'parentElement'   :  name,
        'lineColor' : '#8fbc8f',
        'label' : 'Number of Days',
        'legend': "Days CO",
        'title': `vis2-title-${side}`,
        'side': side,
      }, lst, (d) => d.DaysCO, yMin, yMax, 1, dataset[0], dataset[1], ["Number of Days Where a Pollutant Was The Main Pollutant (1980 - 2021)", " "]);


      const lineChartDaysNO2 = new LineChart({
        'parentElement'   :  name,
        'lineColor' : '#CD6155',
        'label' : 'Number of Days',
        'title': `vis2-title-${side}`,
        'side': side,
        'legend': "Days NO2",
      }, lst, (d) => d.DaysNO2, yMin, yMax, 2, dataset[0], dataset[1],  ["Number of Days Where a Pollutant Was The Main Pollutant (1980 - 2021)", " "]);

      const lineChartDaysOzone = new LineChart({
        'parentElement'   :  name,
        'lineColor' : '#FFC300',
        'label' : 'Number of Days',
        'title': `vis2-title-${side}`,
        'side': side,
        'legend': "Days Ozone",
      }, lst, (d) => d.DaysOzone, yMin, yMax, 3, dataset[0], dataset[1], ["Number of Days Where a Pollutant Was The Main Pollutant (1980 - 2021)", " "]);

      const lineChartDaysSO2 = new LineChart({
        'parentElement'   :  name,
        'lineColor' : '#9B59B6',
        'label' : 'Number of Days',
        'title': `vis2-title-${side}`,
        'side': side,
        'legend': "Days Ozone",
      }, lst, (d) => d.DaysSO2, yMin, yMax, 4, dataset[0], dataset[1], ["Number of Days Where a Pollutant Was The Main Pollutant (1980 - 2021)", " "]);

      const lineChartDaysPM25= new LineChart({
        'parentElement'   :  name,
        'lineColor' : '#5DADE2',
        'label' : 'Number of Days',
        'title': `vis2-title-${side}`,
        'side': side,
        'legend': "Days PM2.5",
      }, lst, (d) => d.DaysPM25, yMin, yMax, 5, dataset[0], dataset[1], ["Number of Days Where a Pollutant Was The Main Pollutant (1980 - 2021)", " "]);

      const lineChartDaysPM10= new LineChart({
        'parentElement'   :  name,
        'lineColor' : '#FF0033',
        'label' : 'Number of Days',
        'title': `vis2-title-${side}`,
        'side': side,
        'legend': "Days PM10",
      }, lst, (d) => d.DaysPM10, yMin, yMax, 6, dataset[0], dataset[1], ["Number of Days Where a Pollutant Was The Main Pollutant (1980 - 2021)", " "]);
      
      lineChartDaysCO.updateVis();
      lineChartDaysNO2.updateVis();
      lineChartDaysOzone.updateVis();
      lineChartDaysSO2.updateVis();
      lineChartDaysPM25.updateVis();
      lineChartDaysPM10.updateVis();
    })
  .catch(error => {
    console.error(error);
  });
}

// program to check leap year
function checkLeapYear(year) {

  //three conditions to find out the leap year
  if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
      return true;
  } else {
      return false;
  }
}


var vis3 = function(name, side) {
  d3.csv('data/data.csv')
    .then(_data => {
      data = _data;
      var lst = [];
      var days = 365;
      data.forEach(d => {
         
          if (checkLeapYear(parseInt(d.Year)))
          {
            days = 366;
          }
          if (d.State == dataset[0] && d.County == dataset[1])
          {
            d.Year = d.Year + '-01-01';
            d.x = parseTime(d.Year);
            d.DaysCO = parseInt(d.DaysCO);
            d.DaysNO2 = parseInt(d.DaysNO2);
            d.DaysOzone = parseInt(d.DaysOzone);
            d.DaysSO2 = parseInt(d.DaysSO2);
            d.DaysPM25 = parseInt(d.DaysPM25);
            d.DaysPM10 = parseInt(d.DaysPM10);
            
            d.daysWithoutMeasurement = days - d.DaysCO - d.DaysNO2 - d.DaysOzone - d.DaysPM10 - d.DaysPM25 - d.DaysSO2;
            lst.push(d);
          }

          
        });
        days = d3.max(lst, d => d.daysWithoutMeasurement);
        console.log(days);

        const daysWithoutMeasurement= new LineChart({
          'parentElement'   :  name,
          'containerWidth'  : 800,
          'lineColor' : '#FF0033',
          'label' : 'Number of Days',
          'title': `vis3-title-${side}`,
          'side': side,
          'legend': ' ',
        }, lst, (d) => d.daysWithoutMeasurement, 0, days, 1, dataset[0], dataset[1], [`Days Without Air Quality Measurements in `, " Per Year "]);
        
        daysWithoutMeasurement.updateVis()


    })
}


var vis4 = function(name, side){
  d3.csv('data/data.csv')
    .then(_data => {
      console.log('data.csv Data loading complete. Work with dataset.');
      data = _data;

      return barChart = new BarChart({
        'parentElement' : name,
        'containerWidth' : 800,
        'containerHeight' : 600,
        'ylabel' : "Number of Days",
        'title': `barchart-title-${side}`,
        'side': side,
      }, data, d => d.name, d => d.value, dataset[0], dataset[1]);

      // barChart.updateVis(dataset[0], dataset[1]);
      //barChart.updateVis(dataset[0], dataset[1]);
    })

  .catch(error => {
    console.error(error);
  });
}




var vis5 = function(){
  Promise.all([
    d3.json('data/counties-10m.json'),
    d3.csv('data/mapData.csv'),
  ]).then(_data => {
    // geoData = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);

    geoData = _data[0];
    countyData = _data[1];

    geoData.objects.counties.geometries.forEach(d => {
      d.properties.MedianAQI = null;
    });

    //console.log(geoData);
//
    geoData.objects.counties.geometries.forEach(d => {

     // d.properties.value = Math.random();
      //console.log(d);
      for (let i = 0; i < countyData.length; i++) {
      
        if (parseInt(d.id) == parseInt(countyData[i].cnty_fips) && countyData[i].Year == '1980') {
          d.properties.MedianAQI = parseInt(countyData[i].MedianAQI);
          // d.properties.MedianAQI = +countyData[i].MedianAQI;
          // d.properties.DaysCO = +countyData[i].DaysCO;
          // d.properties.DaysNO2 = +countyData[i].DaysNO2;
          // d.properties.DaysOzone = +countyData[i].DaysOzone;
          // d.properties.DaysPM10 = +countyData[i].DaysPM10;
          // d.properties.DaysPM25 = +countyData[i].DaysPM25;
          // d.properties.DaysSO2 = +countyData[i].DaysSO2;

          //console.log(d.properties);
        }
        
      }
    });

})
.catch(error => console.error(error));

}
vis5();



