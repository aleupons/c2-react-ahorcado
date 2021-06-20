export const Palabra = (props) => {
  const { palabra } = props;
  return (
    <ul className="palabra">
      {palabra.map((letra) => (
        <li>{letra}</li>
      ))}
    </ul>
  );
};
