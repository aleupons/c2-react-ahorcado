export const LetrasUsadas = (props) => {
  const { letrasFalladas } = props;
  return (
    <>
      <ul className="letras-usadas">
        {letrasFalladas
          .map((letra, i) => (
            <li className="letras-usadas" key={i}>
              {letra.toUpperCase()}
            </li>
          ))
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, " - ", curr]),
            null
          )}
      </ul>
    </>
  );
};
