import express from 'express';
import { RealEstateModel } from './models/mysql/realestate-db.js';

const app = express();

app.get("/properties", async (req, res) => {
    const properties = await RealEstateModel.getAllProperties();
    res.send(properties);

});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');

});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});