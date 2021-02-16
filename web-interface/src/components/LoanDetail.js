import axios from 'axios';
import React from 'react';

class LoanDetail extends React.Component {
    state = {
        //selectedRequestID: '',
        loanAmt: '',
        loanAfterInterestAmt: ''
    }

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log(`Is the loan approved? ` + this.props.approved);

        if (this.props.approved) {
            let reqID = String(this.props.currentReqID);
            console.log("currentReqID " + this.props.currentReqID);

            let loanDetails = {};

            // axios.get(`http://localhost:8000/loanDetails`, {
            //     params: { reqID }
            // })
            //     .then((response) => {
            //         console.log("loan Details " + response.data);
            //         loanDetails = response.data;

            //         console.log(`loanDetails.amt: ${loanDetails.amt}, loanDetails.afterInterestAmt ${loanDetails.afterInterestAmt}`);

            //         this.setState = {
            //             loanAmt: loanDetails.amt,
            //             loanAfterInterestAmt: loanDetails.afterInterestAmt
            //         }
            //     });
        }
    }


    render() {


        //ISSUE: somehow state variable not rendering despite having non-null values 
        return (
            <>
                <div>

                    <label> Loan Amount (Before Interest)</label>
                    {/* <input value= {this.state.loanAmt}/> */}
                </div>
                <div>
                    <label> Loan Amount After Interest </label>
                    <p> {this.state.loanAfterInterestAmt} </p>
                </div>
            </>
        )
    }

}

export default LoanDetail;
