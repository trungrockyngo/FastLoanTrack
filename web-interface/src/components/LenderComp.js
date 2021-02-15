import React from "react";
import axios from "axios";

class LenderComp extends React.Component {

    registerLenderHandler = event => {
        event.preventDefault();
        axios.get(`http://localhost:8000/register`).then((response) => {
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
        </div>);
    }
}

export default LenderComp;
