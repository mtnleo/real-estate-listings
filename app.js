import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto'
import { RealEstateModel } from './models/mysql/realestate-db.js';

const app = express();

// ------------------ Middleware ------------------ \\
app.use(cors())
app.use(express.json())


// ------------------ --------- -----------------  \\
// ------------------  Queries ------------------  ||
// ------------------ --------- -----------------  //

// ------------------  GET  ------------------  ||

app.get("/properties", async (req, res) => {
    const properties = await RealEstateModel.getAllProperties();
    res.send(properties);

});

app.get("/properties/:id", async (req, res) => {
    const id = req.params.id;
    const property = await RealEstateModel.getPropertyById(id);
    res.send(property);

});

app.get("/firm-name/:id", async (req, res) => {
    const id = req.params.id;
    const firm_name = await RealEstateModel.getFirmNameById(id);
    res.send(firm_name);
});


app.get("/featured-properties", async (req, res) =>  {
    const featured = await RealEstateModel.getFeaturedProperties();
    res.send(featured);

});

// ------------------  POST  ------------------  ||

app.post('/properties', async (req, res) => {
    const { title, price, city, state, year, description, thumbnail } = req.body;
    const response = await RealEstateModel.createProperty(crypto.randomUUID(), title, year, description, price, city, state, thumbnail);

    res.status(201).send(response);
})

// ------------------ ------------ ------------------ \\
// ------------------ Error Handle ------------------ \\
// ------------------ ------------ ------------------ \\

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!', err);

});

// -------------------- Listen -------------------- \\

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});