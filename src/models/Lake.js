import Field from './Field';
import FieldTypes from './FieldTypes';

class Lake {
  constructor(x = 10, y = 6) {
    this.fields = new Array(y);

    for (let i = 0; i < y; i += 1) {
      this.fields[i] = new Array(x);

      for (let j = 0; j < x; j += 1) {
        this.fields[i][j] = new Field(j, i);
      }
    }
  }

  addFrog(frog) {
    const { x, y } = frog;

    this.fields[y][x] = frog;
  }

  getField(x, y) {
    return this.fields[y][x];
  }

  setField(field) {
    const { x, y } = field;

    this.fields[y][x] = field;
  }

  updateField(x, y, field) {
    this.fields[y][x] = field;
  }

  getBoundaries() {
    const y = this.fields.length;
    const x = this.fields[0].length;

    return { x, y };
  }

  clearAvalilableMoves() {
    const { x, y } = this.getBoundaries();

    for (let i = 0; i < y; i += 1) {
      for (let j = 0; j < x; j += 1) {
        const field = this.fields[i][j];

        if (field.type === FieldTypes.AVAILABLE) {
          field.type = FieldTypes.NONE;
        }
      }
    }
  }
}

export default Lake;
