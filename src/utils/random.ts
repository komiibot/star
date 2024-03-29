export const arrayShuffle = function (array: string[]) {
  for (var i = 0, length = array.length, swap = 0, temp = ""; i < length; i++) {
    swap = Math.floor(Math.random() * (i + 1));
    temp = array[swap];
    array[swap] = array[i];
    array[i] = temp;
  }
  return array;
};

export const percentageChance = function (values: any[], chances: string[] | number[], multiple?: boolean) {
  for (var i = 0, pool = []; i < chances.length; i++) {
    for (var i2 = 0; i2 < chances[i]; i2++) {
      pool.push(i);
    }
  }

  if(multiple) {
    return `${values[arrayShuffle(pool)["0"]]} ${values[arrayShuffle(pool)["1"]]} ${values[arrayShuffle(pool)["2"]]}`;
  }

  return values[arrayShuffle(pool)["0"]];
};

export function genMinMax(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomColor(): void {
  Math.floor(Math.random() * 16777215).toString(16);
}
