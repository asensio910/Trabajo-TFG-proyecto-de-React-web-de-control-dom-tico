
import React from 'react';
import * as ReactDOM from 'react-dom/client';

import Device from '../Components/Device';
import DeviceCollection from '../Components/DeviceCollection';
import Swal from 'sweetalert2';

import {
    getAuth,
    createConnection,
    subscribeEntities,
    ERR_HASS_HOST_REQUIRED
  } from "home-assistant-js-websocket";


 async function connect() {
 
  let auth;
  try {
    auth = await getAuth();
  } catch (err) {
    if (err === ERR_HASS_HOST_REQUIRED) {
      const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'Introduzca la dirección de su instancia de Homeassistant',
        inputPlaceholder: 'Ejemplo: http://localhost:8123',
        confirmButtonText: 'Conectar!'
      })
      
      if (url) {
        Swal.fire(`Entered URL: ${url}`)
      }
      const hassUrl = url;
      auth = await getAuth({ hassUrl });
      
    } else {
      alert(`Unknown error: ${err}`);
      return;
    }
  }


  const connection = await createConnection({ auth });
  localStorage.removeItem("entities");
  subscribeEntities(connection, (ent) => localStorage.setItem("entities", JSON.stringify(ent)));
  alert('conexion establecida');
  window.location.reload();
 
  }


function renderEntities(){
  
  const data = localStorage.getItem("entities");
  console.log(data);
 
  
  let item = document.getElementById('divDevices');
  let root = ReactDOM.createRoot(item);
  let  devices = [];
  let id = 0
  let name
  for (var key in data){ 
    if (data.hasOwnProperty(key) && key.startsWith("timer.powersaving")) {

      name=`${data[key]["attributes"]["friendly_name"]}`;
      console.log(data[key]["attributes"]["friendly_name"]);
      devices.push(<Device name ={`${name}`} id={`${name}`}/>);
      id++;

    }

  }
  console.log(devices);
  root.render(
    <DeviceCollection devices={devices}/>
   );

 }
  

export default connect;