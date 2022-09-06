import ColumnsTable from "../Components/ColumnsTable"
import Button from "../Components/Button";
import Plot from "../Components/Plot";
import { useEffect, useState } from "react";

import Plotly from 'plotly.js-dist-min'

function PricesPage(){

    const horas = ["00-01", "01-02", "02-03","03-04", "04-05","05-06", "06-07","07-08", "08-09","09-10","10-11", "11-12", "12-13", "13-14", "14-15", "15-16","16-17", "17-18","18-19", "19-20","20-21", "21-22","22-23","23-24"];
    const horasInt = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const [select, setSelect] = useState(1);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [nLowest, setNLowest] = useState(null);
    const [allHours, setAllHours] = useState(null);
    useEffect(() => {
      fetch("https://thingproxy.freeboard.io/fetch/https://api.preciodelaluz.org/v1/prices/cheapests?zone=PCB&n=21")
        .then((response) => response.json())
        .then((nLowest) => {
          setNLowest(nLowest);
          setIsLoading1(false);
        });
    }, []);

    useEffect(() => {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.preciodelaluz.org//v1/prices/all?zone=PCB")
          .then((response) => response.json())
          .then((allHours) => {
            setAllHours(allHours);
            setIsLoading2(false);
          });
      }, []);


    

    if (isLoading1 || isLoading2) {
      return (
        <div className="App">
          <h1>Cargando...</h1>
        </div>
      );
    }

        let NMostExpensiveHours = [];
       
        for(var key in horas){
            let count = 0;
            for(var val in nLowest){
                
                if(nLowest[val]["hour"] == horas[key]){                 
                    break;
                }else if(count == 20){
                    NMostExpensiveHours.push(horas[key]);
                }
                count++;
            }
       }
  
    function changePlotType(){
        var type;
        let allHoursPrices = [];

        for(val in allHours){
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
            
            title: {
                text:'    Gráfica precios de la luz hoy',
                font: {
                  family: 'Arial, Serif',
                  size: 18
                },
                xref: 'paper',
               
              },
            xaxis: {
              title: 'Hora',
              showgrid: true,
              showticklabels: true,
              type: 'category',
              titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: 'black'
              }
            },
            yaxis: {
              title: 'Precio [ €/MwH ]',
              showline: false,
              titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: 'black'
              }
            }

          };
        Plotly.newPlot("pricesPlot", dataPlot, layout)
    }


    

    return(
        <div>

                    <div className="container is-fullhd mb-4">
                    <div className="notification ">
                        <strong className ="has-text-weight-semibold is-size-5 has-text-info-dark" >¡En esta sección puedes comprobar los precios a las distintas horas del día para programar tus dispositivos como mejor te convenga!</strong>
                    </div>
                    </div>
                    <div class="box mx-6">
                        <div className="columns is-mobile is-centered">
                        <div className="column is-two-fifths ml-6">
                            <article className="message  is-success has-text-centered ml-6">
                                <div className="message-header has-text-centered">
                                    <p className="has-text-centered">Estas son las 3 horas más económicas de hoy:</p>
                                </div>
                            <div class="message-body">
                                        

                                <table className="table is-striped is-narrow is-hoverable is-fullwidth has-background-success-light">
                                <thead>
                                    <tr>
                                    <th>Hora</th>
                                    <th>Precio</th>
                                    <th>Unidades</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{`${nLowest[0].hour}`}</td>
                                    <td>{`${nLowest[0].price}`}</td>
                                    <td>{`${nLowest[0].units}`}</td>
                                
                                    </tr>
                                    <tr>
                                    <td>{`${nLowest[1].hour}`}</td>
                                    <td>{`${nLowest[1].price}`}</td>
                                    <td>{`${nLowest[1].units}`}</td>
                                
                                    </tr>
                                    <tr>
                                    <td>{`${nLowest[2].hour}`}</td>
                                    <td>{`${nLowest[2].price}`}</td>
                                    <td>{`${nLowest[2].units}`}</td>
                                
                                    </tr>

                                </tbody>
                                </table>

                                </div>
                            </article>

                            <article className="message is-danger ml-6">
                                <div className="message-header  has-text-centered">
                                    <p>Estas son las 3 horas más caras de hoy:</p>
                                </div>
                                <div className="message-body">
                                
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth has-background-danger-light">
                                <thead>
                                    <tr>
                                    <th>Hora</th>
                                    <th>Precio</th>
                                    <th>Unidades</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    
                                    <td>{`${allHours[NMostExpensiveHours[0]].hour}`}</td>
                                    <td>{`${allHours[NMostExpensiveHours[0]].price}`}</td>
                                    <td>{`${allHours[NMostExpensiveHours[0]].units}`}</td>
                                    
                                
                                    </tr>
                                    <tr>
                                    <td>{`${allHours[NMostExpensiveHours[1]].hour}`}</td>
                                    <td>{`${allHours[NMostExpensiveHours[1]].price}`}</td>
                                    <td>{`${allHours[NMostExpensiveHours[1]].units}`}</td>
                                
                                    </tr>
                                    <tr>
                                    <td>{`${allHours[NMostExpensiveHours[2]].hour}`}</td>
                                    <td>{`${allHours[NMostExpensiveHours[2]].price}`}</td>
                                    <td>{`${allHours[NMostExpensiveHours[2]].units}`}</td>
                                
                                    </tr>
                                    
                                    
                                </tbody>
                                </table>


                                </div>
                                </article>
                        </div>

                        <div class="column is-three-fifths is-centered">
                

                                
                                <Button id='but'
                                type = "button is-info  my-4"
                                texto="Mostrar distintas gráficas de precios"
                                funcionClick={changePlotType} />
                               
                                <div className="mr-4" id="pricesPlot">
                                    <Plot allHours={allHours} />
                                </div>
                        </div>
                        </div>
                    </div>

              
                    


                <ColumnsTable />
               

        </div>        

    )
}

export default PricesPage;