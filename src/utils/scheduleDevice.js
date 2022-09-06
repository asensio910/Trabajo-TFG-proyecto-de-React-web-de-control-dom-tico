import {
    getAuth,
    createConnection,
    subscribeEntities,
    ERR_HASS_HOST_REQUIRED,
    callService

  } from "home-assistant-js-websocket";

import Swal from 'sweetalert2';


export default async function scheduleDevice(deviceID, time, mode){
    
    let auth;
    try {
     
      auth = await getAuth();
      
      
      
    } catch (err) {
    
        if (err === ERR_HASS_HOST_REQUIRED) {
         
          const {  } = await Swal.fire({     
            icon: 'warning',
            title: 'Oops...',
            text: 'Debe asociar su cuenta de Homeassistant antes de configurar sus dispositivos.',
            confirmButtonText: 'Aceptar'
          })
          
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
        } 
      }
    const connection = await createConnection({ auth });
  
  if(mode === "cancel"){
    callService(connection, "input_boolean", "turn_off", {}, {entity_id: "input_boolean.cancelarlavadora"});
 
  }
  if(mode === "start"){
    callService(connection, "input_boolean", "turn_on", {}, {entity_id: "input_boolean.cancelarlavadora"});
  }
   callService(connection, "timer", mode, {duration: time}, {entity_id: `${deviceID}`});
   console.log("Subscribing entities");
   subscribeEntities(connection, (ent) => localStorage.setItem("entities", JSON.stringify(ent)));
   console.log("reloading page");
   localStorage.setItem("test", 1);
   localStorage.setItem("test", 2);
   console.log(localStorage.getItem("entities"));
   const {  } = await Swal.fire({
            
    icon: 'success',
    title: 'Configuración realizada correctamente',
    text: '',
    confirmButtonText: 'Aceptar'
  })
   window.location.replace("/");
   
   

}




