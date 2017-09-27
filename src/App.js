import React, { Component } from 'react';
import logo from './mercadolibre.png';
import './App.css';
import axios from 'axios'

const apiMLUrl = 'https://api.mercadolibre.com/'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      itemName: ''
    }
    this.getItems = this.getItems.bind(this)
  }

  getItems(event){
      var itemInput = event.target.value
      this.setState({itemName: itemInput})
      axios.get(apiMLUrl+'sites/MCO/search', {
        params: {
          q: itemInput
        }
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MercadoSarch Bonampa312</h1>
          <br/>
          <div className="App-input">
            <input type="text" onChange={this.getItems}></input>
            <button>Push Me</button>
          </div>
          <br/>
        </header>
        <p className="App-intro">
          <a>{this.state.itemName}</a>
        </p>
        <div className="App-footer">
          <a>Powered by: Santiago Romero</a>
        </div>
      </div>
    );
  }
}

export default App;
