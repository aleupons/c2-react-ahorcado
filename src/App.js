import { Palabra } from "./components/Palabra";
import { LetrasUsadas } from "./components/LetrasUsadas";
import { Mensaje } from "./components/Mensaje";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Error } from "./components/Error";
import { Figura } from "./components/Figura";

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
  const [fallo, setFallo] = useState(0);
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
      setFallo(fallo + 1);
      if (nFallos === maxFallos) {
        setDeshabilitar(true);
      }
    }
  };

  return (
    <>
      <Figura fallo={fallo} />
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
