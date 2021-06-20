import { Palabra } from "./components/Palabra";
import { LetrasUsadas } from "./components/LetrasUsadas";
import { Mensaje } from "./components/Mensaje";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Error } from "./components/Error";

function App() {
  /* const urlAPI = "http://localhost:5000/palabras/";

  const getPalabras = async () => {
    const response = await fetch(urlAPI);
    const data = await response.json;
    console.log(data);
  };
  useEffect(() => {
    getPalabras();
  }, []); */

  const palabra = "zanahoria"; //Paraula random de l'API

  const [palabraVacia, setPalabraVacia] = useState(
    Array(palabra.length).join(".").split(".")
  );
  const [letra, setLetra] = useState("");
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [error, setError] = useState(false);
  let nFallos = 0;
  const maxFallos = 11;
  const urlAPIComprobar = "https://letras-ahorcado.herokuapp.com/letras/";

  const comprobarLetra = async (palabra, letra) => {
    if (letra === "") {
      return;
    }
    const response = await fetch(`${urlAPIComprobar}${palabra}/${letra}`);
    setError(false);
    if (!response.ok) {
      setError(true);
      return false;
    }
    const { error, posiciones } = await response.json();
    if (!error) {
      setPalabraVacia(
        palabraVacia.map((letraVacia, i) => {
          for (const posicion of posiciones) {
            if (i === posicion) {
              letraVacia = letra;
            }
          }
          return letraVacia;
        })
      );
    } else {
      //No hi ha aquesta lletra
      // Pintar hangman (variable d'estat "fallo" que li passem a props al component Hangman?)
      if (nFallos === maxFallos) {
        setDeshabilitar(true);
      }
    }
  };

  return (
    <>
      <div className="ahorcado">
        <svg id="hangman" viewBox="0 0 96 96" width="300" height="300">
          <line className="stage11" x1="62" y1="70" x2="56" y2="56"></line>
          <line className="stage10" x1="50" y1="70" x2="56" y2="56"></line>
          <line className="stage9" x1="68" y1="46" x2="56" y2="40"></line>
          <line className="stage8" x1="44" y1="46" x2="56" y2="40"></line>
          <line className="stage7" x1="56" y1="40" x2="56" y2="56"></line>
          <circle
            className="stage6"
            cx="56"
            cy="34"
            r="6"
            fill="#bee5eb"
          ></circle>
          <line className="stage5" x1="56" y1="16" x2="56" y2="28"></line>
          <line className="stage4" x1="24" y1="24" x2="32" y2="16"></line>
          <line className="stage3" x1="21" y1="16" x2="60" y2="16"></line>
          <line className="stage2" x1="24" y1="80" x2="24" y2="16"></line>
          <line className="stage1" x1="16" y1="80" x2="32" y2="80"></line>
        </svg>
      </div>
      <Palabra palabra={palabraVacia} />
      {/* Letra */}
      <input
        type="text"
        className="letra"
        maxLength="1"
        value={letra}
        onChange={(e) => {
          setLetra(e.target.value);
          setTimeout(() => {
            e.target.value = "";
          }, 500);
        }}
        onKeyUp={() => comprobarLetra(palabra, letra)}
        disabled={deshabilitar}
      />
      {/* Letra */}
      <LetrasUsadas />
      <Mensaje />
      {error && <Error />}
    </>
  );
}

export default App;
