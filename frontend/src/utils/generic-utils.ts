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

export const generateDistinctColors = (count: number, alpha = 0.7): string[] => {
  
  
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const hue = Math.floor((i * 360) / count);
    const saturation = 80; 
    const lightness = 55; 

    colors.push(`hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
  }

  return colors;
};


/**
 * 
 * we pass a function has a cb function . the delay , is the time by which will be called the func.
 * then we have a timer.
 * when the user stop writing for the same amount of time of the timeout it will trigger the funct
 * 
 * @param func 
 * @param delay 
 * @returns 
 */

export const debounce = (func: any, delay: any) => {
  let timeoutId: number | undefined| any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Create short name, we return only the first 3 main char
 * @param username 
 * @returns 
 */

export  const createShortName = (username: string) => { 
    if(!username || username === ''){
      return "G";
    }
    const splittedName = username.split(' ');
    let result  = "";

    for(const name of splittedName){
      result += name[0]?.toUpperCase();
    }
    return result.substring(0,3)

  }

