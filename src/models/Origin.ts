class Origin {
  constructor(
        public x: number,
        public y: number,
  ) {}

  public isEqual({ x, y }: Origin): boolean {
    return x === this.x && y === this.y;
  }
}

export default Origin;
