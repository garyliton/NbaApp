// import React from 'react';

// export const Leaders = () => 
//     <div>
//         <h1>Leaders</h1>
//     </div>

import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Leaders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaders: [],
            wait: true,
            data: [{'firstname': "gary", 'lastname': "liton"}, {'firstname': "john", 'lastname': "cena"}]
          }

    }

    componentWillMount() {
        const that = this;
        fetch('http://127.0.0.1:8080/leagueleaders', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(new_state) {
            that.setState({ 
                leaders: new_state,
                wait: false
            })
            
        })

    }

    render() {
        if(this.state.wait) {
            return (
                <div>
                    Leaders
                </div>
            );
        }
        else {
            var cols = [];
            var headers = Object.keys(this.state.leaders[0])
            for (var i = 1; i < headers.length; i++) {
                cols.push({Header: headers[i], accessor: headers[i]})
            }
            console.log(cols)
            return(
                <div>
                    <ReactTable data={this.state.leaders} columns={cols}/>
                </div>
            );
        }

    
    }
}

export default Leaders;