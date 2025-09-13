export const chunkArray = <T>(array: T[], size: number) => {
  const chunkedArray = [];
  for (var i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

export const pickRandomElement = (array: any[]) => {
  const length = array.length;
  const randomNumber = Math.floor(Math.random() * length);

  return array[randomNumber];
};
