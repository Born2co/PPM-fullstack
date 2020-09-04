import React, { Component } from "react";
// import classnames from 'classnames';
import axios from 'axios';
import { Link } from "react-router-dom";
class UpdateProjectTask extends Component {
    constructor(props) {
        super(props);
        const { backlog_id, pt_id } = this.props.match.params;
        this.state = {
            id: 0,
            projectSequence: '',
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: backlog_id,
            create_At: "",
            update_At: "",

            pt_id: pt_id,
            errors: {}
        };
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/api/backlog/${this.state.projectIdentifier}/${this.state.pt_id}`)
            .then(response => {
                 console.log(response.data.projectIdentifier, response.data.summary,)
                this.setState({
                    id: response.data.id,
                    status: response.data.status,
                    projectIdentifier: response.data.projectIdentifier,
                    summary: response.data.summary,
                    acceptanceCriteria: response.data.acceptanceCriteria,
                })
            })
            .catch(err => { console.log(err.response.data.projectNotFound) });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // const p_id= [...this.state.pt_id].splice(5, 1).join();
        // console.log(`p_id : ${p_id}`);
        console.log(`p_id : ${this.state.id}`);
        const newTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        };

        // http://localhost:8080/api/backlog/PID1/PID1-1
        axios.patch(`http://localhost:8080/api/backlog/${this.state.projectIdentifier}/${this.state.pt_id}`, newTask)
            .then(response => {
                console.log(`response ${response}`)
                this.props.history.push(`/projectBoard/${this.state.projectIdentifier}`)
            })
            .catch(error => {
                console.log(`Error wile posting ${error}`)
                this.setState({ errors: error.response.data })
            })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        let errors = this.state;
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">
                                Back to Project Board
                        </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name: {this.state.projectIdentifier} +
                              Project Task ID: {this.state.pt_id}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        // className={classnames("form-control form-control-lg", {
                                        //     "is-invalid": errors.summary
                                        // })}
                                        className="form-control form-control-lg"
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="dueDate"
                                        value={this.state.dueDate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        {/* <option value="{this.state.status}">Select Status</option> */}
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default UpdateProjectTask; 