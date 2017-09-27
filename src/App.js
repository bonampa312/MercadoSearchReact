import React, { Component } from 'react';
import logo from './mercadolibre.png';
import './App.css';
import axios from 'axios'

const apiMLUrl = 'https://api.mercadolibre.com/'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      itemName: '',
      itemsData: ['']
    }
    this.getItems = this.getItems.bind(this)
    this.setParam = this.setParam.bind(this)
  }

  getItems(props){
      var itemInput = this.state.itemName
      var self = this
      console.log(this.state.itemName);
      axios.get(apiMLUrl+'sites/MCO/search', {
        params: {
          q: itemInput
        }
      })
      .then(function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
		      return;
        }
        self.setState({itemsData: response.data})
        console.log(self.state.itemsData);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  setParam(event){
    var itemInput = event.target.value
    this.setState({itemName: itemInput})
  }

  itemsList() {
     var items = this.state.itemsData
     console.log("@@@",items)
     if (items.results) {
       var listItems = items.results.map(function(item) {return <div><a>{item.title}</a><br/></div>})
       return(
         <div>{listItems}</div>
       )
     } else {
       return(
         <div></div>
       )
     }

   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MercadoSarch Bonampa312</h1>
          <br/>
          <div className="App-input">
            <input type="text" onChange={this.setParam}></input>
            <button onClick={this.getItems}>Push Me</button>
          </div>
          <br/>
        </header>
        <div className="App-intro">
          <a>{this.state.itemName}</a>
          <div>{this.itemsList()}</div>
        </div>
        <div className="App-footer">
          <a>Powered by: Santiago Romero</a>
        </div>
      </div>
    );
  }
}

export default App;
