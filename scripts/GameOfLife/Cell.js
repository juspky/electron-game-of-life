import * as PIXI from 'pixi.js';
import { GameState } from './GameState';

export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = 0;
    this.preparedState = 0;

    this.createSprite();
  }

  createSprite = () => {
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.setSpritePositionScale();
    this.sprite.anchor = new PIXI.Point(0, 0)
    this.sprite.alpha = this.state;
    this.sprite.tint = GameState.game.cellColor;
    this.sprite.interactive = true;
    this.sprite.on('pointerdown', this.onPointerDown);    
    this.sprite.on('pointerover', this.onPointerOver);
    this.sprite.on('pointerout', this.onPointerOut);
  }

  setSpritePositionScale() {
    this.sprite.width = GameState.game.cellSize.x;
    this.sprite.height = GameState.game.cellSize.y;    
    this.sprite.x = (this.x * GameState.game.cellSize.x);
    this.sprite.y = (this.y * GameState.game.cellSize.y);
  }

  onPointerDown = (e) => {
    if(this.state === 0)
      this.spawn();
    else
      this.kill();
  }

  onPointerOver = (e) => {
    if(this.state === 0) {
      this.sprite.alpha = 0.5;
      if(GameState.isPointerDown === true)
        this.spawn();
    }
    else {
      if(GameState.isPointerDown === true)      
        this.kill();
    }
  }

  onPointerOut = (e) => {
    if(this.state === 0)
      this.sprite.alpha = 0;
  }

  getSurroundingCount = () => {
    let count = 0;

    for(let x = -1; x <= 1; x++){
      for(let y = -1; y <= 1; y++){
        if(x === 0 && y === 0)
          continue;

        let absX = x + this.x;
        if(absX < 0)
          absX = GameState.game.cells.length + absX;
        if(absX >= GameState.game.cells.length)
          absX = absX - GameState.game.cells.length;

        let absY = y + this.y;
        if(absY < 0)
          absY = GameState.game.cells[0].length + absY;
        if(absY >= GameState.game.cells[0].length)
          absY = absY - GameState.game.cells[0].length;

        count += GameState.game.cells[absX][absY].state;
      }
    }

    return count;
  }

  prepareGeneration = () => {
    let surCount = this.getSurroundingCount();

    if(this.state === 1) {
      if(GameState.game.rules.stay.includes(surCount)){
        this.preparedState = 1;
      }
      if(GameState.game.rules.kill.includes(surCount)){
        this.preparedState = 0;
      }
    }
    else{
      if(GameState.game.rules.summon.includes(surCount)){
        this.preparedState = 1;
      }
    }
  }

  executeGeneration = () => {
    if(this.preparedState === 1){
      this.spawn();
    }
    else{
      this.kill();
    }
  }

  spawn = () => {
    this.state = 1;
    this.sprite.alpha = 1;
  }

  kill = () => {
    this.state = 0;
    this.sprite.alpha = 0;
  }
}