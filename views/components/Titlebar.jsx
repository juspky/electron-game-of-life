import React from 'react';
import styled from 'styled-components';
const { remote } = window.require('electron');

const TitleBar = styled.div`
  user-select: none;
  -webkit-app-region: drag;
  display: flex;
  flex-shrink: 0;
  font-family: "Gothic A1", sans-serif;  

  background-color: ${props => props.theme.mainPrimary};
`;

const Title = styled.div`
  flex: 1;
  overflow: hidden;
  white-space:nowrap;

  padding: 6px 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  -webkit-app-region: no-drag;
  flex: 1 33%;

  color: inherit;
  background-color: transparent;
  border: 0px;
  padding: 5px 20px;

  &:focus {
    outline: 0px;
  }

  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : props.theme.mainSecondary};
  }
`;

const resize = () => {
  if(window.outerWidth >= screen.availWidth && window.outerHeight >= screen.availHeight) {
    window.resizeTo(800, 600);
  }
  else {
    remote.BrowserWindow.getFocusedWindow().maximize();
  }
}

export default class Titlebar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TitleBar>
        <Title>Game of Life</Title>
        <ButtonWrapper>
          <Button onClick={() => remote.BrowserWindow.getFocusedWindow().minimize()}>-</Button>
          <Button onClick={() => resize()}>☐</Button>
          <Button hoverColor="#AA1622" onClick={() => window.close()}>X</Button>          
        </ButtonWrapper>
      </TitleBar>
    );
  }
}
