function List({ title, myList, color, onDelete, onChangeStatus }) {
  return (
    <div className="listContainer" style={color && { backgroundColor: color }}>
      <h2>{title ? title : ""}</h2>
      <ol>
        {myList.map((item, index) => (
          <li key={index}>
            <span>{item.name} </span>
            <select
              onChange={(e) => onChangeStatus(myList, index, e.target.value)}
              value={item.status}
            >
              <option value=""></option>
              <option value="0">To do</option>
              <option value="1">In Progress</option>
              <option value="2">Finished</option>
            </select>
            <button className="" onClick={() => onDelete(myList, index)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default List;
