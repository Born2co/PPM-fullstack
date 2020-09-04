import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import * as actions from '../components/store/actions/index';
import { connect } from 'react-redux';

// import axios from "axios";

class Dashboard extends Component {
  // state = {
  //   projects: []
  // }

  componentDidMount() {
    this.props.ongetAllProjectData();
    // this.refreshProject();
  } 

  // refreshProject() {
  //   axios.get(`http://localhost:8080/api/project/all`)
  //   .then(response => {
  //     this.setState({
  //       projects: response.data
  //     })
  //   })
  // }


  // deleteProject=(id) =>{
  //   axios.delete(`http://localhost:8080/api/project/${id}`)
  //   this.refreshProject();
  // }

  render() {
    const projectsItem =
      this.props.projects.map(project => {
        return <ProjectItem key ={project.id} 
        projectName={project.projectName}
        projectIdentifier={project.projectIdentifier}
        description={project.description}
        onDelete= {()=>this.props.onDeleteProjectData(project.projectIdentifier)}

        />
      })

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <a href="/addProject" className="btn btn-lg btn-info">
                Create a Project
              </a>
              <br />
              <hr />
              {/* <ProjectItem /> */}
              {projectsItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.prReducer.projects

});

const mapDispatchToProps = dispatch => {
  return {
    ongetAllProjectData: () => dispatch(actions.getAllProjectData()),
    onDeleteProjectData: (id) => dispatch(actions.deleteProjectData(id))
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
