import { getDedJoke } from "./api/index.js";

console.log(process.argv)

if (process.argv[2] && process.argv[3]) {
  getDedJoke();
} else {
  console.log('Check params')
  process.exit(0);
}


