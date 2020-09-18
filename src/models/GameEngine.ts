import Frog from './Frog';
import Field from './Field';
import Lake from './Lake';
import Origin from './Origin';
import Randomizer from './Randomizer';
import Genders from '../types/Genders';
import Characteristics from './Characteristics';

class GameEngine {
  private lake: Lake = new Lake(0, 0);
  private updateLake: () => void
  private selected: Frog | null = null;
  private nextMove: Origin | null = null;
  private availableMoves: Field[] = [];
  private canReproduce = false;

  constructor(updateLake: (fields: Field[][]) => void) {
    this.updateLake = () => updateLake(this.lake.getFields());
    this.lake = new Lake(0, 0);
    this.selected = null;
    this.nextMove = null;
    this.availableMoves = [];
    this.canReproduce = false;
  }

  get isNextMove(): boolean {
    return !!this.nextMove;
  }

  get isSelected(): boolean {
    return !!this.selected;
  }

  getCanReproduce(): boolean {
    return this.canReproduce;
  }

  private getRandomPosition(): Origin {
    const { x, y } = this.lake.getBoundaries();

    return new Origin(
      Randomizer.getRandomNumber({ to: x }),
      Randomizer.getRandomNumber({ to: y }),
    );
  }

  private getAvailableMoves({ x, y } : Origin, move: number): Field[] {
    const availableMoves = [];

    for (let i = x - move; i <= x + move; i += move) {
      for (let j = y - move; j <= y + move; j += move) {
        const origin = new Origin(i, j);

        if (this.isFieldInTheLake(origin)) {
          availableMoves.push(this.lake.getField(origin));
        }
      }
    }

    return availableMoves;
  }

  private isFieldInTheLake = ({ x, y }: Origin): boolean => {
    const boundaries = this.lake.getBoundaries();

    return x >= 0 && x < boundaries.x && y >= 0 && y < boundaries.y;
  }

  private setAvailableMoves(availableMoves: Field[]): void {
    this.availableMoves = availableMoves;
  }

  private setNextMove(field: Field): void {
    this.nextMove = field.getOrigin();
  }

  private clearNextMove(): void {
    this.nextMove = null;
  }

  private static mergeCharacteristics(
    firstCharacteristics: Characteristics,
    secondCharacteristics: Characteristics,
  ): Characteristics {
    const pool = [firstCharacteristics, secondCharacteristics];

    return new Characteristics(
      pool[Randomizer.getRandomNumber({ to: 1 })].getWeightCharacteristic(),
      pool[Randomizer.getRandomNumber({ to: 1 })].getHeightCharacteristic(),
    );
  }

  getSelected(): Frog | null {
    return this.selected;
  }

  getNextMove(): Origin | null {
    return this.nextMove;
  }

  selectFrog(frog:Frog): void {
    const origin = frog.getOrigin();
    const move = frog.getMove();

    this.selected = frog;

    const availableMoves = this.getAvailableMoves(origin, move);
    this.setAvailableMoves(availableMoves);
  }

  startGame(x: number, y: number): void {
    this.lake = new Lake(x, y);

    const firstFrogPosition = this.getRandomPosition();
    let secondFrogPosition = this.getRandomPosition();
    this.lake.addFrog(new Frog(
      new Origin(firstFrogPosition.x, firstFrogPosition.y),
      Genders.MALE,
    ));

    while (firstFrogPosition.isEqual(secondFrogPosition)) {
      secondFrogPosition = this.getRandomPosition();
    }

    this.lake.addFrog(new Frog(
      new Origin(secondFrogPosition.x, secondFrogPosition.y),
      Genders.FEMALE,
    ));

    this.updateLake();
  }

  unselectField(): void {
    this.selected = null;
    this.availableMoves = [];
  }

  moveFrog(selected: Frog, nextMove: Origin):void {
    this.lake.moveField(selected, nextMove);
    this.nextMove = null;
    this.selected = null;

    this.updateLake();
  }

  selectField(x: number, y: number): void {
    console.log('select', x, y, this.canReproduce);
  }

  unselect(): void {
    this.nextMove = null;
    this.selected = null;
    this.availableMoves = [];

    this.updateLake();
  }

  reproduce(selected: Frog, nextMove: Origin): void {
    const secondFrog = this.lake.getField(new Origin(nextMove.x, nextMove.y)) as Frog;

    const mother = selected.getGender() === Genders.FEMALE ? selected : secondFrog;
    const newFrogOrigin = this.getFirstPlace(mother.getOrigin());

    if (newFrogOrigin) {
      const characteristics = GameEngine.mergeCharacteristics(
        selected.getCharacteristics(),
        secondFrog.getCharacteristics(),
      );

      const newFrog = new Frog(
        newFrogOrigin,
        Object.values(Genders)[Randomizer.getRandomNumber({ to: 1 })],
        characteristics,
      );

      this.lake.addFrog(newFrog);
    }

    this.unselect();
  }

  getFirstPlace({ x, y }: Origin): Origin | null {
    let place: Origin | null = null;

    for (let i = x - 1; i < x + 2; i += 1) {
      for (let j = y - 1; j < y + 2; j += 1) {
        const origin = new Origin(i, j);

        if (this.isFieldInTheLake(origin)) {
          const field = this.lake.getField(origin);

          if (!(field instanceof Frog)) {
            place = origin;

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
