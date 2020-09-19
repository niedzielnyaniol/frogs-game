import Field from './Field';
import Frog from './Frog';
import Origin from './Origin';

class Lake {
  private fields: Field[][];

  constructor(x: number, y: number) {
    this.fields = new Array(y);

    for (let i = 0; i < y; i += 1) {
      this.fields[i] = new Array(x);

      for (let j = 0; j < x; j += 1) {
        this.fields[i][j] = new Field(new Origin(j, i));
      }
    }
  }

  public getFields(): Field[][] {
    return this.fields;
  }

  get frogsNumber(): number {
    if (!this.fields.length) {
      return 0;
    }

    let count = 0;
    const y = this.fields.length;
    const x = this.fields[0].length;

    for (let i = 0; i < y; i += 1) {
      for (let j = 0; j < x; j += 1) {
        if (this.fields[i][j] instanceof Frog) {
          count += 1;
        }
      }
    }

    return count;
  }

  addFrog(frog: Frog): void {
    const { x, y } = frog.getOrigin();

    this.fields[y][x] = frog;
  }

  getField({ x, y }: Origin): Field {
    return this.fields[y][x];
  }

  setField(field: Field, origin?: Origin): void {
    const { x, y } = origin || field.getOrigin();

    this.fields[y][x] = field;
  }

  moveField(field: Field, moveTo: Origin): void {
    const emptyField = new Field(field.getOrigin());

    field.setOrigin(moveTo);
    this.setField(field);
    this.setField(emptyField);
  }

  getBoundaries(): Origin {
    const y = this.fields.length;
    const x = this.fields[0].length;

    return new Origin(x, y);
  }
}

export default Lake;
