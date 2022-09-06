
import connect from "../utils/connection";
import scheduleDevice from "../utils/scheduleDevice";

export default function DeviceCollection({devices}){
   let keyCount = 0
    return(
        
        <ol>
          <div className="columns is mobile is-centered ">
          <div className="column is-three-fifths  my-3">
            <div className="box">
            <h1 className="is-size-4">Estos son los dispositivos que hemos detectado en tu Home assistant:</h1>
            </div>
            </div>
          </div>
        {devices.map((devices) => (
          <li key={`Device${keyCount}`}>{devices}</li>
        ))}
      </ol>

    )


}