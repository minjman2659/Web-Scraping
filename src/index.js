const dotenv = require("dotenv");
const path = require("path");
const app = require("app");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running, port number is ${PORT} `);
});
