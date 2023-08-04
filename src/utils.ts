export function* seedSequence(): IterableIterator<number> {
  let seed = Date.now();
  while (true) {
    seed = (seed * 9301 + 49297) % 233280;
    yield seed;
  }
}

export const seedGenerator: IterableIterator<number> = seedSequence();

export const integer = (min: number, max: number): number => {
  const range = max - min + 1;
  const nextSeed = seedGenerator.next().value;
  return Math.floor((nextSeed / 233280) * range) + min;
}

export const UUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = integer(0, 15);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}