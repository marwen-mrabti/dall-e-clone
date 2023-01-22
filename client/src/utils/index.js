import { surpriseMePrompts } from "../constant";
import FileSaver from "file-saver";

export const getRandomPrompt = (prompt) => {
  let randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  if (prompt === surpriseMePrompts[randomIndex]) return getRandomPrompt(prompt);
  return surpriseMePrompts[randomIndex];
};

export const downloadImage = async (_id, photo) => {
   FileSaver.saveAs(photo, `download_${_id}.jpg`);
};
