import https from "https";
import { randomNumber } from "../utils/index.js";
import { recordJoke } from "../handlers/recordJoke.js";

export const getDedJoke = (params = null) => {
  try {
    const req = https.get(`https://icanhazdadjoke.com/search?limit=4${params ? `&term=${params}` : ''}`, {
      headers: {
        Accept: 'application/json',
      }}, (res) => {
      let data = '';
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        const jokeData = JSON.parse(data);
        const randoJokeData = jokeData.results[randomNumber(jokeData.results.length)];
        recordJoke(randoJokeData);
        if (jokeData.results.length) {
          console.log(randoJokeData.joke);
        } else {
          console.log('Jokes were not found');
        }
      });
    });
    req.on('error', (err) => {
      console.error(err);
    });
  } catch (e) {
    console.error(e);
  }
}
