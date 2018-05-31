import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBars, faFlag, faDownload, faUpload, faCog } from '@fortawesome/free-solid-svg-icons';
import MenuModal from './MenuModal';
import Save from './Save';
import Load from './Load';
import Settings from './Settings';
import { GameState } from '../../scripts/GameOfLife/GameState'

const MenuBase = styled.div`
  pointer-events: none;
  position: absolute;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  display: flex;
`;

const MenuBackground = styled.div`
  pointer-events: ${props => props.visible ? "auto" : "none" };
  position: absolute;
  height: 100%;
  transition: background-color 0.5s, ease-in-out left 0.5s;
  background-color: rgba(0,0,0,${props => props.visible ? "0.1" : "0" });
  left: ${props => props.visible ? props.menuBarWidth : "0"};
  right: 0;
`;

const MenuBar = styled.div`
  pointer-events: auto;
  position: absolute;
  transition: left 0.5s;
  height: 100%;
  left: ${props => props.isOpen ? "0" : "-" + props.width};  
  width: ${props => props.width};
  background-color: ${props => props.theme.mainPrimary};
`;

const MenuButtonContainer = styled.div`
  pointer-events: auto;
  position: absolute;

  left: ${props => props.menuBarWidth};
  transition: left 0.5s;  
`;

const MenuButton = styled.button`
  color: inherit;

  background-color: ${props => props.theme.mainPrimary};
  border: 0px;
  padding: 20px 20px;
 

  &:focus {
    outline: 0px;
  }

  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : props.theme.mainSecondary};
  }
`;

const MenuItem = styled.button`
  color: inherit;
  pointer-events: auto;

  background-color: ${props => props.theme.mainPrimary};
  border: 0px;
  padding: 20px 20px;
  width: 100%;

  &:focus {
    outline: 0px;
  }

  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : props.theme.mainSecondary};
  }
`;

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.menuBarWidth = "170px";

    this.state = {
      isOpen: false,
      modalIsOpen: false,
      modalType: null,
    }
  }

  togglePlay = () => {
    GameState.game.isRunning = !GameState.game.isRunning; 
    this.forceUpdate();
  }

  openModal = (type) => {
    this.setState({modalIsOpen: true, modalType: type});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false, modalType: null});
  }

  render() {
    return (
      <MenuBase width={this.props.width} height={this.props.height}>
        <MenuBackground menuBarWidth={this.menuBarWidth} visible={this.state.isOpen} onClick={() => this.setState({isOpen: false, modalIsOpen: false})}>
          {this.state.modalIsOpen &&
            <MenuModal>
              {this.state.modalType === "save" ? <Save/> : 
                this.state.modalType === "load" ? <Load/> : 
                this.state.modalType === "settings" ? <Settings/> : null} 
            </MenuModal>
          }
        </MenuBackground>
        <MenuBar width={this.menuBarWidth} isOpen={this.state.isOpen}>
          <MenuButtonContainer menuBarWidth={this.menuBarWidth}>
            <MenuButton onClick={() => this.togglePlay()}>
              <FontAwesomeIcon icon={GameState.game.isRunning ? faPause : faPlay} />
            </MenuButton>
            <MenuButton onClick={() => this.setState({isOpen: !this.state.isOpen, modalIsOpen: false})}>
              <FontAwesomeIcon icon={faBars} />
            </MenuButton>
          </MenuButtonContainer>
          <MenuItem onClick={() => GameState.newGame()}><FontAwesomeIcon icon={faFlag} /> New</MenuItem>          
          <MenuItem onClick={() => this.openModal("save")}><FontAwesomeIcon icon={faDownload} /> Save</MenuItem>
          <MenuItem onClick={() => this.openModal("load")}><FontAwesomeIcon icon={faUpload} /> Load</MenuItem>
          <MenuItem onClick={() => this.openModal("settings")}><FontAwesomeIcon icon={faCog} /> Settings</MenuItem>          
        </MenuBar>
      </MenuBase>
    );
  }
}
