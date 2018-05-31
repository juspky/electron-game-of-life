import React from 'react';
import styled from 'styled-components';
import { GameState } from '../../scripts/GameOfLife/GameState'

const CountContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px;
`;

const CountButton = styled.button`
  color: inherit;

  background-color: ${props => props.color};
  border: 0px;
  padding: 1px 1px;
 
  flex: 1 0 auto;

  &:focus {
    outline: 0px;
  }

  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : props.theme.mainSecondary};
  }
`;

const CountComponent = (props) => {
  return (
    <div>
      {props.type}    
      <CountContainer>
        {[0,1,2,3,4,5,6,7,8].map((c, k) => { return(
          <CountButton color={props.countArray.includes(c) ? props.color : "grey"} key={k} onClick={() => {
            GameState.toggleCountRule(props.type, c, props.countArray); 
          }}>
            {c}
          </CountButton>)
        })}
      </CountContainer>
    </div>
  )
}

export default class Settings extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <h2 style={{marginTop: "0px"}}><b>Settings</b></h2>        
          <h3 style={{marginTop: "0px"}}><b>Visual</b></h3>
          <h4 style={{marginTop: "0px"}}>Cell Size</h4>
          <input onChange={(e) => GameState.game.cellSize.x = e.target.value} defaultValue={GameState.game.cellSize.x}/>
          <input onChange={(e) => GameState.game.cellSize.y = e.target.value} defaultValue={GameState.game.cellSize.y}/>
          <h4>Cell Color</h4>
          <input 
            onChange={(e) => GameState.changeCellColor(e.target.value)}
            defaultValue={GameState.game.cellColor}
          />
          <h3><b>Game</b></h3>
          <h4 style={{marginBottom: "0px"}}>Generation Delay (ms)</h4>
          <input onChange={(e) => GameState.game.generationPauseMs = e.target.value} defaultValue={GameState.game.generationPauseMs}/>
          <h4 style={{marginBottom: "0px"}}>Field Size</h4>
          <input onChange={(e) => GameState.game.fieldSize.x = e.target.value} defaultValue={GameState.game.fieldSize.x}/>
          <input onChange={(e) => GameState.game.fieldSize.y = e.target.value} defaultValue={GameState.game.fieldSize.y}/>
          <h4 style={{marginBottom: "0px"}}>Rules</h4>
          <CountComponent type={"Summon"} countArray={GameState.game.rules.summon} color={"#58B769"}/>
          <CountComponent type={"Stay"} countArray={GameState.game.rules.stay} color={"#349FBC"}/>
          <CountComponent type={"Kill"} countArray={GameState.game.rules.kill} color={"#E2355A"}/>          
        </div>
    );
  }
}