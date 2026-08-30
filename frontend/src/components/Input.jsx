function Input({ type = "text", placeholder, value, onSelect, className, id }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onSelect}
      className={className || "myInput"}
    />
  );
}

export default Input;