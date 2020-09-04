import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProject from './components/Project/AddProject'
import { BrowserRouter, Route } from "react-router-dom";
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/Project/ProjectBoard/ProjectBoard';
import AddProjectTask  from './components/Project/ProjectBoard/ProjectTask/AddProjectTask';
import UpdateProjectTask from  './components/Project/ProjectBoard/ProjectTask/UpdateProjectTask';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact  path="/updateProject/:id" component={UpdateProject} />
          <Route exact path="/projectBoard/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
          <Route exact  path="/projectBoard/:id" component={ProjectBoard} />
          <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
