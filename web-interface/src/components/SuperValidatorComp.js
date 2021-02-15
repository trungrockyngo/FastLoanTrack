import React from "react";
import axios from "axios";

class SuperValidatorComp extends React.Component {


    componentDidMount() {
        this.getRequestIDs();
    }

    state = {
        res: []
    }

    approveLoanRequestHandler = event => {
        event.preventDefault();
        axios.get(`http://localhost:8000/approve`).then((response) => {
            console.log(response)
        });
    }

    getRequestIDs = () => {
        axios.get(`http://localhost:8000/requestIDs`).then((response) => {
            console.log("response = " + response);
            console.log("response.data = " + response.data);
            console.log("response.data.requestIDs = " + response.data.requestIDs);
            this.setState({ res: [response.data.requestIDs] });
        });
    }

    render() {
        return (
            <div>
                <h3>Super Validator</h3>
                <div>
                    <ul>
                        {this.state.res.map((each) => {
                            return (
                                <div>
                                    <li>{each}</li>
                                    <button name="approve" onClick={this.approveLoanRequestHandler}>Approve</button>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>);
    }
}

export default SuperValidatorComp;
