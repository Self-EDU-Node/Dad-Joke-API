import fs from "fs";

const file_path = "src/jokesStore/";
const file_name = "jokes.json";

export const getLeadBoardJoke = () => {
  if (fs.existsSync(file_path + file_name)) {
    let jokesFromStore = fs.readFileSync(file_path + file_name);
    let parsData = JSON.parse(jokesFromStore.toString());
    const popularJoke = parsData.reduce((a, b) => a.count > b.count ? a.joke : b.joke);
    console.log(`The most frequent joke is: ${popularJoke}`);
  } else {
    console.log('Jokes were not found');
  }
}
