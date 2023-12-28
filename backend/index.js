const connectToMongo = require("./db");
var cors = require('cors')
connectToMongo();

const express = require("express");
const app = express();
const port = 5000;
app.use(cors())
//use middleware to access the body of the req 
app.use(express.json());
// available routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`);
});
