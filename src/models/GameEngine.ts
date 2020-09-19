import Frog from './Frog';
import Field from './Field';
import Lake from './Lake';
import Origin from './Origin';
import Randomizer from './Randomizer';
import Genders from '../types/Genders';
import Characteristics, { HeightCharacteristics, WeightCharacteristics } from './Characteristics';

class GameEngine {
  private lake: Lake = new Lake(0, 0);
  private updateLake: () => void
  private selected: Frog | null = null;
  private availableMoves: Origin[] = [];

  constructor(updateLake: (fields: Field[][]) => void) {
    this.updateLake = () => updateLake(this.lake.getFields());
    this.lake = new Lake(0, 0);
    this.selected = null;
    this.availableMoves = [];
  }

  private getRandomPosition(): Origin {
    const { x, y } = this.lake.getBoundaries();

    return new Origin(
      Randomizer.getRandomNumber({ to: x }),
      Randomizer.getRandomNumber({ to: y }),
    );
  }

  private availableMovesFrom(origin : Origin, move: number): Origin[] {
    const availableMoves = [];
    const { x, y } = origin;

    for (let i = x - move; i <= x + move; i += move) {
      for (let j = y - move; j <= y + move; j += move) {
        const newOrigin = new Origin(i, j);

        if (this.isFieldInTheLake(newOrigin) && !origin.isEqual(newOrigin)) {
          availableMoves.push(this.lake.getField(newOrigin).getOrigin());
        }
      }
    }
    return availableMoves;
  }

  private isFieldInTheLake = ({ x, y }: Origin): boolean => {
    const boundaries = this.lake.getBoundaries();

    return x >= 0 && x < boundaries.x && y >= 0 && y < boundaries.y;
  }

  private static mergeCharacteristics(
    firstCharacteristics: Characteristics,
    secondCharacteristics: Characteristics,
  ): Characteristics {
    const pool = [firstCharacteristics, secondCharacteristics];

    return new Characteristics(
      pool[Randomizer.getRandomNumber({
        to: Object.keys(WeightCharacteristics).length,
      })].getWeightCharacteristic(),
      pool[Randomizer.getRandomNumber({
        to: Object.keys(HeightCharacteristics).length,
      })].getHeightCharacteristic(),
    );
  }

  private selectFrog(frog:Frog): void {
    const origin = frog.getOrigin();
    const move = frog.getMove();

    this.selected = frog;
    this.availableMoves = this.availableMovesFrom(origin, move);
  }

  private moveFrog(selected: Frog, nextMove: Origin):void {
    this.lake.moveField(selected, nextMove);
  }

  private checkIfWin():void {
    if (this.getFrogsCount() === this.getLakeSize()) {
      // eslint-disable-next-line no-alert
      if (window.confirm('🎉 You won, wanna play again? 🎉')) {
        const { x, y } = this.lake.getBoundaries();

        this.unselect();
        this.startGame(x, y);
      }
    }
  }

  private reproduce(firstFrog: Frog, secondFrog: Frog): void {
    if (firstFrog.getGender() === secondFrog.getGender()) {
      // eslint-disable-next-line no-alert
      return alert('♂️ Frogs must have different genders to reproduce! ♀️');
    }

    const mother = firstFrog.getGender() === Genders.FEMALE ? firstFrog : secondFrog;
    const newFrogOrigin = this.getFirstPlace(mother.getOrigin());

    if (newFrogOrigin) {
      const characteristics = GameEngine.mergeCharacteristics(
        firstFrog.getCharacteristics(),
        secondFrog.getCharacteristics(),
      );

      const newFrog = new Frog(
        newFrogOrigin,
        Object.values(Genders)[Randomizer.getRandomNumber({
          to: Object.keys(Genders).length,
        })],
        characteristics,
      );

      this.lake.addFrog(newFrog);
    } else {
      // eslint-disable-next-line no-alert
      alert('🌎 No space near mother left! 🌎');
    }

    this.checkIfWin();

    return undefined;
  }

  private getFirstPlace({ x, y }: Origin): Origin | null {
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

  getFrogsCount(): number {
    return this.lake.frogsNumber;
  }

  getLakeSize(): number {
    const { x, y } = this.lake.getBoundaries();

    return x * y;
  }

  getSelected(): Frog | null {
    return this.selected;
  }

  getAvailableMoves(): Origin[] {
    return this.availableMoves;
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

  handleFieldClick = (x: number, y: number): void => {
    const field = this.lake.getField(new Origin(x, y));
    const isAvailableMoveClicked = this.availableMoves.includes(field.getOrigin());

    if (field instanceof Frog) {
      if (this.selected?.getOrigin().isEqual(field.getOrigin())) {
        this.unselect();
      } else if (this.selected && isAvailableMoveClicked) {
        this.reproduce(this.selected, field);
      } else {
        this.selectFrog(field);
      }

      return this.updateLake();
    }

    if (this.selected && this.availableMoves.includes(field.getOrigin())) {
      this.moveFrog(this.selected, new Origin(x, y));
      this.selectFrog(this.selected);
    }

    this.updateLake();
  }

  unselect(): void {
    this.selected = null;
    this.availableMoves = [];

    this.updateLake();
  }
}

export default GameEngine;
