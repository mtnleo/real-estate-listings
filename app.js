import express, { response } from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { validatePartialProperty, validateProperty } from './schemas/properties.js'
import { validateFirm } from './schemas/firms.js'

import { RealEstateModel } from './models/mysql/realestate-db.js';

import { sendEmail } from './email.js';


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

app.get('/firms-p/:id', async (req, res) => {
    const id = req.params.id;
    const firm = await RealEstateModel.getFirmByPropertyId(id);
    
    res.send(firm);
});



// ------------------  POST  ------------------  ||

// Emails

app.post('/subscribe', async (req, res) => {
    const userEmail = req.body.email;
    console.log("Email: ", userEmail);

    if (!userEmail) {
        return res.status(400).send('Email is required.');
    }
    
    try {
        await sendEmail(userEmail);
        res.send('Thanks for subscribing!'); // Handle pop-up in Front
    } catch (err) {
        console.error(err);
        res.status(500).send('Error sending email.');
    }
})

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

// ------------------  PUT  ------------------  ||
app.put('/properties/:id', async (req, res) => {
    const {id} = req.params;
    let property;
    try {
        [property] = await RealEstateModel.getPropertyById(id);
    } catch (err) {
        res.status(400).json( {error: JSON.parse(err)})
    } 

    const result = await validatePartialProperty(req.body);

    if(result.error) {
        return res.status(400).json( {error: JSON.parse(result.error.message)})
    } else {
        const newProperty = {
            ...property,
            ...result.data
            
        } // Create an object with the fields I have from both results

        console.log(newProperty);
        const updatedProperty = await RealEstateModel.updateProperty(id, newProperty.title, newProperty.year, newProperty.description, newProperty.price, newProperty.city, newProperty.state, newProperty.thumbnail)

        res.status(200).json(updatedProperty);
    }

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