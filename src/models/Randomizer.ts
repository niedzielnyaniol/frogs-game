class Randomizer {
  static getRandomNumber({ from = 0, to }: { from?: number, to: number}): number {
    return Math.floor(Math.random() * to) + from;
  }
}

export default Randomizer;
