import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const Mensaje = (props) => {
  const [mensaje, setMensaje] = useState("");
  const { victoria, derrota } = props;
  useEffect(() => {
    if (victoria) {
      setMensaje("Has ganado! (～￣▽￣)～");
    } else if (derrota) {
      setMensaje("Ooh.... Perdiste ╯︿╰");
    }
  }, [victoria, derrota]);

  return (
    <>
      <div className="mensaje on">{mensaje}</div>
    </>
  );
};

Mensaje.propTypes = {
  victoria: PropTypes.bool.isRequired,
  derrota: PropTypes.bool.isRequired,
};
