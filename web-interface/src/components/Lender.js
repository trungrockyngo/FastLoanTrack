import React from "react";
import axios from "axios";

class Lender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amt: ''
        }
    }

    registerLenderHandler = event => {
        event.preventDefault();
        axios.get(`http://localhost:8000/register`).then((response) => {
            console.log(response)
        });
    }

    amountSubmittedHandler = (evt) => {
        evt.preventDefault();
        const val = evt.target.value;


        //Before this, can assume amt is in Ether (so multiply by 10^9)
        this.setState({ amt: val });
        // console.log('from amountSubmittedHandler() Submitting the amount: ' + this.state.amt);
    }

    depositToEscrowHandler = (evt) => {
        evt.preventDefault();
        let amt = this.state.amt;
        //console.log('Submitting the amount: ' + this.state.amt );
        axios.get('http://localhost:8000/deposit',{ params: { amt }
            })
            .then(response => {
                console.log(response)
            });
    }


    render() {
        return (
            <div>
                <h3>Lender</h3>
                <div>
                    <button name="submit" onClick={this.registerLenderHandler}>Register</button>
                </div>

                {/* <form onSubmit={this.depositToEscrowHandler}> */}
                <p>Enter the amount to deposit is then validated by us so that can be transferred to an assigned borrower  </p>
                {/* <input defaultValue="Enter here" onSubmit={this.amountSubmitedHandler}/> */}
                {/* <input defaultValue="Enter here" onKeyUp={this.amountSubmittedHandler.bind(this)}/> */}

                <div>
                    <label>Enter here: </label>
                    <input text="text" value={this.state.amt} onChange={this.amountSubmittedHandler} />
                    <button name="submit" onClick={this.depositToEscrowHandler}>Submit</button>
                </div>
            </div>);
    }
}

export default Lender;
