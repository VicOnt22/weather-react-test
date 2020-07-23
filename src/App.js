import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {store} from "./aredux/store";
import logo from './logo.svg';
import './App.css';
import './appStyles.css'
import {DataCityFetchRefine} from "./components/reactredux/DataCityFetchRefine";

class App extends Component {
  render() {
    return (
        // <Provider store={store}>
        <div className="App">
        <header className="App-header">         <img src={logo} className="App-logo" alt="logo" />
        <DataCityFetchRefine/>
        </header>
        </div>
        // </Provider>
    );
  }
}

export default App;
