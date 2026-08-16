function Input(props) {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onSelect}
      className="myInput"
    ></input>
  );
}

export default Input;
