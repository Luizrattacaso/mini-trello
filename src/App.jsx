import List from "./components/List.jsx";
import Button from "./components/Button.jsx";
import Input from "./components/Input.jsx";
import { useState } from "react";

//Ajustes:
//1. adivionar objeto com chave de status e renderirizar listas com base nisso ===> ideal fazer um enum para os status
//2. adiconar botão com lápis para mudança de status (ciclo entre os status)

function App() {
  const INITIAL_PROJECTS = [
    { id: 1, name: "Mini Trello Core" },
    { id: 2, name: "Estudar Imutabilidade JS" },
    { id: 3, name: "Melhorar código de App.jsx" },
  ];

  const inProgress = [];
  const finished = [];

  const [toDo, setProjects] = useState(INITIAL_PROJECTS);
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      // 1. Prevenção básica (não adicionar projetos vazios)
      alert("O nome do projeto não pode ser vazio!");
      return;
    }

    const newProject = {
      id: Date.now(), // não ideal para IDs em produção, mas serve para este exemplo
      name: newProjectName,
    };

    const newProjectsArray = [...toDo, newProject];
    //não funcionaria se usassemos o .push() diretamente no estado (imutabilidade) pois isso alteraria o array original.
    // O React não renderizaria, ele só renderiza quando detecta a mudança no local de memória.

    setProjects(newProjectsArray); // 4. Atualiza o estado colocando um novo projeto

    setNewProjectName(""); // 5. Limpa o input (resetando o estado do input controlado)
  };

  const handleInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  return (
    <>
      <div className="mainContainer">
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

        {/* Lista de Projetos (Continua a usar 'projects' do estado) */}
        <h2>Meus Projetos ({toDo.length})</h2>
      </div>
      <List title="To do" myList={toDo} />
      <List title="In Progress" myList={toDo} />
      <List title="Finished" myList={toDo} />
    </>
  );
}

export default App;
