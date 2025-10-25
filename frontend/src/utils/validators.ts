export const validateUsername = (username: string, maxChar?:number): boolean => {
  return username.length > (maxChar ?? 2);
};
