import React, { Component } from "react";
import {  Link } from "react-router-dom";

class ProjectTask extends Component {

  render() {

    const { projectSequence, priority, summary, acceptanceCriteria, projectIdentifier} = this.props;
    let priorityString;
    let priorityClass;
    if (priority === 1) {
      priorityClass = "bg-danger text-light"
      priorityString = "HIGH"
    }
    if (priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM"
    }
    if (priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW"

    }
    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          {/* ID: {project_task.projectSequence} -- Priority: {project_task.priorityString} */}
    ID: {projectSequence} -- Priority:{priorityString}
          {priority}

        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{summary}</h5>
          <p className="card-text text-truncate ">

            {acceptanceCriteria}
          </p>
          <Link to={`updateProjectTask/${projectIdentifier}/${projectSequence}`}
          className="btn btn-primary">
            View / Update
          </Link>
          <button className="btn btn-danger ml-4" onClick = {this.props.deleteTask}>Delete</button>
        </div>
      </div>
    );
  }
}
export default ProjectTask;
