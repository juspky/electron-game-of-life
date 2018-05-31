import React from 'react';
import Theme from './DarkTheme';
import Titlebar from './components/Titlebar';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import PixiCore from './components/Pixi/PixiCore'

const Base = styled.div`
  color: ${props => props.theme.textPrimary};
  background-color: ${props => props.theme.mainSecondary};

  user-select: none;  
  font-family: "Gothic A1", sans-serif;

  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <Base>
          <Titlebar />
          <PixiCore />       	
        </Base>
      </ThemeProvider>
    );
  }
}
