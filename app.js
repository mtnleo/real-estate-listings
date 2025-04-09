import express from 'express';
import cors from 'cors';
import { RealEstateModel } from './models/mysql/realestate-db.js';

const app = express();

app.use(cors())

app.get("/properties", async (req, res) => {
    const properties = await RealEstateModel.getAllProperties();
    res.send(properties);

});

app.get("/featured-properties", async (req, res) => {
    const featured = await RealEstateModel.getFeaturedProperties();
    res.send(featured);

});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');

});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});