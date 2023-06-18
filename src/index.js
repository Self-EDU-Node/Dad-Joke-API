import { getDedJoke } from "./api/index.js";
import { getLeadBoardJoke } from "./handlers/getLeadBoardJoke.js";

if ((process.argv[2] === 'searchTerm' && process.argv.length === 3)
    || (process.argv[2] === 'searchTerm' && process.argv[3] && process.argv.length === 4)) {
  getDedJoke(process.argv[3]);
} else if ((process.argv[2] === 'leaderboard' && process.argv.length === 3)) {
  getLeadBoardJoke();
} else {
  console.log('Check your params')
  process.exit(0);
}
