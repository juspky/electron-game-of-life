import * as PIXI from "pixi.js";
import { GameState } from "../../../scripts/GameOfLife/GameState";

export default class PixiSrollbar {
  constructor(width, type, callback) {
    this.createSprite();

    this.width = width;
    this.type = type;
    this.callback = callback;
  }

  createSprite = () => {
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.anchor = new PIXI.Point(0, 0);
    this.sprite.alpha = 0.2;
    this.sprite.interactive = true;
    this.sprite.on('pointerdown', this.onPointerDown);
    this.sprite.on('pointerup', this.onPointerUp);
    this.sprite.on('pointerupoutside', this.onPointerUp);            
    this.sprite.on('pointermove', this.onPointerMove);
  }

  onPointerDown = (e) => {
    this.sprite.alpha = 0.4;    
    this.pointerDownData = e.data;
    this.pointerDownPos = e.data.getLocalPosition(this.sprite);
    GameState.isPointerDown = false;
  }

  onPointerUp = (e) => {
    this.sprite.alpha = 0.2;    
    this.pointerDownData = null;
    this.pointerDownPos = null;
  }

  onPointerMove = (e) => {    
    if(this.pointerDownData) {
      let newPosition = this.pointerDownData.getLocalPosition(this.sprite.parent);
      
      if(this.type === "horizontal")
      {
        this.sprite.x = newPosition.x - (this.pointerDownPos.x / 10) * this.sprite.width;

        // Keep scrollbar in bounds
        if(this.sprite.x + this.sprite.width - this.start.x > this.start.x + this.length)
          this.sprite.x = this.start.x + this.length - this.sprite.width;
        if(this.sprite.x + this.start.x < this.start.x)
          this.sprite.x = this.start.x;
      }
      if(this.type === "vertical")
      {
        this.sprite.y = newPosition.y - (this.pointerDownPos.y / 10) * this.sprite.height;

        // Keep scrollbar in bounds
        if(this.sprite.y + this.sprite.height - this.start.y > this.start.y + this.length)
          this.sprite.y = this.start.y + this.length - this.sprite.height;
        if(this.sprite.y + this.start.y < this.start.y)
          this.sprite.y = this.start.y;
      }

      this.executeCallback();
    }
  }

  executeCallback = () => {
    let percentage;

    if(this.type === "horizontal")
    {
      percentage = this.sprite.x / ((this.start.x + this.length) - (this.start.x + this.sprite.width));
    }
    if(this.type === "vertical")
    {
      percentage = this.sprite.y / ((this.start.y + this.length) - (this.start.y + this.sprite.height));
    }

    this.callback(this.type, percentage)
  }

  setPositionScale = (start, length, percentage) => {
    this.start = start;
    this.length = length;

    if(percentage > 1) {
      this.sprite.visible = false;
    }
    else{
      this.sprite.visible = true;
    }

    this.sprite.x = start.x;
    this.sprite.y = start.y;
    
    if(this.type === "vertical")
    {
      this.sprite.width = this.width;
      this.sprite.height = length * percentage;
    }
    if(this.type === "horizontal")
    {
      this.sprite.width = length * percentage;
      this.sprite.height = this.width;
    }
  }
}