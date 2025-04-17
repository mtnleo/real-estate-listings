import mysql from 'mysql2'; // Important to put the /promise to use promises instead of callbacks when connecting to the DB
import dotenv from 'dotenv';
dotenv.config();

/* Information that is required by Mysql2 to establish connection
const config = { 
    host: 'localhost', // 127.0.0.1 if this doesn't work
    user: 'root',
    port: 3306,
    password: '',
    database: 'RealEstate_DB'
}
*/

// .env version
const config = { 
    host: process.env.MYSQL_HOST ?? 'localhost', // 127.0.0.1 if this doesn't work
    user: process.env.MYSQL_USER ?? 'root',
    port: 3306,
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? 'RealEstate_DB'
}

// We provide mysql2 the config information for the connection
const pool = mysql.createPool(config).promise(); 

// Main functions

export class RealEstateModel {
    // READ

    static async getAllProperties () {
        const result = await pool.query(
            'SELECT BIN_TO_UUID(id) AS id, title, price, city, state, year, description, thumbnail FROM property ORDER BY price DESC'
        );

        return result[0]; // [0] because I just want the rows
    }

    static async getFeaturedProperties() {
        const result = await pool.query(
            `SELECT BIN_TO_UUID(id) AS id, title, price, city, state, year, description, thumbnail 
             FROM property 
             ORDER BY price DESC
             LIMIT 4 `
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

    static async getFirmNameById(id) {
        const [result] = await pool.query(
            `SELECT f.name
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

    // DELETE
}
