import React from "react";
import axios from "axios";
import LoanDetail from './LoanDetail';

class SuperValidator extends React.Component {

    constructors(props) {
        // super(props);
    }

    state = {
        reqIDList: [],
        reqID: '',
        amount: 0,
        reqIDApproved: false,
        noOfInstallment: 0
    }

    componentDidMount() {
        this.getRequestIDs();
    }

    getRequestIDs = () => {
        axios.get(`http://localhost:8000/requestIDs`).then((response) => {
            console.log("response.data.requestIDs = " + response.data.requestIDs);
            this.setState({
                reqIDList: [response.data.requestIDs]
            });
        });
    }

    noOfInstalmentHandler = (evt) => {
        this.setState({
            noOfInstallment: evt.target.value
        });
    }

    approveLoanRequestHandler = (event, reqID) => {
        event.preventDefault();
        
        // console.log("Selected reqID " + reqID);
        let noOfInstallment = this.state.noOfInstallment; 

        axios.get(`http://localhost:8000/approve`, {
            params: {
                reqID,
                noOfInstallment, 
            }
        }).then((response) => {
            console.log(response)
        });

        this.setState({
            reqIDApproved: true
        })
        console.log("reqIDApproved " + this.state.reqIDApproved);
    }

    claimLoanTransferHandler = (evt) => {
        let reqID = this.state.reqID;
        let amount = this.state.amount;

        axios.get('http://localhost:8000/transfer', {
            params: {
                reqID,
                amount
            }
        }).then((response) => {
            console.log(response)
        });
        ///
    }


    render() {
        return (
            <div>
                <h3>Super Validator</h3>
                <div>
                    <ul>
                        {this.state.reqIDList.map((each, index) => {
                            {/* {this.props.requestIDs.map((each) => { */ }
                            return (
                                <div>
                                    <li value={each} key={index}>
                                        <p>{each}</p>
                                        <p> Enter number of installment </p>
                                        <input value={this.state.noOfInstallment} onChange={this.noOfInstalmentHandler}/>

                                        <LoanDetail approved={this.state.reqIDApproved} currentReqID={each} />

                                        <button name="approve" onClick={(event) => this.approveLoanRequestHandler(event, each)}> Approve</button>
                                        <button name="transferTo" onClick={this.claimLoanTransferHandler}> Transfer To </button>
                                    </li>
                                </div>
                            );
                        })}

                    </ul>
                </div>
            </div>);
    }
}

export default SuperValidator;
