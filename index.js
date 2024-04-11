const express = require('express');
const cors = require('cors');
const app = express();
const videosRouter = require('./routes/videos');

//importing and configuring dotenv once.
// process.env contains the .env variables
require('dotenv').config();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/images',express.static('./files'));

app.use((req, res, next) => {
    //Security check
    console.log('Access granted');
    req.user = {access: true};
    next();
});

app.use("/videos",videosRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
