/**
 * Basic Object that contains the basic functionalities
 * to handle the storage item
 */
export const storage = {
  getItem: <T = any>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: <T = any>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => localStorage.removeItem(key),
  encode: <T = any>(val: T): string => {
    const encodedValue = btoa(JSON.stringify(val));
    return encodedValue;
  },
  decode: <T = any>(val: string): T => {
    const encodedValue = JSON.parse(atob(val));
    return encodedValue;
  },
};
