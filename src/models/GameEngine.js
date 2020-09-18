/* eslint-disable no-param-reassign */
import FieldTypes from './FieldTypes';
import Frog from './Frog';
import Genders from './Genders';
import Field from './Field';
import Lake from './Lake';

class GameEngine {
  constructor(updateLake) {
    this.lake = null;
    this.updateLake = () => updateLake(this.lake.fields);
    this.selected = null;
    this.nextMove = null;
    this.canReproduce = false;
  }

  getRandomPosition () {
    const {x, y} = this.lake.getBoundaries();

    return {
      x: Math.floor(Math.random() * x),
      y: Math.floor(Math.random() * y),
    }
  }

  startGame(x = 10, y = 6) {
    this.lake = new Lake(x, y);
    
    const firstFrogPosition = this.getRandomPosition();
    let secondFrogPositon = this.getRandomPosition();
    this.lake.addFrog(new Frog(firstFrogPosition.x, firstFrogPosition.y, Genders.MALE));

    while (secondFrogPositon.x !== firstFrogPosition.x && secondFrogPositon.y !== firstFrogPosition.y) {
        secondFrogPositon = this.getRandomPosition();
    }

    this.lake.addFrog(new Frog(3, 2, Genders.FEMALE));
    this.updateLake();
  }

  getAvailableMoves(x, y, move){
    const availableMoves = [];

    for (let i = x - move; i <= x + move; i += move) {
      for (let j = y - move; j <= y + move; j += move) {
        if (this.isFieldInTheLake(i, j)) {
          availableMoves.push(this.lake.getField(i, j));
        }
      }
    }

    return availableMoves;
  }

  selectFrog(frog) {
    const { x, y, move } = frog;

    frog.setSelected(true);
    this.selected = { x, y };

    const availableMoves = this.getAvailableMoves(x, y, move);
    this.setAvailableMoves(availableMoves);
  }

  isFieldInTheLake = ( x, y ) => {
    const boundaries = this.lake.getBoundaries();
    
    return x >= 0 && x < boundaries.x && y >= 0 && y < boundaries.y;
  }

  setAvailableMoves(availableMoves) {
    const { gender: selectedGender } = this.lake.getField(this.selected.x, this.selected.y);

    availableMoves.forEach((field) => {
        if (!field.gender || (field.gender !== selectedGender)) {
          field.type = FieldTypes.AVAILABLE;
          this.lake.setField(field);
        }
    });
  }

  unselectField(field) {
    field.type = FieldTypes.NONE;
    this.selected = null;
    this.lake.clearAvalilableMoves();
  }

  selectAvailableMove(field) {
    const { x, y } = field;
    this.nextMove = { x, y };
    field.type = FieldTypes.NEXT_JUMP;
  }
  
  moveFrog() {
    const frog = this.lake.getField(this.selected.x, this.selected.y);

    this.lake.updateField(this.selected.x, this.selected.y, new Field(this.selected.x, this.selected.y));
    this.lake.updateField(this.nextMove.x, this.nextMove.y, frog);
    frog.x = this.nextMove.x;
    frog.y = this.nextMove.y;
    this.nextMove = null;
    this.unselectField(frog);

    this.updateLake();
  }

  clearNextMove() {
    if (!this.nextMove) {
      return;
    }
  
    const field = this.lake.getField(this.nextMove.x, this.nextMove.y);
    field.type = FieldTypes.AVAILABLE;
    this.canReproduce = false;
    this.nextMove = null;
  }

  selectField(x, y) {
    const field = this.lake.getField(x, y);

    if (field.gender) {
      if (!this.selected) {
        this.selectFrog(field);
      } else if (this.selected && this.selected.x === x && this.selected.y === y) {
        this.unselectField(field);
      }
    }

    if (field.type === FieldTypes.NEXT_JUMP) {      
      field.type = FieldTypes.AVAILABLE;

      return this.updateLake();
    }

    if (field.type === FieldTypes.AVAILABLE) {
      this.clearNextMove();
      this.selectAvailableMove(field);

      const nextMoveField = this.lake.getField(this.nextMove.x, this.nextMove.y);
      const selectedField = this.lake.getField(this.selected.x, this.selected.y);

      if (nextMoveField.gender && selectedField.gender !== nextMoveField.gender) {
        this.canReproduce = true;
      }
    }

    this.updateLake();
  }

  unselect() {
    this.clearNextMove();
    this.lake.clearAvalilableMoves();
    const selected = this.lake.getField(this.selected.x, this.selected.y);
    selected.type = FieldTypes.NONE;
    this.selected = null;

    this.updateLake();
  }

  reproduce() {
    const firstFrog = this.lake.getField(this.selected.x, this.selected.y);
    const secondFrog = this.lake.getField(this.nextMove.x, this.nextMove.y);

    const mother = firstFrog.gender === Genders.FEMALE ? firstFrog : secondFrog;
    const newFrogPlace = this.getFirstPlace(mother.x, mother.y);

    if (newFrogPlace) {
      this.lake.setField(new Frog(
        newFrogPlace.x,
        newFrogPlace.y,
        Object.values(Genders)[Math.floor(Math.random() * 2)],
        [firstFrog.characteristics[Math.floor(Math.random() * 2)], secondFrog.characteristics[Math.floor(Math.random() * 2)]]
      ));
    }

    this.unselect();
  }

  getFirstPlace(x, y) {
    let place = null;
    
    for(let i = x - 1; i < x + 2; i += 1) {
      for(let j = y - 1; j < y + 2; j += 1) {
        if (this.isFieldInTheLake(i, j)) {
          const field = this.lake.getField(i, j);

          if (field.type === FieldTypes.NONE) {
            place = {
              x: i,
              y: j,
            }
            
            break;
          }
        }
      }

      if (place) {
        break;
      }
    }

    return place;
  }
}

export default GameEngine;
