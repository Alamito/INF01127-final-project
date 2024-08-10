import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import { createUser, verifyCredentials, isEmployee, isStranger } from '../controller/user.js';
import { getRestaurants, reserveRestaurant, deleteRestaurant , createRestaurant} from '../controller/restaurant.js';
import { getSpaces, createSpace, reserveSpace, deleteSpace} from '../controller/space.js';

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
            return;
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

app.get('/api/isStranger/:email', async (req, res) => {
    try {
        const userIsStranger = await isStranger(req.params.email);
        res.status(200).json({ 'isStranger': userIsStranger });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/createRestaurant', async (req, res) => {
    try {
        await createRestaurant(req.body);
        res.status(201).json({ message: 'Restaurante Criado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/reserveRestaurant/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const reserve = await reserveRestaurant(id);
        res.status(200).json(reserve);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/deleteRestaurant/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const reserve = await deleteRestaurant(id);
        res.status(200).json(reserve);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/createSpace', async (req, res) => {
    try {
        await createSpace(req.body);
        res.status(201).json({ message: 'Space created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/spaces', async (req, res) => {
    try {
        const spaces = await getSpaces();
        res.status(200).json(spaces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/reserveSpace/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const reserve = await reserveSpace(id);
        res.status(200).json(reserve);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/deleteSpace/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const reserve = await deleteSpace(id);
        res.status(200).json(reserve);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
