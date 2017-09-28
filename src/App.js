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
     var self = this
     if (items.results) {
       console.log(items.results);
       var listItems = items.results.map(function(item) {
         return (
          <div className="Card-item" >
            <p>
              <img src={item.thumbnail} className="Card-image"/>
              <div className="Card-description">
                <div className="Card-title">{item.title}</div>
                <div>Price: {item.price} {item.currency_id}</div>
                <div>Sold quantity: {item.sold_quantity}</div>
                <a href={item.permalink}>View in Mercadolibre</a>
              </div>
            </p>
          </div>
        )
       })
       return(
         <div>{listItems}</div>
       )
     } else {
       console.log("Error");
       return(
         <div></div>
       )
     }

   }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <div id="search">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">MercadoSearch Bonampa312</h1>
              <br/>
              <div>
                <input type="text" onChange={this.setParam}></input>
                <button onClick={this.getItems}>Push Me</button>
              </div>
              <br/>
            </div>
          </header>
          <div className="App-intro">
            <div>{this.itemsList()}</div>
          </div>
          <div className="App-footer">
            <a>Powered by: Santiago Romero</a>
          </div>
        </div>
        <div>
          <div id="left" className="App-laterals"></div>
          <div id="right" className="App-laterals"></div>
        </div>
      </div>
    );
  }
}

export default App;
