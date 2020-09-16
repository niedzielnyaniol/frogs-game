import Characteristics from './Characteristics';
import Field from './Field';
import FieldTypes from './FieldTypes';
import Genders from './Genders';

const generateRandomCharacteristics = () => {
  const characteristics = Object.values(Characteristics);
  const first = characteristics[Math.floor(Math.random() * 4)];
  const restValues = characteristics.filter((value) => value !== first);
  const second = restValues[Math.floor(Math.random() * 3)];

  return [first, second];
};

class Frog extends Field {
  constructor(x, y, gender, characteristics = null) {
    super(x, y);

    this.gender = gender;
    this.type = FieldTypes.FROG;
    this.characteristics = characteristics;
    this.move = gender === Genders.FEMALE ? 2 : 3;

    if (!characteristics) {
      this.characteristics = generateRandomCharacteristics();
    }
  }
}

export default Frog;
