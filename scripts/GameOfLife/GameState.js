import * as PIXI from 'pixi.js';
import PixiCore from '../../views/components/Pixi/PixiCore';
import GameOfLife from './GameOfLife';
import Scrollbar from '../../views/components/Pixi/Scrollbar';
const fs = window.require('fs');

function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

class gameState {
  constructor() {
    this.setDefault();
  }

  // Initiaizes gameState with default values
  setDefault = () => {
    this.scrollbarSize = 15;    
    this.isPointerDown = false;

    this.game = {};
    this.game.isRunning = false;
    this.game.generationPauseMs = 50;
    this.game.fieldSize = new PIXI.ObservablePoint(
      () => this.newGame(null, true),
      this, 150, 150
    );

    this.game.cellSize = new PIXI.ObservablePoint(
      () => {
        this.forEachCell(cell => cell.setSpritePositionScale());
        this.pixiCore.updateScrollbars();     
      },
      this, 10, 10
    );

    this.game.cellColor = 0x349fbc;

    this.game.rules = {};
    this.game.rules.summon = [3];
    this.game.rules.stay = [2];
    this.game.rules.kill = [0, 1, 4, 5, 6, 7, 8];

    this.game.cells = createArray(this.game.fieldSize.x, this.game.fieldSize.y);
  };

  newGame = (filename, skipSetDefault) => {
    // Clean previous game up
    if(this.pixiCore.cellContainer)
      this.pixiCore.cellContainer.destroy({ children: true, texture: false});
    if(this.pixiCore.hScrollbar)
      this.pixiCore.hScrollbar.sprite.destroy({ texture: false});
    if(this.pixiCore.vScrollbar)
      this.pixiCore.vScrollbar.sprite.destroy({ texture: false});

    if(!skipSetDefault)
      this.setDefault();
    else
      this.game.cells = createArray(this.game.fieldSize.x, this.game.fieldSize.y);

    // Load save if filename is provided
    if(filename) 
      this.load(filename);
    else
      this.pixiCore.gameOfLife = new GameOfLife(this.game.fieldSize.x, this.game.fieldSize.y);

    // Create and add cellContainer to stage
    this.pixiCore.cellContainer = new PIXI.Container();
    this.pixiCore.app.stage.addChild(this.pixiCore.cellContainer);
    
    // Add cell sprites to cellContainer
    this.forEachCell(cell => this.pixiCore.cellContainer.addChild(cell.sprite));

    // Create and add scrollbars to stage
    this.pixiCore.hScrollbar = new Scrollbar(this.scrollbarSize, "horizontal", this.pixiCore.scrollCallback)    
    this.pixiCore.vScrollbar = new Scrollbar(this.scrollbarSize, "vertical",  this.pixiCore.scrollCallback)
    this.pixiCore.app.stage.addChild(this.pixiCore.hScrollbar.sprite);
    this.pixiCore.app.stage.addChild(this.pixiCore.vScrollbar.sprite);

    this.pixiCore.resize();    
  }

  changeCellColor = color => {
    this.game.cellColor = color;
    this.forEachCell(cell => cell.sprite.tint = color);
  }

  toggleCountRule = (type, count, countArray) => {
    if(countArray.includes(count)) {
      switch(type) {
        case "Summon":
          this.game.rules.summon = this.game.rules.summon.filter(item => item !== count);
          break;
        case "Stay":
          this.game.rules.stay = this.game.rules.stay.filter(item => item !== count);
          break;
        case "Kill":
          this.game.rules.kill = this.game.rules.kill.filter(item => item !== count);      
          break;
      }
    }
    else {
        countArray.push(count);
    }

    this.pixiCore.forceUpdate();
  }

  save = filename => {
    if(filename){
      let save = {};
      save.fieldSize = new PIXI.Point(this.game.fieldSize.x, this.game.fieldSize.y);
      save.cellSize = new PIXI.Point(this.game.cellSize.x, this.game.cellSize.y);
      save.cellColor = this.game.cellColor;
      save.rules = this.game.rules;
      save.generationPauseMs = this.game.generationPauseMs;
      save.cells = createArray(this.game.fieldSize.x, this.game.fieldSize.y);
      this.forEachCell(cell => {
        save.cells[cell.x][cell.y] = cell.state;
      })

      fs.writeFile("saves/" + filename + ".json", JSON.stringify(save), null, (err) => {
        if(err) throw err;
      });
    }
  }

  load = filename => {
    if(filename){
      let save = JSON.parse(fs.readFileSync("saves/" + filename + ".json"));

      if(!save)
        return;

      this.game.fieldSize = new PIXI.ObservablePoint(
        () => this.newGame(null, false),
        this, save.fieldSize.x, save.fieldSize.y
      );

      this.game.cellSize = new PIXI.ObservablePoint(
        () => {
          this.forEachCell(cell => cell.setSpritePositionScale());
          this.pixiCore.updateScrollbars();     
        },
        this, save.cellSize.x, save.cellSize.y
      );

      this.game.generationPauseMs = save.generationPauseMs;      
      this.game.rules = save.rules;
      this.game.cells = createArray(save.fieldSize.x, save.fieldSize.y);

      this.pixiCore.gameOfLife = new GameOfLife(this.game.fieldSize.x, this.game.fieldSize.y);

      this.forEachCell(cell => {
        if(save.cells[cell.x][cell.y] === 1)
         cell.spawn();
      })
    }
  }
  
  forEachCell = fn => {
    this.game.cells.forEach(array => {
      array.forEach(fn);
    });
  };
}

// Singleton
export let GameState = new gameState();
