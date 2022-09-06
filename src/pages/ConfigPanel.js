import Button from "../Components/Button";
import connect from "../utils/connection";
import scheduleDevice from "../utils/scheduleDevice";

import { useEffect, useState, useRef } from "react";

import Swal from 'sweetalert2';
import isEqual from 'lodash.isequal';
 
function ConfigPanel({deviceID}){

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


  const TimeInputRef = useRef();
  function clickManager(){
    
    if(document.getElementById(`${deviceID + "Option1"}`).checked) {
        scheduleDevice(deviceID, undefined, "cancel");
       
    }
    else if(document.getElementById(`${deviceID + "Option2"}`).checked) {
        let allow = 1;
        const propHour= data['hour'];
        let scheduleHour = undefined;
        if(isEqual(propHour[1], "-")){
          scheduleHour = parseInt(propHour[0]);
        }
        else{
          scheduleHour = parseInt(propHour[0] + propHour[1]);
        }
        var dateNow = new Date();
        var dateTimeOut = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), parseInt(scheduleHour));

       
        var timerMs = dateTimeOut - dateNow;
        if(timerMs <1){
          allow=0;
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Lo sentimos, la hora más barata de hoy ya ha pasado. Diríjase a la pestaña de Precios para ver qué horario puede cuadrar mejor.',
            confirmButtonText: 'Aceptar',
            timer: 5000
          })  

        }else{
          allow=1;
        
        }
        console.log("timerMs: " + timerMs);
        var timerSeconds = Math.floor(timerMs / 1000);
        console.log("timerSec: " + timerSeconds);
        var timerMinutes;
        var timerHours;
        if(timerSeconds > 59){
         timerMinutes = Math.floor(timerSeconds / 60);
         timerSeconds %= 60;
         console.log("timerSec: " + timerSeconds);
         console.log("timerMin: " + timerMinutes);
           if(timerMinutes > 59){
             timerHours = Math.floor(timerMinutes / 60);
             timerMinutes %= 60;
             console.log("timerSec: " + timerMinutes);
             console.log("timerSec: " + timerHours);
           }else{
             timerHours = 0;
           }
        }else{
           timerMinutes = 0;
           timerHours = 0;
        }

        var timerDuration = timerHours.toString() + ":" + timerMinutes.toString() + ":" + timerSeconds.toString()
        console.log(timerDuration); 
      
 
         console.log(deviceID);
         if(allow == 1){
          scheduleDevice(deviceID, timerDuration, "start");
         }
           
     
        
    }
    else if(document.getElementById(`${deviceID + "Option3"}`).checked && document.getElementById(`${deviceID + "Option3"}`).checked) {
        
        let scheduleHour =  TimeInputRef.current.value;
        console.log(scheduleHour);




      var dateNow = new Date();
      var dateTimeOut = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), parseInt(scheduleHour.slice(0,2)), parseInt(scheduleHour.slice(3)));

      
       var timerMs = dateTimeOut - dateNow;
       console.log("timerMs: " + timerMs);
       var timerSeconds = Math.floor(timerMs / 1000);
       console.log("timerSec: " + timerSeconds);
       var timerMinutes;
       var timerHours;
       if(timerSeconds > 59){
        timerMinutes = Math.floor(timerSeconds / 60);
        timerSeconds %= 60;
        console.log("timerSec: " + timerSeconds);
        console.log("timerMin: " + timerMinutes);
          if(timerMinutes > 59){
            timerHours = Math.floor(timerMinutes / 60);
            timerMinutes %= 60;
            console.log("timerMin: " + timerMinutes);
            console.log("timerHours: " + timerHours);
          }else{
            timerHours = 0;
          }
       }else{
          timerMinutes = 0;
          timerHours = 0;
       }

       var timerDuration = timerHours.toString() + ":" + timerMinutes.toString() + ":" + timerSeconds.toString()
       console.log(timerDuration); 
     

        console.log(deviceID);
        scheduleDevice(deviceID, timerDuration, "start");
             
    }
    else {
      
    } 

  }
 
  if (isLoading) {
    return (
      <div className="ff">
        <h1>Cargando...</h1>
      </div>
    );
  }

    return(

        <div className="box has-background-white-ter" >
                <div className=" has-background-white-ter has-text-black-ter is-size-5">
                    <p>Panel de configuración:</p>
                </div>



              <div className="columns is-mobile is-multiline is-centered  ">
                  <div className="column is-half is-centered has-text-left">
                          <div className="message-body has-text-left has-text-weight-semibold py-auto">
                          
                              <div className="control has-text-left">
                              <label className="radio has-text-left my-2" >
                                  <input type="radio" name="rsvp" id={`${deviceID + "Option1"}`}/>
                                  {" Mantener inactivo."}
                              </label>
                              <label className="radio has-text-left my-2" >
                                  <input type="radio" name="rsvp" id={`${deviceID + "Option2"}`}/>
                                  {` Programar a la hora más barata de hoy: ${data['hour']}`}
                              </label>
                              <label className="radio has-text-left my-2" >
                                  <input type="radio" name="rsvp" id={`${deviceID + "Option3"}`}/>
                                  {" Introducir una hora manualmente."}
                              </label>
                              </div>
                          </div>
                  </div>
                  <div className="column is-two-fifths is-centered ">
                      <div className="field has-text-left">
                      <p className=" has-background-white-ter has-text-black-ter is-size-6 mt-5 mb-3">Introduzca una hora:</p>
                      <div className="control">
                      <input className="input" type="time" ref={TimeInputRef} id={`${deviceID + "option4"}`}/>
                      </div>
                      </div>
                      <Button id={"configButton"+deviceID} type = "button is-small is-responsive mt-5 is-fullwidth has-background-info has-text-white"
                      texto= {<h1 className="is-size-6"> Validar configuración</h1>}
                      funcionClick={clickManager}/>

                  </div>
                 
                  
              </div>

        </div>

        

       

    )
}

export default  ConfigPanel;