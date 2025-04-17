import express, { response } from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { validateProperty } from './schemas/properties.js'
import { validateFirm } from './schemas/firms.js'

import { RealEstateModel } from './models/mysql/realestate-db.js';

const app = express();

// ------------------ Middleware ------------------ \\
app.use(cors())
app.use(express.json())


// ------------------ --------- -----------------  \\
// ------------------  Queries ------------------  ||
// ------------------ --------- -----------------  //

// ------------------  GET  ------------------  ||
// Properties
app.get("/properties", async (req, res) => {
    const properties = await RealEstateModel.getAllProperties();
    res.send(properties);

});

app.get("/properties/:id", async (req, res) => {
    const id = req.params.id;
    const property = await RealEstateModel.getPropertyById(id);
    res.send(property);

});

app.get("/featured-properties", async (req, res) =>  {
    const featured = await RealEstateModel.getFeaturedProperties();
    res.send(featured);

});

// Firms

app.get('/firms', async (req, res) => {
    const firms = await RealEstateModel.getAllFirms();
    res.send(firms);
});

app.get('/firms/:id', async (req, res) => {
    const id = req.params.id;
    const firm = await RealEstateModel.getFirmById(id);
    
    res.send(firm);
});

app.get("/firm-name/:propertyid", async (req, res) => {
    const property_id = req.params.propertyid;
    const firm_name = await RealEstateModel.getFirmNameById(property_id);
    res.send(firm_name);
});


// ------------------  POST  ------------------  ||

// Properties 

app.post('/properties', async (req, res) => {
    const result = await validateProperty(req.body);
    console.log(result);

    if (result.error) {
        return res.status(400).json( {error: JSON.parse(result.error.message)})
    } else {
            const { title, price, city, state, year, description, thumbnail } = req.body;
            const response = await RealEstateModel.createProperty(crypto.randomUUID(), title, year, description, price, city, state, thumbnail);
        
            res.status(201).send(response);
    }
})

// Firms

app.post('/firms', async (req, res) => {
    const result = await validateFirm(req.body);
    console.log(result)

    if (result.error) {
        return res.status(400).json( {error: JSON.parse(result.error.message)})
    }
    else {
        const { name, city, state, established, email, website } = req.body;
        const response = await RealEstateModel.createFirm(name, city, state, established, email, website);
    }

    res.send(response);
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