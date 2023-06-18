import fs from "fs";

const file_path = "src/jokesStore/";
const file_name = "jokes.json";

export const recordJoke = (jokeData) => {
  if (fs.existsSync(file_path + file_name)) {
    let jokesFromStore = fs.readFileSync(file_path + file_name);
    let parsData = JSON.parse(jokesFromStore.toString());
    const findJoke = parsData.some((elem) => elem.joke === jokeData.joke);
    if (findJoke) {
      parsData.map((elem) => elem.joke === jokeData.joke ? ({ ...elem, count: ++elem.count }) : ({ ...elem }));
    } else {
      parsData.push({ ...jokeData, count: 1 });
    }
    let result = JSON.stringify(parsData);
    fs.writeFileSync(file_path + file_name, result);
    console.log('Joke is recorded successfully.');
  } else {
    let result = JSON.stringify([{ ...jokeData, count: 1 }]).toString();
    fs.mkdirSync(file_path, err => {
      if (err) throw err;
    });
    fs.appendFileSync(file_path + file_name, result, err => {
      if (err) throw err;
    });
    console.log('Joke is recorded to file successfully.');
  }
};
