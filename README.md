# Simple currency converter app
Replace api_key in .env file with appropriate key
To run the app install required dependencies by running `npm i` and then run app by `npm run dev`. \
To build app run `npm run build` and then serve files from `dist` folder (f.e. with `npx serve dist`)

## Project assumptions
Vite was used as a build tool because it's fast, easy to use, and it suits such a small app \
For managing the state I haven't used any libraries / tools like Redux/Context because it would be an overkill for such a small project. \
I've used axios for fetching data from the API because it's simple and easy to use. \
There are no tests because of the time limit but with more time I would add them.


