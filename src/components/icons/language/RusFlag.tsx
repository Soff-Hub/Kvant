export const RussianFlag: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    {...rest}
    viewBox="0 0 1500 1000">
      <defs>
        <style>{`.cls-1{fill:#fff;}.cls-2{fill:#d52b1e;}.cls-3{fill:#0039a6;}`}</style>
      </defs>
      <rect className="cls-1" width="1500" height="500" />
      <rect className="cls-2" y="500" width="1500" height="500" />
      <rect className="cls-3" y="333.33" width="1500" height="333.33" />
    </svg>
  );
};
