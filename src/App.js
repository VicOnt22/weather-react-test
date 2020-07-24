import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './appStyles.css'
import {DataCityFetchRefine} from "./components/reactredux/DataCityFetchRefine";

class App extends Component {
  render() {
    return (
        <div className="App">
        <header className="App-header">
        <DataCityFetchRefine/>
        </header>
        </div>
    );
  }
}

export default App;
