import axios from 'axios';
import React from 'react';

class LoanDetail extends React.Component {
    state = {
        // requestIDs: [],
        loanAmt: '',
        loanAfterInterestAmt: ''
    }

    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     // axios.get(`http://localhost:8000/requestIDs`
    //     // ).then((response) => {
    //     //     //console.log("response.data = " + response.data);
    //     //     console.log("response.data.requestIDs = " + response.data.requestIDs);
    //     //     this.setState({ res: response.data.requestIDs });
    //     // });
    // }

    render() {
        console.log(`Is the loan approved? ` + this.props.approved);
        
        if (this.props.approved) {

            let loanDetails = axios.get(`http://localhost:8000/loanDetails`)
                .then((response) => {
                    console.log(response);
                    this.setState = {
                        loanAmount: loanDetails.amt,
                        loanAfterInterestAmt: loanDetails.afterInterestAmt
                    }
                });

        }

        return (
            <>
                <div>
                    <label> Loan Amount (Before Interest)</label>
                    <label> {this.state.loanAmt} </label>
                </div>
                <div>
                    <label> Loan Amount After Interest </label>
                    <label> {this.state.loanAfterInterestAmt} </label>
                </div>
            </>
        )
    }

}

export default LoanDetail;
