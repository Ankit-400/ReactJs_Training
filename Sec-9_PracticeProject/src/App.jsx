import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });
  // selectedProjectId - undefined => No project is selected, no projects available
  // selectedProjectId - null => No project is selected, we are adding new one.

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const newProject = {
        id: Math.random(),
        ...projectData
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleDeleteProject() {
    const filteredProjects = projectState.projects.filter(project => project.id !== projectState.selectedProjectId);
    setProjectState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: filteredProjects
      }
    });
  }

  function handleAddTask(task) {
    setProjectState(prevState => {
      const newTask = {
        id: Math.random(),
        text: task,
        projectId: prevState.selectedProjectId
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
    <SelectedProject
      project={selectedProject}
      tasks={projectState.tasks}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />);

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="my-8 h-screen flex gap-8">
      <ProjectSidebar
        projects={projectState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
