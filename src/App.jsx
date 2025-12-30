import List from "./components/List.jsx";
import Button from "./components/Button.jsx";
import Input from "./components/Input.jsx";
import { useState } from "react";
import Snowfall from "react-snowfall";

//TODO:
//1. adicionar objeto com chave de status e renderirizar listas com base nisso ===> ideal fazer um enum para os status
//2. adiconar botão com lápis para mudança de status (ciclo entre os status)

function App() {
  const INITIAL_PROJECTS = [
    { name: "Organização de Notion", status: "to do" },
    { name: "Estudar Imutabilidade JS", status: "to do" },
    { name: "Melhorar código de App.jsx", status: "to do" },
  ];
  const inProgressList = [
    { name: "Desenvolver Mini Trello", status: "in progress" },
    { name: "Estudar React Hooks", status: "in progress" },
    { name: "Curso do Maximilian Schwarzmüller", status: "in progress" },
  ];
  const finishedList = [
    { name: "Aprender JavaScript", status: "finished" },
    { name: "Aprender Git e GitHub", status: "finished" },
  ];

  const [toDo, setProjects] = useState(INITIAL_PROJECTS);
  const [inProgress, setInProgress] = useState(inProgressList);
  const [finished, setFinished] = useState(finishedList);

  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      // uma string vazia é igual a false e ao tornar false com o ! torna-se true e cai no if
      // 1. Prevenção básica (não adicionar projetos vazios)
      alert("O nome do projeto não pode ser vazio!");
      return;
    }

    const newProject = {
      name: newProjectName,
      status: "to do",
    };

    const newProjectsArray = [...toDo, newProject];
    //não funcionaria se usassemos o .push() diretamente no estado (imutabilidade) pois isso alteraria o array original.
    // O React não renderizaria, ele só renderiza quando detecta a mudança no local de memória.

    setProjects(newProjectsArray); // atualiza o estado colocando um novo projeto

    setNewProjectName(""); // limpa o input (resetando o estado do input controlado)
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
    ); // o indice do elemento passado e modificado anteriormente é substituido pelo elemento atualizado
    // "o indice desse elemento é igual ao indiceq ue eu modifiquei antes? se sim, retorna o elemento atualizado, se não retorna o elemento original"

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

        {/* Seção de Criação de Novo Projeto */}
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
