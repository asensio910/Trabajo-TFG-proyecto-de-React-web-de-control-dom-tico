
import NavBar from './Components/NavBar';
import PricesPage from './pages/PreciosPage';
import DevicesPage from './pages/DevicesPage';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  let component;
  switch(window.location.pathname){
    case "/":
      component = <HomePage />
      break;
    case "/PricesPage":
      component = <PricesPage />
      break;
    case "/DevicesPage":
      component = <DevicesPage id='devPage'/>
      break;
  }

 
  return (
    <div className="App has-background-white-bis">
      <NavBar />
      {component}
      <div id="divRender">

      </div>
      

    </div>
  );
}

export default App;
