import { useState } from "react";
import Snowfall from "react-snowfall";

import List from "./components/List";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const INITIAL_PROJECTS = [
    { name: "Tarefa teste", status: "0" },
  ];
  const inProgressList = [];
  const finishedList = [];

  const [toDo, setProjects] = useState(INITIAL_PROJECTS);
  const [inProgress, setInProgress] = useState(inProgressList);
  const [finished, setFinished] = useState(finishedList);

  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      alert("project name cannot be empty");
      return;
    }

    const newProject = {
      name: newProjectName,
      status: "0",
    };

    const newProjectsArray = [...toDo, newProject];

    setProjects(newProjectsArray);
    setNewProjectName("");
  };

  const handleInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  const handleDeleteProject = (myList, index) => {
    const updatedArray = myList.filter((element, i) => i !== index);
    if (myList === toDo) {
      return setProjects(updatedArray);
    } else if (myList === inProgress) {
      return setInProgress(updatedArray);
    } else if (myList === finished) {
      return setFinished(updatedArray);
    }
  };

  const handleChangeStatus = (myList, index, newStatus) => {
    const projectToUpdate = myList[index];
    const updatedProject = { ...projectToUpdate, status: newStatus };

    const updatedArray = myList.map((element, i) =>
      i === index ? updatedProject : element
    );

    if (myList === toDo) {
      return setProjects(updatedArray);
    } else if (myList === inProgress) {
      return setInProgress(updatedArray);
    } else if (myList === finished) {
      return setFinished(updatedArray);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <Snowfall color="#82C3D9" />
        <h1>Mini Trello 📋</h1>
        <div className="newProject">
          <h2>Criar Novo Projeto</h2>
          <Input
            placeholder="Nome do Projeto"
            value={newProjectName}
            onSelect={handleInputChange}
          />
          <Button onSelect={handleAddProject} text="Adicionar" />
        </div>
      </div>
      <div className="displayObjects">
        <h2>
          Meus Projetos ({toDo.length + inProgress.length + finished.length})
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
