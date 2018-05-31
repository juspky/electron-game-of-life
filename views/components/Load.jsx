import React from 'react';
import styled from 'styled-components';
import { GameState } from '../../scripts/GameOfLife/GameState'

export default class Save extends React.Component {
  constructor() {
    super();

    this.state = {
      filename: null
    }
  }

  render() {
    return (
        <div>
          <h2 style={{marginTop: "0px"}}>Load</h2>                  
          <h3>Enter the name of the <br/>save you want to load</h3>
          <input onChange={(e) => this.setState({filename: e.target.value})}/>
          <button disabled={this.state.filename === null} onClick={() => GameState.newGame(this.state.filename, true)}>Load</button>
        </div>
    );
  }
}