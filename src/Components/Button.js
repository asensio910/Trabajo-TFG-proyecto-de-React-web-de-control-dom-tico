import React from "react";

function Button({texto, funcionClick, type}){
    return(
        <button 
        className={type}
        onClick={funcionClick}>
        {texto}
        
        </button>
    )
}

export default Button;