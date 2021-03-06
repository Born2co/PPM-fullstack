import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class AddProject extends Component {
    state = {
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: "",
        errors: {}

    }

    onSubmit = (event) => {
        const formData = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
        }

        event.preventDefault();
        axios.post(`http://localhost:8080/api/project`, formData)
            .then(response => { console.log(response.data)
                this.props.history.push("/dashboard")
            })
            .catch(error => {
                console.log(`error hai ${error.response.data}`)
                this.setState({ errors: error.response.data });
              }
            )
      
    }
    
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value);
    }

    render() {
        const { errors } = this.state
        return (

            <div>
                {/* {this.state.errors} */}
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create Project form</h5>
                                <hr />

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.projectName
                                            })}
                                            //  className="form-control form-control-lg "
                                            placeholder="Project Name"
                                            name="projectName"
                                            value={this.state.projectName}
                                            onChange={this.onChange}
                                        />
                                        {errors.projectName && (
                                            <div className="invalid-feedback">
                                                {errors.projectName}
                                            </div>
                                        )}


                                    </div>

                                    <div className="form-group">
                                        <input type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.projectIdentifier
                                            })}
                                            // className="form-control form-control-lg"
                                            placeholder="Unique Project ID"
                                            name="projectIdentifier"
                                            value={this.state.projectIdentifier}
                                            onChange={this.onChange}
                                        // disabled 
                                        />
                                        {errors.projectIdentifier && (
                                            <div className="invalid-feedback">
                                                {errors.projectIdentifier}
                                            </div>
                                        )}
                                    </div>


                                    <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.description
                                            })}
                                            //className="form-control form-control-lg"
                                            placeholder="Project Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                        />
                                        {errors.projectIdentifier && (
                                            <div className="invalid-feedback">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>

                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date"
                                            className="form-control form-control-lg"
                                            name="start_date"
                                            value={this.state.start_date}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date"
                                            className="form-control form-control-lg"
                                            name="end_date"
                                            value={this.state.end_date}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    <input type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

export default AddProject;

