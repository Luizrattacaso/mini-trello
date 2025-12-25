function List({ title, myList, color }) {
  return (
    <div className="listContainer" style={color && { backgroundColor: color }}>
      <h2>{title ? title : ""}</h2>
      <ul>
        {myList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
