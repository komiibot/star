export const abbreviate = (number: number, decPlaces: number) => {
    decPlaces = Math.pow(10, decPlaces);
  
    const abbrev = ['k', 'm', 'b', 't'];
  
    for (let i = abbrev.length - 1; i >= 0; i--) {
      const size = Math.pow(10, (i + 1) * 3)
      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces;
  
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }
  
        (number as unknown as string) += abbrev[i];
  
        break;
      }
    }
  
    return number;
  }