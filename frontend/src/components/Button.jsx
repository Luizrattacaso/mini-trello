function Button({ onSelect, text }) {
  return (
    <button className="button" onClick={onSelect}>
      {text}
    </button>
  );
}

export default Button;
