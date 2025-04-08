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
    host: process.env.MYSQL_HOST, // 127.0.0.1 if this doesn't work
    user: process.env.MYSQL_USER,
    port: 3306,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

// We provide mysql2 the config information for the connection
const pool = mysql.createPool(config).promise(); 


async function createProperty(title, year, description, price, city, state, thumbnail) {
    let added =  await pool.query(`
        INSERT INTO property (id, title, year, description, price, city, state, thumbnail)
        VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?, ?)
        `, [title, year, description, price, city, state, thumbnail]);
    console.log(added);
}


createProperty("Mountain View Cabin", 2002, 'Beautiful cabin with a mountain view of the Rockies', 650000, 'Basalt', 'CO', 'https://images.unsplash.com/photo-1597256817041-0c75c0633658?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
const [result] = await pool.query(
    'SELECT *, BIN_TO_UUID(id) AS UUID FROM property'
);
console.log(result)
// Main functions

export class RealEstateModel {
    static async getAllProperties () {
        const result = await pool.query(
            'SELECT *, BIN_TO_UUID(id) AS UUID FROM property'
        );

        return result[0]; // [0] because I just want the rows
    }

    static async getAllFirms () {
        const result = await pool.query(
            'SELECT * FROM firm'
        );

        return result[0];
    }

    static async getPropertyById(id) {
        const result = await pool.query(
            `SELECT *
            FROM property
            WHERE BIN_TO_UUID(id) = ?`, [id]
        )

        return result[0];
    }

    // ADD
    static async createProperty(title, year, description, price, city, state, thumbnail) {
        await pool.query(`
            INSERT INTO property (id, title, year, description, price, city, state, thumbnail)
            VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?, ?)
            `, [title, year, description, price, city, state, thumbnail]);
    }
}
