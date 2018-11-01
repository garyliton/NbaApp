import React, { Component } from 'react';
// import logo from './logo.svg';

 

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      games: {},
      wait: true
    }
  }
  

  componentWillMount() {

    const that = this;
    fetch('http://127.0.0.1:8080/getgames', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(function(res) {
      return res.json();
    }).then(function(data) {
      data = JSON.parse(data)
      return(data)
    }).then(function(new_state) {
      that.setState({ 
        games: new_state,
        wait: false
      })
    })
    

    // fetch('http://127.0.0.1:5000/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: 'LITTTTY'
    //   })
    // }).then(function(response) {
    //   return response.json();
    // }).then(function(data){
    //   console.log(data.yo);
    // })



  }


  render() {

    if (this.state.wait){
      return (
        <div className="App"></div>
      );
    } else {
      console.log(this.state.games)
      const game_seq = Object.keys(this.state.games);
      console.log(game_seq);
      const games_today = game_seq.map((seq_num) =>
        <li key={this.state.games[seq_num]["TEAM_1_GAME_SEQUENCE"]}>{this.state.games[seq_num]["TEAM_1_ABBREVIATION"]} vs {this.state.games[seq_num]["TEAM_2_ABBREVIATION"]}</li>
      );
      return (
        <div className="App">
        
        <ul>
          {games_today}
        </ul>
          
        </div>
      );
    }
  
  }
}

export default App;
