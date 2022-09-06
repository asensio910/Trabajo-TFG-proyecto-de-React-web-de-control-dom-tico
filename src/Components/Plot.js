import { useState, useEffect } from "react";

import Plotly from 'plotly.js-dist-min'


function Plot(allHours){
    const [select, setSelect] = useState(1);
    const horasInt = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    useEffect(() => {
        var type;
            let allHoursPrices = [];

            for(var val in allHours){
                allHoursPrices.push(parseInt(allHours[val].price));
                
            }

            switch(select){
                case 1:
                    type="bar";
                    setSelect(2);
                    break;
                case 2:
                    type="scatter";
                    setSelect(1);
                    break;
            }
        
            var dataPlot = [{
                x: horasInt,
                y: allHoursPrices,
                type: type
            }];
            var layout = {
                title: 'Gráfica Scatter precios de la luz hoy',
                xaxis: {
                title: 'Hora',
                showgrid: true,
                showticklabels: true,
                type: 'category',
                },
                yaxis: {
                title: 'Precio [€/MwH]',
                showline: false
                }

            };
            Plotly.newPlot("pricesPlot", dataPlot, layout)
      }, []);


    return(
        <div id="plotId">

        </div>
    )
}

export default Plot;
