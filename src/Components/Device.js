import Button from "./Button";
import connect from "../utils/connection";
import ConfigPanel from "../pages/ConfigPanel";
import scheduleDevice from "../utils/scheduleDevice";
import clickManager from "../utils/scheduleDevice";
import { useEffect, useState } from "react";

function Device({id, name, state, time, lastUse}){


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
        <div className="ff">
          <h1>Cargando...</h1>
        </div>
      );
    }


    return(
<div className="columns is-centered my-2" id={id}>
  <div className="column is-four-fifths ">
  <div className="box has-background-info-light">
    <article className="media">

    <div className="media-content">
        <div className="columns is-multiline is-mobile">
  
        <div className="column is-half">
       
        <div className="box has-background-white-bis">
        <h1 className="title is-size-4">{name}</h1>
            <div className="columns">
                    
                    <div className="column is-half">
                        <figure className="image is-128x128 mx-6 mb-5 mt-4" >
                            <img src={require('../images/lavadora.png')} alt="Image"/>
                        </figure>
                    </div>
                    <div className="column is-two-fifths has-text-left my-5">
                        
                                    <div className="content  ">
                                        <p>
                                        {"Estado: "}
                                        <strong>{state}</strong> 
                                        <br />          
                                        </p>
                                    </div>
                                    <div className="content">
                                        <p>
                                        {"Hora: "}
                                        <strong>{time}</strong> 
                                
                                        <br />          
                                        </p>
                                    </div>
                                    <div className="content">
                                        <p>
                                        {"Último uso: "}
                                        <strong>{lastUse}</strong> 
                                
                                        <br />          
                                        </p>
                                    </div>
                            

                                    </div>
                    </div> 
            </div>
        </div>
        <div className="column is-half">

            <ConfigPanel deviceID={id}/>

        </div>
  
    </div>

       
    </div>
    </article>
    </div>
</div>
</div>
       
    )
}

export default Device;