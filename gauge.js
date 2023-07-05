// JS 
var options = { 
    debug: true, 
    xAxis_scale: { 
      type: 'time', 
      range_padding: 0.07 
    }, 
    legend_visible: false, 
    defaultSeries: { 
      type: 'line', 
      defaultPoint_marker: { 
        size: 20, 
        type: 'none'
      } 
    }, 
    series: [ 
      { 
        name: 'Purchases', 
        color: 'gray', 
        points: [ 
          { x: '1/1/2020', y: 29.9 }, 
          { x: '1/2/2020', y: 71.5 }, 
          { x: '1/3/2020', y: 106.4 }, 
          { x: '1/6/2020', y: 129.2 }, 
          { x: '1/7/2020', y: 144.0 }, 
          { x: '1/8/2020', y: 176.0 }, 
          { x: '1/9/2020', y: 123 }, 
          { x: '1/10/2020', y: 112 }, 
          { x: '1/11/2020', y: 89 }, 
          { x: '1/12/2020', y: 72 }, 
          { x: '1/13/2020', y: 95 }, 
          { x: '1/14/2020', y: 110 }, 
          { x: '1/15/2020', y: 85 } 
        ] 
      } 
    ] 
  }; 
  var ascendingStyle = { 
    marker_type: 'arrow-up', 
    color: 'green'
  }; 
  var descendingStyle = { 
    marker_type: 'arrow-down', 
    color: 'red'
  }; 
  var previousPoint; 
    
  var chart = JSC.chart( 
    'chartDiv', 
    options, 
    function(c) { 
      c.series(0) 
        .points() 
        .reverse() 
        .each(function(p, i) { 
          if (previousPoint && i) { 
            var isAsc = 
              previousPoint.options('y') > 
              p.options('y'); 
            p.options( 
              isAsc 
                ? ascendingStyle 
                : descendingStyle, 
              true
            ); 
          } else { 
            p.options( 
              { marker_visible: false }, 
              true
            ); 
          } 
          previousPoint = p; 
        }); 
    } 
  ); 