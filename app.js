import express from 'express';
import cors from 'cors';
import { RealEstateModel } from './models/mysql/realestate-db.js';

const app = express();

app.use(cors())



// Queries

app.get("/properties", async (req, res) => {
    const properties = await RealEstateModel.getAllProperties();
    res.send(properties);

});

app.get("/properties/:id", async (req, res) => {
    const id = req.params.id;
    const property = await RealEstateModel.getPropertyById(id);
    res.send(property);

});

app.get("/firms-names/:id", async (req, res) => {
    const id = req.params.id;
    const firm_name = await RealEstateModel.getFirmNameById(id);
    res.send(firm_name);
});


app.get("/featured-properties", async (req, res) =>  {
    const featured = await RealEstateModel.getFeaturedProperties();
    res.send(featured);

});

// Error handle

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');

});

// Listen

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});