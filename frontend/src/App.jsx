import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

import List from "./components/List";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  const API_URL = "http://localhost:1212";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error while loading tasks:", err));
  }, []);

  const toDo = tasks.filter((task) => task.status === "0");
  const inProgress = tasks.filter((task) => task.status === "1");
  const finished = tasks.filter((task) => task.status === "2");

  const handleAddProject = async () => {
    if (!newProjectName.trim()) {
      alert("project name cannot be empty");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName, status: "0" }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
        setNewProjectName("");
      }
    } catch (error) {
      console.error("Error while adding new task:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
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