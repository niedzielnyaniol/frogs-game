import Randomizer from './Randomizer';

export enum HeightCharacteristics {
  TALL = 'CHARACTERISTIC/TALL',
  SHORT = 'CHARACTERISTIC/SHORT',
}

export enum WeightCharacteristics {
  FAT = 'CHARACTERISTIC/FAT',
  SLIM = 'CHARACTERISTIC/SLIM',
}

const dictionary = {
  [HeightCharacteristics.TALL]: 'tall',
  [HeightCharacteristics.SHORT]: 'short',
  [WeightCharacteristics.FAT]: 'fat',
  [WeightCharacteristics.SLIM]: 'slim',
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
        .values(WeightCharacteristics)[Randomizer.getRandomNumber({
          to: Object.keys(WeightCharacteristics).length,
        })];
    }

    if (heightCharacteristic) {
      this.heightCharacteristic = heightCharacteristic;
    } else {
      this.heightCharacteristic = Object
        .values(HeightCharacteristics)[Randomizer.getRandomNumber({
          to: Object.keys(WeightCharacteristics).length,
        })];
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
