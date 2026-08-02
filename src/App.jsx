import { useState } from "react";
import Snowfall from "react-snowfall";

import List from "./components/List";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", name: "Tarefa teste", status: "0" },
  ]);

  const [newProjectName, setNewProjectName] = useState("");

  const toDo = tasks.filter((task) => task.status === "0");
  const inProgress = tasks.filter((task) => task.status === "1");
  const finished = tasks.filter((task) => task.status === "2");

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      alert("project name cannot be empty");
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      name: newProjectName,
      status: "0",
    };
    
    setTasks((prev) => [...prev, newProject]);
    setNewProjectName("");
  };

  const handleInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  const handleDeleteProject = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

   const handleChangeStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <>
      <div className="mainContainer">
        <Snowfall color="#82C3D9" />
        <h1>Mini Trello</h1>
        <div className="newProject">
          <h2>Add new task or to-do</h2>
          <Input
            placeholder="Add task name"
            value={newProjectName}
            onSelect={handleInputChange}
          />
          <Button onSelect={handleAddProject} text="Add" />
        </div>
      </div>
      <div className="displayObjects">
        <h2>
          My tasks ({toDo.length + inProgress.length + finished.length})
        </h2>
        <List
          title="To do"
          myList={toDo}
          onDelete={handleDeleteProject}
          onChangeStatus={handleChangeStatus}
        />
        <List
          title="In Progress"
          myList={inProgress}
          onDelete={handleDeleteProject}
          onChangeStatus={handleChangeStatus}
        />
        <List
          title="Finished"
          myList={finished}
          onDelete={handleDeleteProject}
          onChangeStatus={handleChangeStatus}
        />
      </div>
    </>
  );
}

export default App;
