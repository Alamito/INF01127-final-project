import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createUser } from '../controller/user.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.post('/api/createUser', async (req, res) => {
    try {
        await createUser(req.body);
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
