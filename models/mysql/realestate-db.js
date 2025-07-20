import mysql from 'mysql2'; // Important to put the /promise to use promises instead of callbacks when connecting to the DB
import dotenv from 'dotenv';
dotenv.config();

// .env version

const config = { 
    host: process.env.OLD_MYSQL_HOST, // 127.0.0.1 if this doesn't work
    user: process.env.OLD_MYSQL_USER,
    port: 3306,
    password: process.env.OLD_MYSQL_PASSWORD,
    database: process.env.OLD_MYSQL_DATABASE
}

// Trying railway

// const config = { 
//     host: process.env.MYSQLHOST, 
//     user: process.env.MYSQLUSER ?? 'root',
//     port: process.env.MYSQLPORT ?? 3306,
//     password: process.env.MYSQLPASSWORD ?? '',
//     database: process.env.MYSQLDATABASE
// }

// We provide mysql2 the config information for the connection
const pool = mysql.createPool(config).promise(); 

// Main functions

export class RealEstateModel {
    // READ

    static async getAllProperties () {
        const result = await pool.query(
            'SELECT BIN_TO_UUID(id) AS id, title, price, city, state, year, description, thumbnail, sqft, bedrooms, bathrooms FROM property ORDER BY price DESC'
        );

        return result[0]; // [0] because I just want the rows
    }

    static async getFeaturedProperties() {
        const result = await pool.query(
            `SELECT BIN_TO_UUID(id) AS id, title, price, city, state, year, description, thumbnail 
             FROM property 
             ORDER BY price DESC
             LIMIT 4`
        );
        
        return result[0];
    }

    static async getPropertyById(id) {
        const result = await pool.query(
            `SELECT *
            FROM property
            WHERE id = UUID_TO_BIN(?)`, [id]
        )

        return result[0];
    }

    static async getAllFirms () {
        const result = await pool.query(
            'SELECT * FROM firm'
        );

        return result[0];
    }

    static async getFirmById(id) {
        const [result] = await pool.query(
            `SELECT *
            FROM firm
            WHERE id = ?
            `, [id]
        );

        return result;
    }

    static async getFirmByPropertyId(id) {
        const [result] = await pool.query(
            `SELECT f.name AS name, f.city AS city, f.state AS state, f.established AS established, f.email AS email, f.website AS website, f.thumbnail AS thumbnail
            FROM firm f
            INNER JOIN property_firms AS pf ON pf.firm_id = f.id
            INNER JOIN property p ON pf.property_id = p.id
            WHERE p.id = UUID_TO_BIN(?);`, [id]
        )

        return result;
    }

    // CREATE
    static async createProperty(id, title, year, description, price, city, state, thumbnail) {
        const [result] = await pool.query(`
            INSERT INTO property (id, title, year, description, price, city, state, thumbnail)
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?)
            `, [id, title, year, description, price, city, state, thumbnail]);

        return this.getPropertyById(id)[1];
    }

    static async createFirm(name, city, state, established, email, website) {
        const [result] = await pool.query(`
            INSERT INTO firm (name, city, state, established, email, website)
            VALUES (?, ?, ?, ?, ?, ?)
            `, [name, city, state, established, email, website])

        return result;
    }

    // UPDATE
    static async updateProperty(id, title, year, description, price, city, state, thumbnail) {
        await pool.query(`
            UPDATE property
            SET title = ?, year = ?, description = ?, price = ?, city = ?, state = ?, thumbnail = ?
            WHERE id = UUID_TO_BIN(?)            
            `, [title, year, description, price, city, state, thumbnail, id] );

        return this.getPropertyById(id)[1];
    }

    // DELETE
}
