import { useState } from "react";

export const Letra = (props) => {
  const { palabra } = props;
  const [letra, setLetra] = useState("");
  const [deshabilitar, setDeshabilitar] = useState(false);
  let nFallos = 0;
  const maxFallos = 11;
  const urlAPI = "https://letras-ahorcado.herokuapp.com/letras/";
  const comprobarLetra = async (palabra, letra) => {
    if (letra === "") {
      return;
    }
    const response = await fetch(`${urlAPI}${palabra}/${letra}`);
    if (!response.ok) {
      //missatge error
      return false;
    }
    const { error, posiciones } = await response.json();
    if (!error) {
      // Pintar la lletra als forats de les posicions ... de la paraula
    } else {
      //No hi ha aquesta lletra
      if (nFallos === maxFallos) {
        setDeshabilitar(true);
      }
    }
  };
  return (
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
        comprobarLetra("palabra", letra);
      }}
      disabled={deshabilitar}
    />
  );
};
