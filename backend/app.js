import express from 'express';

const app = express();

app.use(express.json()); 

import users from './routes/users.js';

app.use('/users', users);

app.listen(process.env.APP_PORT, () => {
    console.log(`localhost:${process.env.APP_PORT}`)
})