import Cell from './Cell';
import { GameState } from './GameState';

export default class GameOfLife {
  constructor(width, height) {
    this.elapsedTimeMS = 0;

    for(let x = 0; x < width; x++){
      for(let y = 0; y < height; y++){
        GameState.game.cells[x][y] = new Cell(x, y);
      }
    }
  }

  spawnCell = (x, y) => {
    GameState.game.cells[x][y].spawn();
  }

  killCell = (x, y) => {
    GameState.game.cells[x][y].kill();
  }

  update = (elapsedMS) => {
    if(!GameState.game.isRunning) return;

    // Waits until elapsedTime exceeds the generation delay
    this.elapsedTimeMS += elapsedMS;
    if(this.elapsedTimeMS > GameState.game.generationPauseMs){
      this.elapsedTimeMS = 0;

      // All cells check what their next state will be and change to it afterwards
      GameState.forEachCell(cell => cell.prepareGeneration());
      GameState.forEachCell(cell => cell.executeGeneration());
    }
  }
}