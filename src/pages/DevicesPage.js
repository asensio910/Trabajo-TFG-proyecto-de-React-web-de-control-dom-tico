

import React from 'react';
import * as ReactDOM from 'react-dom/client';

import Device from '../Components/Device';
import DeviceCollection from '../Components/DeviceCollection';
import Button from "../Components/Button"

import connect from "../utils/connection";



function DevicesPage(){
    let  devices = [];
    
    function renderEntities(){
  
        let data = JSON.parse(localStorage.getItem("entities"));
        console.log(data);
       
        
        let item = document.getElementById('divDevices');
        let root = ReactDOM.createRoot(item);
        let  devices = [];
        let state;
        let name;
        for (var key in data){ 
          if (data.hasOwnProperty(key) && key.startsWith("timer.powersaving")) {
      
            name=`${data[key]["attributes"]["friendly_name"]}`;
            console.log(data[key]["attributes"]["friendly_name"]);
            if(data[key]["state"] == "idle"){
              state="Inactivo";
            }else{
              state="Programado";
            }
            devices.push(<Device name ={`${name}`} id={`${key}`} state ={state} time={`13:45`}/>);  
      
          }
      
        }
        console.log(devices);
        root.render(
          <DeviceCollection devices={devices}/>
         );

      }

    function refreshEntitiesState(){

    }

    if((localStorage.getItem("entities")) ){
       
        let data = JSON.parse(localStorage.getItem("entities"));
        
        console.log(data);
        let name;
        let state;
        let time;
        let lastUse;
        for (var key in data){ 
          if (data.hasOwnProperty(key) && key.startsWith("timer.powersaving")) {
            lastUse = data[key]["last_changed"].slice(0, 10) + " a las " + data[key]["last_changed"].slice(11, 16);
            name=`${data[key]["attributes"]["friendly_name"]}`;
            console.log(data[key]["attributes"]["friendly_name"]);
            if(data[key]["state"] == "idle"){
              state="Inactivo";
              time = "/"
            }else{
              state="Programado";
              let timeM2 = data[key]["attributes"]["finishes_at"].slice(11,16);
              time = (parseInt(timeM2.slice(0,2)) + 2).toString() + ":" + timeM2.slice(3,5);
              console.log(time);
            }
            devices.push(<Device name ={`${name}`} id={`${key}`} state ={state} time={time} lastUse={lastUse}/>);  
          }
      
        } 
      }else{
            
          return(
              <div>
                  <Button id='but'
                  type = "button is-info is-light my-4 mr-3"
                  texto="Conectar a Homeassistant"
                  funcionClick={connect} />
                  
                  <Button id='but'
                  type = "button is-info is-light my-4"
                  texto="Buscar dispositivos en tu Homeassistant"
                  funcionClick={renderEntities} />
                  <div className="box mx-6 has-background-info-light " id='divDevices'>
                     <p> Porfavor, conectese a su Homeassistant para poder mostrar los dispositivos asociados a su cuenta</p>
                    
                  </div>

                  
              </div>
       
              )
            }   
          
var count = 0
  return(
    
      <div>
          
          <div className="box mx-6  " id='divDevices'>
          <Button id='but'
          type = "button is-info  my-4 mr-3"
          texto="Conectar a Home Assistant"
          funcionClick={connect} />
              
          
          <Button id='but'
          type = "button is-info  my-4"
          texto="Buscar dispositivos en tu Homeassistant"
          funcionClick={renderEntities} />
              <ol>
                  <div className="columns is mobile is-centered ">
                  <div className="column is-three-fifths  my-3">
                    <div className="box">
                    <h1 className="is-size-4 has-text-info-dark">Estos son los dispositivos que hemos detectado en tu última conexión a Home Assistant:</h1>
                    </div>
                    </div>
                  </div>
                {devices.map((devices) => (
                  <li key={`${"Device"+count++}`}>{devices}</li>
                ))}
              </ol>
          </div>
  
          
      </div>
    
  )
}

export default DevicesPage;