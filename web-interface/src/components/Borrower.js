import React from "react";
import axios from "axios";
// import LoanDetail from "./LoanDetail";

class Borrower extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: '',
            projectTitle: '',
            amount: 0, 
            installmentAmt: 0
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

    paymentHandler = async (evt) => {
        evt.preventDefault();

        let resp = await axios.get(`http://localhost:8000/requestIDs`)

        let reqID = resp.data.requestIDs[0];
        let amt = this.state.installmentAmt; 
        
        axios.get(`http://localhost:8000/pay`, {
            params: {
                amt,
                reqID
            }
        }).then((response) => {
            console.log(response)
        });
    }

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

                {/* <div>
                    <button onClick={this.claimLoanTransferHandler}> Claim loan amount that's approved </button>
                </div> */}

                <div className="payment">
                    <p> Make loan payment by installment amount</p>
                    <input type="text" name="installmentAmt" value={this.state.installmentAmt} onChange={this.handleChange}/>
                    <button name="makePayment" onClick={this.paymentHandler}>Submit</button>
                </div>
            </div>
        );
    }
}

export default Borrower;