import React, { Component } from "react";
import ProjectTask from './ProjectTask/ProjectTask';
// import axios from "axios";
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
class Backlog extends Component {

    // state = {
    //     projectTasks: [],
    //     errors: {},
    //     err: false
    // }

    componentDidMount() {
       // console.log(this.props.id)
        // this.refreshProjectTasks();
        this.props.onGetBacklog(this.props.id)
    }


    // refreshProjectTasks() {
     
    //     axios.get(`http://localhost:8080/api/backlog/${this.props.id}`)
    //         .then(response => {
    //             this.setState({ projectTasks: response.data })
    //         })
    //         .catch(error => {
    //             console.log(error.response.data)
    //             this.setState({ errors: error.response.data, err: true })
    //         })

    // }

    // deleteProjectTask = (projectIdentifier, projectSequence) => {
    //     console.log(`this is id going to be deleted ${projectIdentifier} and ${projectSequence}`)
    //     axios.delete(`http://localhost:8080/api/backlog/${projectIdentifier}/${projectSequence}`)
    //     this.refreshProjectTasks();
    // }


    render() {


       // let projectTasks = this.state.projectTasks.map(projectTask => {
            let projectTasks = this.props.projectTasks.map(projectTask => {
            return <ProjectTask
                key={projectTask.id}
                projectSequence={projectTask.projectSequence}
                summary={projectTask.summary}
                acceptanceCriteria={projectTask.acceptanceCriteria}
                status={projectTask.status}
                priority={projectTask.priority}
                projectIdentifier={projectTask.projectIdentifier}
                deleteTask={() => this.props.onDeleteProjectTask(projectTask.projectIdentifier, projectTask.projectSequence)}
            />
        })
        
        let tasks = [];
        for (let key in this.props.projectTasks)
            tasks.push(projectTasks[key]);
        const doneTask = tasks.filter(task => task.props.status === 'DONE');
        const toDOTask = tasks.filter(task => task.props.status === 'TO_DO');
        const inProgressTask = tasks.filter(task => task.props.status === 'IN_PROGRESS');

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {/* {projectTasks} */}

                        {toDOTask}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>

                        {inProgressTask
                            //  <!-- SAMPLE PROJECT TASK STARTS HERE -->
                            //         <!-- SAMPLE PROJECT TASK ENDS HERE -->
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {doneTask
                            // <!-- SAMPLE PROJECT TASK STARTS HERE -->
                            // <!-- SAMPLE PROJECT TASK ENDS HERE -->
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projectTasks: state.brReducer.backlogs

});

const mapDispatchToProps = dispatch => {
    return {
        onGetBacklog: (pid) => dispatch(actions.getBacklog(pid)),
        onDeleteProjectTask:(pid, pSeq) =>dispatch(actions.deleteProjectTask(pid, pSeq))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Backlog);
