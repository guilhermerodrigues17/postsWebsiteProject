import "./styles.css";

export const Button = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
