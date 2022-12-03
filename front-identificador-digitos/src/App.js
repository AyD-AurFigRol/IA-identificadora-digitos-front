import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-izq">
          <div className="Header-logo"> Skynet </div>
        </div> 
        <div className="Header-der">
          <div className="Header-text"> Exercises </div>
          <div className="Header-text">About us</div>
          <div className="Header-text"> Sign in</div>
          <div className="Header-btn"> Sign up</div>
        </div>
      </header>
      <div className = "container">
        <div className ="cont-a">
          <div className = "info"> <h1>Skynet es un proyecto que consta de una inteligencia artificial capaz de identificar, clasificar y graficar los números que se dibujen dentro de la aplicación </h1></div>
        </div>
        <div className ="cont-b">
          <div  className = "quest"> <h3>¿Quieres probar Skynet?</h3></div>
          <div className = "ans"><h3>¡Entonces no pierdas más tiempo y registrate para poder acceder a la sección de ejercicios de esta aplicación!</h3></div>
        </div>
      </div>
    </div>
  );
}
