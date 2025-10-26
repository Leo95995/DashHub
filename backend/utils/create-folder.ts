import fs from "fs";

// If folder is not present then it will create it
export const setFolder = (folderName: string) => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (e) {}
};
