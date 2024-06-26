const express = require('express');
const app = express();
const cors = require('cors');
const videosRouter = require('./routes/videos');

//importing and configuring dotenv once.
// process.env contains the .env variables
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(express.static('./public'));

app.use("/videos",videosRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port num ${PORT}`);
});
