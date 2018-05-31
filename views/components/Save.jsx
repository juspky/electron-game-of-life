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
          <h2 style={{marginTop: "0px"}}>Save</h2>                  
          <h3>Name your save</h3>
          <input onChange={(e) => this.setState({filename: e.target.value})}/>
          <button disabled={this.state.filename === null} onClick={() => GameState.save(this.state.filename)}>Save</button>
        </div>
    );
  }
}