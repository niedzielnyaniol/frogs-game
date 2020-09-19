import Origin from './Origin';

class Field {
  constructor(private origin: Origin) { }

  getOrigin(): Origin {
    return this.origin;
  }

  setOrigin(origin: Origin): void {
    this.origin = origin;
  }
}

export default Field;
