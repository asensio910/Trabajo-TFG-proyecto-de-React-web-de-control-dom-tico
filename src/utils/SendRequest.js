


import { useEffect, useState } from "react";

function SendRequest() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://thingproxy.freeboard.io/fetch/https://api.preciodelaluz.org//v1/prices/min?zone=PCB")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    
    <div className="request" hour={`${data.hour}`}>     
      <h1 id="hour" hour={`${data.hour}`}>{`La hora mas barata es: ${data.hour}`}</h1>,
      <h2 id="price">{`Precio: ${data.price}`}</h2>
    </div>
  );
}


export default SendRequest;