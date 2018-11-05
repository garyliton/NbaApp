import React, { Component } from 'react';
import { Menu } from './Menu'
import Standings from './Standings';
import Teams from './Teams';

 

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
    } 
    else {
      const game_seq = Object.keys(this.state.games);
    
      const games_today = game_seq.map((seq_num) =>
        <div key={this.state.games[seq_num]["TEAM_1_GAME_SEQUENCE"]} className='scoresRow'>
            <div className='scoresTeamOne'>
              <div>
                <div><img src={require("" + this.state.games[seq_num]["TEAM_1_IMG"])} className='logo'/></div>
                <div>{this.state.games[seq_num]["TEAM_1_ABBREVIATION"]}</div>  
              </div>
              <div>
                {this.state.games[seq_num]["TEAM_1_WINS_LOSSES"]}
              </div>
            </div>

            <div className='scoresTeamOneScore'>
              <div>{this.state.games[seq_num]["TEAM_1_PTS"]}</div>  
            </div>
           

    


            <div className='scoresVs'>
              vs
            </div> 

            <div className='scoresTeamTwoScore'>
              <div>{this.state.games[seq_num]["TEAM_2_PTS"]}</div>  
            </div>
            <div className='scoresTeamTwo'>
              <div>
                <div><img src={require("" + this.state.games[seq_num]["TEAM_2_IMG"])} className='logo'/></div>
                <div>{this.state.games[seq_num]["TEAM_2_ABBREVIATION"]}</div>  
              </div>
              <div>
                {this.state.games[seq_num]["TEAM_2_WINS_LOSSES"]}
              </div>
            </div>
        </div>
      );

      return (
       
        <div className="App">
        <Menu />
        {(this.props.location.pathname === "/") ?
            <div className='scoresTable'>
              {games_today}
            </div> :
          (this.props.location.pathname === "/standings") ?
            <Standings /> : 
            <Teams />
        }
          
        
        </div>
      );
    }
  }
}

export default App;
