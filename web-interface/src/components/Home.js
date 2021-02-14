import React from "react";

class Home extends React.Component {

    constructor(props) {
        super(props);
        //this.state = {name: ""};

        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    state = { 
        name: ""
    }

    handleChange = event => {
        //this.state.name= event.target.value;
    };

    handleSubmit = event => {
        /*
        axios.post(`https://jsonplaceholder.typicode.com/users`, {
            name: this.state.name
          }).then((response) => {
            console.log(response)});
        console.log(this.state);
        */
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div><h1><center>FastLoan</center></h1></div>
                <div><h2><center>Are you a Borrower or Lender?</center></h2></div>
            </div>
        );
    }
}

export default Home;
