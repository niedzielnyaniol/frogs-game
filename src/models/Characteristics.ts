import Randomizer from './Randomizer';

enum HeightCharacteristics {
  TALL = 'CHARACTERISTIC/TALL',
  SHORT = 'CHARACTERISTIC/SHORT',
}

enum WeightCharacteristics {
  FAT = 'CHARACTERISTIC/FAT',
  SLIM = 'CHARACTERISTIC/SLIM',
}

const dictionary = {
  [HeightCharacteristics.TALL]: 'tall',
  [HeightCharacteristics.SHORT]: 'tall',
  [WeightCharacteristics.FAT]: 'tall',
  [WeightCharacteristics.SLIM]: 'tall',
};

class Characteristics {
  private heightCharacteristic: HeightCharacteristics;
  private weightCharacteristic: WeightCharacteristics;

  constructor(
    weightCharacteristic?: WeightCharacteristics,
    heightCharacteristic?: HeightCharacteristics,
  ) {
    if (weightCharacteristic) {
      this.weightCharacteristic = weightCharacteristic;
    } else {
      this.weightCharacteristic = Object
        .values(WeightCharacteristics)[Randomizer.getRandomNumber({ to: 1 })];
    }

    if (heightCharacteristic) {
      this.heightCharacteristic = heightCharacteristic;
    } else {
      this.heightCharacteristic = Object
        .values(HeightCharacteristics)[Randomizer.getRandomNumber({ to: 1 })];
    }
  }

  getWeightCharacteristic(): WeightCharacteristics {
    return this.weightCharacteristic;
  }

  getHeightCharacteristic(): HeightCharacteristics {
    return this.heightCharacteristic;
  }

  static getName(characteristic: WeightCharacteristics | HeightCharacteristics):string {
    return dictionary[characteristic];
  }
}

export default Characteristics;
