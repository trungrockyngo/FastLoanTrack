import React from "react";
import axios from "axios";
// import LoanDetail from "./LoanDetail";

class Borrower extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: '',
            projectTitle: '',
            amount: ''
        };

    }

    handleChange = (evt) => {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    };

    submitRequestHandler = (evt) => {
        evt.preventDefault();
        let projectId = this.state.projectId;
        let projectTitle = this.state.projectTitle;
        let amount = this.state.amount;

        console.log('projectId = ' + projectId);

        axios.get(`http://localhost:8000/request`, {
            params: {
                projectId,
                projectTitle,
                amount
            }
        }).then((response) => {
            console.log(response)
        });
    };

    // claimLoanTransferHandler = (evt) => {
    //     axios.get('http://localhost:8000/transfer',)
    // }

    render() {
        return (
            <div>
                <h2>Borrower</h2>

                <form onSubmit={this.submitRequestHandler}>
                    <div>
                        <label>Project ID: </label>
                        <input type="text" name="projectId" value={this.state.projectId} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Project Title: </label>
                        <input type="text" name="projectTitle" value={this.state.projectTitle} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Loan Amount: </label>
                        <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button name="submit">Submit</button>
                    </div>
                </form>

                {/* <AccountDetails /> */}

                {/* <div>
                    <button onClick={this.claimLoanTransferHandler}> Claim loan amount that's approved </button>
                </div> */}
            </div>
        );
    }
}

export default Borrower;