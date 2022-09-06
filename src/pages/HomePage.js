


import Button from "../Components/Button";

function HomePage(){
    function changeToPricesPage(){
        window.location.replace("/PricesPage");
    }
    function changeToDevicesPage(){
        window.location.replace("/DevicesPage");
    }
    
    return(

        <div class->


        
        <div className = "box  mx-6 mb-6">
               
        <h1 className="title mt-3 mb-6 has-text-info-dark">Minimizamos tu coste energético de un manera muy fácil!</h1>
        
        <div className ="box is-flex-wrap-wrap">
        <section class="section">
        <h1 class="has-text-weight-semibold is-size-4 mb-3 ">Para qué sirve esta página...</h1>
        

        <div class="columns is-mobile is-centered">
        <div class="column is-four-fifths">
        <div class="box has-background-info-light">
        
        <h1 class="has-text-justified is-size-5 mx-6 mt-3">Esta página es una herramienta con la que combatir los cambios del precio de la luz a cada hora.
             Integramos una interfaz en la que puedes ver rápidamente cuales son las horas más económicas de 
             cada día con otra con la que podrás programar tus electrodomésticos como mejor te convenga con antelación. <br />
             De esta manera podrás:
        </h1>
        <br />
        <div class="columns is-mobile is-centered">
        <div class="column is-four-fifths pl-6 has-background-info-light">
        <h1 class="has-text-left has-text-weight-medium is-size-5">    
        <span class="tag is-info">1</span>      
        {" Minimizar al máximo el coste de tu consumo eléctrico."}          
        </h1>    
        <h1 class="has-text-left has-text-weight-medium is-size-5 py-3">
        <span class="tag is-info">2</span>
        {" Programar facilmente tus electrodomésticos y no estar pendiente de la hora."}
        </h1>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        <div className ="box is-flex-wrap-wrap">
        <section class="section">
        <h1 class="has-text-weight-semibold is-size-4 mb-3">Cómo funciona...</h1>
        

        <div class="columns">
        <div class="column">
        <div class="box has-background-info-light">
        <h1 class="title">1.</h1>
        <h1>Dirígete a la pestaña "Precios de hoy" y comprueba toda la información para ver cual es la hora más conveniente para programar tu electrodoméstico .</h1>

        </div>
        </div>
        <div class="column">
        <div class="box has-background-info-light">
            <h1 class="title">2.</h1>
            <h1>Ve a la pestaña de "Dispositivos" y Conéctate a tu instancia de Homeassistant con tu usuario y contraseña habituales para poder reconocer tus dispositivos</h1>

        </div>
        </div>
        <div class="column">
        <div class="box has-background-info-light">
        <h1 class="title">3.</h1>
        <h1>Una vez conectado, podrás ver tus dispositivos en la pantalla. Selecciona tus preferencias en el panel de configuración y pulsa en "Validar configuración"</h1>

        </div>
        </div>
        <div class="column">
        <div class="box has-background-info-light ">
        <h1 class="title">4.</h1>
            <h1 className = "mb-6">Ya está programado tu dispositivo, repite el proceso todas las veces que quieras!!</h1>

        </div>
        </div>
        </div>

        <div class="columns is-mobile is-centered my-4">
        <div class="column is-one-quarter">
                <Button id='but'
                  type = "button is-info is-large my-4 mr-3"
                  texto="Precios de hoy"
                  funcionClick={changeToPricesPage} />
        </div>
        <div class="column is-one-quarter">
                <Button id='but'
                  type = "button is-info is-large my-4 mr-3"
                  texto="Dispositivos"
                  funcionClick={changeToDevicesPage} />
        </div>
        
        </div>
        </section>
        </div>


        </div>
        </div>
    )
}

export default HomePage;