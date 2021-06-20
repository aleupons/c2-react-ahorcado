import { Palabra } from "./components/Palabra";
import { LetrasUsadas } from "./components/LetrasUsadas";
import { Mensaje } from "./components/Mensaje";
import { useRef, useEffect, useState } from "react";
import { Error } from "./components/Error";
import { Figura } from "./components/Figura";

function App() {
  const [palabra, setPalabra] = useState([]);
  const urlAPI = "http://localhost:3001/palabras";
  const [palabraVacia, setPalabraVacia] = useState(
    Array(palabra.length).join(".").split(".")
  );
  const [letra, setLetra] = useState("");
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [error, setError] = useState(false);
  const [victoria, setVictoria] = useState(false);
  const [derrota, setDerrota] = useState(false);
  const [fallo, setFallo] = useState(0);
  const [letrasFalladas, setLetrasFalladas] = useState([]);
  const urlAPIComprobar = "https://letras-ahorcado.herokuapp.com/letras/";

  const getPalabras = async () => {
    const response = await fetch(urlAPI);
    const { lista } = await response.json();
    const palabraAleatoria = lista[Math.floor(Math.random() * lista.length)];
    setPalabra(palabraAleatoria);
    setPalabraVacia(Array(palabraAleatoria.length).join(".").split("."));
  };

  useEffect(() => {
    getPalabras();
  }, []);

  useEffect(() => {
    if (palabraVacia.join("") === palabra) {
      setVictoria(true);
      setDeshabilitar(true);
    }
  }, [palabraVacia, palabra]);

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
      setLetra("");
    } else {
      if (!letrasFalladas.includes(letra)) {
        setLetrasFalladas([...letrasFalladas, letra]);
        setFallo(fallo + 1);
      }
      setLetra("");
      if (fallo === 10) {
        setDeshabilitar(true);
        setDerrota(true);
      }
    }
  };

  const timer = useRef(null);
  const handleLetraChange = (e) => {
    setLetra(e.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      e.target.value = "";
    }, 500);
  };

  return (
    <>
      <Figura fallo={fallo} />
      <Palabra palabra={palabraVacia} />
      <input
        type="text"
        className="letra"
        maxLength="1"
        value={letra}
        onChange={handleLetraChange}
        onKeyUp={() => comprobarLetra(palabra, letra)}
        disabled={deshabilitar}
      />
      <LetrasUsadas letrasFalladas={letrasFalladas} />
      <Mensaje victoria={victoria} derrota={derrota} />
      {error && <Error />}
    </>
  );
}

export default App;
