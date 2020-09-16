import FieldTypes from './FieldTypes';

class Field {
  constructor(x, y, type = FieldTypes.NONE) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  setSelected(value) {
    this.type = value ? FieldTypes.SELECTED : FieldTypes.NONE;
  }
}

export default Field;
