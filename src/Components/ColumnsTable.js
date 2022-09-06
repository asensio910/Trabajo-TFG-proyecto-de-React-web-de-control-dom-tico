import Table from "./PricesTable";

function ColumnsTable(){
    const horas1 = ["00-01", "01-02", "02-03","03-04", "04-05","05-06", "06-07","07-08", "08-09","09-10","10-11", "11-12"];
    const horas2 = ["12-13", "13-14", "14-15", "15-16","16-17", "17-18","18-19", "19-20","20-21", "21-22","22-23","23-24"];

    return(

    <div className="box mb-5 mx-6">
 
 
 
 <div className="columns is-mobile is-multiline is-centered  ">
 <div className="column is-centered is-four-fifths">
 <article class="message is-info ">
  <div class="message-header has-text-centered">
    <p class="subtitle is-5 has-text-centered has-text-white">Serie completa de precios a lo largo de las 24 horas de hoy:</p>
  </div>
  <div class="message-body ">
  <div className="columns is-mobile is-multiline is-centered  ">
       
       <div className="column is-full-width is-centered">
           <Table horas={horas1} />
       </div>
       <div className="column is-full-width is-centered ">
           <Table horas={horas2}/>
       </div>
       </div>   
       
   </div>
   
</article>
</div>
</div>
        
    </div>
    )
}

export default ColumnsTable;