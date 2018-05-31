import React from 'react';
import * as PIXI from 'pixi.js';
import GameOfLife from '../../../scripts/GameOfLife/GameOfLife';
import Menu from '../Menu';
import { GameState } from '../../../scripts/GameOfLife/GameState';
import Scrollbar from './Scrollbar';

export default class PixiCore extends React.Component {
  constructor(props) {
    super(props);
    this.resizeListener = window.addEventListener("resize", this.resize);

    this.state = {
      height: 1,
      width: 1
    };
  }

  componentDidMount = () => {
    GameState.pixiCore = this;

    this.app = new PIXI.Application(
      this.pixiCore.clientWidth,
      this.pixiCore.clientHeight,
      { transparent: true }
    );

    this.pixiCore.appendChild(this.app.view);

    this.app.view.addEventListener("pointerdown", this.pointerDown);
    window.addEventListener("pointerup", this.pointerUp);

    // Launch app
    GameState.newGame();
    this.app.ticker.add(this.update);
    this.app.start();
  }

  componentWillUnmount = () => {
    // Clean up events and memory
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("pointerup", this.pointerUp);
    this.app.view.removeEventListener("pointerdown", this.pointerDown);    
    this.cellContainer.destroy({ children: true, texture: false});
    this.pixiCore.hScrollbar.sprite.destroy({ texture: false});
    this.pixiCore.vScrollbar.sprite.destroy({ texture: false});    
    this.app.stop();
  }

  pointerDown = () => {
    GameState.isPointerDown = true;
  }

  pointerUp = () => {
    GameState.isPointerDown = false;
  }

  resize = () => {
    this.app.renderer.resize(1, 1);
    
    window.requestAnimationFrame(() => {
      let w = this.pixiCore.clientWidth;
      let h = this.pixiCore.clientHeight;     
      this.setState({ width: w, height: h, });

      this.app.renderer.resize(w, h);
      this.updateScrollbars();
      this.cellContainer.x = 0;
      this.cellContainer.y = 0;
    });
  };

  calculateScrollbarPercentage = () => {
    return new PIXI.Point(this.state.width / this.cellContainer.width, this.state.height /  this.cellContainer.height);
  }

  scrollCallback = (type, percentage) => {
    GameState.isPointerDown = false;    
    if(type === "vertical") {
      this.cellContainer.y = -(this.cellContainer.height - this.state.height) * percentage;
    }
    if(type === "horizontal") {
      this.cellContainer.x = -(this.cellContainer.width - this.state.width) * percentage;
    }
  }

  updateScrollbars = (w, h) => {
    this.hScrollbar.setPositionScale(new PIXI.Point(0, this.state.height - GameState.scrollbarSize), this.state.width - GameState.scrollbarSize, this.calculateScrollbarPercentage().x);    
    this.vScrollbar.setPositionScale(new PIXI.Point(this.state.width - GameState.scrollbarSize, 0), this.state.height, this.calculateScrollbarPercentage().y);
  }

  update = () => {
    this.gameOfLife.update(this.app.ticker.elapsedMS);
  }

  render = () => {
    return (
      <div style={{ flexGrow: 1 }} ref={pixiCore => (this.pixiCore = pixiCore)}>
        <Menu width={this.state.width} height={this.state.height}/>
      </div>
    );
  }
}
