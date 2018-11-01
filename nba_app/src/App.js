import React, { Component } from 'react';
// import logo from './logo.svg';

 

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({
    //       isLoaded: true,
    //       items: json
    //     })
    //   })

    // fetch('http://127.0.0.1:5000/', {
    //   method: 'post',
    //   headers:new Headers({
    //     'Content-Type': 'application/json'
    //   }),
    //   body: JSON.stringify({
    //     "name": "FUCKKKK"
    //   })
    // })

    fetch('http://127.0.0.1:5000/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'LITTTTY'
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data){
      console.log(data.yo);
    })



  }


  render() {
    var { isLoaded, items } = this.state;

    if(!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <li key={item.id}>
                Name: {item.name} | Email: {item.email}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    
  }
}

export default App;
