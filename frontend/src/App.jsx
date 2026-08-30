import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import toast from "react-hot-toast";

import List from "./components/List";
import Button from "./components/Button";
import Input from "./components/Input";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [tasks, setTasks] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const today = new Date();

  const API_URL = "http://localhost:1212";

  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/tasks?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error while loading tasks:", err));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setTasks([]);
    toast.success("Logout completed successfully");
  };

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  const toDo = tasks.filter((task) => task.status === "0");
  const inProgress = tasks.filter((task) => task.status === "1");
  const finished = tasks.filter((task) => task.status === "2");

  const handleAddProject = async () => {
    if (!newProjectName.trim()) {
      toast.error("project name cannot be empty");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName, status: "0", user_id: user.id }),
      });

      const newTask = await response.json();

      if (response.ok) {
        setTasks((prev) => [...prev, newTask]);
        setNewProjectName("");
        toast.success("Task added successfully");
      }
    } catch (error) {
      console.error("Error while adding new task:", error);
      toast.error("Error while adding new task.");
    }
  };

  const handleInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        toast.success("Task removed");
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
      toast.error("Error while deleting task.");
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
        toast.success("Status updated");
      }
    } catch (error) {
      console.error("Error while updating status:", error);
      toast.error("Error while updating status.");
    }
  };

  return (
    <>
      <div className="mainContainer">
        {today.getMonth() === 11 && <Snowfall color="#82C3D9" />}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Welcome to TaskFlow Dashboard, {user.username}</h1>
          <Button onSelect={handleLogout} text="Sair" />
        </div>
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