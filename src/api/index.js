import https from "https";
import { appendFile, existsSync } from 'node:fs';
import * as fs from "fs";

const file_path = "src/jokesStore/";
const file_name = "jokes.json";

export const getDedJoke = () => {
  const req = https.get('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    }}, (res) => {
    let data = '';
    res.on("data", chunk => {
      data += chunk;
    });
    res.on("end", () => {
      const jokeData = JSON.parse(data);
      if (existsSync(file_path + file_name)) {
        const jokesData = fs.readFileSync(file_path + file_name)
        const parsData = JSON.parse(jokesData.toString());
        parsData.push(data);
        const result = JSON.stringify(parsData).toString();
        fs.writeFileSync(file_path + file_name, result);
        console.log('Joke is recorded successfully.');
      } else {
        const res = JSON.stringify([data]).toString();
        fs.mkdirSync(file_path, err => {
          if (err) throw err;
        });
        appendFile(file_path + file_name, res, err => {
          if (err) throw err;
          console.log('Joke is created successfully.');
        })
      }
      console.log(jokeData.joke);
    });
  });

  req.on('error', function(e) {
    console.error(e);
  });
}
