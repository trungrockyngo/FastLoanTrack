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
        noOfInstallment: 0,
        escrowBal: 0
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

    escrowBalanceHandler = (evt) => {
        evt.preventDefault();

        axios.get(`http://localhost:8000/escrowBal`).then(
            resp => {

                // console.log('escrowBal from GET /escrowBal ' + resp.data.escrowBal);                
               
                this.setState({
                    escrowBal: resp.data.escrowBal
                })
            }
        )
        console.log('escrowBal after finishing GET /escrowBal ' + this.state.escrowBal);                

    }

    approveLoanRequestHandler = (event, reqID) => {
        event.preventDefault();

        //console.log("Selected reqID " + selectedReqID);
        console.log("Selected reqID " + reqID);


        //NOTE: tricky bug of not API call taking the byte address prepended by "reqID[]" not reqID
        reqID = String(reqID);
        let noOfInstallment = this.state.noOfInstallment;

        axios.get(`http://localhost:8000/approve`, {
            params: {
                noOfInstallment,
                reqID
            }
        }).then((response) => {
            console.log(response)
        });

        this.setState({
            reqIDApproved: true
        })
        console.log("reqIDApproved " + this.state.reqIDApproved);
    }

    depositToEscrowHandler = async (evt, reqID) => {
        evt.preventDefault();

        reqID = String(reqID);

        // let loanDetails = {};

        //NOTE: temporary fix for loanDetail's state variables   
        let resp = await axios.get(`http://localhost:8000/loanDetails`, {
            params: { reqID }
        });
        // .then((response) => {
        //     console.log("loan Details " + response.data);
        //     loanDetails = response.data;

        //     // this.setState = {
        //     //     amount: loanDetails.amt,
        //     // }
        //     // amt = response.data.amt;
        // });

        let amt = resp.data.amt;
        console.log("in depositToEscrowHandler() " + amt);

        axios.get('http://localhost:8000/transfer', {
            params: {
                amt,
                reqID
            }
        }).then((response) => {
            console.log(response);
        });
    }


    refundByEscrowHandler = async (evt, reqID) => {
        evt.preventDefault();

        reqID = String(reqID);

        let resp = await axios.get(`http://localhost:8000/loanDetails`, {
            params: { reqID }
        });


        let amt = resp.data.afterInterestAmt;
        console.log("in refundByEscrowHandler() " + amt);

        axios.get('http://localhost:8000/refund', {
            params: {
                amt,
                reqID
            }
        }).then((response) => {
            console.log(response);
        });
    }

    render() {
        return (
            <div>
                <h3>Super Validator</h3>
                <div className="escrowBal">
                    <button onClick={this.escrowBalanceHandler}> Get escrow balance </button>
                    <p>{this.state.escrowBal}</p>
                </div>
                <div className="listOfRequests">
                    <ul>
                        {this.state.reqIDList.map((each, index) => {
                            {/* {this.props.requestIDs.map((each) => { */ }
                            return (
                                <div>
                                    <li value={each} key={index}>
                                        <p>{each}</p>
                                        <p> Enter number of installment </p>
                                        <input value={this.state.noOfInstallment} onChange={this.noOfInstalmentHandler} />

                                        <LoanDetail approved={this.state.reqIDApproved} currentReqID={each} />

                                        <div className="approveLoan">
                                            <button name="approveLoan" onClick={(event) => this.approveLoanRequestHandler(event, each)}> Approve</button>
                                        </div>
                                        <div className="transferToEscrow">
                                            <button name="transferToEscrow" onClick={(event) => this.depositToEscrowHandler(event, each)}> Transfer To Borrower</button>
                                        </div>
                                        <div className="refundbByEscrow">
                                            <button name="refundbByEscrow" onClick={(event) => this.refundByEscrowHandler(event, each)}> Refund To Lender</button>

                                        </div>
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
