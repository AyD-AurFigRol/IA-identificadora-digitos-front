import "./css/Landing.css"
import Footer from "./Footer";
import React from 'react';
import Header from "./Header";


export default function Landing() {
  return (
    <div className="land">
      <Header />
      <div className="container">
        <div className="cont-a">
          <div className="info"> <h1>Skynet es un proyecto que consta de una inteligencia artificial capaz de identificar, clasificar y graficar los números que se dibujen dentro de la aplicación </h1></div>
        </div>
        <div className="cont-b">
          <div className="quest"> <h3>¿Quieres probar Skynet?</h3></div>
          <div className="ans"><h3>¡Entonces no pierdas más tiempo y registrate para poder acceder a la sección de ejercicios de esta aplicación!</h3></div>
        </div>
      </div>
      <Footer />
    </div>
  )

}