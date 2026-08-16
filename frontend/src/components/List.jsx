function List({ title, myList, color, onDelete, onChangeStatus }) {
  return (
    <div className="listContainer" style={color && { backgroundColor: color }}>
      <h2>{title ? title : ""}</h2>
      <ol>
        {myList.map((item) => (
          <li key={item.id}>
            <span>{item.name} </span>
            <select
              onChange={(e) => onChangeStatus(item.id, e.target.value)}
              value={item.status}
            >
              <option value="0">To do</option>
              <option value="1">In Progress</option>
              <option value="2">Finished</option>
            </select>
            <button className="" onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default List;