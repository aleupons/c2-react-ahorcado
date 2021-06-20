export const Palabra = (props) => {
  const { palabra } = props;
  return (
    <ul className="palabra">
      {palabra.map((letra, i) => (
        <li key={i}>{letra}</li>
      ))}
    </ul>
  );
};
