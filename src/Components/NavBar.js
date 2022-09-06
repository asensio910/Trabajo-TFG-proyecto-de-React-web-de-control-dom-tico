
function NavBar(){
    return(
        <div  className="tabs is-medium is-centered has-background-white">
         <ul>
            <li><a className="navbar-item has-text-whit" href="/"> Home</a></li>
            <li><a className="navbar-item has-text-whit" href="/PricesPage"> Precios de hoy</a></li>
            <li> <a className="navbar-item has-text-whit" href="/DevicesPage">
              Dispositivos
            </a></li>
        </ul>
            
           
       
        </div >
    )
}

export default NavBar;