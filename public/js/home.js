var myVar = setInterval(myTimer, 500);
function myTimer()
{
    socket.emit("Client-send-data", "Request data client");
}

 // Chương trình con đọc dữ liệu lên IO Field
function gauge_temp_1(idg,data_pre) {
    var  value_gauge=0;
       socket.on(data_pre, function (data)
        { 
   
          value_gauge=data;  
        
         var a =value_gauge.toFixed(1);
         value_gauge=parseFloat(a);
         
  
        });
    var chart = JSC.chart(idg, 
  
      {
        debug: true,
   
        legend_visible: false,
        defaultTooltip_enabled: false,
        xAxis_spacingPercentage: 0.4,
        yAxis: [
          {
            id: 'ax1',
            defaultTick: { padding: 10, enabled: false },
            customTicks: [300, 350, 400, 450],
      
            line: {
              width: 5,
              /*Defining the option will enable it.*/
              breaks: {},   
              /*Palette is defined at series level with an ID referenced here.*/
              color: 'smartPalette:pal1'
            },
            scale_range: [300, 450]
          },
        ],
        
        defaultSeries: {
          type: 'gauge column roundcaps',
          shape: {
           
            label: {
              text: '%max',
              align: 'center',
              verticalAlign: 'middle',
              style_fontSize: 12,
              color:"#000"
            }
          }
        },
    
        series: [
          {
            type: 'column roundcaps',
            name: 'Temperatures',
            yAxis: 'ax1',
            
            palette: {
              
              id: 'pal1',
              pointValue: '%yValue',
              ranges: [
                { value: 300, color: '#FFD221' },
                { value: 350, color: '#21D683' }, 
  
                { value: [400, 450], color: '#FF5353' }
              ]
            },
            fill: ['red', true] // Disable shading effect and set solid color
          },
        ]
      });
      var  INTERVAL_ID = setInterval(function() { 
        chart.options({ 
       
          series: [
            {
              
              palette: {
         
                pointValue: '%yValue',
                ranges: [
                  { value: 300, color: '#FFD221' },
                  { value: 350, color: '#21D683' }, 
    
                  { value: [400, 450], color: '#FF5353' }
                ]
              },
              points: [['x', [300, value_gauge]]]
            },
          ]
          }); 
        }, 500);  
  
  }
  
  function gauge_temp_2(idg,data_pre) {
    var  value_gauge=0;
   
    
       socket.on(data_pre, function (data)
        { 
   
          value_gauge=data;  
        
         var a =value_gauge.toFixed(1);
         value_gauge=parseFloat(a);
         
  
        });
    var chart = JSC.chart(idg, 
  
      {
        debug: true,
        legend_visible: false,
        defaultTooltip_enabled: false,
        xAxis_spacingPercentage: 0.4,
        yAxis: [
          {
            id: 'ax1',
            defaultTick: { padding: 10, enabled: false },
            customTicks: [160, 200, 240, 280],
            line: {
              width: 5,

              breaks: {},   

              color: 'smartPalette:pal1'
            },
            scale_range: [160, 280]
          },
        ],
        defaultSeries: {
          type: 'gauge column roundcaps',
          shape: {
            label: {
              text: '%max',
              align: 'center',
              verticalAlign: 'middle',
              style_fontSize: 12,
              color:"#000"
            }
          }
        },
        series: [
          {
            type: 'column roundcaps',
            name: 'Temperatures',
            yAxis: 'ax1',
            palette: {
              id: 'pal1',
              pointValue: '%yValue',
              ranges: [
                { value: 160, color: '#FFD221' },
                { value: 200, color: '#21D683' }, 
  
                { value: [240, 280], color: '#FF5353' }
              ]
            },
          },
        ]
      });
      
      var  INTERVAL_ID = setInterval(function() { 
        chart.options({ 
          series: [
            {
              palette: {
  
                pointValue: '%yValue',
                ranges: [
                  { value: 160, color: '#FFD221' },
                  { value: 200, color: '#21D683' }, 
    
                  { value: [240, 280], color: '#FF5353' }
                ]
              },
              points: [['x', [160, value_gauge]]]
            },
          ]
          }); 
        }, 500);  
  
  }
  
  function gauge_temp_3(idg,data_pre) {
    var  value_gauge=0;
   
    
       socket.on(data_pre, function (data)
        { 
   
          value_gauge=data;  
        
         var a =value_gauge.toFixed(1);
         value_gauge=parseFloat(a);
        });
    var chart = JSC.chart(idg, 
  
      {
        debug: true,
        legend_visible: false,
        defaultTooltip_enabled: false,
        xAxis_spacingPercentage: 0.4,
        yAxis: [
          {
            id: 'ax1',
            defaultTick: { padding: 10, enabled: false },
            customTicks: [0, 40, 80,120],
            line: {
              width: 5,
              /*Defining the option will enable it.*/
              breaks: {},   
              /*Palette is defined at series level with an ID referenced here.*/
              color: 'smartPalette:pal1'
            },
            scale_range: [0, 120]
          },
        ],
        defaultSeries: {
          type: 'gauge column roundcaps',
          shape: {
            label: {
              text: '%max',
              align: 'center',
              verticalAlign: 'middle',
              style_fontSize: 12,
              color:"#000"
            }
          }
        },
        series: [
          {
            type: 'column roundcaps',
            name: 'Temperatures',
            yAxis: 'ax1',
            palette: {
              id: 'pal1',
              pointValue: '%yValue',
              ranges: [
  
                { value: [0, 120], color: '#21D683' }
              ]
            },
          },
        ]
      });
      
      var  INTERVAL_ID = setInterval(function() { 
        chart.options({ 
          series: [
            {
              palette: {
  
                pointValue: '%yValue',
                ranges: [
    
                  { value: [0, 120], color: '#21D683' }
                ]
              },
              points: [['x', [0, value_gauge]]]
            },
          ]
          }); 
        }, 500);  
  }


  function gauge_power(idg,data_pre) {
    var  value_gauge=0;
       socket.on(data_pre, function (data)
        { 
   
          value_gauge=data;  
        
         var a =value_gauge.toFixed(3);
         value_gauge=parseFloat(a); 
        });
    var chart = JSC.chart(idg, 
  
      {
        debug: true,
   
        legend_visible: false,
        defaultTooltip_enabled: false,
        xAxis_spacingPercentage: 0.4,
        yAxis: [
          {
            id: 'ax1',
            defaultTick: { padding: 10, enabled: false },
            customTicks: [0, 5000, 10000, 15000],
      
            line: {
              width: 5,
              /*Defining the option will enable it.*/
              breaks: {},   
              /*Palette is defined at series level with an ID referenced here.*/
              color: 'smartPalette:pal1'
            },
            scale_range: [0, 15000]
          },
        ],
        
        defaultSeries: {
          type: 'gauge column roundcaps',
          shape: {
           
            label: {
              text: '%max',
              align: 'center',
              verticalAlign: 'middle',
              style_fontSize: 15,
              // color:"white"
            }
          }
        },
    
        series: [
          {
            type: 'column roundcaps',
            name: 'Temperatures',
            yAxis: 'ax1',
            
            palette: {
              
              id: 'pal1',
              pointValue: '%yValue',
              ranges: [
  
                { value: [0, 15000], color: '#21D683' }
              ]
            },
          },
        ]
      });
  
      
      
      var  INTERVAL_ID = setInterval(function() { 
        chart.options({ 
       
          series: [
            {
              
              palette: {
         
                pointValue: '%yValue',
                ranges: [
  
                    { value: [0, 15000], color: '#21D683' }
                  ]
              },
              points: [['x', [0, value_gauge]]]
            },
          ]
          }); 
        }, 500);  
  
  }



  function gauge_power_total(idg,data_pre) {
    var  value_gauge=0;
       socket.on(data_pre, function (data)
        { 
   
          value_gauge=data;  
        
         var a =value_gauge.toFixed(3);
         value_gauge=parseFloat(a);
         
  
        });
    var chart = JSC.chart(idg, 
  
      {
        debug: true,
   
        legend_visible: false,
        defaultTooltip_enabled: false,
        xAxis_spacingPercentage: 0.4,
        yAxis: [
          {
            id: 'ax1',
            defaultTick: { padding: 10, enabled: false },
            customTicks: [20000, 30000, 40000, 50000],
      
            line: {
              width: 5,
              /*Defining the option will enable it.*/
              breaks: {},   
              /*Palette is defined at series level with an ID referenced here.*/
              color: 'smartPalette:pal1'
            },
            scale_range: [20000, 50000]
          },
        ],
        
        defaultSeries: {
          type: 'gauge column roundcaps',
          shape: {
           
            label: {
              text: '%max',
              align: 'center',
              verticalAlign: 'middle',
              style_fontSize: 15,
              color:"white"
            }
          }
        },
    
        series: [
          {
            type: 'column roundcaps',
            name: 'Temperatures',
            yAxis: 'ax1',
            
            palette: {
              
              id: 'pal1',
              pointValue: '%yValue',
              ranges: [
  
                { value:  [20000, 50000], color: '#21D683' }
              ]
            },
          },
        ]
      });
  
      
      
      var  INTERVAL_ID = setInterval(function() { 
        chart.options({ 
       
          series: [
            {
              
              palette: {
         
                pointValue: '%yValue',
                ranges: [
  
                    { value:  [20000, 50000], color: '#21D683' }
                  ]
              },
              points: [['x', [20000, value_gauge]]]
            },
          ]
          }); 
        }, 500);  
  
  }

  function gauge_energy_total(idg,data_pre) {
    var  value_gauge=0;
       socket.on(data_pre, function (data)
        { 
   
          value_gauge=data;  
        
         var a =value_gauge.toFixed(0);
         value_gauge=parseFloat(a);
         
  
        });
    var chart = JSC.chart(idg, 
  
      {
        debug: true,
   
        legend_visible: false,
        defaultTooltip_enabled: false,
        xAxis_spacingPercentage: 0.4,
        yAxis: [
          {
            id: 'ax1',
            defaultTick: { padding: 10, enabled: false },
            customTicks: [0, 3000,6000,9000,12000],
      
            line: {
              width: 5,
              /*Defining the option will enable it.*/
              breaks: {},   
              /*Palette is defined at series level with an ID referenced here.*/
              color: 'smartPalette:pal1'
            },
            scale_range: [0, 12000]
          },
        ],
        
        defaultSeries: {
          type: 'gauge column roundcaps',
          shape: {
           
            label: {
              text: '%max',
              align: 'center',
              verticalAlign: 'middle',
              style_fontSize: 15,
              color:"white"
            }
          }
        },
    
        series: [
          {
            type: 'column roundcaps',
            name: 'Temperatures',
            yAxis: 'ax1',
            
            palette: {
              
              id: 'pal1',
              pointValue: '%yValue',
              ranges: [
  
                { value:  [0, 12000], color: '#21D683' }
              ]
            },
          },
        ]
      });
  
      
      
      var  INTERVAL_ID = setInterval(function() { 
        chart.options({ 
       
          series: [
            {
              
              palette: {
         
                pointValue: '%yValue',
                ranges: [
  
                    { value:  [0, 12000], color: '#21D683' }
                  ]
              },
              points: [['x', [0, value_gauge]]]
            },
          ]
          }); 
        }, 500);  
  
  }





  
