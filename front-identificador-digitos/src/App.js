import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-izq">
          <div className="Header-logo"> LOGO </div>
        </div> 
        <div className="Header-der">
          <div className="Header-btn"> Exercises </div>
          <div className="Header-btn">About us</div>
          <div className="Header-btn">{/* Aqui meter unos botones para meter lo del link de reat */} Log In</div>
        </div>
      </header>
      <div className = "container">
        <p>Primer texto de esta aplicacion</p>
      </div>
    </div>
  );
}
