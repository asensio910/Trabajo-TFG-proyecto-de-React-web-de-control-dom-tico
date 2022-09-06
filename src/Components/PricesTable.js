
import { useEffect, useState } from "react";

function Table(horas){
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://thingproxy.freeboard.io/fetch/https://api.preciodelaluz.org/v1/prices/all?zone=PCB")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);
  let count = 0;
  let iconsUnderAv = [];
  if(!isLoading && count ==0){
    let i =0;
    while(i<12){
      if(data[horas["horas"][i]]["is-under-avg"] == true){
        iconsUnderAv.push('../images/tick.png');
      }else{
        iconsUnderAv.push('../images/cruz.png');
      }
      i++;

    }
    count =1;
  }
  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

   return (

    <table className="table is-striped is-narrow is-hoverable is-fullwidth has-background-info-light">
  <thead>
    <tr>
      <th>Hora</th>
      <th>Precio</th>
      <th>Unidades</th>
      <th>Por debajo de la media</th>
    
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{`${data[`${horas["horas"][0]}`].hour}`}</td>
      <td>{`${data[horas["horas"][0]].price}`}</td>
      <td>{`${data[horas["horas"][0]].units}`}</td>
      <td>{`${data[horas["horas"][1]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][1]].hour}`}</td>
      <td>{`${data[horas["horas"][1]].price}`}</td>
      <td>{`${data[horas["horas"][1]].units}`}</td>
      <td>{`${data[horas["horas"][1]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][2]].hour}`}</td>
      <td>{`${data[horas["horas"][2]].price}`}</td>
      <td>{`${data[horas["horas"][2]].units}`}</td>
      <td>{`${data[horas["horas"][2]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][3]].hour}`}</td>
      <td>{`${data[horas["horas"][3]].price}`}</td>
      <td>{`${data[horas["horas"][3]].units}`}</td>
      <td>{`${data[horas["horas"][3]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][4]].hour}`}</td>
      <td>{`${data[horas["horas"][4]].price}`}</td>
      <td>{`${data[horas["horas"][4]].units}`}</td>
      <td>{`${data[horas["horas"][4]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][5]].hour}`}</td>
      <td>{`${data[horas["horas"][5]].price}`}</td>
      <td>{`${data[horas["horas"][5]].units}`}</td>
      <td>{`${data[horas["horas"][5]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][6]].hour}`}</td>
      <td>{`${data[horas["horas"][6]].price}`}</td>
      <td>{`${data[horas["horas"][6]].units}`}</td>
      <td>{`${data[horas["horas"][6]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][7]].hour}`}</td>
      <td>{`${data[horas["horas"][7]].price}`}</td>
      <td>{`${data[horas["horas"][7]].units}`}</td>
      <td>{`${data[horas["horas"][7]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][8]].hour}`}</td>
      <td>{`${data[horas["horas"][8]].price}`}</td>
      <td>{`${data[horas["horas"][8]].units}`}</td>
      <td>{`${data[horas["horas"][8]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][9]].hour}`}</td>
      <td>{`${data[horas["horas"][9]].price}`}</td>
      <td>{`${data[horas["horas"][9]].units}`}</td>
      <td>{`${data[horas["horas"][9]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][10]].hour}`}</td>
      <td>{`${data[horas["horas"][10]].price}`}</td>
      <td>{`${data[horas["horas"][10]].units}`}</td>
      <td>{`${data[horas["horas"][10]]["is-under-avg"]}`}</td>
      
    </tr>
    <tr>
      <td>{`${data[horas["horas"][11]].hour}`}</td>
      <td>{`${data[horas["horas"][11]].price}`}</td>
      <td>{`${data[horas["horas"][11]].units}`}</td>
      <td>{`${data[horas["horas"][11]]["is-under-avg"]}`}</td>
      
    </tr> 
  </tbody>
</table>

   )
}


export default Table;