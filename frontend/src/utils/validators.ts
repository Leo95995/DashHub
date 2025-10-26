export const validateUsername = (
  username: string,
  maxChar?: number
): boolean => {
  return username.length > (maxChar ?? 2);
};

export const validateAvatarColor = (avatar: string): boolean => {
  return !!avatar.length;
};
