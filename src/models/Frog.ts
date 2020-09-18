import Genders from '../types/Genders';
import Characteristics from './Characteristics';
import Field from './Field';
import Origin from './Origin';

class Frog extends Field {
  private characteristics: Characteristics;
  private gender: Genders;
  private move: number;

  constructor(origin: Origin, gender: Genders, characteristics?: Characteristics) {
    super(origin);

    this.gender = gender;
    this.move = gender === Genders.FEMALE ? 2 : 3;

    if (characteristics) {
      this.characteristics = characteristics;
    } else {
      this.characteristics = new Characteristics();
    }
  }

  getGender(): Genders {
    return this.gender;
  }

  getMove(): number {
    return this.move;
  }

  getCharacteristics(): Characteristics {
    return this.characteristics;
  }
}

export default Frog;
