import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createUser, verifyCredentials, isEmployee } from '../controller/user.js';

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

app.post('/api/login', async (req, res) => {
    try {
        const data = await verifyCredentials(req.body);
        if (!data) {
            res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User verified', user: data});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

app.get('/api/isEmployee/:email', async (req, res) => {
    try {
        const userIsEmployee = await isEmployee(req.params.email);
        res.status(200).json({ 'isEmployee': userIsEmployee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
