export const Figura = (props) => {
  const { fallo } = props;

  return (
    <>
      <div className="ahorcado">
        <svg id="hangman" viewBox="0 0 96 96" width="300" height="300">
          {fallo >= 11 && (
            <line className="stage11 on" x1="62" y1="70" x2="56" y2="56"></line>
          )}
          {fallo >= 10 && (
            <line className="stage10 on" x1="50" y1="70" x2="56" y2="56"></line>
          )}
          {fallo >= 9 && (
            <line className="stage9 on" x1="68" y1="46" x2="56" y2="40"></line>
          )}
          {fallo >= 8 && (
            <line className="stage8 on" x1="44" y1="46" x2="56" y2="40"></line>
          )}
          {fallo >= 7 && (
            <line className="stage7 on" x1="56" y1="40" x2="56" y2="56"></line>
          )}
          {fallo >= 6 && (
            <circle
              className="stage6 on"
              cx="56"
              cy="34"
              r="6"
              fill="#bee5eb"
            ></circle>
          )}
          {fallo >= 5 && (
            <line className="stage5 on" x1="56" y1="16" x2="56" y2="28"></line>
          )}
          {fallo >= 4 && (
            <line className="stage4 on" x1="24" y1="24" x2="32" y2="16"></line>
          )}
          {fallo >= 3 && (
            <line className="stage3 on" x1="21" y1="16" x2="60" y2="16"></line>
          )}
          {fallo >= 2 && (
            <line className="stage2 on" x1="24" y1="80" x2="24" y2="16"></line>
          )}
          {fallo >= 1 && (
            <line className="stage1 on" x1="16" y1="80" x2="32" y2="80"></line>
          )}
        </svg>
      </div>
    </>
  );
};
